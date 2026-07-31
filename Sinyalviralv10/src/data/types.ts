// ═══════════════════════════════════════════════════
// SinyalViral - Tip Tanımları
// ═══════════════════════════════════════════════════

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Flashcard {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  tip?: string;
  difficulty: 1 | 2 | 3;
}

export interface Question {
  id: string;
  categoryId: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  difficulty: 1 | 2 | 3;
}

export interface Note {
  id: string;
  categoryId: string;
  title: string;
  segments: NoteSegment[];
}

export type NoteSegment =
  | { type: "text"; content: string }
  | { type: "highlight"; content: string }
  | { type: "warning"; content: string }
  | { type: "tip"; content: string }
  | { type: "table"; rows: [string, string][] }
  | { type: "heading"; content: string }
  | { type: "signGrid"; signs: SignGridItem[] };

export interface SignGridItem {
  id: string;
  name: string;
  img?: string;
}
