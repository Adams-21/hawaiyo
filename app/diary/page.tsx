import type { Metadata } from "next";
import Link from "next/link";

import { DiaryList } from "@/components/diary/diary-list";
import {
  AuthIntegrationNotice,
  DatabaseIntegrationNotice,
} from "@/components/diary/integration-notice";
import { resolveCurrentUser } from "@/lib/auth";
import { tryGetDiaryRepository } from "@/lib/diary/repository";

export const metadata: Metadata = {
  title: "Diary Saya",
};

export default async function DiaryListPage() {
  const repository = tryGetDiaryRepository();

  let content: React.ReactNode;
  if (!repository) {
    content = <DatabaseIntegrationNotice />;
  } else {
    const currentUser = await resolveCurrentUser();
    if (currentUser.status === "unavailable") {
      content = <AuthIntegrationNotice />;
    } else if (currentUser.status === "anonymous") {
      content = (
        <p className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Silakan masuk untuk melihat diary Anda.
        </p>
      );
    } else {
      const diaries = await repository.findManyByUserId(currentUser.user.id);
      content = <DiaryList diaries={diaries} />;
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Diary Saya
        </h1>
        <Link
          href="/diary/new"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:opacity-85"
        >
          Tulis Baru
        </Link>
      </header>

      <div className="mt-6">{content}</div>
    </main>
  );
}
