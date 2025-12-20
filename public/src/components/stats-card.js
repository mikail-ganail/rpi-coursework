export function createStatsCard(value, label) {
  const card = document.createElement('div');
  card.className = 'stats-card';
  card.innerHTML = `
    <div class="stats-card__value">${value}</div>
    <div class="stats-card__label">${label}</div>
  `;
  return card;
}
