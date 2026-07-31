import { useState, useEffect } from "react";
import { questions as allQuestions, categories as allCategories } from "../data/content";
import { useProgress } from "../lib/useProgress";
import { shuffle } from "../lib/utils";

interface Props {
  onBack: () => void;
  examType?: "mini" | "general";
  examIndex?: number;
}

const GENERAL_DISTRIBUTION: Record<string, number> = {
  "traffic-rules": 13, "traffic-signs": 5, "first-aid": 12,
  "vehicle-tech": 9, "environment": 5, "traffic-ethics": 6,
};
const MINI_DISTRIBUTION: Record<string, number> = {
  "traffic-rules": 7, "traffic-signs": 3, "first-aid": 6,
  "vehicle-tech": 4, "environment": 3, "traffic-ethics": 2,
};

function buildExam(type: "mini" | "general" = "general") {
  const dist = type === "mini" ? MINI_DISTRIBUTION : GENERAL_DISTRIBUTION;
  const exam: typeof allQuestions = [];
  for (const [catId, count] of Object.entries(dist)) {
    const pool = allQuestions.filter(
      (q: { categoryId: string }) => q.categoryId === catId
    );
    exam.push(...shuffle(pool).slice(0, count));
  }
  return shuffle(exam);
}

export default function ExamMode({
  onBack,
  examType = "general",
  examIndex = 0,
}: Props) {
  const [questions] = useState(() => buildExam(examType));
  const examTime = examType === "mini" ? 20 * 60 : 45 * 60;
  const examTitle = examType === "mini"
    ? `Mini Deneme ${examIndex + 1}`
    : `Genel Deneme ${examIndex + 1}`;
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Record<number, { selected: number; correct: boolean }>>({});
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(examTime);
  const progress = useProgress();

  useEffect(() => { if (finished) return; if (timeLeft <= 0) { setFinished(true); return; } const t = setInterval(() => setTimeLeft((p) => p - 1), 1000); return () => clearInterval(t); }, [timeLeft, finished]);

  const handleSelect = (i: number) => {
    if (showResult) return; setSelected(i); setShowResult(true);
    const q = questions[idx]; const correct = i === q.correctIndex;
    setAnswers((p) => ({ ...p, [idx]: { selected: i, correct } }));
    progress.recordAnswer(q.id, q.categoryId, correct);
  };

  const saveResult = (finalAnswers: Record<number, { selected: number; correct: boolean }>) => {
    const answered = Object.keys(finalAnswers).length;
    const correct = Object.values(finalAnswers).filter((a) => a.correct).length;
    const sc = answered > 0 ? Math.round((correct / questions.length) * 100) : 0;
    const pass = sc >= 70;
    const breakdown: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q: { categoryId: string }, i: number) => { if (!breakdown[q.categoryId]) breakdown[q.categoryId] = { correct: 0, total: 0 }; breakdown[q.categoryId].total++; if (finalAnswers[i]?.correct) breakdown[q.categoryId].correct++; });
    const tasks: Array<{ type: "read_notes" | "review_cards" | "solve_questions"; categoryId: string; categoryName: string; description: string; completed: boolean }> = [];
    for (const [catId, data] of Object.entries(breakdown)) { const pct = data.total > 0 ? (data.correct / data.total) * 100 : 0; if (pct < 70) { const cat = allCategories.find((c: { id: string }) => c.id === catId); const catName = cat?.name ?? catId; tasks.push({ type: "read_notes", categoryId: catId, categoryName: catName, description: `${catName} notlarını oku`, completed: false }, { type: "review_cards", categoryId: catId, categoryName: catName, description: `${catName} kartlarını tekrarla`, completed: false }); } }
    if (tasks.length === 0 && !pass) tasks.push({ type: "solve_questions", categoryId: "", categoryName: "Genel", description: "10 soru daha çöz", completed: false });
    progress.saveExamResult({ score: sc, total: questions.length, passed: pass, examType, examIndex, categoryBreakdown: breakdown, tasks, tasksCompleted: tasks.length === 0 });
    progress.incrementQuestions(answered);
  };

  const handleNext = () => { if (idx < questions.length - 1) { setIdx((i) => i + 1); setSelected(null); setShowResult(false); } else { saveResult(answers); setFinished(true); } };
  useEffect(() => { if (timeLeft <= 0 && !finished) { saveResult(answers); setFinished(true); } }, [timeLeft]);

  const totalAnswered = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const score = totalAnswered > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const passed = score >= 70;
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (finished) {
    const breakdown: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q: { categoryId: string }, i: number) => { if (!breakdown[q.categoryId]) breakdown[q.categoryId] = { correct: 0, total: 0 }; breakdown[q.categoryId].total++; if (answers[i]?.correct) breakdown[q.categoryId].correct++; });
    return (
      <div className="h-full overflow-y-auto no-scrollbar px-4 pt-4 pb-6 anim-up">
        <div className="text-center mb-5"><div className="text-5xl mb-3 anim-scale">{passed ? "🏆" : "📚"}</div><h2 className="text-xl font-extrabold" style={{ color: "var(--c-text)" }}>{passed ? "TEBRİKLER! GEÇTİN!" : "MAALESEF KALDIN"}</h2></div>
        <div className="glass p-5 text-center mb-5"><div className="text-4xl font-extrabold mb-1" style={{ color: passed ? "#10B981" : "#F43F5E" }}>{score}/100</div><div className="flex justify-center gap-6 mt-2"><div><span className="text-lg font-bold" style={{ color: "#10B981" }}>{correctCount}</span><span className="text-[10px] ml-1" style={{ color: "var(--c-text-muted)" }}>doğru</span></div><div><span className="text-lg font-bold" style={{ color: "#F43F5E" }}>{totalAnswered - correctCount}</span><span className="text-[10px] ml-1" style={{ color: "var(--c-text-muted)" }}>yanlış</span></div></div></div>
        <div className="glass p-4 mb-5"><h3 className="text-xs font-bold mb-3" style={{ color: "var(--c-text)" }}>📊 Kategori Analizi</h3><div className="space-y-2">{Object.entries(breakdown).map(([catId, data]) => { const cat = allCategories.find((c: { id: string }) => c.id === catId); const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0; return (<div key={catId} className="flex items-center gap-2"><span className="text-sm">{cat?.icon}</span><span className="text-[10px] flex-1 truncate" style={{ color: "var(--c-text-secondary)" }}>{cat?.name}</span><div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--c-border)" }}><div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 70 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#F43F5E" }} /></div><span className="text-[9px] font-bold w-14 text-right" style={{ color: pct >= 70 ? "#10B981" : "#F43F5E" }}>{data.correct}/{data.total}</span></div>); })}</div></div>
        <button onClick={onBack} className="btn-primary w-full">Ana Sayfaya Dön</button>
      </div>
    );
  }

  const q = questions[idx]; const letters = ["A", "B", "C", "D"]; const catInfo = allCategories.find((c: { id: string }) => c.id === q.categoryId);
  return (
    <div className="h-full flex flex-col px-4 pt-4 pb-4 anim-in">
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => { if (confirm("Denemeden çıkmak istediğine emin misin?")) onBack(); }} className="w-10 h-10 rounded-xl flex items-center justify-center text-lg active:scale-90 transition-transform" style={{ background: "var(--c-surface)", color: "var(--c-text)" }}>←</button>
        <div className="flex-1"><h2 className="font-bold text-xs" style={{ color: "var(--c-text)" }}>📋 {examTitle}</h2><div className="text-[10px]" style={{ color: "var(--c-text-muted)" }}>Soru {idx + 1}/{questions.length} • {catInfo?.icon} {catInfo?.name}</div></div>
        <div className={`text-xs font-bold px-2 py-1 rounded-lg ${timeLeft <= 300 ? "anim-pulse" : ""}`} style={{ background: timeLeft <= 300 ? "rgba(244,63,94,0.1)" : "var(--c-surface)", color: timeLeft <= 300 ? "#F43F5E" : "var(--c-text-secondary)" }}>⏱️ {formatTime(timeLeft)}</div>
      </div>
      <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: "var(--c-border)" }}><div className="h-full rounded-full transition-all duration-300" style={{ width: `${((idx + 1) / questions.length) * 100}%`, background: "#0D9488" }} /></div>
      <div className="flex-1 overflow-y-auto no-scrollbar" key={idx}>
        <div className="glass p-4 mb-4"><p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--c-text)" }}>{q.text}</p></div>
        <div className="space-y-2.5">{q.options.map((opt: string, i: number) => {
          const isCorrectAnswer = showResult && i === q.correctIndex; const isSelectedWrong = showResult && i === selected && i !== q.correctIndex; const isInactive = showResult && !isCorrectAnswer && i !== selected;
          let bg = "var(--c-surface)"; let border = "var(--c-border-light)"; let badgeBg = "var(--c-surface-2)"; let badgeColor = "var(--c-text-secondary)"; let anim = "";
          if (isCorrectAnswer) { bg = "rgba(16,185,129,0.1)"; border = "#10B981"; badgeBg = "#10B981"; badgeColor = "#fff"; }
          if (isSelectedWrong) { bg = "rgba(249,112,102,0.1)"; border = "#F97066"; badgeBg = "#F97066"; badgeColor = "#fff"; anim = "anim-shake"; }
          return (<button key={i} onClick={() => handleSelect(i)} disabled={showResult} className={`w-full p-3.5 rounded-xl text-left flex items-center gap-3 transition-all active:scale-[0.98] ${anim} ${isInactive ? "opacity-40" : ""}`} style={{ background: bg, border: `2px solid ${border}` }}><span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0" style={{ background: badgeBg, color: badgeColor }}>{letters[i]}</span><span className="text-sm" style={{ color: "var(--c-text)" }}>{opt}</span></button>);
        })}</div>
        {showResult && q.explanation && (<div className="mt-3 rounded-xl p-3 anim-up" style={{ background: "rgba(13,148,136,0.06)", border: "1px solid rgba(13,148,136,0.12)" }}><p className="text-[10px]" style={{ color: "var(--c-text-secondary)" }}>💡 {q.explanation}</p></div>)}
      </div>
      {showResult && (<button onClick={handleNext} className="btn-primary mt-3 w-full anim-up">{idx < questions.length - 1 ? "Sonraki Soru →" : "Sonuçları Gör"}</button>)}
    </div>
  );
}
