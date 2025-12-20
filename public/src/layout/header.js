export function renderHeader(root) {
  root.innerHTML = `
    <div class="header">
      <div class="header__left">
        <button class="header__today-btn">Сегодня</button>
        <input type="date" class="header__date-input" value="2025-12-19"/>
      </div>
      <div class="header__right">
        <span class="header__time">7:10</span>
        <span class="header__location">Казань, Р.Татарстан</span>
      </div>
    </div>
  `;
}
