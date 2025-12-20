// src/pages/calculator/calculator.view.js
import { trips } from "../../mocks/trips/trips.mock.js";
import {
  getInitialPlan,
  getTripById,
  updatePlannedAmount,
  getPlannedTotal,
  getPerPerson,
  getPerDay,
  addExpense,
  getActualTotal,
  getPlannedVsActual,
  setParticipants,
  registerPayment,
  getSettlement,
} from "./calculator.controller.js";

let state = getInitialPlan(null);

export function renderCalculatorPage(root) {
  root.innerHTML = "";

  const page = document.createElement("div");
  page.className = "calculator-page";

  /* выбор путешествия */
  const tripSelect = document.createElement("select");
  tripSelect.className = "calculator-trip-select";
  tripSelect.innerHTML = `
    <option value="">Без привязки к путешествию</option>
    ${trips
      .map(
        (t) =>
          `<option value="${t.id}" ${state.tripId === t.id ? "selected" : ""}>${
            t.name
          }</option>`
      )
      .join("")}
  `;

  tripSelect.addEventListener("change", () => {
    const tripId = tripSelect.value || null;
    state = getInitialPlan(tripId);
    renderCalculatorPage(root);
  });

  /* блок планового бюджета */
  const planSection = document.createElement("section");
  planSection.className = "calculator-section";
  planSection.innerHTML = `
    <header class="calculator-section__header">
      <h2>Плановый бюджет</h2>
    </header>
    <div class="calculator-plan-table"></div>
    <div class="calculator-plan-summary">
      <span>Итого: <strong id="plan-total"></strong></span>
      <span>На человека: <strong id="plan-per-person"></strong></span>
      <span>В день: <strong id="plan-per-day"></strong></span>
    </div>
  `;

  const planTable = planSection.querySelector(".calculator-plan-table");
  planTable.innerHTML = state.categories
    .map(
      (cat) => `
    <div class="calculator-plan-row">
      <span>${cat.name}</span>
      <input
        type="number"
        min="0"
        value="${cat.planned}"
        data-category-id="${cat.id}"
        class="calculator-plan-input"
      />
    </div>`
    )
    .join("");

  planTable.querySelectorAll(".calculator-plan-input").forEach((input) => {
    input.addEventListener("input", () => {
      updatePlannedAmount(state, input.dataset.categoryId, input.value);
      updatePlanSummary(planSection);
    });
  });

  updatePlanSummary(planSection);

  /* блок фактических расходов */

  const actualSection = document.createElement("section");
  actualSection.className = "calculator-section";
  actualSection.innerHTML = `
    <header class="calculator-section__header">
      <h2>Фактические расходы</h2>
    </header>
    <div class="calculator-expense-form">
      <select class="calculator-expense-category">
        ${state.categories
          .map((c) => `<option value="${c.id}">${c.name}</option>`)
          .join("")}
      </select>
      <input type="number" min="0" placeholder="Сумма" class="calculator-expense-amount" />
      <input type="text" placeholder="Кто платил" class="calculator-expense-payer" />
      <input type="text" placeholder="Комментарий" class="calculator-expense-note" />
      <button class="btn btn--primary" id="add-expense-btn">Добавить</button>
    </div>
    <div class="calculator-expense-summary">
      <span>Потрачено: <strong id="actual-total"></strong></span>
    </div>
  `;

  actualSection
    .querySelector("#add-expense-btn")
    .addEventListener("click", () => {
      const cat = actualSection.querySelector(".calculator-expense-category");
      const amount = actualSection.querySelector(".calculator-expense-amount");
      const payer = actualSection.querySelector(".calculator-expense-payer");
      const note = actualSection.querySelector(".calculator-expense-note");

      addExpense(state, {
        categoryId: cat.value,
        amount: amount.value,
        paidBy: payer.value,
        note: note.value,
      });
      registerPayment(state, payer.value, amount.value);

      amount.value = "";
      note.value = "";

      updateActualSummary(actualSection, planSection);
      updateSettlementSection(settlementSection);
    });

  updateActualSummary(actualSection, planSection);

  /* блок сплита */

  const settlementSection = document.createElement("section");
  settlementSection.className = "calculator-section";
  settlementSection.innerHTML = `
    <header class="calculator-section__header">
      <h2>Кто кому должен</h2>
    </header>
    <div class="calculator-participants">
      <input type="text" placeholder="Имена через запятую (Аня, Борис...)" class="calculator-participants-input" />
      <button class="btn btn--ghost" id="set-participants-btn">Обновить</button>
    </div>
    <div class="calculator-settlement-list"></div>
  `;

  settlementSection
    .querySelector("#set-participants-btn")
    .addEventListener("click", () => {
      const input = settlementSection.querySelector(
        ".calculator-participants-input"
      );
      const names = input.value
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean);
      setParticipants(state, names);
      updateSettlementSection(settlementSection);
    });

  updateSettlementSection(settlementSection);

  page.append(tripSelect, planSection, actualSection, settlementSection);
  root.appendChild(page);
}

/* вспомогательные обновления */

function updatePlanSummary(section) {
  const total = getPlannedTotal(state);
  const perPerson = getPerPerson(state);
  const perDay = getPerDay(state);

  section.querySelector("#plan-total").textContent =
    total.toLocaleString("ru-RU") + " ₽";
  section.querySelector("#plan-per-person").textContent =
    perPerson.toFixed(0).toLocaleString("ru-RU") + " ₽";
  section.querySelector("#plan-per-day").textContent =
    perDay.toFixed(0).toLocaleString("ru-RU") + " ₽";
}

function updateActualSummary(actualSection, planSection) {
  const trip = state.tripId ? getTripById(state.tripId) : null;
  const actual = getActualTotal(state);
  const { planned } = getPlannedVsActual(state, trip);

  actualSection.querySelector("#actual-total").textContent =
    actual.toLocaleString("ru-RU") + " ₽";

  const diffEl = planSection.querySelector(".calculator-plan-diff");
  if (diffEl) {
    diffEl.textContent =
      actual > planned ? "Перерасход бюджета" : "В пределах планового бюджета";
  }
}

function updateSettlementSection(section) {
  const list = section.querySelector(".calculator-settlement-list");
  const settlement = getSettlement(state);

  if (!settlement.length) {
    list.textContent = "Добавь участников и расходы, чтобы увидеть баланс.";
    return;
  }

  list.innerHTML = settlement
    .map((item) => {
      const status =
        item.balance > 0
          ? "Ему должны"
          : item.balance < 0
          ? "Он должен"
          : "Всё по нулям";

      return `
        <div class="calculator-settlement-row">
          <span>${item.name}</span>
          <span>${status}: ${Math.abs(item.balance).toLocaleString(
        "ru-RU"
      )} ₽</span>
        </div>
      `;
    })
    .join("");
}
