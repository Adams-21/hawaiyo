"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { JSONContent } from "@tiptap/core";

import {
  createDiaryAction,
  updateDiaryAction,
} from "@/lib/diary/actions";
import {
  DIARY_TITLE_MAX_LENGTH,
  validateDiaryInput,
  type DiaryFieldErrors,
} from "@/lib/diary/validation";
import {
  DIARY_VISIBILITIES,
  DIARY_VISIBILITY_LABELS,
  EMPTY_DIARY_CONTENT,
  type Diary,
  type DiaryVisibility,
} from "@/lib/diary/types";

import { DiaryEditor } from "./diary-editor";

export type DiaryFormProps = { persistenceNotice?: string } & (
  | { mode: "create" }
  | { mode: "edit"; diary: Diary }
);

export function DiaryForm(props: DiaryFormProps) {
  const router = useRouter();
  const diary = props.mode === "edit" ? props.diary : undefined;

  const [title, setTitle] = useState(diary?.title ?? "");
  const [content, setContent] = useState<JSONContent>(
    diary?.content ?? EMPTY_DIARY_CONTENT,
  );
  const [visibility, setVisibility] = useState<DiaryVisibility>(
    diary?.visibility ?? "private",
  );
  const [fieldErrors, setFieldErrors] = useState<DiaryFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const cancelHref = diary ? `/diary/${diary.id}` : "/diary";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    // Validasi sisi client untuk umpan balik instan; server action tetap
    // memvalidasi ulang payload yang sama.
    const parsed = validateDiaryInput({ title, content, visibility });
    if (!parsed.ok) {
      setFieldErrors(parsed.fieldErrors);
      return;
    }

    startTransition(async () => {
      const result =
        props.mode === "create"
          ? await createDiaryAction(parsed.input)
          : await updateDiaryAction(props.diary.id, parsed.input);

      if (result.ok) {
        router.push(result.diaryId ? `/diary/${result.diaryId}` : "/diary");
        return;
      }

      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }
      setFormError(result.message);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {props.persistenceNotice ? (
        <div
          role="status"
          className="rounded-md border border-dashed border-amber-400/70 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/40 dark:bg-amber-950/30 dark:text-amber-300"
        >
          {props.persistenceNotice}
        </div>
      ) : null}

      {formError ? (
        <div
          role="alert"
          className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
        >
          {formError}
        </div>
      ) : null}

      <div>
        <label
          htmlFor="diary-title"
          className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Judul
        </label>
        <input
          id="diary-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={DIARY_TITLE_MAX_LENGTH}
          required
          aria-invalid={fieldErrors.title ? true : undefined}
          aria-describedby={fieldErrors.title ? "diary-title-error" : undefined}
          placeholder="Judul diary Anda"
          className="mt-2 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-base text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 aria-[invalid=true]:border-red-500 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
        />
        {fieldErrors.title ? (
          <p
            id="diary-title-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {fieldErrors.title}
          </p>
        ) : null}
      </div>

      <div>
        <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Isi
        </span>
        <div className="mt-2" aria-describedby={fieldErrors.content ? "diary-content-error" : undefined}>
          <DiaryEditor initialContent={content} onChange={setContent} />
        </div>
        {fieldErrors.content ? (
          <p
            id="diary-content-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {fieldErrors.content}
          </p>
        ) : null}
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Visibilitas
        </legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {DIARY_VISIBILITIES.map((option) => {
            const checked = visibility === option;
            return (
              <label
                key={option}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-zinc-500 dark:has-[:focus-visible]:ring-zinc-400 ${
                  checked
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-300 text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
                }`}
              >
                <input
                  type="radio"
                  name="diary-visibility"
                  value={option}
                  checked={checked}
                  onChange={() => setVisibility(option)}
                  className="sr-only"
                />
                {DIARY_VISIBILITY_LABELS[option]}
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Publik: semua orang dapat membaca diary ini. Privat: hanya Anda yang
          dapat membaca.
        </p>
        {fieldErrors.visibility ? (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.visibility}
          </p>
        ) : null}
      </fieldset>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "Menyimpan…"
            : props.mode === "create"
              ? "Simpan Diary"
              : "Simpan Perubahan"}
        </button>
        <Link
          href={cancelHref}
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
