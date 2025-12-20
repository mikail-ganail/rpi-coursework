import { formatDateRange } from "../../utils/dates.js";
import { navigate } from "../../app/router.js";

function getBudgetLabel(trip) {
  if (!trip.budgetSpent) return "Расходы еще не посчитаны";
  if (trip.budgetSpent <= trip.budgetPlanned) {
    return "В пределах бюджета";
  }
  return "Перерасход бюджета";
}

export function createTripSummaryCard(trip) {
  const card = document.createElement("article");
  card.className = "trip-summary-card";
  card.dataset.tripId = trip.id;

  const dateRange = formatDateRange(trip.startDate, trip.endDate);
  const budgetLabel = getBudgetLabel(trip);

  card.innerHTML = `
    <div class="trip-summary-card__content">
      <header class="trip-summary-card__header">
        <div class="trip-summary-card__status">
          <span class="trip-summary-card__status-dot ${
            trip.isCompleted
              ? "trip-summary-card__status-dot--gray"
              : "trip-summary-card__status-dot--green"
          }"></span>
          <h3 class="trip-summary-card__title">${trip.name}</h3>
        </div>
      </header>

      <div class="trip-summary-card__dates">
        ${dateRange}
      </div>

      <div class="trip-summary-card__location">
        ${trip.locationCity}, ${trip.locationRegion}
      </div>

      <div class="trip-summary-card__meta">
        <span>${trip.travelersCount} путешественника</span>
        <span>Транспорт: ${trip.transportType}</span>
        <span>${budgetLabel}</span>
      </div>

      <div class="trip-summary-card__footer">
        <button class="btn btn--ghost trip-summary-card__info-btn">
          Посмотреть информацию
        </button>
        <button class="btn btn--primary trip-summary-card__activate-btn">
          ${trip.isCompleted ? "Details" : "Activate"}
        </button>
      </div>
    </div>
  `;

  const infoBtn = card.querySelector(".trip-summary-card__info-btn");
  infoBtn.addEventListener("click", () => {
    navigate("trip", { id: trip.id });
  });

  return card;
}
