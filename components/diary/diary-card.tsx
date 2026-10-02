import { CalendarDays } from "lucide-react";
import Link from "next/link";

import { StatusBadge, VisibilityBadge } from "@/components/diary/diary-badges";
import { MOOD_META } from "@/lib/diary/meta";
import type { DiaryEntry } from "@/lib/diary/types";
import { excerpt, formatDate } from "@/lib/diary/utils";

export function DiaryCard({ entry }: { entry: DiaryEntry }) {
  const mood = MOOD_META[entry.mood];

  return (
    <article className="group relative rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span aria-hidden>{mood.emoji}</span>
            <span>{mood.label}</span>
            <span aria-hidden>·</span>
            <CalendarDays className="size-3" aria-hidden />
            <time dateTime={entry.createdAt}>{formatDate(entry.createdAt)}</time>
          </div>

          <h3 className="mt-2 truncate text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            <Link
              href={`/diary/${entry.id}`}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {entry.title}
            </Link>
          </h3>
        </div>

        <div className="relative z-10 flex shrink-0 flex-col items-end gap-1.5">
          <VisibilityBadge visibility={entry.visibility} />
          {entry.status === "draft" ? <StatusBadge status={entry.status} /> : null}
        </div>
      </div>

      <p className="relative mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {excerpt(entry.content)}
      </p>

      {entry.tags.length > 0 ? (
        <ul className="relative mt-4 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              #{tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}