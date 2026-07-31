import { useState, useEffect } from "react";
import { notes, type NoteSegment } from "../data/content";
import TrafficSignSVG from "./TrafficSignSVG";
import { useProgress } from "../lib/useProgress";

interface Props { categoryId: string; categoryName: string; categoryColor: string; onBack: () => void; }

export default function NoteViewer({ categoryId, categoryName, categoryColor, onBack }: Props) {
  const catNotes = notes.filter((n: { categoryId: string }) => n.categoryId === categoryId);
  const [idx, setIdx] = useState(0);
  const progress = useProgress();

  useEffect(() => { if (catNotes[idx]) progress.markNoteRead(catNotes[idx].id); }, [idx, catNotes, progress]);

  if (catNotes.length === 0) return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center anim-up">
      <div className="text-5xl mb-4">📝</div>
      <h2 className="text-base font-bold mb-2" style={{ color: "var(--c-text)" }}>Henüz not eklenmedi</h2>
      <button onClick={onBack} className="btn-primary px-8">Geri Dön</button>
    </div>
  );

  const note = catNotes[idx];
  const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (pct < 0.25 && idx > 0) setIdx(idx - 1);
    else if (pct > 0.75 && idx < catNotes.length - 1) setIdx(idx + 1);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 flex items-center gap-3 px-4 pt-4 pb-3">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center text-lg active:scale-90 transition-transform" style={{ background: "var(--c-surface)", color: "var(--c-text)" }}>←</button>
        <div className="flex-1">
          <h2 className="font-bold text-sm" style={{ color: "var(--c-text)" }}>{categoryName} — Notlar</h2>
          <div className="text-[10px]" style={{ color: "var(--c-text-muted)" }}>{idx + 1} / {catNotes.length}</div>
        </div>
      </div>
      <div className="shrink-0 flex gap-1 px-4 mb-3 justify-center">
        {catNotes.map((_: unknown, i: number) => (<button key={i} onClick={() => setIdx(i)} className="h-1 rounded-full transition-all duration-300" style={{ width: i === idx ? 24 : 8, background: i === idx ? categoryColor : "var(--c-border)" }} />))}
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-6" onClick={handleAreaClick} key={idx}>
        <div className="anim-up">
          <h1 className="text-xl font-extrabold mb-4" style={{ color: "var(--c-text)" }}>{note.title}</h1>
          <div className="space-y-3">
            {note.segments.map((seg: NoteSegment, i: number) => (<SegmentRenderer key={i} segment={seg} color={categoryColor} />))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentRenderer({ segment, color }: { segment: NoteSegment; color: string }) {
  switch (segment.type) {
    case "heading": return <h2 className="text-base font-extrabold pb-1 mb-1" style={{ color: "var(--c-text)", borderBottom: `2px solid ${color}40` }}>{segment.content}</h2>;
    case "text": return <p className="text-sm leading-relaxed" style={{ color: "var(--c-text-secondary)" }}>{segment.content}</p>;
    case "highlight": return <div className="rounded-xl px-4 py-3" style={{ background: `${color}12`, borderLeft: `4px solid ${color}` }}><p className="text-sm font-bold" style={{ color }}>{segment.content}</p></div>;
    case "warning": return <div className="rounded-xl px-4 py-3 flex items-start gap-2" style={{ background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.15)" }}><span className="text-base shrink-0">⚠️</span><p className="text-xs font-semibold leading-relaxed" style={{ color: "#F43F5E" }}>{segment.content}</p></div>;
    case "tip": return <div className="rounded-xl px-4 py-3 flex items-start gap-2" style={{ background: "rgba(13,148,136,0.06)", border: "1px solid rgba(13,148,136,0.15)" }}><span className="text-base shrink-0">💡</span><p className="text-xs font-semibold leading-relaxed" style={{ color: "#0D9488" }}>{segment.content}</p></div>;
    case "table": return (
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--c-border-light)" }}>
        {segment.rows.map((row: [string, string], i: number) => (<div key={i} className="flex" style={{ background: i % 2 === 0 ? "var(--c-surface)" : "var(--c-surface-2)" }}><div className="flex-1 px-3 py-2 text-xs font-semibold" style={{ color: "var(--c-text)", borderRight: "1px solid var(--c-border-light)" }}>{row[0]}</div><div className="flex-1 px-3 py-2 text-xs font-extrabold text-right" style={{ color }}>{row[1]}</div></div>))}
      </div>);
    case "signGrid": return (
      <div className="grid grid-cols-2 gap-3">
        {segment.signs.map((sign: { id: string; name: string; img?: string }, i: number) => (<div key={i} className="flex flex-col items-center gap-2 p-3 rounded-2xl" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border-light)" }}><div className="w-20 h-20 flex items-center justify-center">{sign.img ? <img src={sign.img} alt={sign.name} className="w-full h-full object-contain" loading="lazy" /> : <TrafficSignSVG id={sign.id} size={80} />}</div><span className="text-[10px] font-bold text-center leading-snug" style={{ color: "var(--c-text)" }}>{sign.name}</span></div>))}
      </div>);
    default: return null;
  }
}
