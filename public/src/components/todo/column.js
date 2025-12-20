// src/components/todo/column.js
import { createTaskCard } from "./task-card.js";

export function createTodoColumn(
  column,
  tasks,
  { onAddTask, onClearColumn, onEditTask, isLast }
) {
  const col = document.createElement("section");
  col.className = "todo-column";
  col.dataset.columnId = column.id;
  col.style.backgroundColor = column.color;

  col.innerHTML = `
    <header class="todo-column__header">
      <h3 class="todo-column__title">${column.title}</h3>
    </header>
    <div class="todo-column__tasks" data-drop-zone="true"></div>
  `;

  const tasksContainer = col.querySelector(".todo-column__tasks");

  tasks
    .filter((task) => task.columnId === column.id)
    .forEach((task) => {
      tasksContainer.appendChild(
        createTaskCard(task, {
          onEdit: (taskId, title) => onEditTask(taskId, title),
        })
      );
    });

  // колонка Backlog: кнопка + и инпут
  if (column.id === "backlog") {
    const addButton = document.createElement("button");
    addButton.className = "todo-column__add";
    addButton.textContent = "+ Добавить задачу";
    addButton.addEventListener("click", () => {
      const input = document.createElement("input");
      input.className = "todo-column__input";
      input.placeholder = "Новая задача...";

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && input.value.trim()) {
          onAddTask(column.id, input.value.trim());
        }
        if (e.key === "Enter" || e.key === "Escape") {
          col.removeChild(input);
        }
      });

      col.insertBefore(input, tasksContainer);
      input.focus();
    });
    col.appendChild(addButton);
  }

  // последняя колонка: кнопка очистки
  if (isLast) {
    const clearButton = document.createElement("button");
    clearButton.className = "todo-column__clear";
    clearButton.textContent = "Очистить столбец";
    clearButton.addEventListener("click", () => {
      onClearColumn(column.id);
    });
    col.appendChild(clearButton);
  }

  return col;
}
