import type { Note } from "../types";

export const environmentNotes: Note[] = [
  {
    id: "note-eco",
    categoryId: "environment",
    title: "Çevre Bilgisi ve Ekonomik Sürüş",
    segments: [
      { type: "heading", content: "Trafiğin Çevreye Etkileri" },
      { type: "table", rows: [["Hava kirliliği", "Egzoz gazları (CO, CO₂, NOx, HC)"], ["Gürültü kirliliği", "Motor, klakson, lastik sürtünmesi"], ["Su kirliliği", "Yol yüzeyindeki yağ ve yakıt sızıntıları"], ["Toprak kirliliği", "Araç atıkları, yakıt döküntüleri"], ["Görüntü kirliliği", "Çöpler, izinsiz levhalar"]] },
      { type: "heading", content: "Katalitik Konvertör" },
      { type: "table", rows: [["CO → CO₂", "Zehirli → daha az zararlı"], ["HC → H₂O + CO₂", "Kanser yapıcı → zararsız"], ["NOx → N₂", "Asit yağmuru → zararsız"]] },
      { type: "warning", content: "Katalitik konvertörlü araçlarda KURŞUNSUZ benzin kullanılmalı!" },
      { type: "heading", content: "Çevre Dostu Sürüş Teknikleri" },
      { type: "table", rows: [["✅ Erken vites almak", "Yakıt tasarrufu"], ["✅ Öngörülü sürüş", "Fren yerine gaz kes"], ["✅ Sabit hızda seyret", "Yakıt tasarrufu"], ["✅ Lastik basıncını doğru tut", "Yakıt + güvenlik"], ["❌ Agresif hızlanma", "En çok yakıt harcayan"], ["❌ Gereksiz rölanti", "Hem israf hem kirlilik"]] },
      { type: "heading", content: "Egzoz Duman Renkleri" },
      { type: "table", rows: [["Görünmez", "Normal ✅"], ["Beyaz", "Su buharı (soğukta normal)"], ["Mavi", "Yağ yakıyor ❌"], ["Siyah", "Fazla yakıt ❌"]] },
      { type: "heading", content: "Önemli Bilgiler" },
      { type: "table", rows: [["CO (Karbon monoksit)", "Renksiz, kokusuz, ZEHİRLİ"], ["CO₂ (Karbondioksit)", "Sera etkisi → iklim değişikliği"], ["Kurşunlu benzin", "Artık YASAKLANMIŞTIR"], ["Gereksiz klakson", "Şehir içinde ve tünelde YASAK"]] },
      { type: "warning", content: "Kapalı garajda motor çalıştırma = CO zehirlenmesi ölümcüldür!" },
    ],
  },
  {
    id: "note-ev-emission",
    categoryId: "environment",
    title: "Egzoz ve Emisyon",
    segments: [
      { type: "heading", content: "Zararlı Egzoz Gazları" },
      { type: "table", rows: [["CO", "Renksiz, kokusuz, ZEHİRLİ"], ["HC", "Kanser riski"], ["NOx", "Asit yağmuru"], ["PM", "Akciğer hastalıkları (dizel)"]] },
      { type: "heading", content: "Katalitik Konvertör" },
      { type: "table", rows: [["Giriş", "CO, HC, NOx (zararlı)"], ["Çıkış", "CO₂, H₂O, N₂ (daha az zararlı)"]] },
      { type: "warning", content: "Kapalı garajda motor ÇALIŞTIRMA — CO ölümcül!" },
    ],
  },
];
