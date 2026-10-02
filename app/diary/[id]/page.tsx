import { ArrowLeft, CalendarDays, Pencil } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { StatusBadge, VisibilityBadge } from "@/components/diary/diary-badges";
import { Button } from "@/components/ui/button";
import { getMockDiaryEntry } from "@/lib/diary/mock";
import { MOOD_META } from "@/lib/diary/meta";
import { formatDateTime } from "@/lib/diary/utils";

export async function generateMetadata(
  props: PageProps<"/diary/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const entry = getMockDiaryEntry(id);

  return {
    title: entry ? entry.title : "Diary tidak ditemukan",
  };
}

export default async function DiaryDetailPage(props: PageProps<"/diary/[id]">) {
  const { id } = await props.params;
  const entry = getMockDiaryEntry(id);

  if (!entry) {
    return (
      <div className="space-y-4 rounded-2xl border border-dashed border-zinc-300 px-6 py-12 text-center dark:border-zinc-700">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Diary tidak ditemukan
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Tidak ada diary dengan id <code className="font-mono">{id}</code>.
        </p>
        <Link
          href="/diary"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Kembali ke daftar
        </Link>
      </div>
    );
  }

  const mood = MOOD_META[entry.mood];
  const paragraphs = entry.content.split(/\n{2,}/);

  return (
    <article className="space-y-6">
      <Link
        href="/diary"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Semua diary
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <VisibilityBadge visibility={entry.visibility} />
          <StatusBadge status={entry.status} />
          <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <span aria-hidden>{mood.emoji}</span>
            {mood.label}
          </span>
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {entry.title}
        </h2>

        <p className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          <CalendarDays className="size-4" aria-hidden />
          <span>
            Dibuat {formatDateTime(entry.createdAt)} · Diperbarui{" "}
            {formatDateTime(entry.updatedAt)}
          </span>
        </p>
      </header>

      <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="leading-relaxed whitespace-pre-line text-zinc-700 dark:text-zinc-300"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {entry.tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              #{tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-5 dark:border-zinc-800">
        <Link
          href={`/diary/${entry.id}/edit`}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          <Pencil className="size-4" aria-hidden />
          Edit diary
        </Link>
        <Button variant="outline" disabled title="Segera hadir">
          Bagikan
        </Button>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Halaman baca dummy: aksi Bagikan belum terhubung.
      </p>
    </article>
  );
}