import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GalleryList } from "@/components/gallery/GalleryList";
import { GALLERY_YEARS } from "@/lib/gallery-years";
import { listHanuriesByYear } from "@/lib/hanuri/queries";

interface Props {
  params: Promise<{ year: string }>;
}

/** 네비에 있는 연도만 허용 (원하면 4자리 숫자로 완화 가능) */
function isAllowedYear(year: string) {
  return (GALLERY_YEARS as readonly string[]).includes(year);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year}년 봉사활동 | 하누리 봉사회`,
    description: `하누리 봉사회 ${year}년 봉사활동 갤러리입니다.`,
  };
}

export default async function GalleryYearPage({ params }: Props) {
  const { year } = await params;

  if (!isAllowedYear(year)) {
    notFound();
  }

  const initialItems = await listHanuriesByYear(year);

  return <GalleryList year={year} initialItems={initialItems} />;
}
