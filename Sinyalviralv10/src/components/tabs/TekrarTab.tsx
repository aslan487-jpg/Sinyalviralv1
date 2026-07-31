import { useState } from "react";
import QuizMode from "../QuizMode";
import ExamMode from "../ExamMode";
import NoteViewer from "../NoteViewer";
import FlashcardViewer from "../FlashcardViewer";
import { useProgress } from "../../lib/useProgress";
import { categories as allCategories } from "../../data/content";

// Deneme tanımları
const EXAM_LIST: Array<{
  type: "mini" | "general";
  index: number;
  label: string;
  icon: string;
  questionCount: number;
  timeMinutes: number;
}> = [
  { type: "mini", index: 0, label: "Mini Deneme 1", icon: "📝", questionCount: 25, timeMinutes: 20 },
  { type: "mini", index: 1, label: "Mini Deneme 2", icon: "📝", questionCount: 25, timeMinutes: 20 },
  { type: "mini", index: 2, label: "Mini Deneme 3", icon: "📝", questionCount: 25, timeMinutes: 20 },
  { type: "mini", index: 3, label: "Mini Deneme 4", icon: "📝", questionCount: 25, timeMinutes: 20 },
  { type: "general", index: 0, label: "Genel Deneme 1", icon: "📋", questionCount: 50, timeMinutes: 45 },
  { type: "general", index: 1, label: "Genel Deneme 2", icon: "📋", questionCount: 50, timeMinutes: 45 },
  { type: "general", index: 2, label: "Genel Deneme 3", icon: "📋", questionCount: 50, timeMinutes: 45 },
];

export default function TekrarTab() {
  const progress = useProgress();
  const [activeMode, setActiveMode] = useState<
    "weak" | "errors" | null
  >(null);
  const [activeExam, setActiveExam] = useState<{
    type: "mini" | "general";
    index: number;
  } | null>(null);
  const [taskAction, setTaskAction] = useState<{
    type: string;
    catId: string;
  } | null>(null);

  // ─── Görev aksiyonları ───
  const handleTaskComplete = (taskType: string) => {
    const lastExam = progress.getLastExam();
    if (lastExam) {
      const taskIdx = lastExam.tasks.findIndex(
        (t: { categoryId: string; type: string }) =>
          t.categoryId === taskAction?.catId && t.type === taskType
      );
      if (taskIdx >= 0) {
        progress.completeExamTask(lastExam.id, taskIdx);
      }
    }
    setTaskAction(null);
  };

  if (taskAction) {
    const cat = allCategories.find(
      (c: { id: string }) => c.id === taskAction.catId
    );
    if (taskAction.type === "read_notes" && cat) {
      return (
        <NoteViewer
          categoryId={cat.id}
          categoryName={cat.name}
          categoryColor={cat.color}
          onBack={() => handleTaskComplete("read_notes")}
        />
      );
    }
    if (taskAction.type === "review_cards" && cat) {
      return (
        <FlashcardViewer
          categoryId={cat.id}
          categoryName={cat.name}
          categoryColor={cat.color}
          onBack={() => handleTaskComplete("review_cards")}
        />
      );
    }
  }

  if (activeMode === "weak") {
    return <QuizMode mode="weak" onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === "errors") {
    return <QuizMode mode="errors" onBack={() => setActiveMode(null)} />;
  }
  if (activeExam) {
    return (
      <ExamMode
        examType={activeExam.type}
        examIndex={activeExam.index}
        onBack={() => setActiveExam(null)}
      />
    );
  }

  const weakAreas = progress.getWeakCategoryIds();
  const stats = progress.getTotalStats();
  const totalWrong = stats.totalAnswered - stats.totalCorrect;

  // Son tamamlanan denemenin görevlerini göster
  const lastExam = progress.getLastExam();
  const showTasks =
    lastExam && !lastExam.tasksCompleted && lastExam.tasks.length > 0;

  return (
    <div className="px-4 pt-5 pb-4">
      <h1
        className="text-lg font-extrabold mb-1 anim-up"
        style={{ color: "var(--c-text)" }}
      >
        🔄 Tekrar Merkezi
      </h1>
      <p
        className="text-xs mb-4 anim-up"
        style={{ color: "var(--c-text-muted)" }}
      >
        Deneme çöz, zayıf alanlarını tespit et, güçlen!
      </p>

      {/* ─── Görevler (varsa) ─── */}
      {showTasks && (
        <div
          className="rounded-xl p-3 mb-4 anim-up"
          style={{
            background: "rgba(245,158,11,0.06)",
            border: "1px solid rgba(245,158,11,0.15)",
          }}
        >
          <div
            className="text-[10px] font-bold mb-2"
            style={{ color: "#F59E0B" }}
          >
            📋 Görevleri Tamamla ({lastExam.tasks.filter(
              (t: { completed: boolean }) => t.completed
            ).length}/{lastExam.tasks.length})
          </div>
          <div className="space-y-1.5">
            {lastExam.tasks.map(
              (
                task: {
                  completed: boolean;
                  type: string;
                  categoryId: string;
                  description: string;
                },
                i: number
              ) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!task.completed)
                      setTaskAction({
                        type: task.type,
                        catId: task.categoryId,
                      });
                  }}
                  disabled={task.completed}
                  className="flex items-center gap-2 w-full text-left py-1 active:scale-[0.98] transition-transform"
                >
                  <span className="text-sm">
                    {task.completed ? "✅" : "⬜"}
                  </span>
                  <span
                    className="text-[10px] flex-1"
                    style={{
                      color: task.completed
                        ? "var(--c-text-muted)"
                        : "var(--c-text)",
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {task.description}
                  </span>
                  {!task.completed && (
                    <span
                      className="text-[9px]"
                      style={{ color: "#0D9488" }}
                    >
                      Başla →
                    </span>
                  )}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* ─── Deneme Listesi ─── */}
      <div className="mb-4 anim-up" style={{ animationDelay: "50ms" }}>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-1 h-4 rounded-full"
            style={{ background: "#0D9488" }}
          />
          <h2
            className="text-sm font-bold"
            style={{ color: "var(--c-text-secondary)" }}
          >
            Denemeler
          </h2>
        </div>

        <div className="space-y-2">
          {EXAM_LIST.map((exam) => {
            const unlocked = progress.isExamUnlocked(
              exam.type,
              exam.index
            );
            const result = progress.getExamByTypeAndIndex(
              exam.type,
              exam.index
            );
            const isDone = result !== null;
            const tasksOk = result?.tasksCompleted ?? false;
            const isMiniSection =
              exam.type === "mini" && exam.index === 0;
            const isGeneralSection =
              exam.type === "general" && exam.index === 0;

            return (
              <div key={`${exam.type}-${exam.index}`}>
                {/* Bölüm başlığı */}
                {isMiniSection && (
                  <div
                    className="text-[9px] font-bold uppercase tracking-wider mb-2 mt-1"
                    style={{ color: "var(--c-text-muted)" }}
                  >
                    Mini Denemeler (25 soru • 20 dk)
                  </div>
                )}
                {isGeneralSection && (
                  <div
                    className="text-[9px] font-bold uppercase tracking-wider mb-2 mt-3"
                    style={{ color: "var(--c-text-muted)" }}
                  >
                    Genel Denemeler (50 soru • 45 dk)
                  </div>
                )}

                <button
                  onClick={() => {
                    if (unlocked && (!isDone || tasksOk)) {
                      setActiveExam({
                        type: exam.type,
                        index: exam.index,
                      });
                    }
                  }}
                  disabled={!unlocked || (isDone && !tasksOk)}
                  className="w-full rounded-xl p-3 flex items-center gap-3 active:scale-[0.98] transition-all"
                  style={{
                    background: unlocked
                      ? "var(--c-surface)"
                      : "var(--c-surface-2)",
                    border: `1px solid ${
                      isDone && tasksOk
                        ? "#10B981"
                        : unlocked
                          ? "var(--c-border-light)"
                          : "var(--c-border)"
                    }`,
                    opacity: unlocked ? 1 : 0.5,
                  }}
                >
                  {/* Sol ikon */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                    style={{
                      background:
                        isDone && tasksOk
                          ? "rgba(16,185,129,0.1)"
                          : unlocked
                            ? "rgba(13,148,136,0.1)"
                            : "var(--c-surface-2)",
                    }}
                  >
                    {!unlocked
                      ? "🔒"
                      : isDone && tasksOk
                        ? "✅"
                        : isDone && !tasksOk
                          ? "⏳"
                          : exam.icon}
                  </div>

                  {/* Orta bilgi */}
                  <div className="flex-1 text-left">
                    <div
                      className="text-xs font-bold"
                      style={{ color: "var(--c-text)" }}
                    >
                      {exam.label}
                    </div>
                    <div
                      className="text-[9px]"
                      style={{ color: "var(--c-text-muted)" }}
                    >
                      {isDone
                        ? `${result.score}/100 ${result.passed ? "✅ Geçti" : "❌ Kaldı"}`
                        : !unlocked
                          ? "Önceki denemeyi tamamla"
                          : `${exam.questionCount} soru • ${exam.timeMinutes} dk`}
                    </div>
                  </div>

                  {/* Sağ ok */}
                  {unlocked && (!isDone || tasksOk) && (
                    <span
                      className="text-xs"
                      style={{ color: "#0D9488" }}
                    >
                      →
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Zorlu Alanlar & Hata Temizle ─── */}
      <div className="grid grid-cols-2 gap-3 mb-5 stagger">
        <ActionCard
          emoji="🎯"
          title="Zorlu Alanlar"
          subtitle={
            weakAreas.length > 0
              ? `${weakAreas.length} zayıf alan`
              : "Henüz yok"
          }
          gradient="linear-gradient(135deg, rgba(245,158,11,0.08), rgba(249,112,102,0.04))"
          borderColor="rgba(245,158,11,0.15)"
          onClick={() => setActiveMode("weak")}
        />
        <ActionCard
          emoji="🔥"
          title="Hata Temizle"
          subtitle={
            totalWrong > 0
              ? `${totalWrong} yanlış`
              : "Sıfır hata!"
          }
          gradient="linear-gradient(135deg, rgba(244,63,94,0.08), rgba(249,112,102,0.04))"
          borderColor="rgba(244,63,94,0.15)"
          onClick={() => setActiveMode("errors")}
        />
      </div>

      {/* ─── Boş durum ─── */}
      {stats.totalAnswered === 0 && (
        <div className="text-center py-8 anim-up">
          <div className="text-5xl mb-4">📝</div>
          <h3
            className="text-base font-bold mb-2"
            style={{ color: "var(--c-text)" }}
          >
            Henüz soru çözmedin
          </h3>
          <p
            className="text-xs"
            style={{ color: "var(--c-text-muted)" }}
          >
            Konular sekmesinden başla veya deneme çöz!
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Alt Bileşen ─── */
function ActionCard({
  emoji,
  title,
  subtitle,
  gradient,
  borderColor,
  onClick,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  gradient: string;
  borderColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl p-4 text-left active:scale-[0.97] transition-transform anim-up"
      style={{
        background: gradient,
        border: `1px solid ${borderColor}`,
      }}
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <div
        className="font-bold text-xs mb-0.5"
        style={{ color: "var(--c-text)" }}
      >
        {title}
      </div>
      <div
        className="text-[10px]"
        style={{ color: "var(--c-text-muted)" }}
      >
        {subtitle}
      </div>
    </button>
  );
}
