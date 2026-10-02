import type { JSONContent } from "@tiptap/core";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";

import { diaryEditorExtensions } from "@/lib/diary/extensions";

/**
 * Renderer read-only untuk konten diary (TipTap JSON).
 *
 * Memakai static renderer resmi TipTap yang menghasilkan React element murni
 * — TANPA `dangerouslySetInnerHTML` — sehingga aman untuk konten buatan user
 * dan dapat dirender di Server Component.
 */
export function DiaryContent({ content }: { content: JSONContent }) {
  const rendered = renderToReactElement({
    content,
    extensions: diaryEditorExtensions,
  });

  return <div className="diary-content">{rendered}</div>;
}
