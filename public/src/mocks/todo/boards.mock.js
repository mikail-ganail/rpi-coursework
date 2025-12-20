// src/mocks/todo/boards.mock.js
export const todoBoards = [
  {
    id: "personal",
    title: "Личные задачи",
    tripId: null,
    columns: [
      { id: "backlog", title: "Backlog", color: "#e0f2fe" },
      { id: "todo", title: "To Do", color: "#fee2e2" },
      { id: "in-progress", title: "In Progress", color: "#fef3c7" },
      { id: "done", title: "Done", color: "#dcfce7" },
    ],
    tasks: [
      { id: "t1", title: "Купить билеты", columnId: "backlog" },
      { id: "t2", title: "Забронировать отель", columnId: "todo" },
      { id: "t3", title: "Собрать вещи", columnId: "in-progress" },
      { id: "t4", title: "Оплатить страховку", columnId: "done" },
    ],
  },
  {
    id: "trip-asia",
    title: "Путешествие в Азию",
    tripId: null,
    columns: [
      { id: "backlog", title: "Backlog", color: "#e0f2fe" },
      { id: "todo", title: "To Do", color: "#fee2e2" },
      { id: "in-progress", title: "In Progress", color: "#fef3c7" },
      { id: "done", title: "Done", color: "#dcfce7" },
    ],
    tasks: [
      { id: "t10", title: "Сделать визу", columnId: "backlog" },
      { id: "t11", title: "Продумать маршрут по городам", columnId: "todo" },
      {
        id: "t12",
        title: "Подобрать отели в Бангкоке",
        columnId: "in-progress",
      },
    ],
  },
  {
    id: "trip-europe",
    title: "Евротрип",
    tripId: null,
    columns: [
      { id: "backlog", title: "Backlog", color: "#e0f2fe" },
      { id: "todo", title: "To Do", color: "#fee2e2" },
      { id: "in-progress", title: "In Progress", color: "#fef3c7" },
      { id: "done", title: "Done", color: "#dcfce7" },
    ],
    tasks: [
      { id: "t20", title: "Купить проездной Eurail", columnId: "todo" },
      { id: "t21", title: "Спланировать дни в Париже", columnId: "backlog" },
      {
        id: "t22",
        title: "Забронировать хостел в Берлине",
        columnId: "in-progress",
      },
      { id: "t23", title: "Оплатить страховку", columnId: "done" },
    ],
  },
];
