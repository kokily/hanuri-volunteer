import Image from "next/image";
import clsx from "clsx";

interface Props {
  /** odd | even — 데스크톱에서 좌우 배치 */
  layout: "odd" | "even";
  role: string;
  name: string;
  body: string;
  image: string;
  imageAlt: string;
  blob: string;
}

export function AboutFeature({
  layout,
  role,
  name,
  body,
  image,
  imageAlt,
  blob,
}: Props) {
  const isEven = layout === "even";

  return (
    <div className="mx-auto mt-20 grid max-w-xl gap-14 sm:mt-24 sm:gap-16 lg:mt-44 lg:max-w-none lg:grid-cols-12 lg:gap-8">
      {/* 텍스트 */}
      <div
        className={clsx(
          "relative z-10 order-2 flex flex-col justify-center lg:col-span-6 lg:text-left",
          isEven && "lg:order-1",
        )}
      >
        <div>
          <span className="inline-block -rotate-1 rounded-full bg-purple-200 px-4 py-2 font-medium text-purple-700 shadow-md">
            {role}
          </span>
        </div>

        <div>
          <h2 className="h3 mt-3.5 font-bold text-purple-900">{name}</h2>
          <p className="mt-3 max-w-xl text-lg text-purple-800 sm:text-xl sm:leading-relaxed">
            {body}
          </p>
        </div>
      </div>

      {/* 이미지 */}
      <div
        className={clsx(
          "relative order-1 mx-auto w-full max-w-xl lg:col-span-6 lg:mx-0 lg:flex lg:max-w-none lg:items-center",
          isEven && "lg:order-2",
        )}
      >
        {/* 데스크톱 배경 blob */}
        <div className="hidden lg:block">
          <Image
            src={blob}
            alt=""
            width={600}
            height={600}
            className="absolute inset-0 h-full w-full scale-135 transform"
            aria-hidden
          />
        </div>

        {/* 모바일 상단 점 장식 */}
        <Image
          src="/svg/dots-strip.svg"
          alt=""
          width={200}
          height={40}
          className="absolute top-0 left-1/2 origin-top -translate-x-1/2 -translate-y-8 scale-80 transform sm:scale-100 lg:hidden"
          aria-hidden
        />

        <div
          className={clsx(
            "relative mx-auto w-full rounded-3xl shadow-lg lg:max-w-lg",
            isEven ? "lg:mr-0 lg:ml-auto" : "lg:mx-0",
          )}
        >
          <div className="relative block w-full">
            <Image
              className={clsx(
                "absolute z-10 hidden h-auto w-40 transform lg:block xl:w-48",
                "-top-20",
                isEven ? "-left-20" : "-right-20",
              )}
              src="/svg/dots.svg"
              alt=""
              width={192}
              height={192}
              aria-hidden
            />

            <figure className="relative aspect-[12/10]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="absolute inset-0 rounded-3xl object-cover object-center shadow-xl"
                sizes="(min-width: 1024px) 32rem, (min-width: 576px) 36rem, 100vw"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
