import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

const variantStyles = {
  primary: "bg-yellow-500 text-purple-900 hover:bg-yellow-600",
  secondary:
    "bg-purple-200 text-purple-900 hover:bg-purple-600 hover:text-white",
  accent: "bg-purple-600 text-white hover:bg-purple-500",
} as const;

const sizeStyles = {
  sm: "px-5 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
} as const;

interface Props {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
}

export function Button({
  variant = "primary",
  size = "lg",
  className,
  href,
  type = "button",
  children,
  onClick,
}: Props) {
  const classes = clsx(
    "group relative inline-flex items-center justify-center gap-3 rounded-full font-medium leading-normal outline-none duration-300 ease-in-out",
    "focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
