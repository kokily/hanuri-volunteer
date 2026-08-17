import { createHanuri } from "@/app/actions/hanuri-write";
import { requireUser } from "@/app/actions/auth";
import { WriteForm } from "@/components/write/WriteForm";

export default async function WritePage() {
  await requireUser();
  return <WriteForm action={createHanuri} />;
}
