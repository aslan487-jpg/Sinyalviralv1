import {
  useTheme,
  type ThemeMode,
  type FontFamily,
  type FontSizeLevel,
} from "../../../lib/ThemeContext";
import Section from "./Section";

const fontOptions: { value: FontFamily; label: string }[] = [
  { value: "inter", label: "Inter" },
  { value: "nunito", label: "Nunito" },
  { value: "poppins", label: "Poppins" },
  { value: "dm-sans", label: "DM Sans" },
];

const sizeOptions: {
  value: FontSizeLevel;
  label: string;
  size: string;
}[] = [
  { value: "small", label: "A", size: "12px" },
  { value: "medium", label: "A", size: "16px" },
  { value: "large", label: "A", size: "20px" },
];

export default function AppearanceSection() {
  const { settings, setMode, setFontFamily, setFontSize } = useTheme();

  return (
    <Section title="Görünüm">
      {/* Tema modu */}
      <div className="mb-4">
        <label
          className="text-[10px] font-semibold mb-2 block"
          style={{ color: "var(--c-text-secondary)" }}
        >
          🌓 Tema Modu
        </label>
        <div className="flex gap-2">
          {(["dark", "light"] as ThemeMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all"
              style={{
                background:
                  settings.mode === m
                    ? "rgba(13,148,136,0.15)"
                    : "var(--c-surface-2)",
                border: `2px solid ${
                  settings.mode === m
                    ? "#0D9488"
                    : "var(--c-border-light)"
                }`,
                color:
                  settings.mode === m
                    ? "#0D9488"
                    : "var(--c-text-muted)",
              }}
            >
              {m === "dark" ? "🌙 Gece" : "☀️ Gündüz"}
            </button>
          ))}
        </div>
      </div>

      {/* Yazı tipi */}
      <div className="mb-4">
        <label
          className="text-[10px] font-semibold mb-2 block"
          style={{ color: "var(--c-text-secondary)" }}
        >
          🔤 Yazı Tipi
        </label>
        <div className="grid grid-cols-2 gap-2">
          {fontOptions.map((f) => (
            <button
              key={f.value}
              onClick={() => setFontFamily(f.value)}
              className="py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all"
              style={{
                background:
                  settings.fontFamily === f.value
                    ? "rgba(13,148,136,0.15)"
                    : "var(--c-surface-2)",
                border: `2px solid ${
                  settings.fontFamily === f.value
                    ? "#0D9488"
                    : "var(--c-border-light)"
                }`,
                color:
                  settings.fontFamily === f.value
                    ? "#0D9488"
                    : "var(--c-text-muted)",
                fontFamily:
                  f.value === "dm-sans"
                    ? "'DM Sans'"
                    : `'${f.label}'`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Yazı boyutu */}
      <div>
        <label
          className="text-[10px] font-semibold mb-2 block"
          style={{ color: "var(--c-text-secondary)" }}
        >
          📏 Yazı Boyutu
        </label>
        <div className="flex gap-2">
          {sizeOptions.map((s) => (
            <button
              key={s.value}
              onClick={() => setFontSize(s.value)}
              className="flex-1 py-3 rounded-xl font-bold active:scale-95 transition-all flex flex-col items-center gap-0.5"
              style={{
                fontSize: s.size,
                background:
                  settings.fontSize === s.value
                    ? "rgba(13,148,136,0.15)"
                    : "var(--c-surface-2)",
                border: `2px solid ${
                  settings.fontSize === s.value
                    ? "#0D9488"
                    : "var(--c-border-light)"
                }`,
                color:
                  settings.fontSize === s.value
                    ? "#0D9488"
                    : "var(--c-text-muted)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}
