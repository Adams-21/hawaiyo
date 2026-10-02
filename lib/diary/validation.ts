import type { JSONContent } from "@tiptap/core";

import {
  DIARY_VISIBILITIES,
  type DiaryInput,
  type DiaryVisibility,
} from "./types";

export const DIARY_TITLE_MAX_LENGTH = 200;

export interface DiaryFieldErrors {
  title?: string;
  content?: string;
  visibility?: string;
}

export type DiaryValidationResult =
  | { ok: true; input: DiaryInput }
  | { ok: false; fieldErrors: DiaryFieldErrors };

/** Memeriksa apakah dokumen TipTap memiliki minimal satu teks non-kosong. */
function hasText(node: JSONContent): boolean {
  if (typeof node.text === "string" && node.text.trim().length > 0) {
    return true;
  }
  return Array.isArray(node.content) && node.content.some(hasText);
}

/**
 * Validasi payload diary dari client. Murni (tanpa I/O), sehingga aman dipakai
 * baik di server action maupun di client component untuk umpan balik instan.
 */
export function validateDiaryInput(raw: unknown): DiaryValidationResult {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, fieldErrors: { title: "Data diary tidak valid." } };
  }

  const { title, content, visibility } = raw as Record<string, unknown>;
  const fieldErrors: DiaryFieldErrors = {};

  const normalizedTitle = typeof title === "string" ? title.trim() : "";
  if (normalizedTitle.length === 0) {
    fieldErrors.title = "Judul wajib diisi.";
  } else if (normalizedTitle.length > DIARY_TITLE_MAX_LENGTH) {
    fieldErrors.title = `Judul maksimal ${DIARY_TITLE_MAX_LENGTH} karakter.`;
  }

  const contentDoc = content as JSONContent | null | undefined;
  if (
    typeof contentDoc !== "object" ||
    contentDoc === null ||
    contentDoc.type !== "doc" ||
    !hasText(contentDoc)
  ) {
    fieldErrors.content = "Isi diary wajib diisi.";
  }

  if (
    typeof visibility !== "string" ||
    !DIARY_VISIBILITIES.includes(visibility as DiaryVisibility)
  ) {
    fieldErrors.visibility = "Visibilitas tidak valid.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    input: {
      title: normalizedTitle,
      content: contentDoc as JSONContent,
      visibility: visibility as DiaryVisibility,
    },
  };
}
