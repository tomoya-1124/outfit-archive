import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" };

export default function Button({ variant = "primary", className = "", ...props }: Props) {
  const style =
    variant === "primary"
      ? "bg-white text-black hover:opacity-80"
      : variant === "danger"
        ? "bg-red-500 text-white hover:bg-red-600"
        : "border border-white/20 text-white hover:bg-white/10";

  return (
    <button
      className={`rounded-full px-4 py-2 text-sm transition ${style} ${className}`}
      {...props}
    />
  );
}
