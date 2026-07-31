interface Props {
  onLogout: () => void;
}

export default function DangerZone({ onLogout }: Props) {
  const handleDelete = () => {
    if (!confirm("Tüm verileriniz silinecek. Emin misiniz?")) return;
    if (!confirm("Bu işlem geri alınamaz. Son kez onaylıyor musunuz?"))
      return;
    localStorage.clear();
    onLogout();
  };

  const handleLogout = () => {
    if (confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      onLogout();
    }
  };

  return (
    <>
      {/* Veri sil */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          onClick={handleDelete}
          className="flex flex-col items-center gap-1 py-3 rounded-xl active:scale-95 transition-transform"
          style={{
            background: "rgba(249,112,102,0.15)",
            border: "1px solid rgba(249,112,102,0.25)",
          }}
        >
          <span className="text-lg">🗑️</span>
          <span
            className="text-[9px] font-bold"
            style={{ color: "#F97066" }}
          >
            Veri Sil
          </span>
        </button>
      </div>

      {/* Çıkış */}
      <button
        onClick={handleLogout}
        className="w-full py-3 rounded-xl font-bold text-sm active:scale-95 transition-transform mt-2"
        style={{
          background: "rgba(249,112,102,0.1)",
          border: "1px solid rgba(249,112,102,0.2)",
          color: "#F97066",
        }}
      >
        Çıkış Yap
      </button>
    </>
  );
}
