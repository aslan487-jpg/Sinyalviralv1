import { useState } from "react";
import { getDefaultExamDate } from "../lib/utils";
import { useUser, type UserData } from "../lib/hooks";

interface Props {
  onComplete: (user: UserData) => void;
}

export default function OnboardingPage({ onComplete }: Props) {
  const { createUser } = useUser();
  const [name, setName] = useState("");
  const [examDate, setExamDate] = useState(getDefaultExamDate());
  const [dailyLessonGoal, setDailyLessonGoal] = useState(3);
  const [dailyQuestionGoal, setDailyQuestionGoal] = useState(30);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = name.trim().length >= 2 && examDate.length > 0;

  const handleSubmit = () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    const user = createUser({
      name: name.trim(),
      examDate,
      dailyLessonGoal,
      dailyQuestionGoal,
    });
    onComplete(user);
  };

  return (
    <div className="phone-wrapper">
      <div className="phone-device">
        <div className="phone-content flex flex-col" style={{ background: "var(--c-bg)" }}>
          <header className="shrink-0 px-5 pt-3 pb-4 text-center anim-up">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2" style={{ background: "rgba(13,148,136,0.1)", border: "1px solid rgba(13,148,136,0.15)" }}>📋</div>
            <h1 className="text-lg font-extrabold" style={{ color: "var(--c-text)" }}>Profil Oluştur</h1>
            <p className="text-[11px] mt-1" style={{ color: "var(--c-text-muted)" }}>Bilgilerini gir, sana özel plan oluşturalım</p>
          </header>

          <div className="flex-1 px-5 overflow-y-auto no-scrollbar anim-up" style={{ animationDelay: "100ms" }}>
            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: "var(--c-text-secondary)" }}>
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(13,148,136,0.1)" }}>👤</span>
                  Adınız
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Adınızı yazın..." className="input-field" autoFocus />
                {name.length > 0 && name.trim().length < 2 && (
                  <p className="text-[10px] mt-1" style={{ color: "#F43F5E" }}>En az 2 karakter gerekli</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: "var(--c-text-secondary)" }}>
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(249,112,102,0.1)" }}>📅</span>
                  Sınav Tarihi
                </label>
                <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="input-field" />
              </div>

              <div>
                <label className="flex items-center justify-between text-xs font-semibold mb-3" style={{ color: "var(--c-text-secondary)" }}>
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(99,102,241,0.1)" }}>📚</span>
                    Günlük Ders Kartı
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg text-sm font-extrabold" style={{ background: "rgba(13,148,136,0.1)", color: "#0D9488" }}>{dailyLessonGoal}</span>
                </label>
                <input type="range" min={1} max={10} value={dailyLessonGoal} onChange={(e) => setDailyLessonGoal(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-[9px] mt-1" style={{ color: "var(--c-text-muted)" }}><span>1</span><span>10</span></div>
              </div>

              <div>
                <label className="flex items-center justify-between text-xs font-semibold mb-3" style={{ color: "var(--c-text-secondary)" }}>
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(245,158,11,0.1)" }}>❓</span>
                    Günlük Soru Hedefi
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg text-sm font-extrabold" style={{ background: "rgba(13,148,136,0.1)", color: "#0D9488" }}>{dailyQuestionGoal}</span>
                </label>
                <input type="range" min={5} max={100} step={5} value={dailyQuestionGoal} onChange={(e) => setDailyQuestionGoal(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-[9px] mt-1" style={{ color: "var(--c-text-muted)" }}><span>5</span><span>100</span></div>
              </div>
            </div>
          </div>

          <footer className="shrink-0 px-5 pt-3 pb-2 anim-up" style={{ animationDelay: "200ms" }}>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="w-full py-3.5 text-white font-bold text-sm rounded-2xl active:scale-[0.97] transition-all disabled:opacity-40"
              style={{
                background: canSubmit ? "linear-gradient(135deg, #0D9488, #14B8A6)" : "var(--c-border)",
                boxShadow: canSubmit ? "0 6px 20px rgba(13,148,136,0.3)" : "none",
              }}
            >
              {submitting ? "Kaydediliyor..." : "Başlayalım 🚀"}
            </button>
            <p className="text-center text-[10px] mt-2.5" style={{ color: "var(--c-text-muted)" }}>Verileriniz güvenle saklanır</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
