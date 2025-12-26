import { trips } from "../../mocks/trips/trips.mock.js";
import { navigate } from "../../app/router.js";

export function renderMapPage(root) {
  root.innerHTML = "";

  const page = document.createElement("div");
  page.className = "map-page";

  const header = document.createElement("div");
  header.className = "map-page__header";
  header.innerHTML = `
    <div>
      <h1 class="map-page__title">Карта путешествий</h1>
      <p class="map-page__subtitle">
        Маркеры показывают города и места, посещённые во время путешествий.
      </p>
    </div>
  `;

  const mapContainer = document.createElement("div");
  mapContainer.id = "trip-map";
  mapContainer.className = "map-page__map";

  page.append(header, mapContainer);
  root.appendChild(page);

  initTripMap(mapContainer);
}

function initTripMap(container) {
  if (!window.L) {
    container.textContent = "Leaflet не загружен";
    return;
  }
  const map = L.map(container).setView([30, 25], 3);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  const bounds = [];
  trips.forEach((trip) => {
    if (!trip.places || !trip.places.length) return;

    trip.places.forEach((place) => {
      if (typeof place.lat !== "number" || typeof place.lng !== "number")
        return;

      const marker = L.circleMarker([place.lat, place.lng], {
        radius: 6,
        fillColor: place.color || "#2563eb",
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(map);

      bounds.push([place.lat, place.lng]);

      const popupHtml = `
        <div class="map-popup">
          <h3 class="map-popup__title">${place.name}</h3>
          <p class="map-popup__trip">${trip.name}</p>
          <p class="map-popup__desc">${place.description}</p>
          <p class="map-popup__meta">
            Тип: ${place.type ?? "место"}<br/>
            Период поездки: ${trip.startDate} → ${trip.endDate}
          </p>
          <button class="btn btn--primary map-popup__btn" data-trip-id="${
            trip.id
          }">
            Открыть путешествие
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);
    });
  });
  if (bounds.length) {
    map.fitBounds(bounds, { padding: [40, 40] });
  }
  map.on("popupopen", (e) => {
    const popupEl = e.popup.getElement();
    const btn = popupEl.querySelector(".map-popup__btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const tripId = btn.dataset.tripId;
      navigate("trip", { id: tripId });
    });
  });
}

