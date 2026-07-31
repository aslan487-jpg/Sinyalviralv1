import { useState, useEffect } from "react";
import {
  flashcards,
  questions,
} from "../data/content";

const features = [
  { icon: "🧠", title: "Akıllı Öğrenme", desc: "Zayıf alanları otomatik tespit eder", color: "#0D9488" },
  { icon: "🎴", title: "Hafıza Kartları", desc: "Görsel ve hap bilgi kartları", color: "#6366F1" },
  { icon: "🎮", title: "Eğlenceli Oyunlar", desc: "Pratik yap, puan topla", color: "#F97066" },
  { icon: "📊", title: "İlerleme Takibi", desc: "Geri sayım ve hedef takibi", color: "#F59E0B" },
  { icon: "🔥", title: "Hata Temizleme", desc: "Kişiye özel hata testleri", color: "#F43F5E" },
  { icon: "🎯", title: "Zorlu Alanlar", desc: "%70 ağırlıklı öğrenme", color: "#10B981" },
];

// Dinamik sayılar — yeni içerik eklendikçe otomatik güncellenir
const stats = [
  { val: `${questions.length}+`, label: "Soru", c: "#0D9488" },
  { val: `${flashcards.length}+`, label: "Kart", c: "#6366F1" },
  { val: "2", label: "Oyun", c: "#F97066" },
];

export default function LandingPage({ onStart }: { onStart: () => void }) {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const feat = features[activeCard];

  return (
    <div className="phone-wrapper">
      <div className="phone-device">
        <div
          className="phone-content flex flex-col"
          style={{ background: "var(--c-bg)" }}
        >
          {/* ─── Logo Alanı ─── */}
          <header
            className="shrink-0 px-5 pt-4 pb-3 anim-up"
            style={{
              background:
                "linear-gradient(135deg, rgba(13,148,136,0.06) 0%, rgba(20,184,166,0.03) 100%)",
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{
                  background: "linear-gradient(135deg, #0D9488, #14B8A6)",
                  boxShadow: "0 4px 16px rgba(13,148,136,0.3)",
                }}
              >
                🚦
              </div>
              <div>
                <h1
                  className="text-xl font-extrabold tracking-tight"
                  style={{ color: "var(--c-text)" }}
                >
                  Sinyal<span style={{ color: "#0D9488" }}>Viral</span>
                </h1>
                <p
                  className="text-[10px] font-medium"
                  style={{ color: "var(--c-text-muted)" }}
                >
                  Ehliyet Sınavına Akıllı Hazırlık
                </p>
              </div>
            </div>
            {/* Şirket ismi */}
            <p
              className="text-center text-[8px] mt-2 font-medium tracking-wide"
              style={{ color: "var(--c-text-muted)", opacity: 0.7 }}
            >
              Essence Yazılım 2026 • SinyalViral
            </p>
          </header>

          <div
            className="mx-5 h-px"
            style={{ background: "var(--c-border)" }}
          />

          {/* ─── Özellikler ─── */}
          <section
            className="shrink-0 px-5 py-4 anim-up"
            style={{ animationDelay: "80ms" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "var(--c-text-muted)" }}
              >
                Özellikler
              </span>
              <div className="flex gap-1">
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCard(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeCard ? 16 : 6,
                      height: 6,
                      background:
                        i === activeCard
                          ? features[i].color
                          : "var(--c-border)",
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              key={activeCard}
              className="rounded-2xl p-4 flex items-center gap-4 anim-up"
              style={{
                background: `${feat.color}10`,
                border: `1px solid ${feat.color}25`,
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: `${feat.color}18` }}
              >
                {feat.icon}
              </div>
              <div>
                <h3
                  className="text-sm font-bold"
                  style={{ color: "var(--c-text)" }}
                >
                  {feat.title}
                </h3>
                <p
                  className="text-[11px] mt-0.5"
                  style={{ color: "var(--c-text-secondary)" }}
                >
                  {feat.desc}
                </p>
              </div>
            </div>
          </section>

          <div
            className="mx-5 h-px"
            style={{ background: "var(--c-border)" }}
          />

          {/* ─── Önizleme ─── */}
          <section
            className="flex-1 px-5 py-4 flex flex-col justify-center anim-up"
            style={{ animationDelay: "160ms" }}
          >
            <div className="glass p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div
                    className="text-sm font-bold"
                    style={{ color: "var(--c-text)" }}
                  >
                    Örnek Kullanıcı 👋
                  </div>
                  <div
                    className="text-[10px]"
                    style={{ color: "var(--c-text-muted)" }}
                  >
                    Sınava 23 gün kaldı
                  </div>
                </div>
                <div
                  className="px-3 py-1.5 rounded-xl text-center"
                  style={{ background: "rgba(13,148,136,0.1)" }}
                >
                  <div
                    className="text-lg font-extrabold"
                    style={{ color: "#0D9488" }}
                  >
                    85%
                  </div>
                  <div
                    className="text-[8px] font-medium"
                    style={{ color: "var(--c-text-muted)" }}
                  >
                    Başarı
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: "🚦", name: "Trafik", pct: 92, color: "#F97066" },
                  { icon: "🏥", name: "İlk Yardım", pct: 78, color: "#10B981" },
                  { icon: "🔧", name: "Araç Tek.", pct: 65, color: "#6366F1" },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-2 text-center"
                    style={{ background: "var(--c-surface-2)" }}
                  >
                    <div className="text-base mb-0.5">{c.icon}</div>
                    <div
                      className="text-[8px] font-semibold mb-1"
                      style={{ color: "var(--c-text-secondary)" }}
                    >
                      {c.name}
                    </div>
                    <div
                      className="h-1 rounded-full overflow-hidden"
                      style={{ background: "var(--c-border)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${c.pct}%`,
                          background: c.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dinamik istatistikler */}
            <div className="flex justify-center gap-8 mt-4">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-lg font-extrabold"
                    style={{ color: s.c }}
                  >
                    {s.val}
                  </div>
                  <div
                    className="text-[9px] font-medium"
                    style={{ color: "var(--c-text-muted)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Footer ─── */}
          <footer
            className="shrink-0 px-5 pb-2 pt-3 anim-up"
            style={{ animationDelay: "240ms" }}
          >
            <button
              onClick={onStart}
              className="w-full py-4 text-white font-bold text-base rounded-2xl active:scale-[0.97] transition-transform"
              style={{
                background: "linear-gradient(135deg, #F97066, #F43F5E)",
                boxShadow: "0 6px 24px rgba(249,112,102,0.35)",
              }}
            >
              Hemen Başla 🚀
            </button>
            <p
              className="text-center text-[10px] mt-2.5"
              style={{ color: "var(--c-text-muted)" }}
            >
              ✓ Ücretsiz &nbsp; ✓ Kayıt gerektirmez &nbsp; ✓ Tamamen Türkçe
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
