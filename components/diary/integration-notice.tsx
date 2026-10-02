interface IntegrationNoticeProps {
  title: string;
  description: string;
  hint?: string;
}

/**
 * Status integrasi yang jujur: ditampilkan saat sebuah boundary (auth atau
 * database) belum tersambung, alih-alih menampilkan data palsu atau error.
 */
export function IntegrationNotice({
  title,
  description,
  hint,
}: IntegrationNoticeProps) {
  return (
    <div className="rounded-lg border border-dashed border-amber-400/70 bg-amber-50 p-6 dark:border-amber-500/40 dark:bg-amber-950/30">
      <h2 className="text-base font-semibold text-amber-900 dark:text-amber-200">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-amber-800 dark:text-amber-300/90">
        {description}
      </p>
      {hint ? (
        <p className="mt-3 text-xs text-amber-700/90 dark:text-amber-400/80">
          Integrasi: <code className="font-mono">{hint}</code>
        </p>
      ) : null}
    </div>
  );
}

export function DatabaseIntegrationNotice() {
  return (
    <IntegrationNotice
      title="Database belum tersambung"
      description="Fitur diary sudah siap, tetapi tim belum memilih dan mengonfigurasi database. Tidak ada data yang disimpan atau ditampilkan sampai integrasi selesai."
      hint="implementasikan DiaryRepository di lib/diary/repository.ts"
    />
  );
}

export function AuthIntegrationNotice() {
  return (
    <IntegrationNotice
      title="Autentikasi belum tersambung"
      description="Halaman ini memerlukan identitas pengguna, tetapi sistem autentikasi yang dikerjakan anggota tim lain belum tersedia."
      hint="ganti getCurrentUser() di lib/auth.ts"
    />
  );
}
