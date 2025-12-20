import { photoCollections } from "../../mocks/gallery/collections.mock.js";
import { trips } from "../../mocks/trips/trips.mock.js";
import { navigate } from "../../app/router.js";

export function renderCollectionPage(params, root) {
  const { id } = params;
  const collection = photoCollections.find((c) => c.id === id);

  root.innerHTML = "";

  if (!collection) {
    const div = document.createElement("div");
    div.textContent = "Коллекция не найдена";
    root.appendChild(div);
    return;
  }

  const trip = trips.find((t) => t.id === collection.tripId) ?? null;

  const page = document.createElement("div");
  page.className = "collection-page";

  page.innerHTML = `
    <header class="collection-page__header">
      <div>
        <h1 class="collection-page__title">${collection.title}</h1>
        ${
          trip
            ? `<p class="collection-page__subtitle">Путешествие: ${trip.name}</p>`
            : ""
        }
      </div>
      <button class="btn btn--ghost" id="back-to-dashboard">На главную</button>
    </header>

    <section class="collection-page__grid">
      ${collection.photos
        .map(
          (url) => `
          <figure class="collection-photo">
            <img
              src="${url}"
              data-full-src="${url}"
              class="collection-photo__image js-zoomable"
            />
          </figure>
        `
        )
        .join("")}
    </section>
  `;

  root.appendChild(page);

  document
    .getElementById("back-to-dashboard")
    .addEventListener("click", () => navigate("dashboard"));
}
