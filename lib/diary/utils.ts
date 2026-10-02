import type { DiaryEntry, DiaryFilter } from "./types";

const formatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatDate(iso: string): string {
  return formatter.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return dateTimeFormatter.format(new Date(iso));
}

export function matchesFilter(entry: DiaryEntry, filter: DiaryFilter): boolean {
  switch (filter) {
    case "public":
      return entry.visibility === "public";
    case "private":
      return entry.visibility === "private";
    case "draft":
      return entry.status === "draft";
    case "all":
      return true;
  }
}

export function countByFilter(
  entries: DiaryEntry[],
): Record<DiaryFilter, number> {
  return {
    all: entries.length,
    public: entries.filter((entry) => entry.visibility === "public").length,
    private: entries.filter((entry) => entry.visibility === "private").length,
    draft: entries.filter((entry) => entry.status === "draft").length,
  };
}

export function excerpt(content: string, maxLength = 140): string {
  const plain = content.replace(/\s+/g, " ").trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trimEnd()}…`;
}

export function createEmptyDiary(): DiaryEntry {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    mood: "neutral",
    visibility: "private",
    status: "draft",
    tags: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function normalizeTags(tags: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of tags) {
    const tag = raw.trim().replace(/^#/, "").toLowerCase();
    if (!tag || seen.has(tag)) continue;
    seen.add(tag);
    result.push(tag);
  }
  return result;
}