import { Button } from "@/components/common/button/Button";
import { Icon } from "@/components/common/icon/Icon";
import { LATEST_GALLERY_YEAR } from "@/lib/gallery-years";

export function HeroText() {
  return (
    <div className="flex flex-col items-center justify-center lg:col-span-6 lg:items-start">
      <h1 className="h1 max-w-xl text-center text-purple-900 lg:max-w-none lg:text-left">
        하누리 봉사회
      </h1>

      <p className="mt-4 max-w-xl text-center text-lg leading-relaxed text-purple-800 sm:text-xl lg:text-left">
        이웃을 사랑하는 마음으로, 도움이 필요한 곳에 따뜻한 손길을 전합니다.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <Button href="/about" variant="primary" size="lg">
          소개글
          <Icon
            icon="arrowNarrowRight"
            className="group-hover:animate-horizontal-bounce h-6 w-6"
            stroke={2}
          />
        </Button>

        <Button
          href={`/gallery/${LATEST_GALLERY_YEAR}`}
          variant="secondary"
          size="lg"
        >
          <Icon
            icon="playFilled"
            className="h-6 w-6 text-purple-600 duration-300 group-hover:text-purple-50"
          />
          갤러리
        </Button>
      </div>
    </div>
  );
}
