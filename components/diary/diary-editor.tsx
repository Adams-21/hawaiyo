"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";

interface DiaryEditorProps {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function DiaryEditor({
  value,
  onChange,
  className = "",
}: DiaryEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[280px] w-full rounded-b-md border border-t-0 border-zinc-200 dark:border-zinc-800 p-4 focus:outline-none prose max-w-none dark:prose-invert bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100",
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  // Sinkronisasi data saat value dari parent berubah (misal saat edit data terisi)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="h-72 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 animate-pulse text-sm text-zinc-500">
        Memuat Rich Text Editor...
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Toolbar Tombol Format */}
      <div className="flex flex-wrap items-center gap-1 p-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-t-md">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 ${
            editor.isActive("bold")
              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 ${
            editor.isActive("italic")
              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 ${
            editor.isActive("strike")
              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-zinc-300 dark:bg-zinc-700 my-auto mx-1" />

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-1.5 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 ${
            editor.isActive("heading", { level: 1 })
              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
          title="Judul Utama (H1)"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-1.5 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 ${
            editor.isActive("heading", { level: 2 })
              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
          title="Sub Judul (H2)"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-zinc-300 dark:bg-zinc-700 my-auto mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 ${
            editor.isActive("bulletList")
              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 ${
            editor.isActive("orderedList")
              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 ${
            editor.isActive("blockquote")
              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
      </div>

      {/* Area Teks Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}