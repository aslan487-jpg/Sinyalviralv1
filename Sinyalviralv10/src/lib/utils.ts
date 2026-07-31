// 15 gün sonraki ilk pazartesiyi hesapla
export function getDefaultExamDate(): string {
  const today = new Date();
  const target = new Date(today);
  target.setDate(today.getDate() + 15);
  
  const dayOfWeek = target.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
  target.setDate(target.getDate() + daysUntilMonday);
  
  return target.toISOString().split("T")[0];
}

export function formatDateTR(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
