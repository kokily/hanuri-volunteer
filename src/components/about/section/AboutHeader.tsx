import Image from "next/image";

export function AboutHeader() {
  return (
    <div className="px-4 text-center sm:px-6 lg:px-8">
      <h1 className="h2 text-purple-900">
        <span className="relative block">
          <span className="relative">
            {/* 장식용 밑줄 SVG — 의미 없는 이미지라 alt 비움 */}
            <Image
              className="absolute inset-x-0 top-0 h-auto w-auto translate-y-9 sm:translate-y-10 xl:translate-y-12"
              src="/svg/under_highlight.svg"
              alt=""
              width={320}
              height={24}
              aria-hidden
            />
            <span className="relative">하누리 봉사회를</span>
          </span>
        </span>
        <span className="h2 block pt-5 text-purple-800">소개합니다!</span>
      </h1>
    </div>
  );
}
