import type { Note } from "../types";

// Araç Tekniği Sayfa 3 — ayrı dosyada tutulur
export const vehicleTechPage3Notes: Note[] = [
  {
    id: "note-vt-yakit-tasarrufu",
    categoryId: "vehicle-tech",
    title: "Yakıt Tasarrufu ve Ekonomik Sürüş",
    segments: [
      { type: "heading", content: "Sürücü Kaynaklı Faktörler" },
      {
        type: "table",
        rows: [
          ["Ani gaz–fren", "Yakıt tüketimini önemli ölçüde artırır"],
          ["Düşük viteste yüksek hız", "Motor zorlanır, tüketim artar"],
          ["Gereksiz rölanti", "Boşa yakıt yakar"],
          ["Çok yüksek hız", "Hava direnci katlanarak artar"],
          ["Sabit hız sürüşü", "En ekonomik sürüş şekli"],
          ["Erken vites almak", "Düşük devir = düşük tüketim"],
        ],
      },
      { type: "heading", content: "Araç Kaynaklı Faktörler" },
      {
        type: "table",
        rows: [
          ["Düşük lastik basıncı", "Yuvarlanma direnci ↑, tüketim ↑"],
          ["Tıkalı hava filtresi", "Motora yeterli hava gitmez"],
          ["Klima kullanımı", "Tüketim %10–15 artar"],
          ["Araç ağırlığı", "Her 100 kg = %5 tüketim artışı"],
          ["Tavan kutusu/aksesuar", "Hava direncini artırır"],
        ],
      },
      { type: "heading", content: "10 Ekonomik Sürüş Tekniği" },
      {
        type: "table",
        rows: [
          ["1", "Erken vites al → düşük devirde çalış"],
          ["2", "Sabit hızda git"],
          ["3", "Kırmızı ışık görünce gaz kes, yavaşla"],
          ["4", "30 sn üzeri bekleme → motoru kapat"],
          ["5", "Lastik basınçlarını her ay kontrol et"],
          ["6", "Klimayı verimli kullan"],
          ["7", "Gereksiz yükü arabadan çıkar"],
          ["8", "Tavan kutusunu kullanmıyorsan sök"],
          ["9", "Düzenli bakım yaptır"],
          ["10", "Doğru oktan değerinde yakıt kullan"],
        ],
      },
    ],
  },
  {
    id: "note-vt-yakit-oktan",
    categoryId: "vehicle-tech",
    title: "Yakıt Türleri ve Oktan Değeri",
    segments: [
      {
        type: "table",
        rows: [
          ["Kurşunsuz 95", "RON 95 — standart benzinli araçlar"],
          ["Kurşunsuz 97-98", "RON 97-98 — yüksek performans"],
          ["Dizel (motorin)", "Setan değeri — dizel araçlar"],
          ["LPG", "LPG dönüşümlü araçlar"],
        ],
      },
      {
        type: "warning",
        content:
          "Dizel araca benzin veya benzinli araca dizel doldurmak motoru ciddi şekilde bozar! Hemen durdur, yakıt boşalt.",
      },
      {
        type: "tip",
        content:
          "Katalitik konvertörlü araçlarda kurşunsuz benzin kullanılır.",
      },
    ],
  },
  {
    id: "note-vt-zorunlu-malzeme",
    categoryId: "vehicle-tech",
    title: "Araçta Zorunlu Malzemeler",
    segments: [
      { type: "heading", content: "Yasal Zorunlu Ekipmanlar" },
      {
        type: "table",
        rows: [
          ["Yangın söndürücü", "1 adet — dolumu geçerli"],
          ["Reflektif uyarı üçgeni", "2 adet — ön ve arka için"],
          ["İlk yardım çantası", "1 adet — geçerlilik tarihli"],
          ["Çekme halatı/zinciri", "1 adet"],
          ["Stepne (yedek lastik)", "1 adet — şişirilmiş"],
          ["Kriko + kol", "1'er adet"],
          ["Tekerlek somun anahtarı", "1 adet"],
        ],
      },
      { type: "heading", content: "Emniyet Yeleği" },
      {
        type: "text",
        content:
          "Şehir dışı yollarda araçtan inilmesi gerektiğinde emniyet yeleği giyilmesi zorunludur. Kolayca ulaşılabilir yerde bulunmalı.",
      },
      { type: "heading", content: "Yangın Söndürücü" },
      {
        type: "table",
        rows: [
          ["Otomobil", "En az 1 kg (2 kg önerilir)"],
          ["Minibüs", "En az 2 kg"],
          ["Otobüs", "En az 6 kg"],
          ["PASS kuralı", "Pimi çek, Nişan al, Sıkıştır, Süpür"],
        ],
      },
      {
        type: "tip",
        content: "Uyarı üçgeni = 2 adet. Bu çok sık sorulan sorudur!",
      },
    ],
  },
  {
    id: "note-vt-agirlik-yuk",
    categoryId: "vehicle-tech",
    title: "Araç Ağırlık ve Yük Kuralları",
    segments: [
      { type: "heading", content: "Ağırlık Kavramları" },
      {
        type: "table",
        rows: [
          ["Boş ağırlık", "Yolcu ve yük olmaksızın yakıt dolu ağırlık"],
          ["Azami yüklü ağırlık", "Araç + yolcu + yük maksimumu"],
          ["Yük kapasitesi", "Azami yüklü – Boş ağırlık"],
          ["Dingil yükü", "Tek bir aksın taşıdığı ağırlık"],
        ],
      },
      { type: "heading", content: "Boyutsal Sınırlar" },
      {
        type: "table",
        rows: [
          ["Genişlik", "2,55 m (soğutmalı: 2,60 m)"],
          ["Yükseklik", "4,00 m"],
          ["Uzunluk (tek araç)", "12,00 m"],
          ["Uzunluk (tır/tren)", "18,75 m"],
        ],
      },
      { type: "heading", content: "Yük Taşıma Kuralları" },
      {
        type: "table",
        rows: [
          ["Öne taşma", "En fazla 1/3"],
          ["Arkaya taşma", "En fazla 1/2"],
          ["Taşma durumunda", "Reflektörlü kırmızı uyarı levhası takılır"],
          ["Yük bağlanması", "Kaymamalı, dağılmamalı"],
          ["Görüş engeli", "Yük sürücünün görüşünü engellememelidir"],
        ],
      },
    ],
  },
  {
    id: "note-vt-romork",
    categoryId: "vehicle-tech",
    title: "Römork ve Çekici Kuralları",
    segments: [
      { type: "heading", content: "Römork Türleri" },
      {
        type: "table",
        rows: [
          ["Yarı römork", "Ön kısmı çekici (tır) araca oturur"],
          ["Tam römork", "Çekici arkasına bağlanır, kendi ön aksı var"],
          ["Karavan", "Konaklama amaçlı, otomobil arkasına"],
          ["Dorse", "Ağır yük taşıyan yarı römork"],
        ],
      },
      { type: "heading", content: "Römork Hız Sınırları" },
      {
        type: "table",
        rows: [
          ["Yerleşim yeri içi", "50 km/s"],
          ["Şehirlerarası yol", "70 km/s"],
          ["Bölünmüş yol", "80 km/s"],
          ["Otoyol", "80 km/s"],
        ],
      },
      { type: "heading", content: "Bağlantı Kuralları" },
      {
        type: "table",
        rows: [
          ["Güvenlik zinciri/halatı", "Mutlaka takılmalı"],
          ["Fren ve aydınlatma", "Çalışmalı"],
          ["Genişlik", "Çekici araçtan fazla olamaz"],
        ],
      },
      {
        type: "tip",
        content:
          "Römork çekerken otoyolda max hız = 80 km/s. Normal otomobilden düşük!",
      },
    ],
  },
  {
    id: "note-vt-ozel-araclar",
    categoryId: "vehicle-tech",
    title: "Özel Araçlar ve Kuralları",
    segments: [
      { type: "heading", content: "Okul Servis Araçları" },
      {
        type: "table",
        rows: [
          ["Renk", "Sarı renk zorunlu"],
          ["İndirme/bindirme", "Dörtlü flaşör açılır"],
          ["Arkasından gelen araç", "Geçemez"],
        ],
      },
      { type: "heading", content: "Tehlikeli Madde Taşıyan Araçlar (ADR)" },
      {
        type: "table",
        rows: [
          ["Sürücü", "Özel eğitim almış olmalı"],
          ["Araç üzerinde", "Tehlikeli madde etiketi bulunur"],
          ["Tünel/şehir merkezi", "Geçiş kısıtlamaları vardır"],
          ["Yangın söndürücü", "Ek söndürücü zorunlu"],
        ],
      },
      { type: "heading", content: "İş Makineleri (G Sınıfı)" },
      {
        type: "table",
        rows: [
          ["Max hız", "30 km/s"],
          ["Gece seyahati", "Yasak (özel izin hariç)"],
        ],
      },
    ],
  },
  {
    id: "note-vt-akilli-ulasim",
    categoryId: "vehicle-tech",
    title: "Akıllı Ulaşım Sistemleri (2026)",
    segments: [
      {
        type: "table",
        rows: [
          ["GPS/Navigasyon", "Konum ve rota belirleme"],
          ["OBD (Araç Diagnostik)", "Araç arıza kodlarını okur"],
          ["e-Call Sistemi", "Kaza durumunda otomatik 112 arar"],
          ["HGS / OGS", "Otoyol geçiş sistemleri"],
          ["Akıllı trafik ışıkları", "Trafiğe göre süre ayarlar"],
          ["Araç içi siyah kutu", "Sürüş verilerini kaydeder"],
        ],
      },
    ],
  },
  {
    id: "note-vt-sinav-ozet",
    categoryId: "vehicle-tech",
    title: "🎯 Motor ve Araç Tekniği Altın Kurallar",
    segments: [
      { type: "heading", content: "20 Altın Kural" },
      { type: "highlight", content: "1) Güç üreten tek zaman = 3. zaman (ateşleme)" },
      { type: "highlight", content: "2) Her iki supap kapalı = 2. ve 3. zaman" },
      { type: "highlight", content: "3) Yağ lambası yanarsa → HEMEN dur, motoru kapat" },
      { type: "highlight", content: "4) Hararet lambası → Dur, soğu, sonra kapağı aç" },
      { type: "highlight", content: "5) ABS → Tam ve sürekli bas, pompalama" },
      { type: "highlight", content: "6) Lastik minimum diş derinliği → 1,6 mm" },
      { type: "highlight", content: "7) Lastik basıncı → SOĞUK ölçülür" },
      { type: "highlight", content: "8) Kış lastiği → 7°C altında gerekli" },
      { type: "highlight", content: "9) Lastik patlarsa → Ani fren YOK, sert direksiyon YOK" },
      { type: "highlight", content: "10) El freni → ARKA tekerleklere etki eder" },
      { type: "highlight", content: "11) Motor freni → Uzun inişlerde, balata korunur" },
      { type: "highlight", content: "12) Atlama kablosu → Önce kırmızı (+), siyah kütleye" },
      { type: "highlight", content: "13) Uyarı üçgeni → 2 adet, 150 m arkaya" },
      { type: "highlight", content: "14) Trafik sigortası → KARŞI tarafın zararını karşılar" },
      { type: "highlight", content: "15) Römork otoyolda → max 80 km/s" },
      { type: "highlight", content: "16) Azami araç yüksekliği → 4,00 m" },
      { type: "highlight", content: "17) Katalitik konvertör → Kurşunsuz benzin" },
      { type: "highlight", content: "18) Airbag = pasif / ESP = aktif güvenlik" },
      { type: "highlight", content: "19) Yanlış yakıt → Hemen durdur, motor hasar görür" },
      { type: "highlight", content: "20) Sigorta değişimi → AYNI amper değeri" },
    ],
  },
];
