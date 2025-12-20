export function createTripCard({ title, from, to, days, location }) {
  const card = document.createElement('article');
  card.className = 'trip-card';
  card.innerHTML = `
    <header class="trip-card__header">
      <span class="trip-card__status-dot trip-card__status-dot--green"></span>
      <h3 class="trip-card__title">${title}</h3>
    </header>
    <div class="trip-card__dates">
      <span>${from}</span>
      <span>→</span>
      <span>${to}</span>
      <span class="trip-card__days">(${days} дней)</span>
    </div>
    <div class="trip-card__location">${location}</div>
    <footer class="trip-card__footer">
      <button class="btn btn--ghost">Посмотреть информацию</button>
      <button class="btn btn--primary">Activate</button>
    </footer>
  `;
  return card;
}
