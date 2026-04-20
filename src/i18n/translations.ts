export type Locale = "en" | "id";

export type TranslationKey =
  | "nav.home"
  | "nav.properties"
  | "nav.investment"
  | "nav.about"
  | "brand.subtitle"
  | "cta.consult"
  | "cta.whatsapp"
  | "cta.call"
  | "home.badge"
  | "home.hero.title1"
  | "home.hero.title2"
  | "home.hero.desc"
  | "home.hero.browse"
  | "home.trust.fast.title"
  | "home.trust.fast.desc"
  | "home.trust.pic.title"
  | "home.trust.pic.desc"
  | "home.trust.insight.title"
  | "home.trust.insight.desc"
  | "home.featured.title"
  | "home.featured.desc"
  | "home.featured.all"
  | "home.process.title"
  | "home.process.desc"
  | "home.process.readGuide"
  | "home.process.requestShortlist";

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.investment": "Investment",
    "nav.about": "About",

    "brand.subtitle": "Bali Property Agent",

    "cta.consult": "Consultation",
    "cta.whatsapp": "WhatsApp",
    "cta.call": "Call",

    "home.badge": "Fast response • Shortlist by budget • Ready for living / business",
    "home.hero.title1": "Looking for property in Bali?",
    "home.hero.title2": "We help from shortlist to closing.",
    "home.hero.desc":
      "For living, villa business, or land for development. Share your budget and preferred area—we’ll recommend the most relevant options and coordinate viewings and negotiation.",
    "home.hero.browse": "Browse listings",

    "home.trust.fast.title": "Fast response",
    "home.trust.fast.desc": "Structured follow-up: availability, video, and viewing schedule.",
    "home.trust.pic.title": "One point of contact",
    "home.trust.pic.desc": "One contact person to coordinate owners/agents/your notary.",
    "home.trust.insight.title": "Market insight",
    "home.trust.insight.desc": "Practical guidance on areas & strategy (living / business / investment).",

    "home.featured.title": "Featured listings",
    "home.featured.desc":
      "Curated options for living and villa business. Open details for full specs, with ready-to-use WhatsApp CTAs.",
    "home.featured.all": "View all listings",

    "home.process.title": "How we work (brief)",
    "home.process.desc":
      "You share budget, area, and goal (living / business / investment) → we prepare a shortlist → send videos/options → schedule viewings → support negotiation. Efficient process, clear communication.",
    "home.process.readGuide": "Read Investment Guide",
    "home.process.requestShortlist": "Request a shortlist",
  },

  id: {
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.investment": "Investment",
    "nav.about": "About",

    "brand.subtitle": "Bali Property Agent",

    "cta.consult": "Konsultasi",
    "cta.whatsapp": "WhatsApp",
    "cta.call": "Call",

    "home.badge": "Respons cepat • Shortlist sesuai budget • Siap untuk tinggal / bisnis",
    "home.hero.title1": "Mencari properti di Bali?",
    "home.hero.title2": "Kami bantu dari shortlist hingga deal.",
    "home.hero.desc":
      "Untuk hunian, villa bisnis, maupun tanah potensial untuk pengembangan. Sampaikan budget dan area yang diinginkan—kami bantu pilih opsi yang relevan, lalu koordinasi viewing dan negosiasi.",
    "home.hero.browse": "Lihat listings",

    "home.trust.fast.title": "Respons cepat",
    "home.trust.fast.desc": "Follow-up rapi: availability, video, hingga jadwal viewing.",
    "home.trust.pic.title": "Satu PIC",
    "home.trust.pic.desc": "Satu kontak untuk koordinasi owner/agent/notaris Anda.",
    "home.trust.insight.title": "Insight pasar",
    "home.trust.insight.desc": "Insight area & strategi (hunian / bisnis / investment) yang praktis.",

    "home.featured.title": "Featured listings",
    "home.featured.desc":
      "Pilihan untuk hunian dan peluang bisnis (villa). Klik detail untuk spesifikasi lengkap, dengan CTA WhatsApp siap digunakan.",
    "home.featured.all": "Lihat semua listings",

    "home.process.title": "Cara kerja kami (ringkas)",
    "home.process.desc":
      "Anda kirim budget, area, dan tujuan (tinggal / bisnis / investasi) → kami susun shortlist → kirim video/opsi → atur viewing → bantu negosiasi. Proses efisien, komunikasi rapi.",
    "home.process.readGuide": "Baca Investment Guide",
    "home.process.requestShortlist": "Minta shortlist",
  },
};