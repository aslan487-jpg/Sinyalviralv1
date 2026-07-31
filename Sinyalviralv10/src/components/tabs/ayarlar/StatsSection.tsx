import { useProgress } from "../../../lib/useProgress";
import { categories } from "../../../data/content";
import Section from "./Section";

export default function StatsSection() {
  const progress = useProgress();
  const stats = progress.getTotalStats();

  const overallScore =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : 0;

  return (
    <Section title="İstatistikler">
      {/* Özet kutular */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <MiniStat
          value={stats.totalAnswered}
          label="Soru"
          color="#0D9488"
        />
        <MiniStat
          value={`${overallScore}%`}
          label="Başarı"
          color="#10B981"
        />
        <MiniStat
          value={progress.data.examResults.length}
          label="Deneme"
          color="#F59E0B"
        />
      </div>

      {/* Kategori bazlı ilerleme */}
      <CategoryStats stats={progress.data.categoryStats} />
    </Section>
  );
}

/* ─── Alt Bileşenler ─── */

function MiniStat({
  value,
  label,
  color,
}: {
  value: number | string;
  label: string;
  color: string;
}) {
  return (
    <div
      className="text-center py-2.5 rounded-xl"
      style={{ background: "var(--c-surface-2)" }}
    >
      <div className="text-base font-extrabold" style={{ color }}>
        {value}
      </div>
      <div
        className="text-[8px] font-medium"
        style={{ color: "var(--c-text-muted)" }}
      >
        {label}
      </div>
    </div>
  );
}

function CategoryStats({
  stats,
}: {
  stats: Record<string, { strengthScore: number }>;
}) {
  const entries = Object.entries(stats);
  if (entries.length === 0) return null;

  return (
    <div
      className="space-y-1.5 pt-3"
      style={{ borderTop: "1px solid var(--c-border-light)" }}
    >
      {entries.map(([catId, stat]) => {
        const cat = categories.find((c) => c.id === catId);
        if (!cat) return null;
        return (
          <div key={catId} className="flex items-center gap-2">
            <span className="text-xs">{cat.icon}</span>
            <span
              className="text-[10px] flex-1 truncate"
              style={{ color: "var(--c-text-secondary)" }}
            >
              {cat.name}
            </span>
            <div
              className="w-14 h-1 rounded-full overflow-hidden"
              style={{ background: "var(--c-border)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${stat.strengthScore}%`,
                  background: cat.color,
                }}
              />
            </div>
            <span
              className="text-[9px] font-bold w-7 text-right"
              style={{ color: "var(--c-text-muted)" }}
            >
              {Math.round(stat.strengthScore)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
