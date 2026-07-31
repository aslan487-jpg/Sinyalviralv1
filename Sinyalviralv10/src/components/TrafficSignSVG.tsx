const RED = "#D52B1E";
const DARKRED = "#B71C1C";
const BLUE = "#005BAC";
const DARKBLUE = "#004A8F";
const GREEN = "#00843D";
const YELLOW = "#FFD100";
const WHITE = "#FFFFFF";
const BLACK = "#1A1A1A";

interface Props { id: string; size?: number; }

export default function TrafficSignSVG({ id, size = 60 }: Props) {
  const s = size;
  const Warn = ({ children, bg = WHITE }: { children?: React.ReactNode; bg?: string }) => (
    <svg viewBox="0 0 200 180" width={s} height={s * 0.9} xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,8 192,172 8,172" fill={bg} stroke={RED} strokeWidth="12" strokeLinejoin="round" />
      {children}
    </svg>
  );
  const Prohib = ({ children }: { children?: React.ReactNode }) => (
    <svg viewBox="0 0 200 200" width={s} height={s} xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="92" fill={WHITE} stroke={RED} strokeWidth="14" />
      {children}
    </svg>
  );
  const Mand = ({ children }: { children?: React.ReactNode }) => (
    <svg viewBox="0 0 200 200" width={s} height={s} xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="95" fill={BLUE} stroke={DARKBLUE} strokeWidth="4" />
      {children}
    </svg>
  );
  const Info = ({ children, bg = BLUE }: { children?: React.ReactNode; bg?: string }) => (
    <svg viewBox="0 0 200 200" width={s} height={s} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="192" height="192" rx="12" fill={bg} stroke={bg === GREEN ? "#006030" : DARKBLUE} strokeWidth="4" />
      {children}
    </svg>
  );

  switch (id) {
    case "dur":
      return (<svg viewBox="0 0 200 200" width={s} height={s}><polygon points="100,6 162,28 190,80 190,120 162,172 100,194 38,172 10,120 10,80 38,28" fill={RED} stroke={DARKRED} strokeWidth="4" /><polygon points="100,18 154,38 178,84 178,116 154,162 100,182 46,162 22,116 22,84 46,38" fill={RED} stroke={WHITE} strokeWidth="4" /><text x="100" y="118" textAnchor="middle" fontSize="52" fontWeight="bold" fill={WHITE}>DUR</text></svg>);
    case "yol-ver":
      return (<svg viewBox="0 0 200 200" width={s} height={s}><polygon points="100,190 10,20 190,20" fill={WHITE} stroke={RED} strokeWidth="14" strokeLinejoin="round" /></svg>);
    case "ana-yol":
      return (<svg viewBox="0 0 200 200" width={s} height={s}><rect x="30" y="30" width="140" height="140" rx="5" fill={YELLOW} stroke={BLACK} strokeWidth="4" transform="rotate(45 100 100)" /></svg>);
    case "girilmez":
      return (<svg viewBox="0 0 200 200" width={s} height={s}><circle cx="100" cy="100" r="92" fill={RED} stroke={DARKRED} strokeWidth="4" /><rect x="30" y="85" width="140" height="30" rx="5" fill={WHITE} /></svg>);
    case "hiz-siniri-50":
      return <Prohib><text x="100" y="120" textAnchor="middle" fontSize="72" fontWeight="bold" fill={BLACK}>50</text></Prohib>;
    case "sollama-yasak":
      return <Prohib><rect x="55" y="55" width="28" height="55" rx="8" fill={BLACK} /><rect x="105" y="55" width="28" height="55" rx="8" fill={RED} /></Prohib>;
    case "park-yasak":
      return (<svg viewBox="0 0 200 200" width={s} height={s}><circle cx="100" cy="100" r="92" fill={BLUE} stroke={DARKBLUE} strokeWidth="4" /><line x1="35" y1="165" x2="165" y2="35" stroke={RED} strokeWidth="14" /></svg>);
    case "ileri-mecburi":
      return <Mand><polygon points="100,30 70,100 85,100 85,165 115,165 115,100 130,100" fill={WHITE} /></Mand>;
    case "saga-mecburi":
      return <Mand><polygon points="165,100 100,70 100,85 35,85 35,115 100,115 100,130" fill={WHITE} /></Mand>;
    case "sola-mecburi":
      return <Mand><polygon points="35,100 100,70 100,85 165,85 165,115 100,115 100,130" fill={WHITE} /></Mand>;
    case "donel-kavsak-yonu":
      return <Mand><circle cx="100" cy="100" r="30" fill="none" stroke={WHITE} strokeWidth="14" /><polygon points="125,68 140,82 120,85" fill={WHITE} /></Mand>;
    case "otoyol-baslangic":
      return <Info bg={GREEN}><path d="M60,160 L60,70 Q60,40 85,40 L115,40 Q140,40 140,70 L140,160" fill="none" stroke={WHITE} strokeWidth="10" /><line x1="100" y1="160" x2="100" y2="90" stroke={WHITE} strokeWidth="5" /></Info>;
    case "tek-yon":
      return <Info><polygon points="160,100 100,55 100,75 40,75 40,125 100,125 100,145" fill={WHITE} /></Info>;
    case "park-yeri":
      return <Info><text x="100" y="132" textAnchor="middle" fontSize="90" fontWeight="bold" fill={WHITE}>P</text></Info>;
    case "kaygan-yol":
      return <Warn><path d="M80,140 Q85,110 100,100 Q115,90 110,60" fill="none" stroke={BLACK} strokeWidth="12" strokeLinecap="round" /></Warn>;
    case "kontrolsuz-kavsak":
      return <Warn><line x1="100" y1="45" x2="100" y2="150" stroke={BLACK} strokeWidth="14" /><line x1="60" y1="100" x2="140" y2="100" stroke={BLACK} strokeWidth="14" /></Warn>;
    case "yaya-gecidi-uyari":
      return <Warn><text x="100" y="125" textAnchor="middle" fontSize="55">🚶</text></Warn>;
    case "okul-gecidi":
      return <Warn><text x="100" y="125" textAnchor="middle" fontSize="55">🚸</text></Warn>;
    default:
      return (<svg viewBox="0 0 200 200" width={s} height={s}><circle cx="100" cy="100" r="80" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="4" /><text x="100" y="110" textAnchor="middle" fontSize="28" fill="#9ca3af">?</text></svg>);
  }
}
