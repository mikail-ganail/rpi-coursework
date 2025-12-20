export function renderSidebar(root) {
  root.innerHTML = `
    <div class="sidebar">
      <div class="sidebar__logo">Säyäxat</div>
      <nav class="sidebar__nav">
        <button class="nav-item" data-route="dashboard">Главная</button>
        <button class="nav-item" data-route="todo">Todo list</button>
        <button class="nav-item" data-route="map">Карта</button>
        <button class="nav-item" data-route="calculator">Калькулятор</button>
      </nav>
    </div>
  `;
}
