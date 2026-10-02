"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { deleteDiaryAction } from "@/lib/diary/actions";

interface DeleteDiaryButtonProps {
  diaryId: string;
  diaryTitle: string;
}

export function DeleteDiaryButton({
  diaryId,
  diaryTitle,
}: DeleteDiaryButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      `Hapus diary "${diaryTitle}"? Tindakan ini tidak dapat dibatalkan.`,
    );
    if (!confirmed) {
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await deleteDiaryAction(diaryId);
      if (result.ok) {
        router.push("/diary");
        return;
      }
      setError(result.message);
    });
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-full border border-red-300 px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
      >
        {isPending ? "Menghapus…" : "Hapus"}
      </button>
      {error ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
