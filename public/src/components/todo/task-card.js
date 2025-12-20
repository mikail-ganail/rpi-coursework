export function createTaskCard(task, { onEdit } = {}) {
  const card = document.createElement("div");
  card.className = "todo-task";
  card.draggable = true;
  card.dataset.taskId = task.id;
  card.textContent = task.title;

  const handleEdit = onEdit ?? (() => {});

  card.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.className = "todo-task__edit";
    input.value = task.title;

    card.replaceChildren(input);
    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const value = input.value.trim();
        if (value && value !== task.title) {
          handleEdit(task.id, value);
        } else {
          card.textContent = task.title;
        }
      }
      if (e.key === "Escape") {
        card.textContent = task.title;
      }
    });

    input.addEventListener("blur", () => {
      card.textContent = task.title;
    });
  });

  return card;
}
