// src/lib/utils/dateUtils.js

export function getToday() {
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return { day, date };
}