export const tripTodoMap = new Map();

export function getBoardIdForTrip(tripId) {
  return tripTodoMap.get(tripId) ?? null;
}

export function createBoardForTrip(tripId, tripName) {
  const boardId = `board-${tripId}`;
  if (!tripTodoMap.has(tripId)) {
    tripTodoMap.set(tripId, boardId);
  }
  return boardId;
}
