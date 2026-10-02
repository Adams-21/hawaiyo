import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DiaryForm } from "@/components/diary/diary-form";
import {
  AuthIntegrationNotice,
  DatabaseIntegrationNotice,
} from "@/components/diary/integration-notice";
import { resolveCurrentUser } from "@/lib/auth";
import { tryGetDiaryRepository } from "@/lib/diary/repository";

export const metadata: Metadata = {
  title: "Edit Diary",
};

export default async function EditDiaryPage({
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

  const currentUser = await resolveCurrentUser();
  if (currentUser.status === "unavailable") {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <AuthIntegrationNotice />
      </main>
    );
  }
  if (currentUser.status === "anonymous") {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <p className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Silakan masuk untuk mengedit diary.
        </p>
      </main>
    );
  }

  const diary = await repository.findById(id);
  if (!diary) {
    notFound();
  }

  // AUTHORIZATION: hanya pemilik yang boleh mengedit. Penegakan ulang tetap
  // dilakukan di updateDiaryAction + lapisan database/RLS (Fase 3).
  if (diary.userId !== currentUser.user.id) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Edit Diary
      </h1>
      <div className="mt-6">
        <DiaryForm mode="edit" diary={diary} />
      </div>
    </main>
  );
}
