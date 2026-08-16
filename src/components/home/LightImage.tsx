"use client";

import Image from "next/image";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";

const images = [
  { src: "/main01.jpg", alt: "하누리 봉사회 활동 사진 1" },
  { src: "/main02.jpg", alt: "하누리 봉사회 활동 사진 2" },
  { src: "/main03.jpg", alt: "하누리 봉사회 활동 사진 3" },
  { src: "/main04.jpg", alt: "하누리 봉사회 활동 사진 4" },
  { src: "/main05.jpg", alt: "하누리 봉사회 활동 사진 5" },
  { src: "/main06.jpg", alt: "하누리 봉사회 활동 사진 6" },
] as const;

export function LightImage() {
  return (
    <section className="relative px-4 pt-0 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex justify-center">
          <span className="inline-block -rotate-1 rounded-full bg-purple-400 px-4 py-2 font-medium text-white shadow-md">
            관심과 사랑의 마음으로
          </span>
        </div>

        <LightGallery speed={500} selector="figure">
          <div className="relative z-10 mt-14 grid grid-cols-12 gap-4 sm:mt-16 sm:gap-6 md:mt-20 lg:mt-24 lg:gap-10 lg:px-4 xl:gap-12 2xl:px-16">
            <div className="col-span-4 flex flex-col md:col-span-2 md:justify-end">
              <GalleryFigure
                image={images[0]}
                className="rotate-3 md:translate-x-3 md:-translate-y-12 md:-rotate-8"
                sizes="(min-width: 1280px) 11.875rem, (min-width: 768px) 16.67vw, 33vw"
              />
            </div>

            <div className="col-span-8 flex md:col-span-3 md:flex-col">
              <div className="mr-2 w-1/2 sm:mr-3 md:mr-0 md:w-full">
                <GalleryFigure
                  image={images[1]}
                  className="-rotate-3 md:-rotate-8"
                  sizes="(min-width: 1280px) 17.875rem, (min-width: 768px) 25vw, 33vw"
                />
              </div>
              <div className="relative ml-2 w-1/2 sm:ml-3 md:ml-6">
                <GalleryFigure
                  image={images[2]}
                  className="rotate-3 md:rotate-8"
                  sizes="(min-width: 1280px) 9rem, (min-width: 768px) 12.5vw, 33vw"
                />
              </div>
            </div>

            <div className="col-span-4 md:col-span-4 md:pr-4">
              <GalleryFigure
                image={images[3]}
                className="-rotate-3 md:rotate-4"
                sizes="(min-width: 1280px) 22.5rem, 33vw"
              />
            </div>

            <div className="col-span-8 flex md:col-span-3 md:translate-y-12 md:flex-col md:pr-3">
              <div className="mr-2 w-1/2 sm:mr-3 md:mr-0 md:w-full">
                <GalleryFigure
                  image={images[4]}
                  className="rotate-3 md:rotate-12"
                  sizes="(min-width: 1280px) 17.875rem, (min-width: 768px) 25vw, 33vw"
                />
              </div>
              <div className="relative ml-2 w-1/2 sm:ml-3 md:-ml-3 md:w-2/3 lg:-ml-6">
                <GalleryFigure
                  image={images[5]}
                  figureClassName="md:-translate-y-6"
                  className="-rotate-3 md:-rotate-8"
                  sizes="(min-width: 1280px) 11.375rem, (min-width: 768px) 16.67vw, 33vw"
                />
              </div>
            </div>
          </div>
        </LightGallery>
      </div>
    </section>
  );
}

function GalleryFigure({
  image,
  className,
  figureClassName,
  sizes,
}: {
  image: (typeof images)[number];
  className: string;
  figureClassName?: string;
  sizes: string;
}) {
  return (
    <figure
      className={`group relative aspect-square w-full cursor-pointer hover:z-50 ${figureClassName ?? ""}`}
      data-src={image.src}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={`absolute inset-0 rounded-2xl object-cover object-center shadow-2xl duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-0 ${className}`}
        sizes={sizes}
      />
    </figure>
  );
}
