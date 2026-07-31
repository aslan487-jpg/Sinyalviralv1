import { useState } from "react";
import { useUser, type UserData } from "../../../lib/hooks";
import Section from "./Section";

interface Props {
  user: UserData;
  onUpdate: (user: UserData) => void;
  showToast: (msg: string) => void;
}

export default function ProfileSection({ user, onUpdate, showToast }: Props) {
  const { updateUser } = useUser();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [examDate, setExamDate] = useState(user.examDate);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    const updated = updateUser(user.id, { name, examDate });
    if (updated) {
      onUpdate(updated);
      setEditing(false);
      showToast("✅ Profil kaydedildi");
    }
    setSaving(false);
  };

  return (
    <Section title="Profil">
      {/* Profil başlığı */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-extrabold text-white"
          style={{
            background: "linear-gradient(135deg, #0D9488, #14B8A6)",
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3
            className="font-bold text-sm"
            style={{ color: "var(--c-text)" }}
          >
            {user.name}
          </h3>
          <p
            className="text-[10px]"
            style={{ color: "var(--c-text-muted)" }}
          >
            Sınav: {new Date(user.examDate).toLocaleDateString("tr-TR")}
          </p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="text-xs font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
          style={{
            color: "#0D9488",
            background: "rgba(13,148,136,0.1)",
          }}
        >
          {editing ? "İptal" : "Düzenle"}
        </button>
      </div>

      {/* Düzenleme formu */}
      {editing && (
        <div
          className="space-y-3 pt-3 anim-up"
          style={{ borderTop: "1px solid var(--c-border-light)" }}
        >
          <div>
            <label
              className="text-[10px] font-semibold mb-1.5 block"
              style={{ color: "var(--c-text-secondary)" }}
            >
              👤 İsim
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field text-sm"
            />
          </div>
          <div>
            <label
              className="text-[10px] font-semibold mb-1.5 block"
              style={{ color: "var(--c-text-secondary)" }}
            >
              📅 Sınav Tarihi
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="input-field text-sm"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary w-full text-sm disabled:opacity-50"
          >
            {saving ? "Kaydediliyor..." : "💾 Kaydet"}
          </button>
        </div>
      )}
    </Section>
  );
}
