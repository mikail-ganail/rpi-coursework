import { navigate } from "../../app/router.js";

export function createCollectionCard(collection, trip) {
  const card = document.createElement("article");
  card.className = "collection-card";

  card.innerHTML = `
    <div class="collection-card__image-wrapper">
      <div class="collection-card__image-wrapper">
      <img
        src="${collection.coverUrl}"
        data-full-src="${collection.coverUrl}"
        alt="${collection.title}"
        class="collection-card__image js-zoomable"
      />
      <span class="collection-card__badge">${
        collection.photos.length
      } фото</span>
    </div>
    </div>
    <div class="collection-card__body">
      <h3 class="collection-card__title">${collection.title}</h3>
      <p class="collection-card__trip">${trip?.name ?? ""}</p>
      <p class="collection-card__desc">${collection.description}</p>
      <button class="btn btn--ghost collection-card__btn">Открыть коллекцию</button>
    </div>
  `;

  card.querySelector(".collection-card__btn").addEventListener("click", () => {
    navigate("collection", { id: collection.id });
  });

  return card;
}
