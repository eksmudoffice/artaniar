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
  | "cta.reset"
  | "cta.apply"
  | "cta.viewListings"
  | "cta.requestShortlist"
  | "cta.discussInvestment"
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
  | "home.process.requestShortlist"
  | "about.title"
  | "about.p1"
  | "about.p2"
  | "about.cta"
  | "about.card1.title"
  | "about.card1.desc"
  | "about.card2.title"
  | "about.card2.desc"
  | "about.card3.title"
  | "about.card3.desc"
  | "properties.title"
  | "properties.subtitle"
  | "properties.filterTitle"
  | "properties.empty.title"
  | "properties.empty.desc"
  | "properties.pagination"
  | "filters.title"
  | "filters.subtitle"
  | "filters.search.label"
  | "filters.search.placeholder"
  | "filters.type.label"
  | "filters.status.label"
  | "filters.purpose.label"
  | "filters.area.label"
  | "filters.price.label"
  | "filters.price.min"
  | "filters.price.max"
  | "filters.price.helper"
  | "filters.sort.label"
  | "filters.option.all"
  | "filters.option.type.villa"
  | "filters.option.type.house"
  | "filters.option.type.land"
  | "filters.option.status.ready"
  | "filters.option.status.offplan"
  | "filters.option.status.sold"
  | "filters.option.purpose.investment"
  | "filters.option.purpose.residential"
  | "filters.option.sort.newest"
  | "filters.option.sort.price_asc"
  | "filters.option.sort.price_desc"
  | "filters.option.sort.roi_desc"
  | "investment.title"
  | "investment.subtitle"
  | "investment.card1.title"
  | "investment.card1.desc"
  | "investment.card2.title"
  | "investment.card2.desc"
  | "investment.card3.title"
  | "investment.card3.desc"
  | "investment.process.title"
  | "investment.faq.title"
  | "footer.tagline"
  | "footer.explore"
  | "footer.contact"
  | "footer.browse"
  | "footer.guide"
  | "footer.about"
  | "footer.disclaimer"
  | "notfound.title"
  | "notfound.subtitle"
  | "notfound.back";

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
    "cta.reset": "Reset",
    "cta.apply": "Apply",
    "cta.viewListings": "Browse listings",
    "cta.requestShortlist": "Request a shortlist",
    "cta.discussInvestment": "Discuss investment strategy",

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
      "Selected options for living and villa business. Open details for full specs, with ready-to-use WhatsApp CTAs.",
    "home.featured.all": "View all listings",

    "home.process.title": "How we work (brief)",
    "home.process.desc":
      "You share budget, area, and goal (living / business / investment) → we prepare a shortlist → send videos/options → schedule viewings → support negotiation. Efficient process, clear communication.",
    "home.process.readGuide": "Read Investment Guide",
    "home.process.requestShortlist": "Request a shortlist",

    "about.title": "About Artaniar",
    "about.p1":
      "Artaniar is a Bali property agent who helps you choose the most relevant options—from shortlisting and comparison to coordinating viewings and negotiation.",
    "about.p2":
      "Our focus is a tidy, efficient process: clear information, fast response, and structured communication with all parties involved.",
    "about.cta": "Consultation & share your requirements",
    "about.card1.title": "Focused recommendations",
    "about.card1.desc": "We filter options based on your goal, area, and budget.",
    "about.card2.title": "Clear information",
    "about.card2.desc": "Listings are presented clearly so you can decide with confidence.",
    "about.card3.title": "Support until closing",
    "about.card3.desc": "Shortlist → viewing → negotiation → handover coordination.",

    "properties.title": "Browse listings",
    "properties.subtitle": "Use filters to narrow your options, then WhatsApp us to check availability.",
    "properties.filterTitle": "Filters",
    "properties.empty.title": "No results found",
    "properties.empty.desc":
      "Please adjust your filters (price/area), or contact us—share your preferences and we’ll recommend suitable options.",
    "properties.pagination": "Page {page} / {totalPages}",

    "filters.title": "Filters",
    "filters.subtitle": "Narrow down options and focus on the most relevant listings.",
    "filters.search.label": "Search",
    "filters.search.placeholder": "Search area, title, or code (e.g., ART-ULU)",
    "filters.type.label": "Type",
    "filters.status.label": "Status",
    "filters.purpose.label": "Purpose",
    "filters.area.label": "Area",
    "filters.price.label": "Budget (IDR)",
    "filters.price.min": "Min",
    "filters.price.max": "Max",
    "filters.price.helper": "Drag the handles • Up to Rp {max}",
    "filters.sort.label": "Sort",
    "filters.option.all": "All",
    "filters.option.type.villa": "Villa",
    "filters.option.type.house": "House",
    "filters.option.type.land": "Land",
    "filters.option.status.ready": "Ready",
    "filters.option.status.offplan": "Off-plan",
    "filters.option.status.sold": "Sold",
    "filters.option.purpose.investment": "Investment",
    "filters.option.purpose.residential": "Residential",
    "filters.option.sort.newest": "Newest",
    "filters.option.sort.price_asc": "Lowest price",
    "filters.option.sort.price_desc": "Highest price",
    "filters.option.sort.roi_desc": "Highest ROI",

    "investment.title": "Investment Guide",
    "investment.subtitle":
      "Short and practical—focused on what affects villa business ROI, and how to assess land feasibility for development (villa / restaurant / retreat).",
    "investment.card1.title": "Define your goal",
    "investment.card1.desc": "Living, villa business, or land banking. Your goal impacts area, type, and budget.",
    "investment.card2.title": "Check area demand",
    "investment.card2.desc": "For villa business: review ADR, occupancy, and comps—don’t rely on photos alone.",
    "investment.card3.title": "Land feasibility",
    "investment.card3.desc": "Access road, contour, utilities, and realistic usage potential matter.",
    "investment.process.title": "Purchase process (high-level)",
    "investment.faq.title": "FAQ",

    "footer.tagline":
      "Bali property agent for homes, villa business, and promising land—fast response, tidy shortlists, and support until closing.",
    "footer.explore": "Explore",
    "footer.contact": "Contact",
    "footer.browse": "Browse listings",
    "footer.guide": "Investment guide",
    "footer.about": "About Artaniar",
    "footer.disclaimer": "Disclaimer: Listing information is indicative. Availability and pricing may change.",

    "notfound.title": "404",
    "notfound.subtitle": "Oops! Page not found",
    "notfound.back": "Return to Home",
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
    "cta.reset": "Reset",
    "cta.apply": "Terapkan",
    "cta.viewListings": "Lihat listings",
    "cta.requestShortlist": "Minta shortlist",
    "cta.discussInvestment": "Diskusikan strategi investment",

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

    "about.title": "Tentang Artaniar",
    "about.p1":
      "Artaniar adalah property agent di Bali yang membantu Anda memilih opsi yang paling relevan—mulai dari shortlist, pembandingan, hingga koordinasi viewing dan negosiasi.",
    "about.p2":
      "Fokus kami adalah proses yang rapi dan efisien: informasi jelas, respons cepat, serta komunikasi yang terstruktur dengan pihak terkait.",
    "about.cta": "Konsultasi & sampaikan kebutuhan Anda",
    "about.card1.title": "Rekomendasi yang terarah",
    "about.card1.desc": "Menyaring opsi berdasarkan tujuan, area, dan budget Anda.",
    "about.card2.title": "Informasi yang jelas",
    "about.card2.desc": "Detail listing disampaikan rapi agar keputusan lebih tenang.",
    "about.card3.title": "Pendampingan sampai deal",
    "about.card3.desc": "Shortlist → viewing → negosiasi → koordinasi serah terima.",

    "properties.title": "Browse listings",
    "properties.subtitle": "Gunakan filter untuk mempersempit pilihan, lalu klik WhatsApp untuk menanyakan ketersediaan.",
    "properties.filterTitle": "Filter",
    "properties.empty.title": "Tidak ada hasil",
    "properties.empty.desc":
      "Silakan sesuaikan filter (harga/area), atau konsultasikan preferensi Anda agar kami bantu mencarikan opsi yang tepat.",
    "properties.pagination": "Page {page} / {totalPages}",

    "filters.title": "Filter",
    "filters.subtitle": "Persempit pilihan dan fokus ke unit yang paling relevan.",
    "filters.search.label": "Search",
    "filters.search.placeholder": "Cari area, judul, atau kode (contoh: ART-ULU)",
    "filters.type.label": "Tipe",
    "filters.status.label": "Status",
    "filters.purpose.label": "Purpose",
    "filters.area.label": "Area",
    "filters.price.label": "Budget (IDR)",
    "filters.price.min": "Min",
    "filters.price.max": "Max",
    "filters.price.helper": "Geser bar • Maksimum Rp {max}",
    "filters.sort.label": "Sort",
    "filters.option.all": "Semua",
    "filters.option.type.villa": "Villa",
    "filters.option.type.house": "Rumah",
    "filters.option.type.land": "Tanah",
    "filters.option.status.ready": "Ready",
    "filters.option.status.offplan": "Off-plan",
    "filters.option.status.sold": "Sold",
    "filters.option.purpose.investment": "Investment",
    "filters.option.purpose.residential": "Residential",
    "filters.option.sort.newest": "Terbaru",
    "filters.option.sort.price_asc": "Harga rendah",
    "filters.option.sort.price_desc": "Harga tinggi",
    "filters.option.sort.roi_desc": "ROI tertinggi",

    "investment.title": "Investment Guide",
    "investment.subtitle":
      "Ringkas dan praktis—fokus pada hal yang memengaruhi ROI villa bisnis, serta cara menilai tanah yang masuk akal untuk dikembangkan (villa / resto / retreat).",
    "investment.card1.title": "Tentukan tujuan",
    "investment.card1.desc": "Hunian, villa bisnis, atau land banking. Tujuan memengaruhi area, tipe, dan budget.",
    "investment.card2.title": "Cek demand area",
    "investment.card2.desc": "Untuk villa bisnis: lihat ADR, occupancy, dan pembanding. Jangan hanya terpukau foto.",
    "investment.card3.title": "Feasibility lahan",
    "investment.card3.desc": "Akses jalan, kontur, utilitas, dan potensi pemanfaatan perlu realistis.",
    "investment.process.title": "Proses pembelian (high-level)",
    "investment.faq.title": "FAQ",

    "footer.tagline":
      "Property agent Bali untuk hunian, villa bisnis, dan tanah potensial—dengan respons cepat, shortlist rapi, serta pendampingan deal hingga tuntas.",
    "footer.explore": "Explore",
    "footer.contact": "Contact",
    "footer.browse": "Browse listings",
    "footer.guide": "Investment guide",
    "footer.about": "About Artaniar",
    "footer.disclaimer": "Disclaimer: Informasi listing bersifat indikatif. Ketersediaan dan harga dapat berubah.",

    "notfound.title": "404",
    "notfound.subtitle": "Oops! Page not found",
    "notfound.back": "Return to Home",
  },
};