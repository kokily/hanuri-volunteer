import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HanuriDetail } from "@/components/hanuri/HanuriDetail";
import { getCurrentUser } from "@/lib/auth/session";
import { getHanuriById } from "@/lib/hanuri/queries";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const hanuri = await getHanuriById(id);
  if (!hanuri) return { title: "글 없음 | 하누리 봉사회" };
  return {
    title: `${hanuri.title} | 하누리 봉사회`,
    description: hanuri.title,
  };
}

export default async function HanuriPage({ params }: Props) {
  const { id } = await params;
  const hanuri = await getHanuriById(id);
  if (!hanuri) notFound();

  const user = await getCurrentUser();

  return <HanuriDetail hanuri={hanuri} canEdit={Boolean(user)} />;
}
