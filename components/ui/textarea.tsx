import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm leading-relaxed text-zinc-900",
        "placeholder:text-zinc-400",
        "focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 focus:outline-none",
        "disabled:cursor-not-allowed disabled:bg-zinc-50",
        "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500",
        "dark:focus:border-zinc-500 dark:focus:ring-zinc-800",
        className,
      )}
      {...props}
    />
  );
}