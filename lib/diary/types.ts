import type { JSONContent } from "@tiptap/core";

/**
 * Nilai visibilitas diary yang valid.
 * - `public`  : dapat dibaca semua orang (aturan detail: lihat TODO authorization)
 * - `private` : hanya dapat dibaca pemiliknya
 */
export const DIARY_VISIBILITIES = ["public", "private"] as const;

export type DiaryVisibility = (typeof DIARY_VISIBILITIES)[number];

/** Label UI (Bahasa Indonesia) untuk tiap visibilitas. */
export const DIARY_VISIBILITY_LABELS: Record<DiaryVisibility, string> = {
  public: "Publik",
  private: "Privat",
};

export interface Diary {
  id: string;
  userId: string;
  title: string;
  /** Konten rich text dalam format TipTap/ProseMirror JSON. */
  content: JSONContent;
  visibility: DiaryVisibility;
  createdAt: Date;
  updatedAt: Date;
}

/** Payload untuk membuat atau memperbarui diary. */
export interface DiaryInput {
  title: string;
  content: JSONContent;
  visibility: DiaryVisibility;
}

/** Dokumen TipTap kosong, dipakai sebagai nilai awal editor. */
export const EMPTY_DIARY_CONTENT: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};
