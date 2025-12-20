// src/pages/todo/todo.view.js
import { createBoardSelector } from "../../components/todo/board-selector.js";
import { createTodoColumn } from "../../components/todo/column.js";
import {
  todoBoards,
  getCurrentBoard,
  setBoard,
  addTask,
  moveTask,
  clearColumn,
  updateTask,
} from "./todo.controller.js";

export function renderTodoPage(params = {}, root) {
  const { title, tripId } = params;

  root.innerHTML = "";
  const board = getCurrentBoard();

  const page = document.createElement("div");
  page.className = "todo-page";

  const header = document.createElement("div");
  header.className = "todo-page__header";

  // слева заголовок доски +, если есть, подпись путешествия
  const titleBlock = document.createElement("div");
  titleBlock.innerHTML = `
    <h1 class="todo-page__title">${title ?? "Todo list"}</h1>
    ${
      tripId
        ? `<p class="todo-page__subtitle">Для путешествия: ${title}</p>`
        : ""
    }
  `;

  // справа селектор досок (как было)
  const selector = createBoardSelector(todoBoards, board.id, (boardId) => {
    setBoard(boardId);
    renderTodoPage(params, root); // перерисовываем, сохраняя заголовок
  });

  header.append(titleBlock, selector);

  const columnsRow = document.createElement("div");
  columnsRow.className = "todo-page__columns";

  board.columns.forEach((column, index) => {
    const isLast = index === board.columns.length - 1;

    const colEl = createTodoColumn(column, board.tasks, {
      onAddTask: (colId, title) => {
        addTask(colId, title);
        renderTodoPage(params, root);
      },
      onClearColumn: (colId) => {
        clearColumn(colId);
        renderTodoPage(params, root);
      },
      onEditTask: (taskId, title) => {
        updateTask(taskId, { title });
        renderTodoPage(params, root);
      },
      isLast,
    });

    columnsRow.appendChild(colEl);
  });

  page.append(header, columnsRow);
  root.appendChild(page);

  initDragAndDrop(page);
}

function initDragAndDrop(root) {
  let draggedId = null;

  root.querySelectorAll(".todo-task").forEach((task) => {
    task.addEventListener("dragstart", (e) => {
      draggedId = task.dataset.taskId;
      e.dataTransfer.effectAllowed = "move";
    });
  });

  root.querySelectorAll('[data-drop-zone="true"]').forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      if (!draggedId) return;
      const columnEl = zone.closest(".todo-column");
      const columnId = columnEl.dataset.columnId;
      moveTask(draggedId, columnId);
      const pageRoot = root.closest("#page-root");
      renderTodoPage({}, pageRoot); // или renderTodoPage(params, pageRoot)
    });
  });
}
