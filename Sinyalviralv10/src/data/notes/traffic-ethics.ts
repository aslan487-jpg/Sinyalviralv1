import type { Note } from "../types";

export const trafficEthicsNotes: Note[] = [
  {
    id: "note-ethics",
    categoryId: "traffic-ethics",
    title: "Trafik Nezaketi ve Belgeler",
    segments: [
      { type: "heading", content: "Nezaket Kuralları" },
      { type: "table", rows: [["Şerit", "Sağdan git, soldan sol"], ["Korna", "Sadece tehlike anında"], ["Yaya", "HER ZAMAN önce"], ["Far", "Karşı araç = kısa far"], ["Acil araç", "Sağa yanaş ve dur"]] },
      { type: "heading", content: "Zorunlu Belgeler" },
      { type: "table", rows: [["Ehliyet", "Sınıfına uygun, geçerli"], ["Ruhsat", "Araç tescil belgesi"], ["Trafik sigortası", "ZORUNLU, karşı tarafı öder"], ["Muayene belgesi", "Periyodik teknik kontrol"]] },
      { type: "highlight", content: "Trafik sigortası=KARŞI TARAF, Kasko=KENDİ ARACIN" },
      { type: "warning", content: "Sigortasız araç kullanmak YASAKTIR!" },
    ],
  },
  {
    id: "note-te-psychology",
    categoryId: "traffic-ethics",
    title: "Sürücü Davranışları ve Psikoloji",
    segments: [
      { type: "heading", content: "İdeal Sürücünün Özellikleri" },
      { type: "table", rows: [["Fiziksel yeterlilik", "Görme, işitme, refleks normal düzeyde"], ["Ruhsal denge", "Sinirli, stresli iken araç kullanılmamalı"], ["Bilgi", "Trafik kurallarına tam hâkim"], ["Beceri", "Aracı kontrol altında tutabilme"], ["Tutum", "Saygılı, sabırlı, sorumluluk sahibi"]] },
      { type: "heading", content: "Sürücünün Sorumlulukları" },
      { type: "table", rows: [["Diğer sürücülere", "Sinyal, takip mesafesi, gece kısa far"], ["Yayalara", "Geçitte yol ver, okul önü yavaşla"], ["Okul bölgeleri", "Hız sınırına uy, servis durduğunda geçme"]] },
      { type: "heading", content: "Agresif Sürüş (7574 sayılı Kanun)" },
      { type: "table", rows: [["Tehdit etmek", "Saldırgan sürüş"], ["Araçla korkutmak", "Saldırgan sürüş"], ["Makas atmak", "Saldırgan sürüş"], ["Drift yapmak", "Saldırgan sürüş"], ["Aşırı strese sokmak", "Saldırgan sürüş"], ["Park edip tartışma", "Saldırgan sürüş"]] },
      { type: "warning", content: "Saldırgan sürüş cezası: 180.000 TL + ek yaptırımlar!" },
      { type: "heading", content: "Olumsuz Davranışlar" },
      { type: "table", rows: [["Öfkeli sürüş", "Korna, aşırı yakın takip — KAZA"], ["Dikkatsizlik", "Telefon — tepki 4 kat artar"], ["Aşırı özgüven", "En tehlikeli düşünce"], ["Yorgun sürüş", "Alkollü kadar tehlikeli"]] },
      { type: "highlight", content: "En tehlikeli: öfke ve aşırı özgüven." },
    ],
  },
  {
    id: "note-te-insurance",
    categoryId: "traffic-ethics",
    title: "Sigorta ve Belgeler",
    segments: [
      { type: "heading", content: "Sigorta Türleri" },
      { type: "table", rows: [["Zorunlu trafik", "Karşı tarafa verdiğin zararı öder (ZORUNLU)"], ["Kasko", "KENDİ aracının zararını öder (İSTEĞE BAĞLI)"], ["İhtiyari mali sorumluluk", "Trafik sigortası limitini aşan zararlar"]] },
      { type: "highlight", content: "Trafik sigortası=KARŞI TARAF, Kasko=KENDİ ARACIN" },
      { type: "warning", content: "Sigortasız araç kullanmak YASAKTIR — araç trafikten men!" },
    ],
  },
  {
    id: "note-yorgunluk",
    categoryId: "traffic-ethics",
    title: "Yorgunluk, Uyku ve Dikkat",
    segments: [
      { type: "heading", content: "Yorgunluk Belirtileri" },
      { type: "table", rows: [["Göz kapağı ağırlaşması", "İlk uyarı"], ["Sık göz kırpma", "Dikkat düşüyor"], ["Konsantrasyon azalması", "Tehlike başlıyor"], ["Son km'leri hatırlamama", "Mikro uyku başlamış!"], ["Kafa sallanması", "Hemen dur!"]] },
      { type: "heading", content: "Yapılması Gerekenler" },
      { type: "highlight", content: "Tek doğru çözüm: Uygun yerde DURUP DİNLENMEK!" },
      { type: "table", rows: [["Her 2 saatte bir mola", "15-20 dakika"], ["200 km'de bir", "Mola ver"], ["Kafein", "Geçici çözüm, güvenli değil"], ["Müzik/cam açmak", "Kalıcı çözüm DEĞİL"]] },
      { type: "heading", content: "Dikkat Dağıtıcı Unsurlar" },
      { type: "table", rows: [["Telefon ile konuşma", "Eller serbest bile dikkat %37 azalır"], ["Mesaj atma/bakma", "Kesinlikle yasak, en tehlikeli"], ["Navigasyon", "Önceden ayarlanmalı"], ["Yemek yeme", "Direksiyon kontrolü zayıflar"], ["Makyaj/ayna", "Kesinlikle sürüş esnasında YAPILMAZ"]] },
      { type: "heading", content: "İlaç Kullanımı" },
      { type: "text", content: "Uyku hapı, sakinleştirici, antihistaminik → araç kullanımı tehlikeli. 'Bu ilaç araç kullanımını etkiler' uyarısı olan ilaçlarla araç kullanmak YASAKTIR." },
      { type: "warning", content: "Kırmızı ışıkta bile telefona bakmak trafik güvenliğini olumsuz etkiler!" },
    ],
  },
];
