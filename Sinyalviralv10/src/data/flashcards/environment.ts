import type { Flashcard } from "../types";

export const environmentCards: Flashcard[] = [
  { id: "ev-001", categoryId: "environment", title: "Ekonomik Sürüş", content: "Düşük devirde (2000-2500 RPM) vites değiştir. Sabit hızda sür. Her 50 kg = %2 fazla yakıt.", tip: "Sakin sür = Az yakıt", difficulty: 1 },
  { id: "ev-002", categoryId: "environment", title: "Rölanti", content: "30 saniyeden uzun beklemelerde motoru kapat. Rölantide de yakıt tüketilir.", tip: "30sn üstü = Motor kapat", difficulty: 1 },
  { id: "ev-003", categoryId: "environment", title: "Katalitik Konvertör", content: "Egzozdaki CO, HC, NOx → CO₂, H₂O, N₂'ye dönüştürür. Zararlıyı daha az zararlı yapar.", tip: "Kirliyi temize çevirir", difficulty: 2 },
  { id: "ev-004", categoryId: "environment", title: "Lastik ve Yakıt", content: "Düşük lastik basıncı yakıtı %3-5 artırır. Aylık basınç kontrolü hem güvenlik hem tasarruf.", tip: "Sönük lastik = Fazla yakıt", difficulty: 1 },
  { id: "ev-005", categoryId: "environment", title: "Elektrikli Araçlar", content: "Sessiz çalışır (yaya riski!). Rejeneratif fren: gaz bırak = akü şarj. Sıfır emisyon.", tip: "Sessiz = yayaya DİKKAT!", difficulty: 2 },
  { id: "ev-006", categoryId: "environment", title: "Katalitik Konvertör (Detay)", content: "CO→CO₂, HC→H₂O+CO₂, NOx→N₂ dönüşümü. Kurşunsuz benzin ZORUNLU (kurşun konvertörü bozar).", tip: "Kurşunsuz benzin = ZORUNLU", difficulty: 2 },
  { id: "ev-007", categoryId: "environment", title: "Çevre Kirliliği Türleri", content: "Hava (egzoz), gürültü (motor/klakson), su (yağ sızıntıları), toprak (yakıt döküntüleri), görüntü (çöpler). Tünelde klakson YASAK.", tip: "CO=zehirli, CO₂=sera etkisi", difficulty: 1 },
];
