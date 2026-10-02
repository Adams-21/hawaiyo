import Link from "next/link";

export default function DiaryLayout({ children }: LayoutProps<"/diary">) {
  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/"
            className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← Hawaiyo
          </Link>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Diary Saya
          </h1>
        </div>

        <Link
          href="/diary/create"
          className="inline-flex h-10 items-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Tulis diary
        </Link>
      </header>

      <main className="mt-6">{children}</main>
    </div>
  );
}