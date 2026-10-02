import type { DiaryEntry } from "./types";

export const mockDiaryEntries: DiaryEntry[] = [
  {
    id: "senja-di-teras",
    title: "Senja di Teras Kost",
    content:
      "Sore ini habiskan waktu membaca di teras kost. Anginnya mulai dingin, tapi tetap enak. Kadang hal kecil seperti inilah yang paling bikin senang setelah seharian yang padat.",
    mood: "calm",
    visibility: "public",
    status: "published",
    tags: ["kampus", "rantai", "santai"],
    createdAt: "2026-09-28T09:12:00.000Z",
    updatedAt: "2026-09-28T09:12:00.000Z",
  },
  {
    id: "ide-resep-akhir-pekan",
    title: "Ide Resep Buat Akhir Pekan",
    content:
      "Mau coba nasi goreng kampung pakai telur crispy. Bumbunya perlu takaran dulu biar rasanya pas.",
    mood: "happy",
    visibility: "private",
    status: "draft",
    tags: ["resep", "dapur"],
    createdAt: "2026-09-25T14:40:00.000Z",
    updatedAt: "2026-09-26T08:05:00.000Z",
  },
  {
    id: "terima-kasih-ibu",
    title: "Terima Kasih, Ibu",
    content:
      "Hari ini nyusul Ibu ke pasar pagi. Catatan kecil ini sengaja dibuat private, biar hanya kita yang tahu.",
    mood: "grateful",
    visibility: "private",
    status: "published",
    tags: ["keluarga", "syukur"],
    createdAt: "2026-09-21T06:20:00.000Z",
    updatedAt: "2026-09-21T06:20:00.000Z",
  },
  {
    id: "hari-yang-kosong",
    title: "Hari yang Terlalu Kosong",
    content:
      "Tidak banyak yang terjadi hari ini. Tapi rupanya hari kosong juga punya nilainya sendiri.",
    mood: "sad",
    visibility: "public",
    status: "published",
    tags: ["refleksi"],
    createdAt: "2026-09-18T19:55:00.000Z",
    updatedAt: "2026-09-18T19:55:00.000Z",
  },
  {
    id: "catatan-marathon",
    title: "Catatan Marathon Semester",
    content:
      "Ujian tengah semester sudah lewat. Capek, tapi rasanya juga lega bisa berhenti sejenak.",
    mood: "neutral",
    visibility: "public",
    status: "draft",
    tags: ["kampus", "target"],
    createdAt: "2026-09-14T11:30:00.000Z",
    updatedAt: "2026-09-15T07:45:00.000Z",
  },
];

export function getMockDiaryEntry(id: string): DiaryEntry | undefined {
  return mockDiaryEntries.find((entry) => entry.id === id);
}