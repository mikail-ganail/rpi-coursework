export function formatDateRange(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const options = { day: "numeric", month: "long" };
  const startStr = startDate.toLocaleDateString("ru-RU", options);
  const endStr = endDate.toLocaleDateString("ru-RU", options);

  const diffMs = endDate - startDate;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;

  return `${startStr} → ${endStr} (${diffDays} дней)`;
}
