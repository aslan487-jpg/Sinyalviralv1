import { useState, useEffect } from "react";
import { useUser, type UserData } from "../lib/hooks";
import AnaSayfaTab from "./tabs/AnaSayfaTab";
import KonularTab from "./tabs/KonularTab";
import TekrarTab from "./tabs/TekrarTab";
import OyunTab from "./tabs/OyunTab";
import AyarlarTab from "./tabs/AyarlarTab";

interface MainAppProps {
  userId: string;
  onLogout: () => void;
}

const tabs = [
  { id: "ana" as const, label: "Ana Sayfa", icon: "🏠" },
  { id: "konular" as const, label: "Konular", icon: "📚" },
  { id: "tekrar" as const, label: "Tekrar", icon: "🔄" },
  { id: "oyun" as const, label: "Oyun", icon: "🎮" },
  { id: "ayarlar" as const, label: "Ayarlar", icon: "⚙️" },
];

type TabId = "ana" | "konular" | "tekrar" | "oyun" | "ayarlar";

export default function MainApp({ userId, onLogout }: MainAppProps) {
  const { getUser } = useUser();
  const [activeTab, setActiveTab] = useState<TabId>("ana");
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = getUser(userId);
    setUser(userData);
  }, [userId, getUser]);

  const handleUpdateUser = (updated: UserData) => {
    setUser(updated);
  };

  if (!user) {
    return (
      <div className="app-shell items-center justify-center" style={{ display: "flex" }}>
        <span className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: "var(--c-border)", borderTopColor: "#0D9488" }} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === "ana" && <AnaSayfaTab user={user} />}
        {activeTab === "konular" && <KonularTab user={user} />}
        {activeTab === "tekrar" && <TekrarTab />}
        {activeTab === "oyun" && <OyunTab />}
        {activeTab === "ayarlar" && <AyarlarTab user={user} onLogout={onLogout} onUpdate={handleUpdateUser} />}
      </main>

      <nav className="shrink-0 border-t" style={{ background: "var(--c-surface-glass)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderColor: "var(--c-border-light)" }}>
        <div className="flex justify-around py-1.5">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all active:scale-90 ${active ? "tab-active" : ""}`}
              >
                <span className="text-lg" style={{ transform: active ? "scale(1.15)" : "scale(1)", transition: "transform 0.2s" }}>{tab.icon}</span>
                <span className="text-[9px] font-semibold" style={{ color: active ? "#0D9488" : "var(--c-text-muted)" }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
