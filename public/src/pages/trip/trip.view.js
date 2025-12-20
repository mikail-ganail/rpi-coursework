// src/pages/trip/trip.view.js
import { trips } from "../../mocks/trips/trips.mock.js";
import { navigate } from "../../app/router.js";
import {
  findBoardByTrip,
  createBoardForTrip,
  setBoard,
} from "../todo/todo.controller.js";
import { formatDateRange } from "../../utils/dates.js";

export function renderTripPage(params, root) {
  const { id: tripId } = params;

  root.innerHTML = "";

  const trip = trips.find((t) => t.id === tripId);
  if (!trip) {
    const notFound = document.createElement("div");
    notFound.className = "trip-page trip-page--empty";
    notFound.innerHTML = `
      <h1>Путешествие не найдено</h1>
      <button class="btn btn--ghost" id="back-to-trips">Все путешествия</button>
    `;
    root.appendChild(notFound);
    const backBtn = document.getElementById("back-to-trips");
    backBtn.addEventListener("click", () => navigate("trips"));
    return;
  }

  const dateRange = formatDateRange(trip.startDate, trip.endDate);
  const existingBoard = findBoardByTrip(tripId);
  const hasBoard = Boolean(existingBoard);

  const page = document.createElement("div");
  page.className = "trip-page";

  page.innerHTML = `
    <header class="trip-page__header">
      <div>
        <h1 class="trip-page__title">${trip.name}</h1>
        <p class="trip-page__subtitle">
          ${trip.locationCity}, ${trip.locationRegion}, ${trip.country}
        </p>
      </div>
      <button class="btn btn--ghost" id="back-to-trips">Все путешествия</button>
    </header>

    <section class="trip-page__section trip-page__section--summary">
      <div class="trip-page__summary-block">
        <h2>Даты поездки</h2>
        <p>${dateRange}</p>
        <p class="trip-page__summary-label">
          Путешественников: <strong>${trip.travelersCount}</strong>
        </p>
      </div>

      <div class="trip-page__summary-block">
        <h2>Размещение и транспорт</h2>
        <p>Транспорт: ${trip.transportType}</p>
        <p>Размещение: ${trip.accommodationType}</p>
        <p>Климат: ${trip.climate}</p>
      </div>

      <div class="trip-page__summary-block">
        <h2>Бюджет</h2>
        <p>План: ${trip.budgetPlanned.toLocaleString("ru-RU")} ₽</p>
        <p>Факт: ${trip.budgetSpent.toLocaleString("ru-RU")} ₽</p>
        <p>Статус: ${trip.isCompleted ? "Завершено" : "В процессе"}</p>
      </div>
    </section>

    <section class="trip-page__section">
      <h2>Описание</h2>
      <p>${trip.description}</p>
    </section>

    <section class="trip-page__section">
      <header class="trip-page__section-header">
        <h2>Todo для путешествия</h2>
        <button class="btn btn--primary" id="trip-todo-btn">
          ${hasBoard ? "Перейти на доску" : "Создать todo"}
        </button>
      </header>
      <p class="trip-page__todo-hint">
        ${
          hasBoard
            ? "Для этого путешествия уже создана доска задач. Можно перейти к ней."
            : "Создай доску задач, чтобы спланировать подготовку к поездке."
        }
      </p>
    </section>
  `;

  root.appendChild(page);

  // Кнопка "Все путешествия"
  const backBtn = document.getElementById("back-to-trips");
  backBtn.addEventListener("click", () => navigate("trips"));

  // Кнопка создания/перехода на todo-доску
  const todoBtn = document.getElementById("trip-todo-btn");
  todoBtn.addEventListener("click", () => {
    let board = findBoardByTrip(tripId);
    if (!board) {
      board = createBoardForTrip(tripId, trip.name);
    }
    setBoard(board.id);
    navigate("todo", { tripId, title: trip.name });
  });
}
