export const tripTodoMap = new Map();
// ключ: tripId, значение: boardId (строка)

export function getBoardIdForTrip(tripId) {
  return tripTodoMap.get(tripId) ?? null;
}

export function createBoardForTrip(tripId, tripName) {
  // id доски можно формировать из трипа
  const boardId = `board-${tripId}`;
  if (!tripTodoMap.has(tripId)) {
    tripTodoMap.set(tripId, boardId);
  }
  // здесь при желании можно добавить создание самой доски в мок‑данных todo
  return boardId;
}
