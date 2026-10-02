import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DeleteDiaryButton } from "@/components/diary/delete-diary-button";
import { DiaryContent } from "@/components/diary/diary-content";
import {
  AuthIntegrationNotice,
  DatabaseIntegrationNotice,
} from "@/components/diary/integration-notice";
import { VisibilityBadge } from "@/components/diary/visibility-badge";
import { resolveCurrentUser } from "@/lib/auth";
import { tryGetDiaryRepository } from "@/lib/diary/repository";

const dateFormatter = new Intl.DateTimeFormat("id-ID", { dateStyle: "long" });

export async function generateMetadata({
  params,
}: PageProps<"/diary/[id]">): Promise<Metadata> {
  const { id } = await params;
  const repository = tryGetDiaryRepository();
  if (!repository) {
    return { title: "Diary" };
  }
  const diary = await repository.findById(id);
  return { title: diary ? diary.title : "Diary tidak ditemukan" };
}

export default async function DiaryDetailPage({
  params,
}: PageProps<"/diary/[id]">) {
  const { id } = await params;
  const repository = tryGetDiaryRepository();

  if (!repository) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <DatabaseIntegrationNotice />
      </main>
    );
  }

  const diary = await repository.findById(id);
  if (!diary) {
    notFound();
  }

  const currentUser = await resolveCurrentUser();
  const isOwner =
    currentUser.status === "authenticated" &&
    currentUser.user.id === diary.userId;

  // AUTHORIZATION: diary privat hanya boleh dibaca pemiliknya. Proteksi
  // menyeluruh tetap WAJIB ditegakkan di lapisan database/RLS (Fase 3) —
  // pemeriksaan di sini hanya lapisan UI.
  if (diary.visibility === "private" && !isOwner) {
    if (currentUser.status === "unavailable") {
      // Auth belum tersambung sehingga kepemilikan tidak dapat diverifikasi.
      return (
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
          <AuthIntegrationNotice />
        </main>
      );
    }
    notFound();
  }

  const wasUpdated = diary.updatedAt.getTime() !== diary.createdAt.getTime();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <Link
        href="/diary"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        &larr; Kembali ke daftar
      </Link>

      <article className="mt-6">
        <header>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {diary.title}
            </h1>
            <VisibilityBadge visibility={diary.visibility} />
          </div>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Ditulis{" "}
            <time dateTime={diary.createdAt.toISOString()}>
              {dateFormatter.format(diary.createdAt)}
            </time>
            {wasUpdated ? (
              <>
                {" "}
                &middot; Diperbarui{" "}
                <time dateTime={diary.updatedAt.toISOString()}>
                  {dateFormatter.format(diary.updatedAt)}
                </time>
              </>
            ) : null}
          </p>
        </header>

        <div className="mt-8">
          <DiaryContent content={diary.content} />
        </div>
      </article>

      {isOwner ? (
        <div className="mt-10 flex items-center gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <Link
            href={`/diary/${diary.id}/edit`}
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Edit
          </Link>
          <DeleteDiaryButton diaryId={diary.id} diaryTitle={diary.title} />
        </div>
      ) : null}
    </main>
  );
}
