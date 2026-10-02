import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DiaryForm } from "@/components/diary/diary-form";
import { Button } from "@/components/ui/button";
import { getMockDiaryEntry } from "@/lib/diary/mock";

export async function generateMetadata(
  props: PageProps<"/diary/[id]/edit">,
): Promise<Metadata> {
  const { id } = await props.params;
  const entry = getMockDiaryEntry(id);

  return {
    title: entry ? `Edit ${entry.title}` : "Edit diary",
  };
}

export default async function EditDiaryPage(
  props: PageProps<"/diary/[id]/edit">,
) {
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
          <ArrowLeft className="size-4" aria-hidden />
          Kembali ke daftar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Edit Diary
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Perubahan belum tersimpan sampai backend-nya siap.
        </p>
      </div>

      <DiaryForm
        mode="edit"
        cancelHref={`/diary/${entry.id}`}
        initialValues={{
          title: entry.title,
          content: entry.content,
          mood: entry.mood,
          visibility: entry.visibility,
          status: entry.status,
          tags: entry.tags,
        }}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="danger" disabled title="Segera hadir">
          Hapus diary
        </Button>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Aksi hapus belum tersedia.
        </p>
      </div>
    </div>
  );
}