import clsx from "clsx";

export function MenuIcon({ open }: { open: boolean }) {
  return (
    <>
      <span
        className={clsx(
          "absolute block h-1 rotate-0 transform rounded-full opacity-100 transition-all duration-300 ease-in-out",
          open
            ? "top-2 left-1/2 w-0 bg-purple-50 group-hover:bg-white"
            : "top-0 left-0 w-full bg-purple-900 group-hover:bg-purple-600",
        )}
      />
      <span
        className={clsx(
          "absolute top-2 left-0 block h-1 w-full transform rounded-full opacity-100 transition-all duration-300 ease-in-out",
          open
            ? "rotate-45 bg-purple-50 group-hover:bg-white"
            : "rotate-0 bg-purple-900 group-hover:bg-purple-600",
        )}
      />
      <span
        className={clsx(
          "absolute top-2 left-0 block h-1 w-full transform rounded-full opacity-100 transition-all duration-300 ease-in-out",
          open
            ? "-rotate-45 bg-purple-50 group-hover:bg-white"
            : "rotate-0 bg-purple-900 group-hover:bg-purple-600",
        )}
      />
      <span
        className={clsx(
          "absolute block h-1 rotate-0 transform rounded-full opacity-100 transition-all duration-300 ease-in-out",
          open
            ? "top-2 left-1/2 w-0 bg-purple-50 group-hover:bg-white"
            : "top-4 left-0 w-full bg-purple-900 group-hover:bg-purple-600",
        )}
      />
    </>
  );
}
