/** 네비 갤러리에서 공통 사용 */
export const GALLERY_YEARS = [
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
] as const;

export type GalleryYear = (typeof GALLERY_YEARS)[number];

export const LATEST_GALLERY_YEAR = GALLERY_YEARS[0];
