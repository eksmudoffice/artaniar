export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "ul"; items: string[] }
  >;
  coverImage: string;
  authorName: string;
  publishedAt: string; // ISO
  tags: string[];
};

export const newsPosts: NewsPost[] = [
  {
    id: "n_001",
    slug: "panduan-beli-properti-bali-untuk-pemula",
    title: "Panduan Beli Properti di Bali untuk Pemula (Checklist Ringkas)",
    excerpt:
      "Beli properti di Bali bisa terasa rumit kalau baru pertama. Ini checklist ringkas yang membantu kamu menilai area, legalitas dasar, hingga langkah sebelum deal.",
    coverImage:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1800&q=80",
    authorName: "Artaniar Property",
    publishedAt: "2026-05-01T08:00:00.000Z",
    tags: ["Guide", "Bali", "Checklist"],
    content: [
      {
        type: "p",
        text: "Kalau kamu baru mulai cari properti di Bali, fokuslah pada hal yang paling berdampak: tujuan (hunian / investasi), lokasi, akses, dan kesiapan dokumen.",
      },
      { type: "h2", text: "1) Tentukan tujuan + range budget" },
      {
        type: "p",
        text: "Tujuan akan menentukan area dan tipe properti. Untuk investasi (villa bisnis), cek demand mikro-area. Untuk hunian, prioritas ke akses harian dan lingkungan.",
      },
      { type: "h2", text: "2) Cek akses & utilitas" },
      {
        type: "ul",
        items: [
          "Lebar jalan & kemudahan akses mobil",
          "Listrik (VA) & sumber air (PDAM / sumur)",
          "Jarak ke titik utama: beach clubs, coworking, sekolah, rumah sakit",
        ],
      },
      { type: "h2", text: "3) Catat poin legal untuk diverifikasi" },
      {
        type: "p",
        text: "Kami bisa bantu rapikan informasi listing dan koordinasi. Untuk verifikasi legal formal, tetap gunakan notaris/ahli kamu.",
      },
    ],
  },
  {
    id: "n_002",
    slug: "leasehold-vs-freehold-bali",
    title: "Leasehold vs Freehold di Bali: Mana yang Lebih Cocok?",
    excerpt:
      "Bedanya leasehold dan freehold, plus kapan strategi yang tepat untuk masing-masing jenis kepemilikan—ringkas dan praktis.",
    coverImage:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1800&q=80",
    authorName: "Artaniar Property",
    publishedAt: "2026-05-06T08:00:00.000Z",
    tags: ["Investment", "Ownership", "Bali"],
    content: [
      {
        type: "p",
        text: "Dalam praktiknya, keputusan leasehold vs freehold biasanya kembali ke horizon investasi, rencana exit, dan kenyamanan kamu di sisi legal/kontrak.",
      },
      { type: "h2", text: "Kapan Freehold lebih cocok?" },
      {
        type: "ul",
        items: [
          "Kepemilikan jangka panjang",
          "Lebih nyaman secara kontrol aset",
          "Rencana penggunaan keluarga / legacy",
        ],
      },
      { type: "h2", text: "Kapan Leasehold masuk akal?" },
      {
        type: "ul",
        items: [
          "Strategi yield (sewa) dengan horizon tertentu",
          "Harga entry lebih efisien dibanding freehold di area yang sama",
          "Kontrak jelas: durasi, opsi perpanjangan, dan biaya extension",
        ],
      },
      {
        type: "p",
        text: "Kalau kamu mau, kirim area + budget + tujuan. Kami buat shortlist yang sesuai, termasuk catatan pros/cons ownership untuk tiap opsi.",
      },
    ],
  },
];