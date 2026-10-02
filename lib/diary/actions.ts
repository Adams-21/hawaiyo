"use server";

import { revalidatePath } from "next/cache";

import {
  AuthNotConfiguredError,
  getCurrentUser,
  type SessionUser,
} from "@/lib/auth";
import {
  DiaryRepositoryNotConfiguredError,
  getDiaryRepository,
  type DiaryRepository,
} from "@/lib/diary/repository";
import {
  validateDiaryInput,
  type DiaryFieldErrors,
} from "@/lib/diary/validation";

export type DiaryActionResult =
  | { ok: true; diaryId?: string }
  | {
      ok: false;
      error: "validation" | "unavailable" | "not-found";
      message: string;
      fieldErrors?: DiaryFieldErrors;
    };

type Backend =
  | { ok: true; user: SessionUser; repository: DiaryRepository }
  | { ok: false; message: string };

/**
 * Menyelesaikan kedua boundary (auth + database). Mengembalikan pesan yang
 * jujur ke UI alih-alih berpura-pura berhasil bila integrasi belum tersedia.
 */
async function resolveBackend(): Promise<Backend> {
  let user: SessionUser | null;
  try {
    user = await getCurrentUser();
  } catch (error) {
    if (error instanceof AuthNotConfiguredError) {
      return {
        ok: false,
        message:
          "Autentikasi belum tersambung, diary tidak disimpan. " +
          "Integrasikan sistem autentikasi tim di lib/auth.ts.",
      };
    }
    throw error;
  }
  if (!user) {
    return {
      ok: false,
      message: "Anda harus masuk untuk mengelola diary.",
    };
  }

  try {
    return { ok: true, user, repository: getDiaryRepository() };
  } catch (error) {
    if (error instanceof DiaryRepositoryNotConfiguredError) {
      return {
        ok: false,
        message:
          "Database belum tersambung, diary tidak disimpan. " +
          "Implementasikan DiaryRepository di lib/diary/repository.ts.",
      };
    }
    throw error;
  }
}

export async function createDiaryAction(
  rawInput: unknown,
): Promise<DiaryActionResult> {
  const backend = await resolveBackend();
  if (!backend.ok) {
    return { ok: false, error: "unavailable", message: backend.message };
  }

  const parsed = validateDiaryInput(rawInput);
  if (!parsed.ok) {
    return {
      ok: false,
      error: "validation",
      message: "Periksa kembali isian Anda.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const diary = await backend.repository.create(backend.user.id, parsed.input);
  revalidatePath("/diary");
  return { ok: true, diaryId: diary.id };
}

export async function updateDiaryAction(
  id: string,
  rawInput: unknown,
): Promise<DiaryActionResult> {
  const backend = await resolveBackend();
  if (!backend.ok) {
    return { ok: false, error: "unavailable", message: backend.message };
  }

  if (typeof id !== "string" || id.length === 0) {
    return {
      ok: false,
      error: "not-found",
      message: "Diary tidak ditemukan.",
    };
  }

  const parsed = validateDiaryInput(rawInput);
  if (!parsed.ok) {
    return {
      ok: false,
      error: "validation",
      message: "Periksa kembali isian Anda.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  // AUTHORIZATION: `backend.user.id` diteruskan ke repository; implementasi DB
  // WAJIB hanya memperbarui baris milik user ini (lihat lib/diary/repository.ts,
  // serta RLS/private space protection pada Fase 3).
  const diary = await backend.repository.update(
    id,
    backend.user.id,
    parsed.input,
  );
  if (!diary) {
    return {
      ok: false,
      error: "not-found",
      message: "Diary tidak ditemukan atau Anda tidak memiliki akses.",
    };
  }

  revalidatePath("/diary");
  revalidatePath(`/diary/${id}`);
  return { ok: true, diaryId: diary.id };
}

export async function deleteDiaryAction(
  id: string,
): Promise<DiaryActionResult> {
  const backend = await resolveBackend();
  if (!backend.ok) {
    return { ok: false, error: "unavailable", message: backend.message };
  }

  if (typeof id !== "string" || id.length === 0) {
    return {
      ok: false,
      error: "not-found",
      message: "Diary tidak ditemukan.",
    };
  }

  // AUTHORIZATION: sama seperti update — kepemilikan ditegakkan di lapisan DB.
  const deleted = await backend.repository.delete(id, backend.user.id);
  if (!deleted) {
    return {
      ok: false,
      error: "not-found",
      message: "Diary tidak ditemukan atau Anda tidak memiliki akses.",
    };
  }

  revalidatePath("/diary");
  return { ok: true };
}
