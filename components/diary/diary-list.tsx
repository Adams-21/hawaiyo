import Link from "next/link";

import type { Diary } from "@/lib/diary/types";

import { VisibilityBadge } from "./visibility-badge";

const dateFormatter = new Intl.DateTimeFormat("id-ID", { dateStyle: "long" });

export function DiaryList({ diaries }: { diaries: Diary[] }) {
  if (diaries.length === 0) {
    return (
      <p className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Belum ada diary. Mulai menulis lewat tombol Tulis Baru di atas.
      </p>
    );
  }

  return (
    <ul className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
      {diaries.map((diary) => (
        <li key={diary.id}>
          <Link
            href={`/diary/${diary.id}`}
            className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
          >
            <div className="min-w-0">
              <h2 className="truncate text-base font-medium text-zinc-900 dark:text-zinc-100">
                {diary.title}
              </h2>
              <time
                dateTime={diary.createdAt.toISOString()}
                className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400"
              >
                {dateFormatter.format(diary.createdAt)}
              </time>
            </div>
            <VisibilityBadge visibility={diary.visibility} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
