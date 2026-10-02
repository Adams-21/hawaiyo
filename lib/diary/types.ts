export const DIARY_VISIBILITIES = ["public", "private"] as const;
export type DiaryVisibility = (typeof DIARY_VISIBILITIES)[number];

export const DIARY_STATUSES = ["draft", "published"] as const;
export type DiaryStatus = (typeof DIARY_STATUSES)[number];

export const DIARY_MOODS = [
  "happy",
  "grateful",
  "calm",
  "neutral",
  "sad",
  "angry",
] as const;
export type DiaryMood = (typeof DIARY_MOODS)[number];

export const DIARY_FILTERS = ["all", "public", "private", "draft"] as const;
export type DiaryFilter = (typeof DIARY_FILTERS)[number];

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  mood: DiaryMood;
  visibility: DiaryVisibility;
  status: DiaryStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type DiaryFormValues = Pick<
  DiaryEntry,
  "title" | "content" | "mood" | "visibility" | "status" | "tags"
>;

export type DiaryDraftInput = DiaryFormValues;