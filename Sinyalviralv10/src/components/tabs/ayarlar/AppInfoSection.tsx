import Section from "./Section";

export default function AppInfoSection() {
  return (
    <Section title="Uygulama">
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span style={{ color: "var(--c-text-muted)" }}>Versiyon</span>
          <span style={{ color: "var(--c-text-secondary)" }}>1.0.0</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "var(--c-text-muted)" }}>Uygulama</span>
          <span className="font-bold" style={{ color: "#0D9488" }}>
            SinyalViral
          </span>
        </div>
      </div>
    </Section>
  );
}
