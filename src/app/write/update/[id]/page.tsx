import { notFound } from "next/navigation";

import { requireUser } from "@/app/actions/auth";
import { updateHanuri } from "@/app/actions/hanuri-write";
import { WriteForm } from "@/components/write/WriteForm";
import { getHanuriById } from "@/lib/hanuri/queries";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WriteUpdatePage({ params }: Props) {
  await requireUser();
  const { id } = await params;
  const hanuri = await getHanuriById(id);
  if (!hanuri) notFound();

  const action = updateHanuri.bind(null, id);

  return (
    <WriteForm
      action={action}
      initial={{
        title: hanuri.title,
        body: hanuri.body,
        tags: hanuri.tags,
        thumbnail: hanuri.thumbnail,
        year: hanuri.year,
        date: hanuri.date ?? "",
      }}
      mode="edit"
    />
  );
}
