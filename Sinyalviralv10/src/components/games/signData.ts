const W = "https://upload.wikimedia.org/wikipedia/commons";

export const signData = [
  { sign: `${W}/e/e3/Turkey_road_sign_TT-2.svg`, name: "DUR", category: "Öncelik", isImg: true },
  { sign: `${W}/a/a6/Turkey_road_sign_TT-1.svg`, name: "Yol Ver", category: "Öncelik", isImg: true },
  { sign: `${W}/e/e8/Turkey_road_sign_TT-4.svg`, name: "Girişi Olmayan Yol", category: "Yasaklama", isImg: true },
  { sign: `${W}/9/92/Turkey_road_sign_TT-5.svg`, name: "Trafiğe Kapalı Yol", category: "Yasaklama", isImg: true },
  { sign: `${W}/6/6c/Turkey_road_sign_TT-27.svg`, name: "Sollama Yasak", category: "Yasaklama", isImg: true },
  { sign: `${W}/d/d6/Turkey_road_sign_TT-26b.svg`, name: "Sola Dönülemez", category: "Yasaklama", isImg: true },
  { sign: `${W}/9/99/Turkey_road_sign_P-1.svg`, name: "Park Yasak", category: "Yasaklama", isImg: true },
  { sign: `${W}/7/78/Turkey_road_sign_T-1a.svg`, name: "Sağa Tehlikeli Viraj", category: "Uyarı", isImg: true },
  { sign: `${W}/f/ff/Turkey_road_sign_T-8.svg`, name: "Kaygan Yol", category: "Uyarı", isImg: true },
  { sign: `${W}/0/08/Turkey_road_sign_T-11.svg`, name: "Yaya Geçidi", category: "Uyarı", isImg: true },
  { sign: `${W}/6/6d/Turkey_road_sign_T-12.svg`, name: "Okul Geçidi", category: "Uyarı", isImg: true },
  { sign: `${W}/6/65/Turkey_road_sign_T-18.svg`, name: "Yandan Rüzgar", category: "Uyarı", isImg: true },
  { sign: `${W}/1/17/TR_road_sign_TT-35c.svg`, name: "İleri Mecburi Yön", category: "Zorunluluk", isImg: true },
  { sign: `${W}/f/f2/TR_road_sign_TT-35a.svg`, name: "Sağa Mecburi Yön", category: "Zorunluluk", isImg: true },
  { sign: `${W}/7/75/Turkey_road_sign_TT-37.svg`, name: "Ada Etrafında Dönünüz", category: "Zorunluluk", isImg: true },
  { sign: `${W}/b/bf/Turkey_road_sign_B-18.svg`, name: "Otoyol Başlangıcı", category: "Bilgi", isImg: true },
  { sign: `${W}/9/94/Turkey_road_sign_B-23.svg`, name: "İlkyardım", category: "Bilgi", isImg: true },
  { sign: `${W}/b/bc/Turkey_road_sign_B-26.svg`, name: "Akaryakıt İstasyonu", category: "Bilgi", isImg: true },
];

export type SignItem = (typeof signData)[number];
