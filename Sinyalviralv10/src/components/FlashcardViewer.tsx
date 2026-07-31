import { useState, useEffect, useCallback } from "react";
import { flashcards as allFlashcards } from "../data/content";
import { useProgress } from "../lib/useProgress";

interface Props { categoryId: string; categoryName: string; categoryColor: string; onBack: () => void; }

export default function FlashcardViewer({ categoryId, categoryName, categoryColor, onBack }: Props) {
  const [cards] = useState(() => allFlashcards.filter((f: { categoryId: string }) => f.categoryId === categoryId));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const progress = useProgress();

  useEffect(() => { if (cards[idx]) progress.markCardSeen(cards[idx].id); }, [idx, cards, progress]);

  const goNext = useCallback(() => { if (idx < cards.length - 1) { setFlipped(false); setIdx((i) => i + 1); } }, [idx, cards.length]);
  const goPrev = useCallback(() => { if (idx > 0) { setFlipped(false); setIdx((i) => i - 1); } }, [idx]);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    if (pct < 0.3) goPrev(); else if (pct > 0.7) goNext(); else setFlipped((f) => !f);
  };

  if (cards.length === 0) return <div className="h-full flex items-center justify-center"><span className="text-sm anim-pulse" style={{ color: "var(--c-text-muted)" }}>Kart bulunamadı</span></div>;

  const card = cards[idx];
  const categoryIcon = categoryId === "traffic-rules" ? "🚦" : categoryId === "traffic-signs" ? "⚠️" : categoryId === "first-aid" ? "🏥" : categoryId === "vehicle-tech" ? "🔧" : categoryId === "environment" ? "🌿" : "🤝";

  return (
    <div className="h-full flex flex-col px-4 pt-4 pb-4 anim-in">
      <div className="flex items-center gap-3 mb-3">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center text-lg active:scale-90 transition-transform" style={{ background: "var(--c-surface)", color: "var(--c-text)" }}>←</button>
        <div className="flex-1">
          <h2 className="font-bold text-sm" style={{ color: "var(--c-text)" }}>{categoryName}</h2>
          <div className="text-[10px]" style={{ color: "var(--c-text-muted)" }}>{idx + 1} / {cards.length}</div>
        </div>
      </div>
      <div className="flex gap-1 mb-4 justify-center">
        {cards.map((_: unknown, i: number) => (<div key={i} className="h-1 rounded-full transition-all duration-300" style={{ width: i === idx ? 24 : 8, background: i === idx ? categoryColor : "var(--c-border)" }} />))}
      </div>
      <div className="flex-1 flex items-center justify-center px-1" onClick={handleCardClick}>
        <div className="w-full max-w-sm perspective" key={idx}>
          <div className={`relative preserve-3d transition-transform ${flipped ? "rotate-y-180" : ""}`} style={{ minHeight: 360, transitionDuration: "0.5s" }}>
            <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden flex flex-col" style={{ background: `${categoryColor}10`, border: `2px solid ${categoryColor}30` }}>
              <div className="h-40 flex items-center justify-center overflow-hidden" style={{ background: `${categoryColor}08` }}><span className="text-6xl">{categoryIcon}</span></div>
              <div className="flex-1 flex flex-col items-center justify-center p-5 text-center">
                <h3 className="text-lg font-extrabold mb-2" style={{ color: "var(--c-text)" }}>{card.title}</h3>
                <p className="text-xs" style={{ color: "var(--c-text-muted)" }}>Çevirmek için ortaya dokun</p>
              </div>
            </div>
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden flex flex-col" style={{ background: `${categoryColor}10`, border: `2px solid ${categoryColor}30` }}>
              <div className="h-20 flex items-center justify-center opacity-50" style={{ background: `${categoryColor}08` }}><span className="text-3xl">{categoryIcon}</span></div>
              <div className="flex-1 flex flex-col justify-center p-5">
                <h3 className="text-sm font-extrabold mb-2 text-center" style={{ color: categoryColor }}>{card.title}</h3>
                <p className="text-sm leading-relaxed text-center" style={{ color: "var(--c-text)" }}>{card.content}</p>
                {card.tip && (<div className="rounded-xl p-3 mt-4" style={{ background: "var(--c-surface)" }}><p className="text-xs font-medium text-center" style={{ color: "#0D9488" }}>💡 {card.tip}</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-[10px] mt-3" style={{ color: "var(--c-text-muted)" }}>Sola dokun ◂ &nbsp; Ortaya dokun ↻ &nbsp; Sağa dokun ▸</p>
    </div>
  );
}
