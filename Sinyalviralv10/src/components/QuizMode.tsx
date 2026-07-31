import { useState, useRef } from "react";
import { questions as allQuestions } from "../data/content";
import { useProgress } from "../lib/useProgress";
import { shuffle } from "../lib/utils";

interface Props {
  categoryId?: string;
  categoryName?: string;
  mode: "normal" | "weak" | "errors";
  onBack: () => void;
}

/**
 * Soru listesini BİR KEZ oluşturur.
 * useRef ile saklayarak re-render'da değişmesini önler.
 */
function buildQuestions(
  mode: string,
  categoryId: string | undefined,
  getWrongIds: () => string[],
  getWeakCats: () => string[]
) {
  let pool = [...allQuestions];

  if (mode === "errors") {
    const wrongIds = getWrongIds();
    pool = pool.filter((q) => wrongIds.includes(q.id));
  } else if (mode === "weak") {
    const weakCats = getWeakCats();
    if (weakCats.length > 0) {
      const weakQ = pool.filter((q) => weakCats.includes(q.categoryId));
      const normalQ = pool.filter((q) => !weakCats.includes(q.categoryId));
      const weakCount = Math.ceil(10 * 0.7);
      pool = [
        ...shuffle(weakQ).slice(0, weakCount),
        ...shuffle(normalQ).slice(0, 10 - weakCount),
      ];
    }
  } else if (categoryId) {
    pool = pool.filter((q) => q.categoryId === categoryId);
  }

  return shuffle(pool).slice(0, 10);
}

export default function QuizMode({
  categoryId,
  categoryName,
  mode,
  onBack,
}: Props) {
  const progress = useProgress();

  // Soruları BİR KEZ oluştur, bir daha değişme
  const questionsRef = useRef(
    buildQuestions(
      mode,
      categoryId,
      progress.getWrongQuestionIds,
      progress.getWeakCategoryIds
    )
  );
  const questions = questionsRef.current;

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [finished, setFinished] = useState(false);

  const handleSelect = (i: number) => {
    if (showResult) return;
    setSelected(i);
    setShowResult(true);

    const q = questions[idx];
    const ok = i === q.correctIndex;
    setScore((s) => ({
      correct: s.correct + (ok ? 1 : 0),
      wrong: s.wrong + (ok ? 0 : 1),
    }));
    progress.recordAnswer(q.id, q.categoryId, ok);
  };

  const handleNext = () => {
    if (idx < questions.length - 1) {
      setIdx((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  // ─── Boş durum ───
  if (questions.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center anim-up">
        <div className="text-5xl mb-4">✅</div>
        <h2
          className="text-lg font-bold mb-2"
          style={{ color: "var(--c-text)" }}
        >
          {mode === "errors"
            ? "Tebrikler! Hiç hatalı sorunuz yok!"
            : "Soru bulunamadı"}
        </h2>
        <button onClick={onBack} className="btn-primary mt-4 px-8">
          Geri Dön
        </button>
      </div>
    );
  }

  // ─── Sonuç ekranı ───
  if (finished) {
    const total = score.correct + score.wrong;
    const pct = total > 0 ? Math.round((score.correct / total) * 100) : 0;
    const emoji =
      pct >= 80 ? "🏆" : pct >= 60 ? "👍" : pct >= 40 ? "💪" : "📚";

    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center anim-up">
        <div className="text-6xl mb-4 anim-scale">{emoji}</div>
        <h2
          className="text-xl font-extrabold mb-1"
          style={{ color: "var(--c-text)" }}
        >
          Test Tamamlandı!
        </h2>
        <p className="text-xs mb-6" style={{ color: "var(--c-text-muted)" }}>
          {categoryName || "Karışık Konular"}
        </p>
        <div className="glass p-6 w-full max-w-xs mb-6">
          <div
            className="text-4xl font-extrabold mb-2"
            style={{ color: "#0D9488" }}
          >
            {pct}%
          </div>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div
                className="text-2xl font-extrabold"
                style={{ color: "#10B981" }}
              >
                {score.correct}
              </div>
              <div
                className="text-[10px]"
                style={{ color: "var(--c-text-muted)" }}
              >
                Doğru
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-extrabold"
                style={{ color: "#F97066" }}
              >
                {score.wrong}
              </div>
              <div
                className="text-[10px]"
                style={{ color: "var(--c-text-muted)" }}
              >
                Yanlış
              </div>
            </div>
          </div>
        </div>
        <button onClick={onBack} className="btn-primary w-full max-w-xs">
          Devam Et
        </button>
      </div>
    );
  }

  // ─── Soru ekranı ───
  const q = questions[idx];
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="h-full flex flex-col px-4 pt-4 pb-4 anim-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg active:scale-90 transition-transform"
          style={{ background: "var(--c-surface)", color: "var(--c-text)" }}
        >
          ←
        </button>
        <div className="flex-1">
          <h2
            className="font-bold text-xs"
            style={{ color: "var(--c-text)" }}
          >
            {mode === "errors"
              ? "🔥 Hata Temizleme"
              : mode === "weak"
                ? "🎯 Zorlu Alanlar"
                : categoryName || "Test"}
          </h2>
          <div
            className="text-[10px]"
            style={{ color: "var(--c-text-muted)" }}
          >
            Soru {idx + 1} / {questions.length}
          </div>
        </div>
        <div className="flex gap-2 text-xs font-bold">
          <span style={{ color: "#10B981" }}>{score.correct}✓</span>
          <span style={{ color: "#F97066" }}>{score.wrong}✗</span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="h-1 rounded-full mb-5 overflow-hidden"
        style={{ background: "var(--c-border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${((idx + 1) / questions.length) * 100}%`,
            background: "#0D9488",
          }}
        />
      </div>

      {/* Soru + Seçenekler */}
      <div className="flex-1 overflow-y-auto no-scrollbar" key={idx}>
        <div className="glass p-5 mb-5">
          <p
            className="text-sm font-semibold leading-relaxed"
            style={{ color: "var(--c-text)" }}
          >
            {q.text}
          </p>
        </div>
        <div className="space-y-2.5">
          {q.options.map((opt: string, i: number) => {
            const isCorrectAnswer = i === q.correctIndex;
            const isSelectedWrong =
              showResult && i === selected && !isCorrectAnswer;
            const isCorrectShown = showResult && isCorrectAnswer;
            const isInactive =
              showResult && !isCorrectAnswer && i !== selected;

            let bg = "var(--c-surface)";
            let border = "var(--c-border-light)";
            let badgeBg = "var(--c-surface-2)";
            let badgeColor = "var(--c-text-secondary)";
            let anim = "";

            if (isCorrectShown) {
              bg = "rgba(0,214,143,0.1)";
              border = "#10B981";
              badgeBg = "#10B981";
              badgeColor = "#fff";
            }
            if (isSelectedWrong) {
              bg = "rgba(249,112,102,0.1)";
              border = "#F97066";
              badgeBg = "#F97066";
              badgeColor = "#fff";
              anim = "anim-shake";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition-all active:scale-[0.98] ${anim} ${
                  isInactive ? "opacity-40" : ""
                }`}
                style={{
                  background: bg,
                  border: `2px solid ${border}`,
                }}
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0"
                  style={{ background: badgeBg, color: badgeColor }}
                >
                  {letters[i]}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "var(--c-text)" }}
                >
                  {opt}
                </span>
              </button>
            );
          })}
        </div>

        {/* Açıklama */}
        {showResult && q.explanation && (
          <div
            className="mt-4 rounded-xl p-4 anim-up"
            style={{
              background: "rgba(116,185,255,0.08)",
              border: "1px solid rgba(116,185,255,0.15)",
            }}
          >
            <div
              className="text-[10px] font-bold mb-1"
              style={{ color: "#6366F1" }}
            >
              💡 Açıklama
            </div>
            <p
              className="text-xs"
              style={{ color: "var(--c-text-secondary)" }}
            >
              {q.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Sonraki Soru butonu */}
      {showResult && (
        <button
          onClick={handleNext}
          className="btn-primary mt-3 w-full anim-up"
        >
          {idx < questions.length - 1 ? "Sonraki Soru →" : "Sonuçları Gör"}
        </button>
      )}
    </div>
  );
}
