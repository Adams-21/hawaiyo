import type {
  DiaryFilter,
  DiaryMood,
  DiaryStatus,
  DiaryVisibility,
} from "./types";

export const MOOD_META: Record<
  DiaryMood,
  { label: string; emoji: string; chip: string; dot: string }
> = {
  happy: {
    label: "Bahagia",
    emoji: "😊",
    chip: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-400",
  },
  grateful: {
    label: "Bersyukur",
    emoji: "🙏",
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-400",
  },
  calm: {
    label: "Tenang",
    emoji: "😌",
    chip: "bg-sky-50 text-sky-700 ring-sky-200",
    dot: "bg-sky-400",
  },
  neutral: {
    label: "Biasa saja",
    emoji: "😐",
    chip: "bg-zinc-50 text-zinc-700 ring-zinc-200",
    dot: "bg-zinc-400",
  },
  sad: {
    label: "Sedih",
    emoji: "😔",
    chip: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    dot: "bg-indigo-400",
  },
  angry: {
    label: "Marah",
    emoji: "😠",
    chip: "bg-rose-50 text-rose-700 ring-rose-200",
    dot: "bg-rose-400",
  },
};

export const VISIBILITY_META: Record<
  DiaryVisibility,
  { label: string; description: string; chip: string }
> = {
  public: {
    label: "Public",
    description: "Bisa dibaca siapa saja yang punya tautannya.",
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  private: {
    label: "Private",
    description: "Hanya kamu yang bisa membaca diary ini.",
    chip: "bg-zinc-100 text-zinc-700 ring-zinc-300",
  },
};

export const STATUS_META: Record<
  DiaryStatus,
  { label: string; description: string; chip: string }
> = {
  draft: {
    label: "Draft",
    description: "Belum dipublikasikan, masih bisa kamu edit.",
    chip: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  published: {
    label: "Publish",
    description: "Sudah tayang untuk publik.",
    chip: "bg-sky-50 text-sky-700 ring-sky-200",
  },
};

export const FILTER_META: Record<DiaryFilter, { label: string }> = {
  all: { label: "All" },
  public: { label: "Public" },
  private: { label: "Private" },
  draft: { label: "Draft" },
};