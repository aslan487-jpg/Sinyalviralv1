import { useState } from "react";
import { type UserData } from "../../lib/hooks";
import ProfileSection from "./ayarlar/ProfileSection";
import AppearanceSection from "./ayarlar/AppearanceSection";
import StatsSection from "./ayarlar/StatsSection";
import AppInfoSection from "./ayarlar/AppInfoSection";
import DangerZone from "./ayarlar/DangerZone";

interface Props {
  user: UserData;
  onLogout: () => void;
  onUpdate: (user: UserData) => void;
}

export default function AyarlarTab({ user, onLogout, onUpdate }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="px-4 pt-5 pb-8 relative">
      {/* Toast bildirimi */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-xl text-xs font-bold shadow-xl anim-up glass">
          {toast}
        </div>
      )}

      <h1
        className="text-lg font-extrabold mb-5 anim-up"
        style={{ color: "var(--c-text)" }}
      >
        ⚙️ Ayarlar
      </h1>

      <ProfileSection
        user={user}
        onUpdate={onUpdate}
        showToast={showToast}
      />
      <AppearanceSection />
      <StatsSection />
      <AppInfoSection />
      {/* İleride buraya eklenebilir:
        <NotificationSection />
        <LanguageSection />
        <AccessibilitySection />
      */}
      <DangerZone onLogout={onLogout} />
    </div>
  );
}
