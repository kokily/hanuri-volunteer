/** 카드 제목: 너무 길면 15자 근처에서 줄바꿈 */
export function formatGalleryTitle(title: string): string {
  if (title.length <= 15) return title;
  const idx = title.slice(0, 15).lastIndexOf(" ");
  if (idx > 0) {
    return `${title.slice(0, idx)}\n${title.slice(idx + 1)}`;
  }
  return `${title.slice(0, 15)}\n${title.slice(15)}`;
}

/** 날짜 문자열/Date → "2024. 3. 15." */
export function formatHanuriDate(date?: string | Date | null, fallback?: Date) {
  const raw = date ?? fallback;
  if (!raw) return "";
  const d = raw instanceof Date ? raw : new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`;
}
