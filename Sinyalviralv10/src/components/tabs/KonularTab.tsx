import { useState } from "react";
import { type UserData } from "../../lib/hooks";
import { useProgress, examWeights } from "../../lib/useProgress";
import { categories, flashcards as allCards, notes as allNotes, questions as allQuestions } from "../../data/content";
import FlashcardViewer from "../FlashcardViewer";
import QuizMode from "../QuizMode";
import NoteViewer from "../NoteViewer";

interface Category { id: string; name: string; color: string; icon: string; }

export default function KonularTab({ user: _user }: { user: UserData }) {
  const progress = useProgress();
  const [selCat, setSelCat] = useState<Category | null>(null);
  const [mode, setMode] = useState<"notes" | "cards" | "quiz" | null>(null);
  const back = () => { setSelCat(null); setMode(null); };

  if (selCat && mode === "notes") return <NoteViewer categoryId={selCat.id} categoryName={selCat.name} categoryColor={selCat.color} onBack={back} />;
  if (selCat && mode === "cards") return <FlashcardViewer categoryId={selCat.id} categoryName={selCat.name} categoryColor={selCat.color} onBack={back} />;
  if (selCat && mode === "quiz") return <QuizMode categoryId={selCat.id} categoryName={selCat.name} mode="normal" onBack={back} />;

  return (
    <div className="px-4 pt-5 pb-6">
      <h1 className="text-xl font-extrabold mb-1 anim-up" style={{ color: "var(--c-text)" }}>📚 Konular</h1>
      <p className="text-sm mb-5 anim-up" style={{ color: "var(--c-text-muted)" }}>Öğrenmek istediğin konuyu seç</p>
      <div className="space-y-3 stagger">
        {categories.map((cat) => {
          const catStat = progress.data.categoryStats[cat.id];
          const sc = catStat ? Math.round(catStat.strengthScore) : 0;
          const weight = examWeights[cat.id];
          const catNotes = allNotes.filter((n: { categoryId: string }) => n.categoryId === cat.id);
          const catCards = allCards.filter((c: { categoryId: string }) => c.categoryId === cat.id);
          const catQuestions = allQuestions.filter((q: { categoryId: string }) => q.categoryId === cat.id);
          return (
            <div key={cat.id} className="relative rounded-2xl p-4 overflow-hidden anim-up" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border-light)" }}>
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)` }} />
              {catStat?.isWeakArea && (<div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(244,63,94,0.1)" }}><span className="w-2 h-2 rounded-full anim-pulse" style={{ background: "#F43F5E" }} /><span className="text-[9px] font-bold" style={{ color: "#F43F5E" }}>Zayıf</span></div>)}
              <div className="flex items-center gap-3 mb-3"><div className="text-3xl">{cat.icon}</div><div className="flex-1"><h3 className="font-bold text-base" style={{ color: "var(--c-text)" }}>{cat.name}</h3><p className="text-xs" style={{ color: "var(--c-text-muted)" }}>{cat.description}</p>{weight && (<div className="text-[10px] font-semibold mt-0.5" style={{ color: cat.color }}>{weight.label}</div>)}</div></div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="rounded-lg py-2 text-center" style={{ background: `${cat.color}12` }}><div className="text-sm font-extrabold" style={{ color: cat.color }}>{catNotes.length}</div><div className="text-[10px] font-medium" style={{ color: "var(--c-text-muted)" }}>Not</div></div>
                <div className="rounded-lg py-2 text-center" style={{ background: "var(--c-surface-2)" }}><div className="text-sm font-extrabold" style={{ color: "var(--c-text-secondary)" }}>{catCards.length}</div><div className="text-[10px] font-medium" style={{ color: "var(--c-text-muted)" }}>Kart</div></div>
                <div className="rounded-lg py-2 text-center" style={{ background: "var(--c-surface-2)" }}><div className="text-sm font-extrabold" style={{ color: "var(--c-text-secondary)" }}>{catQuestions.length}</div><div className="text-[10px] font-medium" style={{ color: "var(--c-text-muted)" }}>Soru</div></div>
              </div>
              {catStat ? (<div className="mb-3"><div className="flex justify-between text-[10px] mb-1"><span style={{ color: "var(--c-text-muted)" }}>{catStat.correctAnswers}/{catStat.totalAnswered} doğru</span><span className="font-bold" style={{ color: sc >= 70 ? "#10B981" : sc >= 40 ? "#F59E0B" : "#F43F5E" }}>%{sc}</span></div><div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--c-border)" }}><div className="h-full rounded-full transition-all" style={{ width: `${sc}%`, background: sc >= 70 ? "#10B981" : sc >= 40 ? "#F59E0B" : "#F43F5E" }} /></div></div>) : (<div className="mb-3 text-xs" style={{ color: "var(--c-text-muted)" }}>Henüz başlanmadı</div>)}
              <div className="flex gap-2">
                <button onClick={() => { setSelCat(cat); setMode("notes"); }} className="flex-1 py-2.5 text-xs font-bold rounded-xl active:scale-95 transition-transform" style={{ background: `${cat.color}15`, color: cat.color }}>📝 Notları Oku</button>
                <button onClick={() => { setSelCat(cat); setMode("cards"); }} className="flex-1 py-2.5 text-xs font-bold rounded-xl active:scale-95 transition-transform" style={{ background: "var(--c-surface-2)", color: "var(--c-text-secondary)" }}>🎴 Kartlar</button>
                <button onClick={() => { setSelCat(cat); setMode("quiz"); }} className="flex-1 py-2.5 text-xs font-bold rounded-xl active:scale-95 transition-transform text-white" style={{ background: cat.color }}>❓ Test Çöz</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
