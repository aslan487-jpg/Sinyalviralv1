import { useState, useEffect } from "react";
import { useProgress } from "../../lib/useProgress";
import { signData } from "./signData";

interface Props {
  onBack: () => void;
}

interface MemoryCard {
  id: number;
  signIdx: number;
  flipped: boolean;
  matched: boolean;
}

export default function MemoryGame({ onBack }: Props) {
  const progress = useProgress();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const selected = [...signData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    const pairs: MemoryCard[] = [];
    selected.forEach((_, i) => {
      pairs.push({ id: i * 2, signIdx: i, flipped: false, matched: false });
      pairs.push({ id: i * 2 + 1, signIdx: i, flipped: false, matched: false });
    });
    setCards(pairs.sort(() => Math.random() - 0.5));
  }, []);

  const handleFlip = (id: number) => {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map((c) =>
      c.id === id ? { ...c, flipped: true } : c
    );
    setCards(newCards);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [first, second] = newFlipped;
      const c1 = newCards.find((c) => c.id === first)!;
      const c2 = newCards.find((c) => c.id === second)!;

      if (c1.signIdx === c2.signIdx) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.signIdx === c1.signIdx ? { ...c, matched: true } : c
            )
          );
          setScore((s) => s + 20);
          setMatchedCount((mc) => {
            const next = mc + 1;
            if (next >= 8) {
              setFinished(true);
              progress.saveGameScore("memory", score + 20);
            }
            return next;
          });
          setFlippedIds([]);
          setLocked(false);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second
                ? { ...c, flipped: false }
                : c
            )
          );
          setScore((s) => Math.max(0, s - 2));
          setFlippedIds([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  if (finished) {
    const stars = moves <= 12 ? 3 : moves <= 18 ? 2 : 1;
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center anim-up">
        <div className="text-5xl mb-3 anim-scale">
          {"⭐".repeat(stars)}
        </div>
        <h2
          className="text-xl font-extrabold mb-1"
          style={{ color: "var(--c-text)" }}
        >
          Tebrikler!
        </h2>
        <p className="text-xs mb-4" style={{ color: "var(--c-text-muted)" }}>
          {moves} hamlede tamamladın
        </p>
        <div className="glass p-5 w-full max-w-xs mb-5">
          <div className="text-3xl font-extrabold" style={{ color: "#6366F1" }}>
            {score}
          </div>
          <div className="text-xs" style={{ color: "var(--c-text-muted)" }}>
            puan
          </div>
        </div>
        <button onClick={onBack} className="btn-primary w-full max-w-xs">
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col px-3 pt-4 pb-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg active:scale-90"
          style={{ background: "var(--c-surface)", color: "var(--c-text)" }}
        >
          ←
        </button>
        <div className="flex items-center gap-3">
          <div className="text-sm font-extrabold" style={{ color: "#6366F1" }}>
            {score} pt
          </div>
          <div
            className="text-xs font-bold"
            style={{ color: "var(--c-text-muted)" }}
          >
            Hamle: {moves}
          </div>
          <div className="text-xs font-bold" style={{ color: "#10B981" }}>
            {matchedCount}/8
          </div>
        </div>
      </div>

      {/* Kart Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex items-center">
        <div className="grid grid-cols-4 gap-1.5 w-full">
          {cards.map((card) => {
            const sign = signData[card.signIdx];
            const show = card.flipped || card.matched;

            const borderColor = card.matched
              ? "#10B981"
              : show
                ? "#6366F1"
                : "var(--c-border-light)";

            return (
              <button
                key={card.id}
                onClick={() => handleFlip(card.id)}
                disabled={card.matched || card.flipped}
                className="rounded-xl overflow-hidden transition-all active:scale-95"
                style={{
                  height: "95px",
                  background: card.matched
                    ? "rgba(99,102,241,0.08)"
                    : "var(--c-surface)",
                  border: `2px solid ${borderColor}`,
                  opacity: card.matched ? 0.4 : 1,
                }}
              >
                {show ? (
                  <div className="flex flex-col items-center justify-center h-full p-1.5 gap-1 anim-scale">
                    <img
                      src={sign.sign}
                      alt=""
                      className="w-11 h-11 object-contain shrink-0"
                    />
                    <span
                      className="text-[9px] font-bold leading-tight text-center"
                      style={{ color: "var(--c-text)" }}
                    >
                      {sign.name}
                    </span>
                  </div>
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(145deg, #6366F1, #8B5CF6)",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ border: "2px solid rgba(255,255,255,0.2)" }}
                    >
                      <span className="text-white font-extrabold opacity-40">
                        ?
                      </span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="text-center text-xs mt-1"
        style={{ color: "var(--c-text-muted)" }}
      >
        Kartları çevirerek levha çiftlerini bul! 🧠
      </div>
    </div>
  );
}
