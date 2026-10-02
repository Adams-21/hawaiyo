"use client";

import { FileText, Globe, Lock, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ChoiceGroup } from "@/components/diary/choice-group";
import { DiaryEditor } from "@/components/diary/diary-editor";
import { MoodPicker } from "@/components/diary/mood-picker";
import { TagInput } from "@/components/diary/tag-input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { STATUS_META, VISIBILITY_META } from "@/lib/diary/meta";
import type {
  DiaryFormValues,
  DiaryStatus,
  DiaryVisibility,
} from "@/lib/diary/types";

interface DiaryFormProps {
  mode: "create" | "edit";
  initialValues: DiaryFormValues;
  cancelHref: string;
  onSubmit?: (values: DiaryFormValues) => void;
}

export function DiaryForm({
  mode,
  initialValues,
  cancelHref,
  onSubmit,
}: DiaryFormProps) {
  const [values, setValues] = useState<DiaryFormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof DiaryFormValues, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof DiaryFormValues>(
    key: K,
    value: DiaryFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof DiaryFormValues, string>> = {};
    if (!values.title.trim()) {
      nextErrors.title = "Judul diary wajib diisi.";
    }
    if (!values.content.trim()) {
      nextErrors.content = "Isi diary tidak boleh kosong.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (onSubmit) {
      onSubmit(values);
      return;
    }

    // Placeholder: belum ada backend, jadi data hanya dicatat di console.
    console.log(`[diary] ${mode} (belum disimpan)`, values);
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <Field label="Judul" htmlFor="title" error={errors.title}>
        <Input
          id="title"
          value={values.title}
          onChange={(event) => update("title", event.target.value)}
          placeholder="Contoh: Senja di Teras Kost"
          maxLength={120}
        />
      </Field>

      <div className="space-y-2">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Mood
        </span>
        <MoodPicker value={values.mood} onChange={(mood) => update("mood", mood)} />
      </div>

      <Field
        label="Isi diary"
        htmlFor="content"
        error={errors.content}
        hint="Bebas menulis apa saja, tidak ada batasan karakter."
      >
        <DiaryEditor
          id="content"
          value={values.content}
          onChange={(event) => update("content", event.target.value)}
        />
      </Field>

      <ChoiceGroup<DiaryVisibility>
        name="visibility"
        legend="Visibility"
        value={values.visibility}
        onChange={(visibility) => update("visibility", visibility)}
        options={[
          {
            value: "public",
            label: VISIBILITY_META.public.label,
            description: VISIBILITY_META.public.description,
            icon: <Globe className="size-4" />,
          },
          {
            value: "private",
            label: VISIBILITY_META.private.label,
            description: VISIBILITY_META.private.description,
            icon: <Lock className="size-4" />,
          },
        ]}
      />

      <ChoiceGroup<DiaryStatus>
        name="status"
        legend="Status"
        value={values.status}
        onChange={(status) => update("status", status)}
        options={[
          {
            value: "draft",
            label: STATUS_META.draft.label,
            description: STATUS_META.draft.description,
            icon: <FileText className="size-4" />,
          },
          {
            value: "published",
            label: STATUS_META.published.label,
            description: STATUS_META.published.description,
            icon: <Save className="size-4" />,
          },
        ]}
      />

      <Field
        label="Tags"
        hint="Pakai tag supaya diary mudah dicari nanti."
      >
        <TagInput value={values.tags} onChange={(tags) => update("tags", tags)} />
      </Field>

      {submitted ? (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-900">
          Data belum disimpan karena backend belum terhubung. Form ini masih
          placeholder.
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-5 dark:border-zinc-800">
        <Button type="submit" variant="primary">
          {mode === "create" ? "Simpan diary" : "Simpan perubahan"}
        </Button>
        <Link
          href={cancelHref}
          className="inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}