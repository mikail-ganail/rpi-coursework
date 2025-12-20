import { renderDashboardPage } from "../pages/dashboard/dashboard.view.js";
import { renderTodoPage } from "../pages/todo/todo.view.js";
import { renderMapPage } from "../pages/map/map.view.js";
import { renderCalculatorPage } from "../pages/calculator/calculator.view.js";
import { renderTripPage } from "../pages/trip/trip.view.js";
import { renderTripsListPage } from "../pages/trip/trips-list.view.js";
import { renderCollectionPage } from "../pages/gallery/collection.view.js";

const routes = {
  dashboard: (params, root) => renderDashboardPage(root),
  todo: (params, root) => renderTodoPage(params, root),
  map: (params, root) => renderMapPage(root),
  calculator: (params, root) => renderCalculatorPage(root),
  trip: (params, root) => renderTripPage(params, root),
  trips: (params, root) => renderTripsListPage(root),
  map: (params, root) => renderMapPage(root),
  collection: (params, root) => renderCollectionPage(params, root),
};

export function navigate(routeName, params = {}) {
  const pageRoot = document.getElementById("page-root");
  if (!routes[routeName] || !pageRoot) return;

  pageRoot.innerHTML = "";
  routes[routeName](params, pageRoot); // если хэндлер ждёт root вторым аргументом
}

export function initRouter() {
  // страница по умолчанию
  navigate("dashboard");

  // делегирование кликов по пунктам меню
  const sidebarRoot = document.getElementById("sidebar");
  sidebarRoot.addEventListener("click", (e) => {
    const link = e.target.closest("[data-route]");
    if (!link) return;
    const route = link.dataset.route;
    navigate(route);
  });
}
