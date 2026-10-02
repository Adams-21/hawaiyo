/**
 * AUTHENTICATION INTEGRATION POINT
 * ================================
 * Authentication dikerjakan oleh anggota tim lain dan belum tersedia.
 * Fitur diary hanya bergantung pada permukaan kecil ini: cara mendapatkan
 * user yang sedang login.
 *
 * CARA INTEGRASI (oleh pemilik workstream auth):
 *   Ganti isi `getCurrentUser()` di bawah dengan lookup session nyata dari
 *   sistem autentikasi yang dipilih tim (NextAuth / Supabase Auth / custom —
 *   keputusan BUKAN dibuat di file ini). Kembalikan `null` bila tidak ada
 *   user yang login.
 *
 * JANGAN mengembalikan mock user / hardcoded user ID di sini.
 */

export interface SessionUser {
  id: string;
}

export class AuthNotConfiguredError extends Error {
  readonly name = "AuthNotConfiguredError";

  constructor() {
    super(
      "Authentication is not configured yet. " +
        "Wire the team's auth system in lib/auth.ts (getCurrentUser).",
    );
  }
}

/**
 * Mengembalikan user yang sedang login, atau `null` bila anonymous.
 *
 * @throws {AuthNotConfiguredError} selama sistem auth tim belum tersambung.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  throw new AuthNotConfiguredError();
}

export type CurrentUserResult =
  | { status: "authenticated"; user: SessionUser }
  | { status: "anonymous"; user: null }
  | { status: "unavailable"; user: null };

/**
 * Versi non-throwing dari `getCurrentUser()` untuk dipakai di page component.
 * Membedakan tiga keadaan: sudah login, belum login, dan auth belum tersambung.
 */
export async function resolveCurrentUser(): Promise<CurrentUserResult> {
  try {
    const user = await getCurrentUser();
    return user
      ? { status: "authenticated", user }
      : { status: "anonymous", user: null };
  } catch (error) {
    if (error instanceof AuthNotConfiguredError) {
      return { status: "unavailable", user: null };
    }
    throw error;
  }
}
