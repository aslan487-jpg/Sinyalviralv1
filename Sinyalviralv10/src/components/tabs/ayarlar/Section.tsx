interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: Props) {
  return (
    <div className="mb-5 anim-up">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-1 h-3 rounded-full"
          style={{ background: "#0D9488" }}
        />
        <h2
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: "var(--c-text-muted)" }}
        >
          {title}
        </h2>
      </div>
      <div className="glass p-4">{children}</div>
    </div>
  );
}
