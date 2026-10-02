import type { Metadata } from "next";
import Link from "next/link";

import { DiaryForm } from "@/components/diary/diary-form";
import { createEmptyDiary } from "@/lib/diary/utils";

export const metadata: Metadata = {
  title: "Tulis diary baru",
};

export default function CreateDiaryPage() {
  const empty = createEmptyDiary();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Diary Baru
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Isi dulu, simpan sebagai draft, publish nanti kalau sudah siap.
        </p>
      </div>

      <DiaryForm
        mode="create"
        cancelHref="/diary"
        initialValues={{
          title: empty.title,
          content: empty.content,
          mood: empty.mood,
          visibility: empty.visibility,
          status: empty.status,
          tags: empty.tags,
        }}
      />

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Form ini masih placeholder, belum menyimpan ke database.{" "}
        <Link href="/diary" className="underline underline-offset-4">
          Kembali ke daftar diary
        </Link>
      </p>
    </div>
  );
}