// ═══════════════════════════════════════════════════════════════
// SinyalViral - İçerik Barrel Export
//
// Tüm bileşenler tek import ile kullanır:
//   import { categories, flashcards, ... } from "../data/content"
//
// Yeni içerik eklemek için ilgili kategori dosyasını aç:
//   data/notes/traffic-rules.ts
//   data/flashcards/first-aid.ts
//   data/questions/environment.ts  vb.
// ═══════════════════════════════════════════════════════════════

// Tipler
export type {
  Category,
  Flashcard,
  Question,
  Note,
  NoteSegment,
  SignGridItem,
} from "./types";

// Veriler
export { categories } from "./categories";
export { flashcards } from "./flashcards/index";
export { questions } from "./questions/index";
export { notes } from "./notes/index";

// Versiyon
export const contentVersion = {
  version: "2026.2.0",
  lastUpdated: "2026-07-20",
};
