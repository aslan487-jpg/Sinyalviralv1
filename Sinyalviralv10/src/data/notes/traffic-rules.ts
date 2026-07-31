import type { Note } from "../types";

export const trafficRulesNotes: Note[] = [
  {
    id: "note-speed",
    categoryId: "traffic-rules",
    title: "Hız Sınırları (2026 Güncel)",
    segments: [
      {
        type: "heading",
        content: "7574 Sayılı Kanun ile Güncel Hız Sınırları",
      },
      {
        type: "warning",
        content:
          "7574 sayılı Kanun (27.02.2026): Yüzde bazlı tolerans sistemi kaldırıldı! 1 km/s aşım bile cezadır.",
      },
      {
        type: "table",
        rows: [
          ["Yerleşim yeri içi (tümü)", "50 km/s"],
          ["Şehirlerarası çift yönlü — Otomobil", "90 km/s"],
          ["Şehirlerarası çift yönlü — Kamyon", "80 km/s"],
          ["Bölünmüş yol — Otomobil", "110 km/s"],
          ["Bölünmüş yol — Kamyon", "85 km/s"],
          ["Otoyol (KGM) — Otomobil", "130 km/s"],
          ["Otoyol (YİD) — Otomobil", "140 km/s"],
          ["Otoyol — Kamyon", "90 km/s"],
          ["Otoyol — Otobüs", "100 km/s"],
          ["Otoyol — Asgari hız", "40 km/s"],
        ],
      },
      { type: "heading", content: "Hız ile İlgili Teknik Bilgiler" },
      {
        type: "table",
        rows: [
          ["Tünel görüşü", "Hız arttıkça görüş açısı daralır (130→~30°)"],
          ["Fren mesafesi", "Hız ×2 → Fren mesafesi ×4"],
          ["Çarpışma enerjisi", "Hız ×2 → Enerji ×4"],
          ["Siste", "En fazla 30 km/s, sis lambası yak"],
        ],
      },
      { type: "heading", content: "Ehliyet El Koyma" },
      {
        type: "text",
        content:
          "Yerleşim içinde 46+ km/s aşım = doğrudan ehliyet geri alma. 1 yıl içinde aynı ihlali 5 kez tekrar = 1 yıl geri alma.",
      },
      {
        type: "highlight",
        content: "Radar dedektörü artık YASAK (7574 sayılı Kanun).",
      },
      {
        type: "tip",
        content:
          "Hız artar → görüş daralır, fren mesafesi uzar, çarpışma enerjisi artar.",
      },
    ],
  },
  {
    id: "note-distance",
    categoryId: "traffic-rules",
    title: "Takip ve Durma Mesafesi",
    segments: [
      { type: "heading", content: "Güvenli Takip Mesafesi" },
      { type: "highlight", content: "Formül: Hız ÷ 2 = Mesafe (metre)" },
      {
        type: "table",
        rows: [
          ["50 km/s", "25 m"],
          ["80 km/s", "40 m"],
          ["100 km/s", "50 m"],
          ["120 km/s", "60 m"],
        ],
      },
      { type: "heading", content: "2 Saniye Kuralı" },
      {
        type: "text",
        content:
          "Öndeki araç bir noktayı geçtiğinde saymaya başla: 'Birliği Türk gördüm, ikiyi Türk gördüm'. O noktayı geçmemişsen mesafe yeterli.",
      },
      {
        type: "warning",
        content:
          "Olumsuz hava koşullarında bu süre 4 saniyeye çıkarılmalı!",
      },
      { type: "heading", content: "Takip Mesafesini Etkileyen Faktörler" },
      {
        type: "table",
        rows: [
          ["Hız artar", "Mesafe uzatılır"],
          ["Yağmur / ıslak yol", "Mesafe uzatılır"],
          ["Kar / buz", "Mesafe çok uzatılır"],
          ["Sis", "Mesafe çok uzatılır"],
          ["Gece sürüşü", "Mesafe uzatılır"],
          ["Yorgunluk", "Mesafe uzatılır"],
          ["Ağır araç önünüzdeyse", "Mesafe uzatılır"],
        ],
      },
      { type: "heading", content: "Durma Mesafesi" },
      {
        type: "text",
        content:
          "Durma = Tepki mesafesi + Fren mesafesi. Hız 2 katına çıkarsa fren mesafesi 4 katına çıkar!",
      },
      {
        type: "warning",
        content:
          "Öndeki araç aniden fren yapsa bile çarpmadan durmak SÜRÜCÜNÜn sorumluluğundadır!",
      },
    ],
  },
  {
    id: "note-intersection",
    categoryId: "traffic-rules",
    title: "Kavşak ve Geçiş Hakkı",
    segments: [
      {
        type: "heading",
        content: "Geçiş Önceliği Sıralaması (Büyükten Küçüğe)",
      },
      {
        type: "table",
        rows: [
          ["1. Trafik polisi", "En üst öncelik — tüm işaretlerden üstün"],
          ["2. Trafik ışıkları", "Işıklı sinyalizasyon"],
          ["3. Trafik işaret levhaları", "DUR, YOL VER vb."],
          ["4. Ana yol–tali yol ilişkisi", "Ana yoldaki geçer"],
          ["5. Sağdan gelen araç", "Hiçbir işaret yoksa"],
          ["6. Dönüş yapan araç", "Doğru giden araca yol verir"],
        ],
      },
      {
        type: "highlight",
        content:
          "Polis > Işık > Levha > Ana yol > Sağdan gelen > Dönüş",
      },
      { type: "heading", content: "Işıksız (İşaretsiz) Kavşaklarda" },
      {
        type: "table",
        rows: [
          ["Sağdan gelen", "Geçiş üstünlüğü vardır"],
          ["Tali → Ana yol", "Tali yoldaki yol verir"],
          ["Bağlantı yolundan", "Tüm araçlara yol verir"],
        ],
      },
      { type: "heading", content: "Dönel Kavşaklar (Göbekli Kavşak)" },
      {
        type: "table",
        rows: [
          ["Dönen araç", "ÖNCELİKLİ — dönen araca yol ver"],
          ["Kavşağa girmeden", "Yavaşla, uygun boşluk bekle"],
          ["Kavşaktan çıkış", "Sağa sinyal vererek çık"],
        ],
      },
      { type: "heading", content: "Kavşak Genel Kuralları" },
      {
        type: "table",
        rows: [
          ["Kavşak içinde sollama", "YASAKTIR"],
          ["Kavşak üzerinde park", "YASAKTIR"],
          ["Kavşağa yaklaşma", "Hız azaltılmalı"],
          ["Şerit değiştirme", "Kavşak içinde kaçınılmalı"],
        ],
      },
      {
        type: "warning",
        content: "Polis varsa tüm ışık ve levhalar GEÇERSİZ!",
      },
      {
        type: "tip",
        content:
          "Bu öncelik sırası sınavda en çok sorulan konudur!",
      },
    ],
  },
  {
    id: "note-belt",
    categoryId: "traffic-rules",
    title: "Emniyet Kemeri",
    segments: [
      { type: "heading", content: "Emniyet Kemeri Kuralları" },
      {
        type: "highlight",
        content:
          "Sürücü ve TÜM yolcular emniyet kemeri takmak ZORUNDADIR.",
      },
      {
        type: "text",
        content:
          "Emniyet kemeri trafik kazalarında ölüm riskini %45 azaltır.",
      },
      {
        type: "table",
        rows: [
          ["Ön koltuk", "Kemer zorunlu"],
          ["Arka koltuk", "Kemer zorunlu"],
          ["Çocuk (150cm altı)", "Çocuk koltuğu + arka koltuk"],
          ["Hamile", "Kemer zorunlu (alt karından)"],
        ],
      },
      {
        type: "warning",
        content: "Kemer takmamak hem ceza hem hayati risk!",
      },
    ],
  },
  {
    id: "note-overtaking",
    categoryId: "traffic-rules",
    title: "Sollama Kuralları",
    segments: [
      { type: "heading", content: "Sollama (Geçme) Kuralları" },
      {
        type: "highlight",
        content: "Sollama SOLDAN yapılır. Sağdan sollama YASAKTIR.",
      },
      { type: "heading", content: "Sollamanın Doğru Yapılışı (4 Adım)" },
      {
        type: "table",
        rows: [
          ["1. Sinyal ver", "Sol sinyal vererek niyetini bildir"],
          ["2. Kontrol et", "Ayna ve kör noktaları kontrol et"],
          ["3. Geç", "Yeterli mesafe ve görüş varsa sola geç"],
          ["4. Geri dön", "Sağ sinyal vererek güvenle şeridine dön"],
        ],
      },
      {
        type: "heading",
        content: "Sollamanın Yasak Olduğu Yerler (11)",
      },
      {
        type: "table",
        rows: [
          ["1", "Kavşaklarda (işaretli veya işaretsiz)"],
          ["2", "Yaya geçitlerinde"],
          ["3", "Demiryolu geçitlerinde"],
          ["4", "Tepe üstlerinde"],
          ["5", "Dönemeçlerde"],
          ["6", "Tünellerde"],
          ["7", "Köprülerde"],
          ["8", "İki devamlı çizgi olan yollarda"],
          ["9", "Sollama Yasaktır levhası olan yollarda"],
          ["10", "Okul geçitlerinde"],
          ["11", "Öndeki araç da sollama yapıyorsa"],
        ],
      },
      { type: "heading", content: "Ek Kurallar" },
      {
        type: "table",
        rows: [
          ["Karşıdan araç varsa", "Sollama yapılmaz"],
          ["Sollanan araç", "Hız artırmamalı (yasal yükümlülük)"],
          ["Gece sollama", "Uzun far kısa fara alınır"],
          ["Şehir içinde", "Bisiklet ve motosikletlere dikkat"],
        ],
      },
      {
        type: "warning",
        content: "Geçme yasağı olan yerde sollama = ASLİ KUSUR",
      },
      {
        type: "tip",
        content:
          "Ortak özellik: görüşün kısıtlı veya tehlikenin yüksek olduğu yerler!",
      },
    ],
  },
  {
    id: "note-parking",
    categoryId: "traffic-rules",
    title: "Park ve Duraklama",
    segments: [
      { type: "heading", content: "Duraklama vs Park Farkı" },
      {
        type: "table",
        rows: [
          ["Duraklama", "Kısa süreli durma. Sürücü araçtan AYRILMAZ"],
          ["Parklanma", "Uzun süreli durma. Sürücü araçtan AYRILABİLİR"],
        ],
      },
      {
        type: "heading",
        content: "Duraklamanın ve Parkın YASAK Olduğu Yerler",
      },
      {
        type: "table",
        rows: [
          ["Yaya geçitleri", "Üzerinde ve yaklaşma mesafesi içinde"],
          ["Kavşaklar", "Kavşak kolları üzerinde — 5m"],
          ["Köprüler ve tüneller", "Üzerinde tam yasak"],
          ["Demiryolu geçitleri", "Üzerinde tam yasak"],
          ["Tepe üstleri / dönemeçler", "Görüşün yetersiz olduğu yerler"],
          ["Otobüs durağı", "15 m mesafe içinde"],
          ["Yangın musluğu (hidrant)", "5 m mesafe içinde"],
          ["Trafik işaret levhaları", "Kapatan konumda yasak"],
          ["Otoyollar", "Zorunlu haller hariç yasak"],
        ],
      },
      {
        type: "highlight",
        content: "Yangın musluğu = 5m / Otobüs durağı = 15m",
      },
      { type: "heading", content: "Otoyolda Arıza Durumu" },
      {
        type: "text",
        content:
          "Otoyolda duraklama/park yasaktır. Arıza halinde emniyet şeridine çekilir, dörtlü yanıp söner ve reflektör üçgen konulur.",
      },
      {
        type: "warning",
        content: "Park yasak yere park = ceza + çekici!",
      },
    ],
  },
  {
    id: "note-alcohol",
    categoryId: "traffic-rules",
    title: "Alkol ve Uyuşturucu (2026)",
    segments: [
      { type: "heading", content: "Alkol Limitleri (KTK Madde 48)" },
      {
        type: "table",
        rows: [
          ["Normal sürücüler", "0.50 promil"],
          ["Ticari araç sürücüleri", "0.00 promil (SIFIR tolerans)"],
          ["Motosiklet sürücüleri", "0.50 promil"],
        ],
      },
      {
        type: "highlight",
        content:
          "Ticari = SIFIR tolerans / Normal + Motor = 0.50 promil",
      },
      { type: "heading", content: "Cezalar (7574 Sayılı Kanun)" },
      {
        type: "table",
        rows: [
          ["1. ihlal", "25.000 TL + 6 ay ehliyet el koyma"],
          ["2. ihlal", "50.000 TL + 2 yıl ehliyet el koyma"],
          ["3. ihlal ve sonrası", "150.000 TL + 5 yıl ehliyet iptali"],
          ["Alkol testini reddetme", "150.000 TL + 5 yıl el koyma"],
          ["Uyuşturucu ile kullanma", "150.000 TL + ehliyet iptali"],
        ],
      },
      {
        type: "warning",
        content:
          "Alkol testini reddetmek = 150.000 TL + 5 yıl ehliyet el koyma!",
      },
    ],
  },
  {
    id: "note-accident",
    categoryId: "traffic-rules",
    title: "Kaza Prosedürü",
    segments: [
      { type: "heading", content: "Kaza Sonrası Adım Adım" },
      {
        type: "table",
        rows: [
          ["1. Güvenliği sağla", "Aracı çek, dörtlü flaşör aç, reflektör koy"],
          ["2. Yetkililere haber ver", "155 Polis, 156 Jandarma, 112 Acil Sağlık, 110 İtfaiye"],
          ["3. Yaralılara yardım", "İlk yardım uygula, gereksiz taşıma"],
          ["4. Belgeleri hazırla", "Ehliyet, ruhsat, sigorta, kimlik göster"],
          ["5. Tutanak doldur", "Maddi hasarda kendi aralarında tutanak yeterli"],
        ],
      },
      { type: "heading", content: "Tutanak Kuralları" },
      {
        type: "table",
        rows: [
          ["Maddi hasarlı kaza", "Polis ZORUNLU DEĞİL"],
          ["Yaralanmalı/ölümlü kaza", "Polis MUTLAKA çağrılır"],
        ],
      },
      { type: "heading", content: "Reflektör Üçgen Mesafeleri" },
      {
        type: "table",
        rows: [
          ["Yerleşim içi", "20 metre"],
          ["Yerleşim dışı", "60 metre"],
          ["Otoyol", "100 metre"],
          ["Düz yol", "150 metre"],
          ["Eğimli/virajlı", "Önceden görülebilecek mesafeye"],
        ],
      },
      {
        type: "warning",
        content: "Kazadan kaçmak hem İDARİ hem ADLİ suçtur!",
      },
    ],
  },
  {
    id: "note-basic-concepts",
    categoryId: "traffic-rules",
    title: "Temel Trafik Kavramları",
    segments: [
      { type: "heading", content: "Trafik Nedir?" },
      {
        type: "text",
        content:
          "Trafik; yayaların, hayvanların ve araçların karayolu üzerindeki hal ve hareketleridir.",
      },
      { type: "heading", content: "Trafiğin Üç Unsuru" },
      {
        type: "table",
        rows: [
          ["İnsan", "Sürücü, yaya, yolcu"],
          ["Taşıt", "Motorlu ve motorsuz araçlar"],
          ["Yol", "Karayolu ve üzerindeki düzenlemeler"],
        ],
      },
      { type: "heading", content: "Karayolu Terimleri" },
      {
        type: "table",
        rows: [
          ["Karayolu", "Trafik için kamunun yararlanmasına açık alan"],
          ["Taşıt yolu (kaplama)", "Araç trafiğine ayrılmış kısım"],
          ["Şerit", "Tek araç sırasının geçebileceği bölüm"],
          ["Banket", "Taşıt yolunun kenarındaki toprak/stabilize kısım"],
          ["Platform", "Taşıt yolu + banketler toplamı"],
          ["Yaya yolu (kaldırım)", "Yayalara ayrılmış bölüm"],
          ["Yaya geçidi", "Yayaların karşıya geçmesi için ayrılmış alan"],
          ["Kavşak", "İki+ yolun kesiştiği/birleştiği yer"],
          ["Bölünmüş yol", "Gidiş-geliş yönleri refüjle ayrılmış yol"],
          ["Otoyol", "Erişme kontrollü, yaya/hayvan girişine kapalı"],
          ["Ada (refüj)", "Taşıt yolunu bölen yükseltilmiş alan"],
          ["Bisiklet yolu", "Bisiklet trafiğine ayrılmış yol"],
          ["Tırmanma şeridi", "Eğimli yollarda yavaş araçlar için ek şerit"],
        ],
      },
      {
        type: "tip",
        content:
          "Sınavda tanım soruları mutlaka çıkar! Kavşak, banket, platform en çok sorulan.",
      },
    ],
  },
  {
    id: "note-traffic-orgs",
    categoryId: "traffic-rules",
    title: "Trafikle İlgili Kuruluşlar",
    segments: [
      { type: "heading", content: "Kuruluşlar ve Görevleri" },
      {
        type: "table",
        rows: [
          ["🔵 Emniyet Genel Müdürlüğü", "Denetim, ehliyet verme, tescil"],
          ["🟢 Karayolları Genel Müdürlüğü", "Yol yapımı/bakımı/onarımı"],
          ["🟡 Milli Eğitim Bakanlığı", "Sürücü kursları, ehliyet sınavları"],
          ["🔴 Sağlık Bakanlığı", "İlk/acil yardım hizmetleri"],
          ["🟣 Belediyeler", "Şehir içi ışıklar/levhalar, park alanları"],
        ],
      },
      {
        type: "warning",
        content:
          "Sınavda 'hangisi hangi kuruluşun görevidir?' sorusu sıkça gelir!",
      },
      {
        type: "tip",
        content:
          "Ehliyet sınavı = MEB, Ehliyet verme = Emniyet, Yol yapımı = KGM",
      },
    ],
  },
  {
    id: "note-police-signals",
    categoryId: "traffic-rules",
    title: "Trafik Polisi El İşaretleri",
    segments: [
      { type: "heading", content: "Polisin El İşaretleri" },
      {
        type: "highlight",
        content:
          "Trafik polisinin işaretleri tüm ışık ve levhalardan ÖNCELİKLİDİR!",
      },
      {
        type: "table",
        rows: [
          ["Kollarını iki yana açmış", "Göğüs/sırt → DUR, Omuzlar → GEÇ"],
          ["Tek kolunu yukarı kaldırmış", "TÜM yönlerden DUR (sarı ışık gibi)"],
          ["Kolunu sallaması", "İlgili yönden geçiş izni verir"],
        ],
      },
      { type: "heading", content: "Kolay Ezber" },
      {
        type: "highlight",
        content:
          "Göğüs ve sırt = DUVAR (geçilmez). Omuz = KAPI (geçilir).",
      },
      {
        type: "tip",
        content:
          "Polisin göğsünü gördüğün tarafta dur, omzunu gördüğün taraftan geç!",
      },
    ],
  },
  {
    id: "note-traffic-lights",
    categoryId: "traffic-rules",
    title: "Trafik Işıkları",
    segments: [
      { type: "heading", content: "Sabit Işıklı Sinyalizasyon" },
      {
        type: "table",
        rows: [
          ["🔴 Kırmızı", "DUR — Kesinlikle geçilmez"],
          ["🟡 Sarı", "DİKKAT — Kırmızıdan sonra: hazırlan. Yeşilden sonra: dur"],
          ["🟢 Yeşil", "GEÇ — Yol açıktır, kontrollü geç"],
        ],
      },
      { type: "heading", content: "Oklu Işıklar" },
      {
        type: "table",
        rows: [
          ["Yeşil ok", "Ok yönüne dönülebilir"],
          ["Kırmızı ok", "Ok yönüne dönülemez"],
          ["Yeşil ok + kırmızı", "Yalnızca ok yönüne geçilebilir"],
        ],
      },
      { type: "heading", content: "Fasılalı (Yanıp Sönen) Işıklar" },
      {
        type: "table",
        rows: [
          ["🟡 Yanıp sönen sarı", "DİKKAT — Yavaşla, kontrollü geç"],
          ["🔴 Yanıp sönen kırmızı", "DUR — Mutlaka dur, kontrollü geç"],
        ],
      },
      { type: "heading", content: "Yaya ve Bisiklet Işıkları" },
      {
        type: "table",
        rows: [
          ["Yeşil figür", "Geçilebilir"],
          ["Kırmızı figür", "Geçilemez"],
          ["Yanıp sönen yeşil", "Süre bitiyor — geçmişsen tamamla"],
        ],
      },
      {
        type: "warning",
        content:
          "Kırmızı ışık ihlali = 3 ay ehliyet geri alım + ceza puanı!",
      },
    ],
  },
  {
    id: "note-gecis-ustunlugu",
    categoryId: "traffic-rules",
    title: "Geçiş Üstünlüğü",
    segments: [
      { type: "heading", content: "Geçiş Üstünlüğüne Sahip Araçlar" },
      {
        type: "table",
        rows: [
          ["1", "İtfaiye araçları (yangına gidiş)"],
          ["2", "Ambulans ve hasta nakil araçları"],
          ["3", "Polis ve jandarma araçları"],
          ["4", "Zabıta araçları"],
          ["5", "Sivil savunma araçları"],
          ["6", "Kurtarma araçları"],
          ["7", "Kar ve buz mücadelesi yapan araçlar"],
          ["8", "Askeri araç konvoyları"],
        ],
      },
      {
        type: "warning",
        content:
          "Siren ve/veya ışıklı ikaz kullandığında geçiş üstünlüğü kazanır. Sirensiz → üstünlük YOK!",
      },
      { type: "heading", content: "Sürücünün Yapması Gerekenler" },
      {
        type: "table",
        rows: [
          ["1", "Sağa yanaş (taşıt yolunun en sağına)"],
          ["2", "Hızını azalt"],
          ["3", "Gerekiyorsa tamamen dur"],
          ["4", "Yol açılınca normal sürüşe devam et"],
        ],
      },
      {
        type: "tip",
        content:
          "Geçiş üstünlüklü araca yol vermemek cezai yaptırım gerektirir!",
      },
    ],
  },
  {
    id: "note-donus-kurallari",
    categoryId: "traffic-rules",
    title: "Dönüşler ve Şerit Değiştirme",
    segments: [
      { type: "heading", content: "Sağa Dönüş" },
      {
        type: "table",
        rows: [
          ["1", "En sağ şeride geç"],
          ["2", "Sağ sinyal ver"],
          ["3", "Yavaşla"],
          ["4", "Yaya ve bisikletlilere yol ver"],
          ["5", "Dönüşü tamamla"],
        ],
      },
      { type: "heading", content: "Sola Dönüş" },
      {
        type: "table",
        rows: [
          ["1", "En sol şeride geç"],
          ["2", "Sol sinyal ver"],
          ["3", "Karşıdan gelen araçlara yol ver"],
          ["4", "Yaya ve bisikletlilere yol ver"],
          ["5", "Dönüşü tamamla"],
        ],
      },
      { type: "heading", content: "Şerit Değiştirme" },
      {
        type: "table",
        rows: [
          ["1", "Arkayı ve yanı kontrol et (ayna + kör nokta)"],
          ["2", "Uygun sinyali ver"],
          ["3", "Yeterli boşluk varsa geç"],
        ],
      },
      { type: "heading", content: "Geri Geri Gitme" },
      {
        type: "text",
        content:
          "Geri gitmek ancak zorunlu hallerde yapılabilir. Otoyol ve bölünmüş yollarda geri gitmek kesinlikle YASAKTIR.",
      },
      {
        type: "warning",
        content:
          "Dönüş yapan araç doğru giden araca HER ZAMAN yol verir!",
      },
    ],
  },
  {
    id: "note-isik-kullanimi",
    categoryId: "traffic-rules",
    title: "Işık Kullanım Kuralları",
    segments: [
      { type: "heading", content: "Far Kullanımı" },
      {
        type: "table",
        rows: [
          ["Gündüz normal sürüş", "Gündüz farı (DRL) veya kısa far"],
          ["Karanlıkta şehir içi", "Kısa far"],
          ["Karanlıkta şehirlerarası (karşı araç yok)", "Uzun far"],
          ["Karşıdan araç yaklaşırken", "Uzun fardan kısa fara al"],
          ["Sis / kar / şiddetli yağmur", "Kısa far + sis lambası"],
          ["Park halinde (karanlıkta)", "Park lambası"],
        ],
      },
      {
        type: "warning",
        content:
          "Sis lambası yalnızca sis, yoğun kar veya şiddetli yağmurda kullanılır. Normal havada YASAKTIR!",
      },
      { type: "heading", content: "Sinyal ve Dörtlü Flaşör" },
      {
        type: "table",
        rows: [
          ["Normal sinyal", "Dönüş, şerit değiştirme, sollama niyeti"],
          ["Dörtlü flaşör", "Arıza, kaza, zorunlu duruş, tehlike uyarısı"],
        ],
      },
      {
        type: "text",
        content:
          "Dörtlü flaşör açıkken normal sinyal etkisiz! Önce dörtlü kapatılır.",
      },
      {
        type: "tip",
        content:
          "Siste UZUN FAR açma — ışık geri yansır, hiç göremezsin!",
      },
    ],
  },
  {
    id: "note-ehliyet-siniflari",
    categoryId: "traffic-rules",
    title: "Ehliyet Sınıfları (2026)",
    segments: [
      { type: "heading", content: "Motosiklet Grubu" },
      {
        type: "table",
        rows: [
          ["M sınıfı", "Moped (50cc / 4kW) — 16 yaş"],
          ["A1 sınıfı", "125cc'ye kadar motosiklet — 16 yaş"],
          ["A2 sınıfı", "Max 35 kW motosiklet — 18 yaş"],
          ["A sınıfı", "Tüm motosikletler — 24 yaş (doğrudan)"],
        ],
      },
      { type: "heading", content: "Otomobil Grubu" },
      {
        type: "table",
        rows: [
          ["B1 sınıfı", "ATV, hafif 4 tekerlekli — 16 yaş"],
          ["B sınıfı", "Otomobil, kamyonet (max 3.500 kg) — 18 yaş"],
          ["BE sınıfı", "B sınıfı + römork — 18 yaş"],
        ],
      },
      { type: "heading", content: "Kamyon / Otobüs Grubu" },
      {
        type: "table",
        rows: [
          ["C1", "3.500–7.500 kg kamyon — 18 yaş"],
          ["C", "7.500 kg üzeri kamyon (TIR) — 21 yaş"],
          ["D1", "9–16 koltuk minibüs — 21 yaş"],
          ["D", "16+ koltuk otobüs — 24 yaş"],
        ],
      },
      { type: "heading", content: "Diğer" },
      {
        type: "table",
        rows: [
          ["F", "Traktör ve iş makineleri"],
          ["G", "Buldozer, vinç vb."],
        ],
      },
      {
        type: "highlight",
        content:
          "B ehliyetle 2 yıl sonra 125cc (A1) motosiklet kullanılabilir (2024 değişikliği).",
      },
      {
        type: "tip",
        content:
          "Tüm sınıflarda geçme notu 70, sınav süresi 45 dakika.",
      },
    ],
  },
  {
    id: "note-trafik-cezalari",
    categoryId: "traffic-rules",
    title: "Trafik Cezaları (7574 Sayılı Kanun)",
    segments: [
      { type: "heading", content: "Önemli Ceza Kalemleri (2026)" },
      {
        type: "table",
        rows: [
          ["Ehliyetsiz araç kullanma", "40.000 TL"],
          ["Ehliyeti iptal edilmişin kullanması", "200.000 TL"],
          ["Alkollü kullanma (1. kez)", "25.000 TL + 6 ay"],
          ["Uyuşturucu ile kullanma", "150.000 TL + ehliyet iptali"],
          ["Alkol testini reddetme", "150.000 TL + 5 yıl"],
          ["Kırmızı ışık ihlali (1. kez)", "5.000 TL"],
          ["Hız aşımı 66+ km/s", "30.000 TL + 90 gün el koyma"],
          ["Saldırgan sürüş / ısrarlı takip", "180.000 TL"],
          ["Trafiği engelleme", "90.000 TL"],
          ["Dur ihtarına uymama / kaçma", "200.000 TL + 60 gün"],
          ["Radar dedektörü bulundurma", "21.000 TL + trafikten men"],
        ],
      },
      { type: "heading", content: "Önemli Kurallar" },
      {
        type: "table",
        rows: [
          ["Ehliyetsiz araç sahibi", "Araç sahibine de 40.000 TL"],
          ["Yerleşim içi 46+ km/s aşım", "Doğrudan ehliyet geri alma"],
          ["1 yılda 5 kez aynı ihlal", "1 yıl ehliyet geri alma"],
        ],
      },
      {
        type: "warning",
        content:
          "Radar dedektörü üretimi, ithalatı ve bulundurulması YASAK!",
      },
      {
        type: "tip",
        content: "Drift ve makas cezaları da ağırlaştırıldı!",
      },
    ],
  },
  {
    id: "note-hava-kosullari",
    categoryId: "traffic-rules",
    title: "Hava Koşulları ve Özel Durumlar",
    segments: [
      { type: "heading", content: "🌧️ Yağmurlu Hava" },
      {
        type: "table",
        rows: [
          ["Hız", "Azaltılır"],
          ["Takip mesafesi", "Artırılır"],
          ["Far", "Kısa far (gerekirse sis lambası)"],
          ["Fren", "Ani fren yerine motor freni"],
          ["Aquaplaning", "Su tabakası üzerinde kayma — gaz yavaşça kes"],
        ],
      },
      { type: "heading", content: "❄️ Karlı ve Buzlu Hava" },
      {
        type: "table",
        rows: [
          ["Hız", "Çok azaltılır"],
          ["Lastik", "Kış lastiği veya zincir"],
          ["Takip mesafesi", "3-4 katına çıkar"],
          ["Ani fren", "Kesinlikle YAPMA"],
          ["ABS yoksa", "Pompalama freni kullan"],
          ["Dönüşlerde", "Gaz verme, yavaş dön"],
        ],
      },
      { type: "heading", content: "🌫️ Sisli Hava" },
      {
        type: "table",
        rows: [
          ["Max hız", "30 km/s"],
          ["Far", "Sis lambası (ön+arka) + kısa far"],
          ["Uzun far", "YASAK (sis yansıtır, görüş kötüleşir)"],
          ["Gerekirse", "Yol kenarına çekilip bekle"],
        ],
      },
      { type: "heading", content: "Diğer Durumlar" },
      {
        type: "table",
        rows: [
          ["🌬️ Rüzgar", "Yüksek kasalı araçlar etkilenir"],
          ["🌞 Güneş kamaşması", "Vizör kullan, hız azalt"],
          ["🏔️ Dik iniş", "Motor freni kullan, sürekli fren BASMA"],
          ["🏔️ Dik çıkış", "Yeterli hız al, vites düşür"],
          ["🏔️ Dar yol karşılaşma", "İnişe yol verilir"],
        ],
      },
      {
        type: "warning",
        content:
          "Aquaplaning: Su üzerinde kayma → ani fren YAPMA, gaz yavaşça kes!",
      },
    ],
  },
  {
    id: "note-sinav-ozet",
    categoryId: "traffic-rules",
    title: "🎯 Sınav İçin Altın Kurallar",
    segments: [
      { type: "heading", content: "12 Altın Kural" },
      { type: "highlight", content: "1) Polis > Işık > Levha > Ana yol > Sağdan gelen" },
      { type: "highlight", content: "2) DUR = 8 köşe (sekizgen), YOL VER = ters üçgen" },
      { type: "highlight", content: "3) Tehlike levhası = Üçgen = Uyarır, yasaklamaz" },
      { type: "highlight", content: "4) Mavi daire = Zorunluluk / Kırmızı daire = Yasak" },
      { type: "highlight", content: "5) Hız ×2 → Fren mesafesi ×4" },
      { type: "highlight", content: "6) Katalitik konvertör: CO → CO₂ dönüşümü" },
      { type: "highlight", content: "7) Ticari araç alkol limiti = 0.00 (SIFIR)" },
      { type: "highlight", content: "8) Maddi hasarlı kazada polis zorunlu DEĞİL" },
      { type: "highlight", content: "9) Siste uzun far YASAK, max 30 km/s" },
      { type: "highlight", content: "10) Radar dedektörü YASAK (7574 sayılı Kanun)" },
      { type: "highlight", content: "11) Yorgunluk → Tek çözüm: DUR ve DİNLEN" },
      { type: "highlight", content: "12) Polis omuz = GEÇ (kapı), göğüs/sırt = DUR (duvar)" },
      { type: "heading", content: "Önemli Rakamlar" },
      {
        type: "table",
        rows: [
          ["Yangın musluğu park", "5 m"],
          ["Otobüs durağı park", "15 m"],
          ["Otoyol asgari hız", "40 km/s"],
          ["Şehir içi hız", "50 km/s"],
          ["KGM otoyol otomobil", "130 km/s"],
          ["YİD otoyol otomobil", "140 km/s"],
          ["Normal alkol limiti", "0.50 promil"],
          ["Ticari alkol limiti", "0.00 promil"],
          ["Siste max hız", "30 km/s"],
          ["Mola sıklığı", "Her 2 saatte bir"],
        ],
      },
    ],
  },
  {
    id: "note-kavs-detail",
    categoryId: "traffic-rules",
    title: "Kavşak Kuralları (Detay)",
    segments: [
      {
        type: "heading",
        content: "Kavşak Soruları — Sınavda En Çok Hata Yapılan Kısım",
      },
      {
        type: "highlight",
        content:
          "Öncelik sırası: Polis > Işık > Levha > Ana yol > Sağdan gelen > Dönüş yapan",
      },
      { type: "heading", content: "Işıksız Kavşaklarda" },
      {
        type: "table",
        rows: [
          ["Hiçbir işaret yoksa", "Sağdan gelen araç öncelikli"],
          ["Tali yoldan ana yola", "Ana yoldaki araca yol ver"],
          ["Bağlantı yolundan (rampa)", "Tüm araçlara yol ver"],
        ],
      },
      { type: "heading", content: "Dönel Kavşaklar" },
      {
        type: "table",
        rows: [
          ["Dönen araç", "ÖNCELİKLİ — kavşağa giren yol verir"],
          ["Girmeden önce", "Yavaşla, uygun boşluk bekle"],
          ["Çıkış", "Sağa sinyal vererek yapılır"],
        ],
      },
      { type: "heading", content: "Genel Kurallar" },
      {
        type: "table",
        rows: [
          ["Kavşak içinde sollama", "YASAK"],
          ["Kavşak üzerinde park", "YASAK"],
          ["Kavşağa yaklaşma", "Hız azaltılmalı"],
          ["Kavşak içinde şerit değiştirme", "Kaçınılmalı"],
        ],
      },
      {
        type: "tip",
        content: "Bu konudan her sınavda 3-5 soru çıkar!",
      },
    ],
  },
];
