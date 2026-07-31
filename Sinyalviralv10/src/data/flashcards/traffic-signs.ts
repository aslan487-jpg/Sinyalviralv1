import type { Flashcard } from "../types";

export const trafficSignsCards: Flashcard[] = [
  { id: "ts-001", categoryId: "traffic-signs", title: "DUR İşareti", content: "Sekizgen (8 köşeli), kırmızı zemin. Araç TAMAMEN durmalı, kimse olmasa bile.", tip: "8 köşe = Kesin DUR", difficulty: 1 },
  { id: "ts-002", categoryId: "traffic-signs", title: "Yol Ver İşareti", content: "Ters üçgen, kırmızı kenarlı. Ana yoldakine yol ver, gerekirse dur. DUR'dan farklı: müsaitse durmadan geçebilirsin.", tip: "Ters üçgen = Yol ver", difficulty: 1 },
  { id: "ts-003", categoryId: "traffic-signs", title: "Tehlike Uyarı Levhaları", content: "Üçgen, kırmızı kenarlı, beyaz zemin = kalıcı tehlike. Sarı zemin = geçici tehlike (yol çalışması).", tip: "Beyaz=kalıcı, Sarı=geçici", difficulty: 1 },
  { id: "ts-004", categoryId: "traffic-signs", title: "Yasaklama Levhaları", content: "Kırmızı kenarlı daire. İçindeki sembol neyin yasak olduğunu gösterir.", tip: "Kırmızı daire = Yasak", difficulty: 1 },
  { id: "ts-005", categoryId: "traffic-signs", title: "Zorunluluk Levhaları", content: "Mavi daire, beyaz sembol. Belirtilen yöne gitme veya eylemi yapma zorunlu.", tip: "Mavi daire = Zorunlu", difficulty: 1 },
  { id: "ts-006", categoryId: "traffic-signs", title: "Azami vs Asgari Hız", content: "Kırmızı daire + sayı = azami (aşma!). Mavi daire + sayı = asgari (altına düşme!).", tip: "Kırmızı=Max, Mavi=Min", difficulty: 2 },
  { id: "ts-007", categoryId: "traffic-signs", title: "Park vs Duraklama Yasağı", content: "Tek mavi çizgi (X) = park yasak, duraklama serbest. Çift çizgi (XX) = her ikisi de yasak.", tip: "Tek çizgi=park yok, Çift=hiç durma", difficulty: 2 },
  { id: "ts-008", categoryId: "traffic-signs", title: "Girilmez vs Trafiğe Kapalı", content: "Girilmez (beyaz çizgi): sadece bu yönden giriş yasak. Trafiğe kapalı: her yönden her şey yasak.", tip: "Girilmez=tek yön, Kapalı=tamamen", difficulty: 2 },
  { id: "ts-009", categoryId: "traffic-signs", title: "Yol Çizgileri", content: "Kesik beyaz: geçilebilir. Sürekli beyaz: geçilemez. Sarı sürekli: duraklama yasak. Sarı kesik: park yasak.", tip: "Kesik=geç, Sürekli=geçme", difficulty: 2 },
  { id: "ts-010", categoryId: "traffic-signs", title: "Trafik Işıkları", content: "Kırmızı: DUR. Sarı: güvenle duramıyorsan geç. Yeşil: geç. Yanıp sönen sarı: dikkatli geç. Yanıp sönen kırmızı: dur ve kontrol et.", tip: "Sarı=dur VEYA geç (güvenlik)", difficulty: 1 },
  { id: "ts-011", categoryId: "traffic-signs", title: "Oklu Trafik Işıkları", content: "Yeşil ok = sadece ok yönüne geçilebilir. Yeşil ok + kırmızı = yalnızca ok yönüne. Kırmızı ok = o yöne dönülemez.", tip: "Ok yönü = izin verilen yön", difficulty: 2 },
];
