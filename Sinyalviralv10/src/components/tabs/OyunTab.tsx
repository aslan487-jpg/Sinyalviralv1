import { useState } from "react";
import { useProgress } from "../../lib/useProgress";
import SpeedMatchGame from "../games/SpeedMatchGame";
import MemoryGame from "../games/MemoryGame";

type GameType = "speed_match" | "memory" | null;

export default function OyunTab() {
  const [gameType, setGameType] = useState<GameType>(null);
  const progress = useProgress();

  const highScores = {
    speed_match: progress.getBestGameScore("speed_match"),
    memory: progress.getBestGameScore("memory"),
  };

  if (gameType === "speed_match") {
    return <SpeedMatchGame onBack={() => setGameType(null)} />;
  }
  if (gameType === "memory") {
    return <MemoryGame onBack={() => setGameType(null)} />;
  }

  return (
    <div className="px-4 pt-5 pb-4">
      <h1
        className="text-lg font-extrabold mb-1 anim-up"
        style={{ color: "var(--c-text)" }}
      >
        🎮 Oyun Alanı
      </h1>
      <p
        className="text-xs mb-5 anim-up"
        style={{ color: "var(--c-text-muted)", animationDelay: "50ms" }}
      >
        Eğlenerek öğren, puan topla!
      </p>

      <div className="space-y-3 stagger">
        <GameCard
          onClick={() => setGameType("speed_match")}
          emoji="⚡"
          bgEmoji="⏱️"
          title="Hızlı Eşleştir"
          desc="Süreye karşı! Levhaları isimleriyle eşleştir"
          highScore={highScores.speed_match}
          gradient="linear-gradient(135deg, rgba(0,214,143,0.1), rgba(116,185,255,0.05))"
          borderColor="rgba(0,214,143,0.2)"
          accentColor="#10B981"
        />
        <GameCard
          onClick={() => setGameType("memory")}
          emoji="🧠"
          bgEmoji="🃏"
          title="Hafıza Kartları"
          desc="Levha çiftlerini bul! Kartı çevir, eşini hatırla"
          highScore={highScores.memory}
          gradient="linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))"
          borderColor="rgba(99,102,241,0.2)"
          accentColor="#6366F1"
        />
      </div>

      <div
        className="glass mt-6 p-4 anim-up"
        style={{ animationDelay: "200ms" }}
      >
        <div
          className="text-xs font-bold mb-1.5"
          style={{ color: "var(--c-text)" }}
        >
          💡 Puanlama
        </div>
        <p
          className="text-[11px] leading-relaxed"
          style={{ color: "var(--c-text-muted)" }}
        >
          Her doğru cevap <b style={{ color: "#10B981" }}>+10</b>, yanlış{" "}
          <b style={{ color: "#F97066" }}>-5</b> puan.
        </p>
      </div>
    </div>
  );
}

/* ─── Oyun Kartı Bileşeni ─── */
interface GameCardProps {
  onClick: () => void;
  emoji: string;
  bgEmoji: string;
  title: string;
  desc: string;
  highScore: number;
  gradient: string;
  borderColor: string;
  accentColor: string;
}

function GameCard({
  onClick,
  emoji,
  bgEmoji,
  title,
  desc,
  highScore,
  gradient,
  borderColor,
  accentColor,
}: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl p-5 text-left active:scale-[0.98] transition-transform anim-up"
      style={{ background: gradient, border: `1px solid ${borderColor}` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl mb-2">{emoji}</div>
          <h3
            className="font-extrabold text-base mb-1"
            style={{ color: "var(--c-text)" }}
          >
            {title}
          </h3>
          <p
            className="text-[11px] leading-relaxed"
            style={{ color: "var(--c-text-secondary)" }}
          >
            {desc}
          </p>
          {highScore > 0 && (
            <div
              className="mt-2 text-[10px] font-bold"
              style={{ color: accentColor }}
            >
              🏆 En yüksek: {highScore} puan
            </div>
          )}
        </div>
        <div className="text-4xl opacity-30">{bgEmoji}</div>
      </div>
    </button>
  );
}
