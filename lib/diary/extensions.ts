import StarterKit from "@tiptap/starter-kit";

/**
 * Extensions TipTap yang dipakai bersama oleh:
 *   - editor interaktif  (components/diary/diary-editor.tsx, client)
 *   - renderer read-only (components/diary/diary-content.tsx, server)
 *
 * Selalu ambil dari modul ini agar skema editor dan renderer tidak berbeda.
 *
 * StarterKit v3 sudah mencakup: paragraph, heading, bold, italic, bulletList,
 * orderedList, dan link (serta blockquote, code, strike, undo-redo, dll).
 * Heading dibatasi ke level 1-3 sesuai kebutuhan fitur.
 */
export const diaryEditorExtensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
  }),
];
