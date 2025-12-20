export function createBoardSelector(boards, currentBoardId, onChange) {
  const wrapper = document.createElement("div");
  wrapper.className = "todo-board-selector";

  const button = document.createElement("button");
  button.className = "todo-board-selector__button";
  button.textContent =
    boards.find((b) => b.id === currentBoardId)?.title ?? "Выбери доску";

  const list = document.createElement("div");
  list.className = "todo-board-selector__list";
  list.hidden = true;

  boards.forEach((board) => {
    const item = document.createElement("button");
    item.className = "todo-board-selector__item";
    item.textContent = board.title;
    item.addEventListener("click", () => {
      list.hidden = true;
      onChange(board.id);
    });
    list.appendChild(item);
  });

  button.addEventListener("click", () => {
    list.hidden = !list.hidden;
  });

  wrapper.append(button, list);
  return wrapper;
}
