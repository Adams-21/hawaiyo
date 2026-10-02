"use client";

import type { JSONContent } from "@tiptap/core";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";

import { diaryEditorExtensions } from "@/lib/diary/extensions";

interface DiaryEditorProps {
  initialContent: JSONContent;
  onChange: (content: JSONContent) => void;
}

interface ToolbarButtonProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={`rounded px-2 py-1 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
          : "text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-700"
      }`}
    >
      {children}
    </button>
  );
}

export function DiaryEditor({ initialContent, onChange }: DiaryEditorProps) {
  const editor = useEditor({
    extensions: diaryEditorExtensions,
    content: initialContent,
    // Wajib untuk SSR Next.js: editor hanya diinisialisasi di client.
    immediatelyRender: false,
    onUpdate: ({ editor: instance }) => {
      onChange(instance.getJSON());
    },
    editorProps: {
      attributes: {
        class: "diary-content min-h-64 px-4 py-3 focus:outline-none",
        role: "textbox",
        "aria-multiline": "true",
        "aria-label": "Isi diary",
      },
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor: instance }) => {
      if (!instance) {
        return null;
      }
      return {
        bold: instance.isActive("bold"),
        italic: instance.isActive("italic"),
        heading1: instance.isActive("heading", { level: 1 }),
        heading2: instance.isActive("heading", { level: 2 }),
        heading3: instance.isActive("heading", { level: 3 }),
        bulletList: instance.isActive("bulletList"),
        orderedList: instance.isActive("orderedList"),
        link: instance.isActive("link"),
      };
    },
  });

  function handleLink() {
    if (!editor) {
      return;
    }
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url = window.prompt("Masukkan URL tautan:", "https://");
    if (!url) {
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  const ready = editor !== null;

  return (
    <div className="overflow-hidden rounded-md border border-zinc-300 bg-white focus-within:border-zinc-500 focus-within:ring-1 focus-within:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:border-zinc-400 dark:focus-within:ring-zinc-400">
      <div
        role="toolbar"
        aria-label="Format teks"
        className="flex flex-wrap items-center gap-1 border-b border-zinc-200 px-2 py-1.5 dark:border-zinc-800"
      >
        <ToolbarButton
          label="Tebal"
          active={editorState?.bold}
          disabled={!ready}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <span className="font-bold">B</span>
        </ToolbarButton>
        <ToolbarButton
          label="Miring"
          active={editorState?.italic}
          disabled={!ready}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <span className="italic">I</span>
        </ToolbarButton>

        <span
          aria-hidden="true"
          className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-700"
        />

        <ToolbarButton
          label="Judul 1"
          active={editorState?.heading1}
          disabled={!ready}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          label="Judul 2"
          active={editorState?.heading2}
          disabled={!ready}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          label="Judul 3"
          active={editorState?.heading3}
          disabled={!ready}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </ToolbarButton>

        <span
          aria-hidden="true"
          className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-700"
        />

        <ToolbarButton
          label="Daftar berpoin"
          active={editorState?.bulletList}
          disabled={!ready}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          label="Daftar bernomor"
          active={editorState?.orderedList}
          disabled={!ready}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </ToolbarButton>

        <span
          aria-hidden="true"
          className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-700"
        />

        <ToolbarButton
          label={editorState?.link ? "Hapus tautan" : "Tambah tautan"}
          active={editorState?.link}
          disabled={!ready}
          onClick={handleLink}
        >
          Tautan
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
