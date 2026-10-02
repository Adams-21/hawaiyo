import {
  DIARY_VISIBILITY_LABELS,
  type DiaryVisibility,
} from "@/lib/diary/types";

const BADGE_STYLES: Record<DiaryVisibility, string> = {
  public:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  private: "bg-zinc-200 text-zinc-700 dark:bg-zinc-700/60 dark:text-zinc-300",
};

export function VisibilityBadge({
  visibility,
}: {
  visibility: DiaryVisibility;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${BADGE_STYLES[visibility]}`}
    >
      {DIARY_VISIBILITY_LABELS[visibility]}
    </span>
  );
}
