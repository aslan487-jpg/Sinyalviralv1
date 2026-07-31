import { type UserData, useDaysUntilExam } from "../../lib/hooks";
import { useProgress } from "../../lib/useProgress";
import {
  categories,
  flashcards as allCards,
  notes as allNotes,
  questions as allQuestions,
} from "../../data/content";

export default function AnaSayfaTab({ user }: { user: UserData }) {
  const daysLeft = useDaysUntilExam(user.examDate);
  const progress = useProgress();
  const stats = progress.getTotalStats();

  const pct =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : 0;

  const weak = progress.getWeakCategoryIds();
  const lastExam = progress.getLastExam();
  const streak = progress.data.streak;
  const notesRead = progress.getNotesRead();
  const cardsSeen = progress.getCardsSeen();
  const totalNotes = allNotes.length;
  const totalCards = allCards.length;

  // Hazırlık yüzdesi hesaplama
  const notesPct = totalNotes > 0 ? (notesRead / totalNotes) * 100 : 0;
  const cardsPct = totalCards > 0 ? (cardsSeen / totalCards) * 100 : 0;
  const questionsPct = Math.min((stats.totalAnswered / 200) * 100, 100);
  const examsPct =
    progress.data.examResults.length > 0
      ? Math.min((progress.data.examResults.length / 5) * 100, 100)
      : 0;
  const readiness = Math.round(
    notesPct * 0.2 + cardsPct * 0.2 + questionsPct * 0.3 + examsPct * 0.3
  );

  // SVG circle hesaplama
  const circleR = 58;
  const circleC = 2 * Math.PI * circleR;
  const circleOffset = circleC - (circleC * readiness) / 100;
  const circleColor =
    readiness >= 70 ? "#10B981" : readiness >= 40 ? "#F59E0B" : "#F97066";

  return (
    <div className="px-4 pt-5 pb-6">
      {/* Karşılama */}
      <div className="flex justify-between items-start mb-5 anim-up">
        <div>
          <h1
            className="text-xl font-extrabold"
            style={{ color: "var(--c-text)" }}
          >
            Merhaba, {user.name}! 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--c-text-muted)" }}>
            Bugün ne öğrenelim?
          </p>
        </div>
        <DaysCounter daysLeft={daysLeft} />
      </div>

      {/* Hazırlık çemberi */}
      <div
        className="glass p-5 mb-5 anim-up"
        style={{ animationDelay: "50ms" }}
      >
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle
                cx="65" cy="65" r={circleR}
                fill="none" stroke="var(--c-border)" strokeWidth="10"
              />
              <circle
                cx="65" cy="65" r={circleR}
                fill="none" stroke={circleColor} strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circleC}
                strokeDashoffset={circleOffset}
                transform="rotate(-90 65 65)"
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className="text-2xl font-extrabold"
                style={{ color: circleColor }}
              >
                %{readiness}
              </div>
              <div
                className="text-[10px] font-semibold"
                style={{ color: "var(--c-text-muted)" }}
              >
                Hazırlık
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2.5">
            <StatRow
              icon="📝" label="Notlar"
              value={notesRead} total={totalNotes} color="#6366F1"
            />
            <StatRow
              icon="🎴" label="Kartlar"
              value={cardsSeen} total={totalCards} color="#F59E0B"
            />
            <StatRow
              icon="❓" label="Sorular"
              value={stats.totalAnswered} total={200} color="#0D9488"
            />
            <StatRow
              icon="📋" label="Denemeler"
              value={progress.data.examResults.length} total={5}
              color="#F97066"
            />
          </div>
        </div>
      </div>

      {/* İstatistik kutuları */}
      <div
        className="grid grid-cols-2 gap-3 mb-5 anim-up"
        style={{ animationDelay: "100ms" }}
      >
        <StatBox
          value={pct > 0 ? `%${pct}` : "—"}
          label="Doğru Oranı"
          color={pct >= 70 ? "#10B981" : pct > 0 ? "#F59E0B" : "var(--c-text-muted)"}
        />
        <StatBox
          value={streak > 0 ? `🔥 ${streak}` : "—"}
          label="Gün Serisi"
          color={streak > 0 ? "#F59E0B" : "var(--c-text-muted)"}
        />
      </div>

      {/* Son deneme */}
      {lastExam && (
        <div
          className="glass p-4 mb-5 anim-up"
          style={{ animationDelay: "150ms" }}
        >
          <div className="text-xs font-bold" style={{ color: "var(--c-text-muted)" }}>
            Son Deneme
          </div>
          <div
            className="text-lg font-extrabold mt-0.5"
            style={{ color: lastExam.passed ? "#10B981" : "#F43F5E" }}
          >
            {lastExam.score}/100 {lastExam.passed ? "✅ Geçti" : "❌ Kaldı"}
          </div>
        </div>
      )}

      {/* Zorlu alanlar */}
      {weak.length > 0 && (
        <div
          className="glass p-4 mb-5 anim-up"
          style={{
            animationDelay: "200ms",
            border: "1px solid rgba(244,63,94,0.15)",
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <div
                className="text-sm font-bold"
                style={{ color: "#F43F5E" }}
              >
                Zorlu Alanlar Tespit Edildi
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: "var(--c-text-muted)" }}
              >
                {weak
                  .map((id) => categories.find((c) => c.id === id)?.name)
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hızlı erişim */}
      <div className="anim-up" style={{ animationDelay: "250ms" }}>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-1 h-4 rounded-full"
            style={{ background: "#0D9488" }}
          />
          <h2
            className="text-sm font-bold"
            style={{ color: "var(--c-text-secondary)" }}
          >
            Hızlı Erişim
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {categories.slice(0, 6).map((cat) => {
            const catQ = allQuestions.filter(
              (q) => q.categoryId === cat.id
            ).length;
            return (
              <div
                key={cat.id}
                className="rounded-xl p-3 text-center"
                style={{
                  background: "var(--c-surface)",
                  border: "1px solid var(--c-border-light)",
                }}
              >
                <div className="text-2xl mb-1">{cat.icon}</div>
                <div
                  className="text-[10px] font-bold truncate"
                  style={{ color: "var(--c-text)" }}
                >
                  {cat.name.split(" ")[0]}
                </div>
                <div
                  className="text-[9px] mt-0.5"
                  style={{ color: "var(--c-text-muted)" }}
                >
                  {catQ} soru
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Alt Bileşenler ─── */

function DaysCounter({ daysLeft }: { daysLeft: number }) {
  return (
    <div
      className="text-center px-4 py-2.5 rounded-2xl"
      style={{
        background: "rgba(13,148,136,0.08)",
        border: "1px solid rgba(13,148,136,0.12)",
      }}
    >
      <div
        className="text-[10px] font-medium"
        style={{ color: "var(--c-text-muted)" }}
      >
        Sınava
      </div>
      <div
        className="text-2xl font-extrabold leading-none"
        style={{ color: "#0D9488" }}
      >
        {daysLeft}
      </div>
      <div
        className="text-[10px] font-medium"
        style={{ color: "var(--c-text-muted)" }}
      >
        gün
      </div>
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
  total,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? Math.min((value / total) * 100, 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm w-5">{icon}</span>
      <span
        className="text-xs w-16 font-medium"
        style={{ color: "var(--c-text-muted)" }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ background: "var(--c-border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="text-[10px] font-bold w-12 text-right"
        style={{ color }}
      >
        {value}/{total}
      </span>
    </div>
  );
}

function StatBox({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="glass p-4 text-center">
      <div className="text-2xl font-extrabold" style={{ color }}>
        {value}
      </div>
      <div
        className="text-xs font-semibold mt-1"
        style={{ color: "var(--c-text-muted)" }}
      >
        {label}
      </div>
    </div>
  );
}
