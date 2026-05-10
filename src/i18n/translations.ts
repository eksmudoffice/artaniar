export type Locale = "en" | "id";

export type TranslationKey =
  | "nav.home"
  | "nav.properties"
  | "nav.investment"
  | "nav.agentGuide"
  | "brand.subtitle"
  | "cta.consult"
  | "cta.whatsapp"
  | "cta.call"
  | "cta.reset"
  | "cta.apply"
  | "cta.viewListings"
  | "cta.requestShortlist"
  | "cta.discussInvestment"
  | "home.listings.badge"
  | "home.listings.title"
  | "home.listings.desc"
  | "home.listings.searchLabel"
  | "home.listings.searchPlaceholder"
  | "home.listings.searchHint"
  | "home.listings.ctaCardTitle"
  | "home.listings.ctaCardDesc"
  | "home.listings.resultsTitle"
  | "home.listings.resultsDesc"
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
  | "investment.process.step1"
  | "investment.process.step2"
  | "investment.process.step3"
  | "investment.process.step4"
  | "investment.process.step5"
  | "investment.process.step6"
  | "investment.faq.title"
  | "investment.faq.q1.q"
  | "investment.faq.q1.a"
  | "investment.faq.q2.q"
  | "investment.faq.q2.a"
  | "investment.faq.q3.q"
  | "investment.faq.q3.a"
  | "agent.title"
  | "agent.subtitle"
  | "agent.benefit1"
  | "agent.benefit2"
  | "agent.benefit3"
  | "agent.privacy"
  | "agent.heroCard.title"
  | "agent.heroCard.desc"
  | "agent.form.title"
  | "agent.form.desc"
  | "agent.form.name"
  | "agent.form.namePh"
  | "agent.form.wa"
  | "agent.form.waPh"
  | "agent.form.waHint"
  | "agent.form.type"
  | "agent.form.area"
  | "agent.form.areaPh"
  | "agent.form.price"
  | "agent.form.pricePh"
  | "agent.form.priceHint"
  | "agent.form.status"
  | "agent.form.ownership"
  | "agent.form.media"
  | "agent.form.mediaPh"
  | "agent.form.mediaHint"
  | "agent.form.notes"
  | "agent.form.notesPh"
  | "agent.form.optional"
  | "agent.form.responseTitle"
  | "agent.form.responseDesc"
  | "agent.form.disclaimer"
  | "agent.form.submit"
  | "agent.form.toastTitle"
  | "agent.form.toastDesc"
  | "footer.tagline"
  | "footer.explore"
  | "footer.contact"
  | "footer.home"
  | "footer.browse"
  | "footer.agentGuide"
  | "footer.guide"
  | "footer.disclaimer"
  | "notfound.title"
  | "notfound.subtitle"
  | "notfound.back";

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.investment": "Investment",
    "nav.agentGuide": "Agent Guide",

    "brand.subtitle": "Bali Property Agent",

    "cta.consult": "Consultation",
    "cta.whatsapp": "WhatsApp",
    "cta.call": "Call",
    "cta.reset": "Reset",
    "cta.apply": "Apply",
    "cta.viewListings": "Browse listings",
    "cta.requestShortlist": "Request a shortlist",
    "cta.discussInvestment": "Discuss investment strategy",

    "home.listings.badge": "Listings-first • Filter fast • WhatsApp-ready",
    "home.listings.title": "Find the right Bali property—fast.",
    "home.listings.desc":
      "Use filters (including advanced) to narrow down options. When you’re ready, WhatsApp us—your message will include the context (area/budget/listing).",
    "home.listings.searchLabel": "Quick search",
    "home.listings.searchPlaceholder": "Area, title, or code (e.g., Uluwatu / ART-ULU)",
    "home.listings.searchHint": "Tip: open Filters for advanced criteria (land, beds, road width, view, etc.).",
    "home.listings.ctaCardTitle": "Want a curated shortlist?",
    "home.listings.ctaCardDesc":
      "Share your target area + budget—we’ll recommend the most relevant options and help coordinate next steps.",
    "home.listings.resultsTitle": "Listings",
    "home.listings.resultsDesc": "Browse results below, or adjust filters to refine.",

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
    "investment.process.step1": "Share your preferences (budget, area, goal: living / business / investment)",
    "investment.process.step2": "We shortlist 3–6 most relevant options, with comparison notes",
    "investment.process.step3": "Video walkthrough / site visit",
    "investment.process.step4": "Check availability and deal scenarios",
    "investment.process.step5": "Negotiation & coordination with relevant parties (owner/agent/your notary)",
    "investment.process.step6": "Closing based on the agreed terms",

    "investment.faq.title": "FAQ",
    "investment.faq.q1.q": "Leasehold vs Freehold — which one is more suitable?",
    "investment.faq.q1.a":
      "It depends on your goal. Freehold suits long-term ownership. Leasehold is often more efficient for yield strategies, as long as the extension clause is clear.",
    "investment.faq.q2.q": "If I’m looking for land for a business (villa/restaurant), what should I check?",
    "investment.faq.q2.a":
      "Focus on feasibility: access road, contour & drainage, utilities, surroundings, and zoning/local regulations. For formal legal verification, please coordinate with your notary/advisor.",
    "investment.faq.q3.q": "Is the displayed ROI guaranteed?",
    "investment.faq.q3.a":
      "No. ROI is indicative based on market data and assumptions (ADR, occupancy, costs). We can help build a more conservative scenario for a more realistic view.",

    "agent.title": "Submit your listing to Artaniar",
    "agent.subtitle":
      "For owners/agents who want a tidy listing intake and fast follow-up. Submit the basics here—then we’ll continue via WhatsApp with the right format.",
    "agent.benefit1": "Structured intake: title, area, price, media link, key notes.",
    "agent.benefit2": "Faster response time: we can start qualifying immediately.",
    "agent.benefit3": "Clear next steps: requirements, data needed, and listing workflow.",
    "agent.privacy": "Privacy: We use your details only to follow up on this submission. Typical response time: same day (business hours).",
    "agent.heroCard.title": "Agent / Owner intake",
    "agent.heroCard.desc": "Send the essentials—then we’ll ask follow-up questions and guide you through the process.",

    "agent.form.title": "Submit listing details",
    "agent.form.desc": "Fill the required fields, then click “Send via WhatsApp” to submit in a clean format.",
    "agent.form.name": "Name",
    "agent.form.namePh": "Your name",
    "agent.form.wa": "WhatsApp number",
    "agent.form.waPh": "e.g., +62 812-xxxx-xxxx",
    "agent.form.waHint": "Tip: include country code (+62).",
    "agent.form.type": "Property type (optional)",
    "agent.form.area": "Area",
    "agent.form.areaPh": "Choose area",
    "agent.form.price": "Price (IDR)",
    "agent.form.pricePh": "e.g., 8500000000",
    "agent.form.priceHint": "Numbers only (we’ll format it in the message).",
    "agent.form.status": "Status (optional)",
    "agent.form.ownership": "Ownership (optional)",
    "agent.form.media": "Media link (optional)",
    "agent.form.mediaPh": "Google Drive / Photos / Video link",
    "agent.form.mediaHint": "Use a shareable link (anyone with link can view).",
    "agent.form.notes": "Additional notes",
    "agent.form.notesPh": "Access road, land/building size, bedrooms, legal notes, urgency, etc.",
    "agent.form.optional": "Optional",
    "agent.form.responseTitle": "What happens next?",
    "agent.form.responseDesc": "After you send the message, we’ll reply with listing requirements and the next steps.",
    "agent.form.disclaimer": "By sending, you agree to be contacted via WhatsApp for listing verification and follow-up.",
    "agent.form.submit": "Send via WhatsApp",
    "agent.form.toastTitle": "Opening WhatsApp…",
    "agent.form.toastDesc": "Your message is pre-filled with your listing details.",

    "footer.tagline":
      "Bali property agent for homes, villa business, and promising land—fast response, tidy shortlists, and support until closing.",
    "footer.explore": "Explore",
    "footer.contact": "Contact",
    "footer.home": "Home (Listings)",
    "footer.browse": "Browse listings",
    "footer.agentGuide": "Agent Guide",
    "footer.guide": "Investment guide",
    "footer.disclaimer": "Disclaimer: Listing information is indicative. Availability and pricing may change.",

    "notfound.title": "404",
    "notfound.subtitle": "Oops! Page not found",
    "notfound.back": "Return to Home",
  },

  id: {
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.investment": "Investment",
    "nav.agentGuide": "Agent Guide",

    "brand.subtitle": "Bali Property Agent",

    "cta.consult": "Konsultasi",
    "cta.whatsapp": "WhatsApp",
    "cta.call": "Call",
    "cta.reset": "Reset",
    "cta.apply": "Terapkan",
    "cta.viewListings": "Lihat listings",
    "cta.requestShortlist": "Minta shortlist",
    "cta.discussInvestment": "Diskusikan strategi investment",

    "home.listings.badge": "Listings-first • Filter cepat • WhatsApp-ready",
    "home.listings.title": "Cari properti Bali—lebih cepat.",
    "home.listings.desc":
      "Gunakan filter (termasuk advanced) untuk mempersempit opsi. Saat siap, klik WhatsApp—pesan otomatis berisi context (area/budget/listing).",
    "home.listings.searchLabel": "Quick search",
    "home.listings.searchPlaceholder": "Area, judul, atau kode (contoh: Uluwatu / ART-ULU)",
    "home.listings.searchHint": "Tips: buka Filters untuk advanced (land, beds, road width, view, dll).",
    "home.listings.ctaCardTitle": "Mau shortlist yang lebih terarah?",
    "home.listings.ctaCardDesc":
      "Kirim target area + budget—kami bantu pilih opsi yang paling relevan dan koordinasi langkah berikutnya.",
    "home.listings.resultsTitle": "Listings",
    "home.listings.resultsDesc": "Browse hasil di bawah, atau atur filter untuk mempersempit.",

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
    "investment.process.step1": "Konsultasi preferensi (budget, area, tujuan: tinggal / bisnis / investasi)",
    "investment.process.step2": "Shortlist 3–6 opsi paling relevan, beserta poin pembanding",
    "investment.process.step3": "Video walkthrough / site visit",
    "investment.process.step4": "Cek ketersediaan dan skenario deal",
    "investment.process.step5": "Negosiasi dan koordinasi pihak terkait (owner/agent/notaris Anda)",
    "investment.process.step6": "Closing sesuai kesepakatan",

    "investment.faq.title": "FAQ",
    "investment.faq.q1.q": "Leasehold vs Freehold, mana yang lebih sesuai?",
    "investment.faq.q1.a":
      "Bergantung pada tujuan. Freehold cocok untuk kepemilikan jangka panjang. Leasehold sering lebih efisien untuk strategi yield, dengan catatan klausul perpanjangan jelas.",
    "investment.faq.q2.q": "Jika saya mencari tanah untuk bisnis (villa/resto), apa yang perlu dicek?",
    "investment.faq.q2.a":
      "Fokus pada feasibility: akses jalan, kontur dan drainase, utilitas, lingkungan sekitar, serta zonasi/aturan setempat. Untuk detail legal formal, silakan koordinasikan dengan notaris/ahli Anda.",
    "investment.faq.q3.q": "Apakah ROI yang ditampilkan dijamin?",
    "investment.faq.q3.a":
      "Tidak. ROI bersifat indikatif berdasarkan data pasar dan asumsi (ADR, occupancy, biaya). Kami dapat membantu menyusun skenario yang lebih konservatif agar perhitungan lebih realistis.",

    "agent.title": "Submit listing Anda ke Artaniar",
    "agent.subtitle":
      "Untuk owner/agent yang ingin proses intake listing rapi dan respons cepat. Isi data dasar di sini—lalu lanjut via WhatsApp dengan format yang jelas.",
    "agent.benefit1": "Intake terstruktur: tipe, area, harga, link media, catatan penting.",
    "agent.benefit2": "Respons lebih cepat: kami bisa mulai qualify dari awal.",
    "agent.benefit3": "Next steps jelas: requirement dan alur listing.",
    "agent.privacy": "Privasi: data dipakai hanya untuk follow-up submission ini. Estimasi respons: hari yang sama (jam kerja).",
    "agent.heroCard.title": "Agent / Owner intake",
    "agent.heroCard.desc": "Kirim data inti—kami akan follow-up pertanyaan dan pandu proses selanjutnya.",

    "agent.form.title": "Form submit listing",
    "agent.form.desc": "Isi field wajib, lalu klik “Kirim via WhatsApp” untuk mengirim dalam format yang rapi.",
    "agent.form.name": "Nama",
    "agent.form.namePh": "Nama Anda",
    "agent.form.wa": "Nomor WhatsApp",
    "agent.form.waPh": "Contoh: +62 812-xxxx-xxxx",
    "agent.form.waHint": "Tips: pakai kode negara (+62).",
    "agent.form.type": "Tipe properti (opsional)",
    "agent.form.area": "Area",
    "agent.form.areaPh": "Pilih area",
    "agent.form.price": "Harga (IDR)",
    "agent.form.pricePh": "Contoh: 8500000000",
    "agent.form.priceHint": "Angka saja (nanti kami format di pesan).",
    "agent.form.status": "Status (opsional)",
    "agent.form.ownership": "Ownership (opsional)",
    "agent.form.media": "Link foto/video (opsional)",
    "agent.form.mediaPh": "Google Drive / link foto / video",
    "agent.form.mediaHint": "Pastikan link bisa diakses (shareable).",
    "agent.form.notes": "Catatan tambahan",
    "agent.form.notesPh": "Akses jalan, land/building size, bedrooms, legal notes, urgency, dll.",
    "agent.form.optional": "Opsional",
    "agent.form.responseTitle": "Setelah kirim, apa berikutnya?",
    "agent.form.responseDesc": "Setelah pesan terkirim, kami reply requirement listing dan langkah berikutnya.",
    "agent.form.disclaimer": "Dengan mengirim, Anda setuju dihubungi via WhatsApp untuk verifikasi dan follow-up listing.",
    "agent.form.submit": "Kirim via WhatsApp",
    "agent.form.toastTitle": "Membuka WhatsApp…",
    "agent.form.toastDesc": "Pesan sudah terisi otomatis dengan detail listing Anda.",

    "footer.tagline":
      "Property agent Bali untuk hunian, villa bisnis, dan tanah potensial—dengan respons cepat, shortlist rapi, serta pendampingan deal hingga tuntas.",
    "footer.explore": "Explore",
    "footer.contact": "Contact",
    "footer.home": "Home (Listings)",
    "footer.browse": "Browse listings",
    "footer.agentGuide": "Agent Guide",
    "footer.guide": "Investment guide",
    "footer.disclaimer": "Disclaimer: Informasi listing bersifat indikatif. Ketersediaan dan harga dapat berubah.",

    "notfound.title": "404",
    "notfound.subtitle": "Oops! Page not found",
    "notfound.back": "Return to Home",
  },
};