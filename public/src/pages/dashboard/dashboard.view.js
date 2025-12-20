import { createStatsCard } from "../../components/stats-card.js";
import { createTripSummaryCard } from "../../components/trips/trip-summary-card.js";
import { trips } from "../../mocks/trips/trips.mock.js";
import { navigate } from "../../app/router.js";
import { photoCollections } from "../../mocks/gallery/collections.mock.js";
import { createCollectionCard } from "../../components/gallery/collection-card.js";

export function renderDashboardPage(root) {
  root.innerHTML = "";

  const container = document.createElement("div");
  container.className = "dashboard";

  // Верхние карточки статистики (mock)
  const statsRow = document.createElement("div");
  statsRow.className = "dashboard__stats-row";
  statsRow.append(
    createStatsCard("12", "Upcoming Events"),
    createStatsCard("3", "Upcoming Travel"),
    createStatsCard("12", "Meeting done!")
  );

  // Секция "Мои путешествия"
  const tripsSection = document.createElement("section");
  tripsSection.className = "dashboard__section dashboard__section--trips";

  tripsSection.innerHTML = `
    <div class="dashboard__section-header">
      <h2>Мои путешествия</h2>
      <div class="dashboard__section-actions">
        <button class="btn btn--ghost" id="all-trips-btn">Все путешествия</button>
        <button class="btn btn--primary" id="create-trip-btn">Создать путешествие</button>
      </div>
    </div>
    <div class="trips-scroll-container">
      <button class="trips-scroll-arrow trips-scroll-arrow--left" id="trips-left">&#x25C0;</button>
      <div class="trips-scroll-wrapper">
        <div class="trips-scroll-list"></div>
      </div>
      <button class="trips-scroll-arrow trips-scroll-arrow--right" id="trips-right">&#x25B6;</button>
    </div>
  `;

  const list = tripsSection.querySelector(".trips-scroll-list");

  // Показываем только незавершённые путешествия
  trips
    .filter((trip) => !trip.isCompleted)
    .forEach((trip) => {
      list.appendChild(createTripSummaryCard(trip));
    });

  container.append(statsRow, tripsSection);
  root.appendChild(container);

  // Кнопки "Все путешествия" и "Создать путешествие"
  const allTripsBtn = tripsSection.querySelector("#all-trips-btn");
  const createTripBtn = tripsSection.querySelector("#create-trip-btn");

  allTripsBtn.addEventListener("click", () => navigate("trips"));
  createTripBtn.addEventListener("click", () => {
    // здесь позже можно открыть модалку/форму
    alert("Создание путешествия (форма будет позже)");
  });

  const wrapper = tripsSection.querySelector(".trips-scroll-wrapper");
  const leftBtn = tripsSection.querySelector("#trips-left");
  const rightBtn = tripsSection.querySelector("#trips-right");

  const STEP = 320 + 16; // ширина карточки + gap

  rightBtn.addEventListener("click", () => {
    wrapper.scrollBy({ left: STEP, behavior: "smooth" });
  });

  leftBtn.addEventListener("click", () => {
    wrapper.scrollBy({ left: -STEP, behavior: "smooth" });
  });

  const collectionsSection = document.createElement("section");
  collectionsSection.className =
    "dashboard__section dashboard__section--collections";

  collectionsSection.innerHTML = `
  <div class="dashboard__section-header">
    <h2>Коллекции фотографий</h2>
  </div>
  <div class="collections-scroll-container">
    <button class="collections-arrow collections-arrow--left" id="collections-left">&#x25C0;</button>
    <div class="collections-scroll-wrapper">
      <div class="collections-scroll-list"></div>
    </div>
    <button class="collections-arrow collections-arrow--right" id="collections-right">&#x25B6;</button>
  </div>
`;

  const collectionsList = collectionsSection.querySelector(
    ".collections-scroll-list"
  );

  photoCollections.forEach((col) => {
    const trip = trips.find((t) => t.id === col.tripId);
    collectionsList.appendChild(createCollectionCard(col, trip));
  });

  container.append(statsRow, tripsSection, collectionsSection);
  root.appendChild(container);

  // стрелки для коллекций
  const colWrapper = collectionsSection.querySelector(
    ".collections-scroll-wrapper"
  );
  const colLeft = collectionsSection.querySelector("#collections-left");
  const colRight = collectionsSection.querySelector("#collections-right");

  const COLLECTION_STEP = 260; // ширина карточки + gap

  colRight.addEventListener("click", () => {
    colWrapper.scrollBy({ left: COLLECTION_STEP, behavior: "smooth" });
  });
  colLeft.addEventListener("click", () => {
    colWrapper.scrollBy({ left: -COLLECTION_STEP, behavior: "smooth" });
  });
}
