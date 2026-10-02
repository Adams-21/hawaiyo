"use client";

import { useMemo, useState } from "react";

import { DiaryCard } from "@/components/diary/diary-card";
import { FILTER_META } from "@/lib/diary/meta";
import type { DiaryEntry, DiaryFilter } from "@/lib/diary/types";
import { DIARY_FILTERS } from "@/lib/diary/types";
import { countByFilter, matchesFilter } from "@/lib/diary/utils";
import { cn } from "@/lib/utils";

interface DiaryListProps {
  entries: DiaryEntry[];
}

export function DiaryList({ entries }: DiaryListProps) {
  const [filter, setFilter] = useState<DiaryFilter>("all");

  const counts = useMemo(() => countByFilter(entries), [entries]);
  const visible = useMemo(
    () => entries.filter((entry) => matchesFilter(entry, filter)),
    [entries, filter],
  );

  return (
    <div className="space-y-5">
      <div
        role="tablist"
        aria-label="Filter diary"
        className="flex flex-wrap gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800"
      >
        {DIARY_FILTERS.map((value) => {
          const selected = value === filter;

          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                "focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none",
                selected
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
              )}
            >
              {FILTER_META[value].label}
              <span className="ml-1.5 text-xs opacity-60">{counts[value]}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-12 text-center dark:border-zinc-700">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Belum ada diary di tab ini.
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Ganti filter lain atau buat diary baru.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {visible.map((entry) => (
            <li key={entry.id}>
              <DiaryCard entry={entry} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}