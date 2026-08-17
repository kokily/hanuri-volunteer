import type { Hanuri as HanuriModel } from "@prisma/client";

import { HanuriBody } from "./HanuriBody";
import { HanuriHeader } from "./HanuriHeader";
import { HanuriThumbnail } from "./HanuriThumbnail";

interface Props {
  hanuri: HanuriModel;
  canEdit: boolean;
}

export function HanuriDetail({ hanuri, canEdit }: Props) {
  return (
    <section className="from-purple-25 bg-gradient-to-b to-white px-4 pt-10 sm:px-6 md:pt-32 lg:px-8">
      <HanuriHeader
        id={hanuri.id}
        title={hanuri.title}
        tags={hanuri.tags}
        date={hanuri.date}
        createdAt={hanuri.createdAt}
        canEdit={canEdit}
      />
      <HanuriThumbnail thumbnail={hanuri.thumbnail} title={hanuri.title} />
      <HanuriBody body={hanuri.body} title={hanuri.title} />
    </section>
  );
}
