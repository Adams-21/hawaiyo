import type { Diary, DiaryInput } from "./types";

/**
 * DATABASE INTEGRATION POINT
 * ==========================
 * Tim BELUM memilih database/backend (Supabase / Prisma / PostgreSQL / dll —
 * keputusan masih pending). Fitur diary hanya bergantung pada interface ini,
 * sehingga keputusan tersebut tidak memengaruhi kode UI maupun server actions.
 *
 * CARA INTEGRASI (setelah database dipilih):
 *   1. Buat implementasi `DiaryRepository` untuk database tersebut.
 *   2. Kembalikan implementasinya dari `getDiaryRepository()` di bawah.
 *
 * AUTHORIZATION — WAJIB ditegakkan oleh implementasi (sisi server/DB):
 *   - `update` dan `delete` hanya boleh menyentuh baris milik `userId`.
 *     Kembalikan `null` / `false` bila diary tidak ada ATAU bukan milik user.
 *   - Diary `private` tidak boleh pernah dikembalikan ke non-pemilik.
 *     (Fase 3: RLS / private space protection.)
 *   - Diary `public` dapat dibaca sesuai aturan aplikasi.
 */
export interface DiaryRepository {
  /** Membuat diary baru milik `userId`. */
  create(userId: string, input: DiaryInput): Promise<Diary>;

  /** Daftar semua diary milik `userId` (urut terbaru dulu). */
  findManyByUserId(userId: string): Promise<Diary[]>;

  /**
   * Mengambil satu diary berdasarkan id.
   * Pemeriksaan visibilitas terhadap pembaca dilakukan di caller (page);
   * tetap pertahankan proteksi di lapisan DB untuk private diary (Fase 3).
   */
  findById(id: string): Promise<Diary | null>;

  /**
   * Memperbarui diary. Hanya boleh berhasil bila diary milik `userId`;
   * kembalikan `null` bila tidak ditemukan atau bukan milik user.
   */
  update(id: string, userId: string, input: DiaryInput): Promise<Diary | null>;

  /**
   * Menghapus diary. Hanya boleh berhasil bila diary milik `userId`;
   * kembalikan `false` bila tidak ditemukan atau bukan milik user.
   */
  delete(id: string, userId: string): Promise<boolean>;
}

export class DiaryRepositoryNotConfiguredError extends Error {
  readonly name = "DiaryRepositoryNotConfiguredError";

  constructor() {
    super(
      "Diary persistence is not configured yet. " +
        "Implement DiaryRepository and return it from getDiaryRepository() " +
        "in lib/diary/repository.ts.",
    );
  }
}

/**
 * Satu-satunya tempat untuk menyambungkan database tim.
 * Sengaja melempar error sampai implementasi nyata tersedia — TIDAK ada
 * implementasi palsu/in-memory di sini.
 */
export function getDiaryRepository(): DiaryRepository {
  throw new DiaryRepositoryNotConfiguredError();
}

/**
 * Versi non-throwing dari `getDiaryRepository()` untuk dipakai di page
 * component. Mengembalikan `null` bila database belum dikonfigurasi sehingga
 * halaman dapat menampilkan status integrasi alih-alih error.
 */
export function tryGetDiaryRepository(): DiaryRepository | null {
  try {
    return getDiaryRepository();
  } catch (error) {
    if (error instanceof DiaryRepositoryNotConfiguredError) {
      return null;
    }
    throw error;
  }
}
