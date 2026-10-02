import type { Metadata } from "next";

import { DiaryForm } from "@/components/diary/diary-form";
import { resolveCurrentUser } from "@/lib/auth";
import { tryGetDiaryRepository } from "@/lib/diary/repository";

export const metadata: Metadata = {
  title: "Tulis Diary Baru",
};

export default async function NewDiaryPage() {
  const repository = tryGetDiaryRepository();
  const currentUser = await resolveCurrentUser();

  // Form tetap dirender agar editor dapat dicoba; pemberitahuan ini membuat
  // jelas bahwa penyimpanan belum aktif sampai boundary tersambung.
  let persistenceNotice: string | undefined;
  if (!repository) {
    persistenceNotice =
      "Penyimpanan belum aktif: database belum tersambung (lib/diary/repository.ts). Form dapat dicoba, tetapi isi diary tidak akan tersimpan.";
  } else if (currentUser.status === "unavailable") {
    persistenceNotice =
      "Penyimpanan belum aktif: autentikasi belum tersambung (lib/auth.ts). Form dapat dicoba, tetapi isi diary tidak akan tersimpan.";
  } else if (currentUser.status === "anonymous") {
    persistenceNotice =
      "Anda belum masuk. Form dapat dicoba, tetapi isi diary tidak akan tersimpan.";
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Tulis Diary Baru
      </h1>
      <div className="mt-6">
        <DiaryForm mode="create" persistenceNotice={persistenceNotice} />
      </div>
    </main>
  );
}
