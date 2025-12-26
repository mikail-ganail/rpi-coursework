import { todoBoards } from "../../mocks/todo/boards.mock.js";

let currentBoardId = todoBoards[0].id;
let tasksByBoard = new Map(
  todoBoards.map((b) => [b.id, structuredClone(b.tasks)])
);

export { todoBoards };

export function getCurrentBoard() {
  const board = todoBoards.find((b) => b.id === currentBoardId);
  return {
    ...board,
    tasks: tasksByBoard.get(currentBoardId) ?? [],
  };
}

export function setBoard(id) {
  currentBoardId = id;
}

export function addTask(columnId, title) {
  const tasks = tasksByBoard.get(currentBoardId) ?? [];
  tasks.push({
    id: "task-" + Date.now(),
    title,
    columnId,
  });
  tasksByBoard.set(currentBoardId, tasks);
}

export function moveTask(taskId, targetColumnId) {
  const tasks = tasksByBoard.get(currentBoardId) ?? [];
  const updated = tasks.map((task) =>
    task.id === taskId ? { ...task, columnId: targetColumnId } : task
  );
  tasksByBoard.set(currentBoardId, updated);
}

export function clearColumn(columnId) {
  const tasks = tasksByBoard.get(currentBoardId) ?? [];
  const filtered = tasks.filter((task) => task.columnId !== columnId);
  tasksByBoard.set(currentBoardId, filtered);
}

export function updateTask(taskId, update) {
  const tasks = tasksByBoard.get(currentBoardId) ?? [];
  const updated = tasks.map((task) =>
    task.id === taskId ? { ...task, ...update } : task
  );
  tasksByBoard.set(currentBoardId, updated);
}

/* связь с путешествиями */

export function findBoardByTrip(tripId) {
  return todoBoards.find((b) => b.tripId === tripId) ?? null;
}

export function createBoardForTrip(tripId, tripName) {
  const existing = findBoardByTrip(tripId);
  if (existing) return existing;

  const boardId = `trip-board-${tripId}`;
  const newBoard = {
    id: boardId,
    title: `Todo: ${tripName}`,
    tripId,
    columns: [
      { id: "backlog", title: "Backlog", color: "#e0f2fe" },
      { id: "todo", title: "To Do", color: "#fee2e2" },
      { id: "in-progress", title: "In Progress", color: "#fef3c7" },
      { id: "done", title: "Done", color: "#dcfce7" },
    ],
    tasks: [],
  };

  todoBoards.push(newBoard);
  tasksByBoard.set(boardId, []);
  return newBoard;
}
