import type { Note } from "../types";

export const trafficSignsNotes: Note[] = [
  {
    id: "note-signs",
    categoryId: "traffic-signs",
    title: "Levha Şekilleri Rehberi",
    segments: [
      { type: "heading", content: "Trafik İşaretleri" },
      {
        type: "table",
        rows: [
          ["🔴 Kırmızı daire", "YASAKLAMA"],
          ["🔺 Kırmızı üçgen", "TEHLİKE UYARISI"],
          ["🔵 Mavi daire", "ZORUNLULUK"],
          ["🟦 Mavi dikdörtgen", "BİLGİ"],
          ["🛑 Sekizgen", "DUR"],
          ["🔻 Ters üçgen", "YOL VER"],
        ],
      },
      { type: "heading", content: "Karıştırılanlar" },
      {
        type: "table",
        rows: [
          ["Kırmızı daire + 50", "Azami (AŞMA)"],
          ["Mavi daire + 30", "Asgari (ALTINA düşme)"],
          ["Girilmez ⛔", "Tek yönden yasak"],
          ["Trafiğe kapalı 🚫", "Her yönden yasak"],
        ],
      },
      {
        type: "highlight",
        content: "Kırmızı=Yasak, Mavi=Zorunlu/Bilgi, Yeşil=Otoyol",
      },
    ],
  },
  {
    id: "note-danger-signs",
    categoryId: "traffic-signs",
    title: "Tehlike Uyarı Levhaları",
    segments: [
      { type: "heading", content: "Tehlike Uyarı Levhaları" },
      { type: "highlight", content: "Şekil: Üçgen, kırmızı kenarlı" },
      {
        type: "table",
        rows: [
          ["Tehlikeli viraj", "Keskin dönemeç, yavaşla"],
          ["Kontrolsüz kavşak", "Sağdan gelen öncelikli"],
          ["Hemzemin geçit", "Demiryolu geçidi"],
          ["Kaygan yol", "Ani manevra yapma"],
          ["Yol çalışması", "Yavaşla"],
          ["Okul geçidi", "Çocuk çıkabilir"],
        ],
      },
      {
        type: "warning",
        content: "Sarı zemin = GEÇİCİ tehlike. Beyaz zemin = kalıcı.",
      },
    ],
  },
  {
    id: "note-prohibition-signs",
    categoryId: "traffic-signs",
    title: "Yasaklama Levhaları",
    segments: [
      { type: "heading", content: "Yasaklama Levhaları" },
      {
        type: "highlight",
        content: "Şekil: Daire, kırmızı kenarlı, beyaz zemin",
      },
      {
        type: "table",
        rows: [
          ["Girilmez", "Beyaz çizgi — bu yönde giriş yasak"],
          ["Azami hız (50)", "Bu hızı aşmak yasak"],
          ["Sollama yasağı", "Sollama yapmak yasak"],
          ["Park yasağı", "Tek çizgi — park yasak"],
          ["Duraklama yasağı", "Çift çizgi — her ikisi yasak"],
        ],
      },
      {
        type: "warning",
        content:
          "Park yasağı (tek) ≠ Duraklama yasağı (çift). Sınavda çok karıştırılır!",
      },
    ],
  },
  {
    id: "note-mandatory-signs",
    categoryId: "traffic-signs",
    title: "Zorunluluk Levhaları",
    segments: [
      { type: "heading", content: "Zorunluluk Levhaları" },
      {
        type: "highlight",
        content: "Şekil: Daire, mavi zemin, beyaz sembol",
      },
      {
        type: "table",
        rows: [
          ["İleri mecburi", "Sadece düz devam"],
          ["Sağa mecburi", "Sadece sağa dön"],
          ["Dönel kavşak", "Saat tersine dön"],
          ["Asgari hız (30)", "En az bu hızla git"],
        ],
      },
      {
        type: "warning",
        content: "Mavi daire=zorunluluk, Kırmızı daire=yasak!",
      },
    ],
  },
  {
    id: "note-info-signs",
    categoryId: "traffic-signs",
    title: "Bilgi ve Yön Levhaları",
    segments: [
      { type: "heading", content: "Bilgi Levhaları" },
      {
        type: "highlight",
        content: "Dikdörtgen/kare, mavi veya yeşil zemin",
      },
      {
        type: "table",
        rows: [
          ["Otoyol başlangıcı", "Yeşil zemin, min 40 max 120"],
          ["Tek yön", "Trafik sadece ok yönünde"],
          ["Çıkmaz yol", "Yolun çıkışı yok"],
          ["Hastane", "Yakında hastane"],
        ],
      },
      { type: "tip", content: "Bilgi levhaları ceza gerektirmez." },
    ],
  },
  {
    id: "note-road-markings",
    categoryId: "traffic-signs",
    title: "Yer İşaretlemeleri",
    segments: [
      { type: "heading", content: "Yol Çizgileri" },
      {
        type: "table",
        rows: [
          ["Kesik (kesikli) çizgi", "Geçiş ve sollama yapılabilir"],
          ["Devamlı (sürekli) çizgi", "Geçiş ve sollama YASAKTIR"],
          ["İki devamlı çizgi", "Kesinlikle geçilemez"],
          ["Yan yana (kesik+devamlı)", "Kesik taraftakiler geçebilir"],
          ["Sarı sürekli (yol kenarı)", "Duraklama ve park YASAK"],
          ["Sarı kesik (yol kenarı)", "Park yasak, duraklama SERBEST"],
        ],
      },
      { type: "highlight", content: "Sürekli = GEÇME, Kesik = GEÇEBİLİRSİN" },
      {
        type: "tip",
        content:
          "Yan yana çizgilerde: senin tarafın kesik ise geçebilirsin, devamlı ise geçemezsin!",
      },
    ],
  },
];
