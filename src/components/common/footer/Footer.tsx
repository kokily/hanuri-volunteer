import clsx from "clsx";
import { Icon } from "@/components/common/icon/Icon";

export function Footer() {
  return (
    <footer
      className={clsx(
        "mt-14 space-y-8 divide-y bg-yellow-100 px-4 pt-0",
        "divide-purple-400/20 sm:px-6 sm:pt-5 lg:px-8",
      )}
    >
      <div
        className={clsx(
          "mx-auto flex max-w-md flex-col justify-between py-8",
          "sm:max-w-none sm:flex-row lg:max-w-screen-2xl",
        )}
      >
        <span className="text-base text-purple-800/90">
          © {new Date().getFullYear()} 하누리봉사회. All rights reserved.
        </span>
        <p className="mt-0.5 flex items-center text-purple-800/90">
          고유번호 396-80-02560
        </p>
        <p className="mt-0.5 flex items-center text-purple-800/90">
          Made with
          <Icon icon="heart" className="mx-1 h-5 w-5" />
          <span>by D&amp;K Dreams</span>
        </p>
      </div>
    </footer>
  );
}
