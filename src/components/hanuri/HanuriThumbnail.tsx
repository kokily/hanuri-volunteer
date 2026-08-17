import Image from "next/image";

interface Props {
  thumbnail: string;
  title: string;
}

export function HanuriThumbnail({ thumbnail, title }: Props) {
  return (
    <div className="relative z-10 mx-auto mt-14 flex w-full max-w-[1200px] justify-center px-2 sm:mt-16 sm:px-4">
      <div className="w-full rounded-3xl border-4 border-purple-100 bg-white p-3 shadow-2xl">
        <div className="relative aspect-video w-full">
          <Image
            src={thumbnail}
            alt={title}
            fill
            priority
            className="rounded-2xl object-cover"
            sizes="(min-width: 1280px) 1200px, calc(100vw - 2rem)"
          />
        </div>
      </div>
    </div>
  );
}
