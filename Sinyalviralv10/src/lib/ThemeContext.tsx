import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ThemeMode = "dark" | "light";
export type FontFamily = "inter" | "nunito" | "poppins" | "dm-sans";
export type FontSizeLevel = "small" | "medium" | "large";

interface ThemeSettings {
  mode: ThemeMode;
  fontFamily: FontFamily;
  fontSize: FontSizeLevel;
}

interface ThemeContextType {
  settings: ThemeSettings;
  setMode: (m: ThemeMode) => void;
  setFontFamily: (f: FontFamily) => void;
  setFontSize: (s: FontSizeLevel) => void;
}

const defaults: ThemeSettings = { mode: "light", fontFamily: "inter", fontSize: "medium" };

const ThemeContext = createContext<ThemeContextType>({
  settings: defaults,
  setMode: () => {},
  setFontFamily: () => {},
  setFontSize: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(defaults);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sv_theme");
      if (stored) setSettings(JSON.parse(stored));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("sv_theme", JSON.stringify(settings));
    const html = document.documentElement;
    html.classList.remove("theme-dark", "theme-light");
    html.classList.add(`theme-${settings.mode}`);
    const fontMap: Record<FontFamily, string> = {
      inter: "'Inter',sans-serif",
      nunito: "'Nunito',sans-serif",
      poppins: "'Poppins',sans-serif",
      "dm-sans": "'DM Sans',sans-serif",
    };
    html.style.setProperty("--font-family", fontMap[settings.fontFamily]);
    html.classList.remove("ui-small", "ui-medium", "ui-large");
    html.classList.add(`ui-${settings.fontSize}`);
    const scaleMap: Record<FontSizeLevel, string> = { small: "0.85", medium: "1", large: "1.15" };
    html.style.setProperty("--ui-scale", scaleMap[settings.fontSize]);
  }, [settings, ready]);

  const setMode = (mode: ThemeMode) => setSettings((s) => ({ ...s, mode }));
  const setFontFamily = (fontFamily: FontFamily) => setSettings((s) => ({ ...s, fontFamily }));
  const setFontSize = (fontSize: FontSizeLevel) => setSettings((s) => ({ ...s, fontSize }));

  if (!ready) return null;

  return (
    <ThemeContext.Provider value={{ settings, setMode, setFontFamily, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
