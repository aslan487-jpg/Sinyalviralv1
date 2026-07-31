import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "traffic-rules",
    name: "Trafik Kuralları",
    icon: "🚦",
    color: "#F97066",
    description: "Hız, geçiş, park kuralları",
  },
  {
    id: "traffic-signs",
    name: "Trafik İşaretleri",
    icon: "⚠️",
    color: "#F59E0B",
    description: "Levhalar ve anlamları",
  },
  {
    id: "first-aid",
    name: "İlk Yardım",
    icon: "🏥",
    color: "#10B981",
    description: "Kaza anında müdahale",
  },
  {
    id: "vehicle-tech",
    name: "Araç Tekniği",
    icon: "🔧",
    color: "#6366F1",
    description: "Motor ve bakım bilgisi",
  },
  {
    id: "environment",
    name: "Çevre ve Yakıt",
    icon: "🌿",
    color: "#8B5CF6",
    description: "Ekonomik ve çevreci sürüş",
  },
  {
    id: "traffic-ethics",
    name: "Trafik Adabı",
    icon: "🤝",
    color: "#EC4899",
    description: "Nezaket ve güvenlik",
  },
];
