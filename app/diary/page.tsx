import { DiaryList } from "@/components/diary/diary-list";
import { mockDiaryEntries } from "@/lib/diary/mock";

export default function DiaryPage() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {mockDiaryEntries.length} diary, dengan data contoh. Filter di bawah buat
        sempitkan tampilan.
      </p>
      <DiaryList entries={mockDiaryEntries} />
    </div>
  );
}