import { useState, useEffect } from "react";
import { useProgress } from "../../lib/useProgress";
import { signData } from "./signData";

interface Props {
  onBack: () => void;
}

interface GameItem {
  id: number;
  text: string;
  type: "sign" | "name";
  matched: boolean;
  pairId: number;
}

export default function SpeedMatchGame({ onBack }: Props) {
  const progress = useProgress();
  const [items, setItems] = useState<GameItem[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [finished, setFinished] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [wrongPair, setWrongPair] = useState<number[]>([]);

  useEffect(() => {
    const shuffled = [...signData].sort(() => Math.random() - 0.5).slice(0, 6);
    const gameItems: GameItem[] = [];
    shuffled.forEach((sign, i) => {
      gameItems.push({
        id: i * 2,
        text: sign.sign,
        type: "sign",
        matched: false,
        pairId: i,
      });
      gameItems.push({
        id: i * 2 + 1,
        text: sign.name,
        type: "name",
        matched: false,
        pairId: i,
      });
    });
    setItems(gameItems.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (finished || timeLeft <= 0) {
      if (timeLeft <= 0 && !finished) {
        setFinished(true);
        progress.saveGameScore("speed_match", score);
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished, score, progress]);

  const handleSelect = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (!item || item.matched) return;

    if (selected === null) {
      setSelected(id);
      return;
    }

    const first = items.find((i) => i.id === selected);
    if (!first) {
      setSelected(null);
      return;
    }

    if (first.pairId === item.pairId && first.type !== item.type) {
      setItems((p) =>
        p.map((i) =>
          i.pairId === item.pairId ? { ...i, matched: true } : i
        )
      );
      const bonus = Math.max(0, Math.floor(timeLeft / 10));
      setScore((s) => s + 10 + bonus);
      setMatchedCount((c) => {
        const nc = c + 1;
        if (nc >= 6) {
          setFinished(true);
          progress.saveGameScore("speed_match", score + 10 + bonus);
        }
        return nc;
      });
    } else {
      setWrongPair([selected, id]);
      setScore((s) => Math.max(0, s - 5));
      setTimeout(() => setWrongPair([]), 500);
    }
    setSelected(null);
  };

  if (finished) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center anim-up">
        <div className="text-6xl mb-4 anim-scale">
          {matchedCount >= 6 ? "🏆" : "⏱️"}
        </div>
        <h2
          className="text-xl font-extrabold mb-1"
          style={{ color: "var(--c-text)" }}
        >
          {matchedCount >= 6 ? "Tamamlandı!" : "Süre Doldu!"}
        </h2>
        <div className="glass p-6 w-full max-w-xs my-6">
          <div className="text-4xl font-extrabold" style={{ color: "#0D9488" }}>
            {score}
          </div>
          <div className="text-xs" style={{ color: "var(--c-text-muted)" }}>
            puan • {matchedCount}/6 eşleşme
          </div>
        </div>
        <button onClick={onBack} className="btn-primary w-full max-w-xs">
          Geri Dön
        </button>
      </div>
    );
  }

  const getItemStyle = (item: GameItem) => {
    const isSel = selected === item.id;
    const isWrong = wrongPair.includes(item.id);
    const isMatched = item.matched;

    let bg = "var(--c-surface)";
    let border = "var(--c-border-light)";

    if (isMatched) { bg = "rgba(0,214,143,0.15)"; border = "#10B981"; }
    if (isWrong) { bg = "rgba(249,112,102,0.15)"; border = "#F97066"; }
    if (isSel) { bg = "rgba(13,148,136,0.15)"; border = "#0D9488"; }

    return {
      height: "72px",
      background: bg,
      border: `2px solid ${border}`,
      opacity: isMatched ? 0.5 : 1,
      transform: isSel ? "scale(1.05)" : undefined,
    };
  };

  return (
    <div className="h-full flex flex-col px-4 pt-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg active:scale-90"
          style={{ background: "var(--c-surface)", color: "var(--c-text)" }}
        >
          ←
        </button>
        <div className="flex items-center gap-4">
          <div className="text-sm font-extrabold" style={{ color: "#0D9488" }}>
            {score} pt
          </div>
          <div
            className={`text-sm font-extrabold ${timeLeft <= 10 ? "anim-pulse" : ""}`}
            style={{
              color: timeLeft <= 10 ? "#F97066" : "var(--c-text-secondary)",
            }}
          >
            ⏱️ {timeLeft}s
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="h-1.5 rounded-full mb-4 overflow-hidden"
        style={{ background: "var(--c-border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${(timeLeft / 60) * 100}%`,
            background: timeLeft <= 10 ? "#F97066" : "#0D9488",
          }}
        />
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-4 gap-1.5">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              disabled={item.matched}
              className={`rounded-xl flex flex-col items-center justify-center text-center p-1.5 transition-all active:scale-95 ${
                wrongPair.includes(item.id) ? "anim-shake" : ""
              }`}
              style={getItemStyle(item)}
            >
              {item.type === "sign" ? (
                <img src={item.text} alt="" className="w-10 h-10 object-contain" />
              ) : (
                <span
                  className="text-[11px] font-bold leading-tight"
                  style={{ color: "var(--c-text)" }}
                >
                  {item.text}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div
        className="text-center text-[10px] mt-2"
        style={{ color: "var(--c-text-muted)" }}
      >
        Levhaları isimleriyle eşleştir! {matchedCount}/6
      </div>
    </div>
  );
}
