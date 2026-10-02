"use client";

import { X } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { normalizeTags } from "@/lib/diary/utils";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({
  value,
  onChange,
  placeholder = "Tambah tag lalu tekan Enter",
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  function commit() {
    const [next] = normalizeTags([...value, draft]);
    if (!next) {
      setDraft("");
      return;
    }
    onChange(normalizeTags([...value, next]));
    setDraft("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commit();
    }
  }

  function remove(tag: string) {
    onChange(value.filter((item) => item !== tag));
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          placeholder={placeholder}
          aria-label="Tag baru"
        />
        <Button variant="secondary" onClick={commit}>
          Tambah
        </Button>
      </div>

      {value.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <li
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-zinc-100 py-1 pr-1 pl-3 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              #{tag}
              <button
                type="button"
                onClick={() => remove(tag)}
                aria-label={`Hapus tag ${tag}`}
                className="rounded-full p-0.5 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
              >
                <X className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Belum ada tag.
        </p>
      )}
    </div>
  );
}