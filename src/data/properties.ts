export type PropertyType = "Villa" | "Rumah" | "Tanah";
export type PropertyPurpose = "Investment" | "Residential";
export type PropertyStatus = "Ready" | "Off-plan" | "Sold";

export type Property = {
  id: string;
  code: string;
  slug: string;
  title: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  location: {
    area: string;
    city: "Bali";
  };
  price: number; // IDR
  currency: "IDR";
  roi?: number; // percent
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  landSize?: number; // m2
  buildingSize?: number; // m2
  ownership: "Freehold" | "Leasehold";
  yearBuilt?: number;
  zoning?: string;
  images: string[];
  highlights: string[];
  description: string;
  tags?: string[];
  coordinates?: { lat: number; lng: number };
  legal: {
    checklist: string[];
    notes?: string;
  };
  roiProjection?: {
    nightlyRateIdr?: number;
    occupancy?: number; // 0-1
    disclaimer: string;
  };
  createdAt: string; // ISO
};

export const AREAS = [
  "Canggu",
  "Uluwatu",
  "Pererenan",
  "Ubud",
  "Seminyak",
  "Sanur",
] as const;

export const properties: Property[] = [
  {
    id: "p_uluwatu_cliff_01",
    code: "ART-ULU-018",
    slug: "uluwatu-cliffside-villa-freehold",
    title: "Uluwatu Cliffside Villa — Freehold",
    type: "Villa",
    purpose: "Investment",
    location: { area: "Uluwatu", city: "Bali" },
    price: 8_500_000_000,
    currency: "IDR",
    roi: 12,
    status: "Ready",
    bedrooms: 3,
    bathrooms: 3,
    landSize: 320,
    buildingSize: 280,
    ownership: "Freehold",
    yearBuilt: 2022,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b17e3b94?auto=format&fit=crop&w=1800&q=80",
    ],
    highlights: [
      "Ocean-facing living area dengan sunset view",
      "Layout siap short-stay (high ADR)",
      "Akses 8 menit ke beach clubs & surf spots",
    ],
    description:
      "Vila modern dengan garis arsitektur hangat dan pencahayaan natural. Cocok untuk investor yang mengejar yield sewa harian di Uluwatu dengan permintaan stabil sepanjang tahun.",
    tags: ["Ocean view", "Turn-key", "Prime"],
    coordinates: { lat: -8.829, lng: 115.085 },
    legal: {
      checklist: [
        "Sertifikat hak milik / SHM",
        "IMB/PBG (izin bangunan)",
        "Dokumen pajak & PBB terkini",
        "Kontrak manajemen (opsional)",
      ],
      notes: "Tim legal kami bantu verifikasi dokumen dan due diligence sebelum deal.",
    },
    roiProjection: {
      nightlyRateIdr: 4_500_000,
      occupancy: 0.62,
      disclaimer:
        "Proyeksi ROI bersifat indikatif berdasarkan data pasar dan dapat berubah mengikuti seasonality & strategi pricing.",
    },
    createdAt: "2026-04-10T10:00:00.000Z",
  },
  {
    id: "p_canggu_modern_02",
    code: "ART-CAN-042",
    slug: "canggu-modern-minimalist-leasehold",
    title: "Canggu Modern Minimalist — Leasehold 27y",
    type: "Rumah",
    purpose: "Residential",
    location: { area: "Canggu", city: "Bali" },
    price: 4_200_000_000,
    currency: "IDR",
    roi: 10,
    status: "Ready",
    bedrooms: 2,
    bathrooms: 2,
    landSize: 180,
    buildingSize: 160,
    ownership: "Leasehold",
    yearBuilt: 2021,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=80",
    ],
    highlights: [
      "Walking distance ke cafe & coworking",
      "Ruang terbuka dengan pool kecil",
      "Cocok untuk tinggal + disewakan saat peak season",
    ],
    description:
      "Rumah minimalis dengan material natural tones. Lokasi strategis untuk lifestyle Canggu, ideal untuk end-user maupun investor dengan strategi hybrid.",
    tags: ["Walkable", "Lifestyle"],
    coordinates: { lat: -8.654, lng: 115.132 },
    legal: {
      checklist: [
        "Perjanjian leasehold + opsi perpanjangan",
        "IMB/PBG",
        "PBB & bukti pembayaran",
        "Surat bebas sengketa",
      ],
    },
    roiProjection: {
      nightlyRateIdr: 2_800_000,
      occupancy: 0.58,
      disclaimer:
        "Angka proyeksi bukan jaminan. Kami sarankan cek performa listing pembanding dan biaya operasional.",
    },
    createdAt: "2026-03-21T10:00:00.000Z",
  },
  {
    id: "p_pererenan_eco_03",
    code: "ART-PER-031",
    slug: "pererenan-eco-chic-retreat-offplan",
    title: "Pererenan Eco-Chic Retreat — Off-plan",
    type: "Villa",
    purpose: "Investment",
    location: { area: "Pererenan", city: "Bali" },
    price: 6_700_000_000,
    currency: "IDR",
    roi: 11,
    status: "Off-plan",
    bedrooms: 3,
    bathrooms: 3,
    landSize: 260,
    buildingSize: 240,
    ownership: "Leasehold",
    yearBuilt: 2026,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1600047509782-20f0d30f41f7?auto=format&fit=crop&w=1800&q=80",
    ],
    highlights: [
      "Konsep eco-chic: cross ventilation & material lokal",
      "Payment milestone jelas (developer track record)",
      "Target ADR kompetitif untuk area Pererenan",
    ],
    description:
      "Unit off-plan dengan desain resorty yang hangat. Cocok untuk investor yang ingin masuk lebih awal dengan potensi capital gain saat handover.",
    tags: ["Off-plan", "Eco"],
    legal: {
      checklist: [
        "Kontrak pembangunan & milestone payment",
        "Legalitas lahan & zonasi",
        "IMB/PBG dalam proses",
        "Garansi struktur (sesuai kontrak)",
      ],
      notes: "Kami bantu review kontrak dan timeline pembangunan.",
    },
    createdAt: "2026-04-15T10:00:00.000Z",
  },
  {
    id: "p_ubud_land_04",
    code: "ART-UBU-007",
    slug: "ubud-ricefield-land-zoned",
    title: "Ubud Ricefield Land — Zoned for Villa",
    type: "Tanah",
    purpose: "Investment",
    location: { area: "Ubud", city: "Bali" },
    price: 2_350_000_000,
    currency: "IDR",
    roi: 14,
    status: "Ready",
    landSize: 520,
    ownership: "Freehold",
    zoning: "Pariwisata (cek RDTR)",
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1528150177508-7cc0c36cda5e?auto=format&fit=crop&w=1800&q=80",
    ],
    highlights: [
      "View sawah dan akses jalan lebar",
      "Cocok untuk build 1–2 unit vila",
      "Area dengan demand wellness & retreat",
    ],
    description:
      "Lahan strategis Ubud dengan suasana tenang dan view sawah. Ideal untuk pengembangan vila boutique atau retreat kecil.",
    tags: ["Ricefield", "Development"],
    legal: {
      checklist: [
        "SHM/Freehold",
        "Cek zonasi & RDTR",
        "Letter of no dispute",
        "Akses jalan & batas lahan jelas",
      ],
    },
    createdAt: "2026-02-28T10:00:00.000Z",
  },
  {
    id: "p_seminyak_sold_05",
    code: "ART-SEM-019",
    slug: "seminyak-lux-villa-sold",
    title: "Seminyak Lux Villa — Sold",
    type: "Villa",
    purpose: "Investment",
    location: { area: "Seminyak", city: "Bali" },
    price: 9_900_000_000,
    currency: "IDR",
    roi: 9,
    status: "Sold",
    bedrooms: 4,
    bathrooms: 4,
    landSize: 410,
    buildingSize: 360,
    ownership: "Freehold",
    yearBuilt: 2020,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=80",
    ],
    highlights: [
      "High-demand area untuk premium villas",
      "Turn-key furnishing",
      "Reputasi sewa kuat",
    ],
    description:
      "Listing ini sudah terjual. Bila Anda mencari unit serupa di Seminyak, tim kami bisa kurasi opsi yang relevan.",
    tags: ["Sold"],
    legal: {
      checklist: [
        "Dokumen lengkap diverifikasi sebelum closing",
        "Riwayat transaksi jelas",
      ],
    },
    createdAt: "2025-12-12T10:00:00.000Z",
  },
];
