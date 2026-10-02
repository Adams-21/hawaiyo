"use client";

import { MOOD_META } from "@/lib/diary/meta";
import { DIARY_MOODS, type DiaryMood } from "@/lib/diary/types";
import { cn } from "@/lib/utils";

interface MoodPickerProps {
  value: DiaryMood;
  onChange: (mood: DiaryMood) => void;
}

export function MoodPicker({ value, onChange }: MoodPickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Pilih mood"
      className="grid grid-cols-3 gap-2 sm:grid-cols-6"
    >
      {DIARY_MOODS.map((mood) => {
        const meta = MOOD_META[mood];
        const selected = mood === value;

        return (
          <button
            key={mood}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(mood)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-xs font-medium transition-colors",
              "focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none",
              selected
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800",
            )}
          >
            <span aria-hidden className="text-lg">
              {meta.emoji}
            </span>
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}