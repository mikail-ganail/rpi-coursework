// src/pages/calculator/calculator.controller.js
import { defaultBudgetCategories } from "../../mocks/calculator/default-categories.mock.js";
import { trips } from "../../mocks/trips/trips.mock.js";

export function getTripById(tripId) {
  return trips.find((t) => t.id === tripId) ?? null;
}

export function getInitialPlan(tripId) {
  const trip = getTripById(tripId);
  const days = trip ? getTripDaysCount(trip) : 1;

  const categories = defaultBudgetCategories.map((cat) => ({
    ...cat,
    planned: 0,
  }));

  return {
    tripId: tripId ?? null,
    days,
    travelersCount: trip?.travelersCount ?? 1,
    categories,
    expenses: [],
    participants: [],
  };
}

export function getTripDaysCount(trip) {
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

export function updatePlannedAmount(state, categoryId, value) {
  const amount = Number(value) || 0;
  state.categories = state.categories.map((cat) =>
    cat.id === categoryId ? { ...cat, planned: amount } : cat
  );
}

export function getPlannedTotal(state) {
  return state.categories.reduce((sum, cat) => sum + (cat.planned || 0), 0);
}

export function getPerPerson(state) {
  return getPlannedTotal(state) / (state.travelersCount || 1);
}

export function getPerDay(state) {
  return getPlannedTotal(state) / (state.days || 1);
}


export function addExpense(state, { categoryId, amount, paidBy, note }) {
  const value = Number(amount) || 0;
  if (!value) return;

  state.expenses.push({
    id: "exp-" + Date.now(),
    categoryId,
    amount: value,
    paidBy: paidBy || null,
    note: note || "",
  });
}

export function getActualTotal(state) {
  return state.expenses.reduce((s, e) => s + e.amount, 0);
}

export function getPlannedVsActual(state, trip) {
  const planned = getPlannedTotal(state) || trip?.budgetPlanned || 0;
  const actual = getActualTotal(state) || trip?.budgetSpent || 0;
  const diff = planned - actual;
  return { planned, actual, diff };
}

/* участники и сплит */

export function setParticipants(state, names) {
  state.participants = names.map((name) => ({ name, paid: 0 }));
}

export function registerPayment(state, payerName, amount) {
  const value = Number(amount) || 0;
  const p = state.participants.find((p) => p.name === payerName);
  if (!p) return;
  p.paid += value;
}

export function getSettlement(state) {
  const total = state.participants.reduce((s, p) => s + p.paid, 0);
  if (!total || !state.participants.length) return [];

  const share = total / state.participants.length;

  return state.participants.map((p) => ({
    name: p.name,
    balance: +(p.paid - share).toFixed(2),
  }));
}
