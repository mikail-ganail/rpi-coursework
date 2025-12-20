// src/pages/trip/trips-list.view.js
import { trips } from "../../mocks/trips/trips.mock.js";
import { createTripSummaryCard } from "../../components/trips/trip-summary-card.js";
import { navigate } from "../../app/router.js";

export function renderTripsListPage(root) {
  root.innerHTML = "";

  const page = document.createElement("div");
  page.className = "trips-list-page";

  const header = document.createElement("div");
  header.className = "trips-list-page__header";
  header.innerHTML = `
    <div>
      <h1>Все путешествия</h1>
    </div>
    <button class="btn btn--ghost" id="back-to-dashboard">На главную</button>
  `;

  const list = document.createElement("div");
  list.className = "trips-list-page__list";

  trips.forEach((trip) => {
    const card = createTripSummaryCard(trip);
    card.classList.add("trip-summary-card--full"); // шире только на этой странице
    list.appendChild(card);
  });

  page.append(header, list);
  root.appendChild(page);

  const backBtn = document.getElementById("back-to-dashboard");
  backBtn.addEventListener("click", () => navigate("dashboard"));
}
