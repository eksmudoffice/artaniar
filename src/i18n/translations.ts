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
  | "cta.callNow"
  | "cta.reset"
  | "cta.apply"
  | "cta.viewListings"
  | "cta.requestShortlist"
  | "cta.discussInvestment"
  | "cta.prev"
  | "cta.next"
  | "cta.back"
  | "cta.virtualTour"
  | "cta.askWhatsapp"
  | "cta.detail"
  | "cta.similarUnit"
  | "cta.checkAvailability"
  | "cta.requestVideo"
  | "cta.ready"
  | "cta.deal"
  | "label.listingCode"
  | "label.price"
  | "label.roi"
  | "label.location"
  | "home.topListings.title"
  | "home.topListings.subtitle"
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
  | "filters.advanced.chip"
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
  | "properties.title"
  | "properties.subtitle"
  | "properties.filterTitle"
  | "properties.empty.title"
  | "properties.empty.desc"
  | "properties.pagination"
  | "property.purpose.investment"
  | "property.purpose.residential"
  | "property.status.ready"
  | "property.status.offplan"
  | "property.status.sold"
  | "property.ownership.freehold"
  | "property.ownership.leasehold"
  | "property.detail.notFound.title"
  | "property.detail.notFound.desc"
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
  | "footer.headline"
  | "footer.tagline"
  | "footer.explore"
  | "footer.contact"
  | "footer.home"
  | "footer.browse"
  | "footer.agentGuide"
  | "footer.guide"
  | "footer.disclaimer"
  | "footer.instagramLabel"
  | "footer.instagramHandle"
  | "notfound.title"
  | "notfound.subtitle"
  | "notfound.back";

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    "nav.home": "Home",
    "nav.properties": "Find Property",
    "nav.investment": "Investment Guide",
    "nav.agentGuide": "Sell Your Property",

    "brand.subtitle": "Bali Property Agent",

    "cta.consult": "Consult",
    "cta.whatsapp": "WhatsApp",
    "cta.call": "Call",
    "cta.callNow": "Call",
    "cta.reset": "Reset",
    "cta.apply": "Apply",
    "cta.viewListings": "Browse listings",
    "cta.requestShortlist": "Request shortlist",
    "cta.discussInvestment": "Talk investment strategy",
    "cta.prev": "Prev",
    "cta.next": "Next",
    "cta.back": "Back",
    "cta.virtualTour": "Request virtual tour",
    "cta.askWhatsapp": "Ask on WhatsApp",
    "cta.detail": "View details",
    "cta.similarUnit": "Request similar unit",
    "cta.checkAvailability": "Check availability",
    "cta.requestVideo": "Request video",
    "cta.ready": "Ready?",
    "cta.deal": "Deal",

    "label.listingCode": "Listing code",
    "label.price": "Price",
    "label.roi": "ROI",
    "label.location": "Location",

    "home.topListings.title": "Top Listings",
    "home.topListings.subtitle": "Most interesting picks right now—open details or ask via WhatsApp.",

    "home.listings.badge": "Fast filters • WhatsApp-ready • Buyer-first",
    "home.listings.title": "Find the right Bali property—without the hassle.",
    "home.listings.desc":
      "Use filters (including advanced) to narrow options. When you're ready, WhatsApp us—your message includes context like area, budget, and listing code.",
    "home.listings.searchLabel": "Quick search",
    "home.listings.searchPlaceholder": "Area, title, or code (e.g., Uluwatu / ART-ULU)",
    "home.listings.searchHint": "Tip: open Filters for land size, bedrooms, road width, view, and more.",
    "home.listings.ctaCardTitle": "Want a curated shortlist?",
    "home.listings.ctaCardDesc":
      "Send your target area + budget. We'll recommend options that actually match, then help with next steps.",
    "home.listings.resultsTitle": "Listings",
    "home.listings.resultsDesc": "Browse results below, or refine using filters.",

    "filters.advanced.chip": "Advanced filters",
    "filters.title": "Filters",
    "filters.subtitle": "Narrow down options and focus on what's relevant.",
    "filters.search.label": "Search",
    "filters.search.placeholder": "Search area, title, or code (e.g., ART-ULU)",
    "filters.type.label": "Type",
    "filters.status.label": "Status",
    "filters.purpose.label": "Goal",
    "filters.area.label": "Area",
    "filters.price.label": "Budget (IDR)",
    "filters.price.min": "Min",
    "filters.price.max": "Max",
    "filters.price.helper": "Drag the bars • Up to Rp {max}",
    "filters.sort.label": "Sort",
    "filters.option.all": "All",
    "filters.option.type.villa": "Villa",
    "filters.option.type.house": "House",
    "filters.option.type.land": "Land",
    "filters.option.status.ready": "Ready",
    "filters.option.status.offplan": "Off-plan",
    "filters.option.status.sold": "Sold",
    "filters.option.purpose.investment": "Investment",
    "filters.option.purpose.residential": "Living",
    "filters.option.sort.newest": "Newest",
    "filters.option.sort.price_asc": "Lowest price",
    "filters.option.sort.price_desc": "Highest price",
    "filters.option.sort.roi_desc": "Highest ROI",

    "properties.title": "Find Property",
    "properties.subtitle": "Filter fast, compare calmly—then WhatsApp to check availability.",
    "properties.filterTitle": "Filters",
    "properties.empty.title": "No matching results",
    "properties.empty.desc":
      "Try adjusting your filters (area/budget), or WhatsApp us your preferences—we'll help shortlist the closest matches.",
    "properties.pagination": "Page {page} / {totalPages}",

    "property.purpose.investment": "Investment",
    "property.purpose.residential": "Living",
    "property.status.ready": "Ready",
    "property.status.offplan": "Off-plan",
    "property.status.sold": "Sold",
    "property.ownership.freehold": "Freehold",
    "property.ownership.leasehold": "Leasehold",

    "property.detail.notFound.title": "Listing not found",
    "property.detail.notFound.desc": "Try going back to listings, or WhatsApp us for recommendations.",

    "investment.title": "Investment Guide",
    "investment.subtitle":
      "Short, practical, and buyer-friendly—what actually affects villa business ROI and land feasibility (villa / restaurant / retreat).",
    "investment.card1.title": "Clarify your goal",
    "investment.card1.desc": "Living, villa business, or land banking. Your goal shapes area, type, and budget.",
    "investment.card2.title": "Check area demand",
    "investment.card2.desc": "For villa business: review ADR, occupancy, and comps—don't rely on photos alone.",
    "investment.card3.title": "Land feasibility",
    "investment.card3.desc": "Access road, contour, utilities, and realistic usage potential matter.",

    "investment.process.title": "Purchase flow (high-level)",
    "investment.process.step1": "Share your preferences (budget, area, goal: living / business / investment)",
    "investment.process.step2": "We shortlist 3–6 best-fit options, with comparison notes",
    "investment.process.step3": "Video walkthrough / site visit",
    "investment.process.step4": "Availability check and deal scenarios",
    "investment.process.step5": "Negotiation & coordination with relevant parties (owner/agent/your notary)",
    "investment.process.step6": "Closing based on the agreed terms",

    "investment.faq.title": "FAQ",
    "investment.faq.q1.q": "Leasehold vs Freehold — which one fits better?",
    "investment.faq.q1.a":
      "Depends on your goal. Freehold suits long-term ownership. Leasehold can be efficient for yield strategies—just make sure the extension clause is clear.",
    "investment.faq.q2.q": "Looking for land for a business (villa/restaurant)? What should I check?",
    "investment.faq.q2.a":
      "Focus on feasibility: access road, contour & drainage, utilities, surroundings, and zoning/local rules. For formal legal checks, coordinate with your notary/advisor.",
    "investment.faq.q3.q": "Is the ROI shown guaranteed?",
    "investment.faq.q3.a":
      "No—it's indicative based on market assumptions (ADR, occupancy, costs). We can help build a more conservative scenario for a clearer picture.",

    "agent.title": "Sell your property with Artaniar",
    "agent.subtitle":
      "For owners who want a tidy listing intake and quick follow-up. Share the basics here—then we'll continue via WhatsApp.",
    "agent.benefit1": "Structured intake: area, price, type, media link, and key notes.",
    "agent.benefit2": "Faster follow-up: we can start reviewing right away.",
    "agent.benefit3": "Clear next steps: requirements, checks, and listing flow.",
    "agent.privacy": "Privacy: we use your details only to follow up this submission. Typical response time: same day (business hours).",
    "agent.heroCard.title": "Owner listing intake",
    "agent.heroCard.desc": "Send the essentials—then we'll ask follow-up questions in a clean format.",

    "agent.form.title": "Submit property details",
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
    "agent.form.priceHint": "Numbers only (we'll format it in the message).",
    "agent.form.status": "Status (optional)",
    "agent.form.ownership": "Ownership (optional)",
    "agent.form.media": "Media link (optional)",
    "agent.form.mediaPh": "Google Drive / photos / video link",
    "agent.form.mediaHint": "Use a shareable link (anyone with the link can view).",
    "agent.form.notes": "Additional notes",
    "agent.form.notesPh": "Access road, land/building size, bedrooms, legal notes, urgency, etc.",
    "agent.form.optional": "Optional",
    "agent.form.responseTitle": "What happens next?",
    "agent.form.responseDesc": "After you send the message, we'll reply with requirements and next steps.",
    "agent.form.disclaimer": "By sending, you agree to be contacted via WhatsApp for verification and follow-up.",
    "agent.form.submit": "Send via WhatsApp",
    "agent.form.toastTitle": "Opening WhatsApp…",
    "agent.form.toastDesc": "Your message is pre-filled with your property details.",

    "footer.headline": "Artaniar",
    "footer.tagline": "Buyer-focused Bali property agent—fast response, curated shortlists, and support through closing.",
    "footer.explore": "Explore",
    "footer.contact": "Contact",
    "footer.home": "Home",
    "footer.browse": "Find Property",
    "footer.agentGuide": "Sell Your Property",
    "footer.guide": "Investment Guide",
    "footer.disclaimer": "Disclaimer: Listing info is indicative. Availability and pricing may change.",
    "footer.instagramLabel": "Instagram",
    "footer.instagramHandle": "@artaniar.property",

    "notfound.title": "404",
    "notfound.subtitle": "Page not found",
    "notfound.back": "Back to Home",
  },

  id: {
    "nav.home": "Beranda",
    "nav.properties": "Cari Properti",
    "nav.investment": "Panduan Investasi",
    "nav.agentGuide": "Jual Properti",

    "brand.subtitle": "Agen Properti Bali",

    "cta.consult": "Konsultasi",
    "cta.whatsapp": "WhatsApp",
    "cta.call": "Telepon",
    "cta.callNow": "Telepon",
    "cta.reset": "Reset",
    "cta.apply": "Terapkan",
    "cta.viewListings": "Lihat listing",
    "cta.requestShortlist": "Minta shortlist",
    "cta.discussInvestment": "Diskusi strategi investasi",
    "cta.prev": "Sebelumnya",
    "cta.next": "Berikutnya",
    "cta.back": "Kembali",
    "cta.virtualTour": "Minta tur virtual",
    "cta.askWhatsapp": "Tanya via WhatsApp",
    "cta.detail": "Lihat detail",
    "cta.similarUnit": "Minta unit serupa",
    "cta.checkAvailability": "Cek ketersediaan",
    "cta.requestVideo": "Minta video",
    "cta.ready": "Cek ready",
    "cta.deal": "Negosiasi",

    "label.listingCode": "Kode listing",
    "label.price": "Harga",
    "label.roi": "ROI",
    "label.location": "Lokasi",

    "home.topListings.title": "Top Listing",
    "home.topListings.subtitle": "Pilihan unit paling menarik saat ini—lihat detail atau tanya via WhatsApp.",

    "home.listings.badge": "Filter cepat • WhatsApp-ready • Buyer-first",
    "home.listings.title": "Cari properti di Bali—lebih cepat, lebih jelas.",
    "home.listings.desc":
      "Gunakan filter (termasuk advanced) untuk mempersempit pilihan. Saat siap, klik WhatsApp—pesan otomatis berisi konteks seperti area, budget, dan kode listing.",
    "home.listings.searchLabel": "Pencarian cepat",
    "home.listings.searchPlaceholder": "Area, judul, atau kode (contoh: Uluwatu / ART-ULU)",
    "home.listings.searchHint": "Tips: buka Filter untuk land size, bedrooms, lebar jalan, view, dan lainnya.",
    "home.listings.ctaCardTitle": "Butuh shortlist yang lebih pas?",
    "home.listings.ctaCardDesc":
      "Kirim target area + budget. Kami bantu rekomendasikan opsi yang relevan, lalu dampingi proses berikutnya.",
    "home.listings.resultsTitle": "Listing",
    "home.listings.resultsDesc": "Lihat hasil di bawah, atau sesuaikan filter untuk mempersempit pilihan.",

    "filters.advanced.chip": "Filter lanjutan",
    "filters.title": "Filter",
    "filters.subtitle": "Persempit pilihan agar fokus pada yang paling relevan.",
    "filters.search.label": "Pencarian",
    "filters.search.placeholder": "Cari area, judul, atau kode (contoh: ART-ULU)",
    "filters.type.label": "Tipe",
    "filters.status.label": "Status",
    "filters.purpose.label": "Tujuan",
    "filters.area.label": "Area",
    "filters.price.label": "Budget (IDR)",
    "filters.price.min": "Min",
    "filters.price.max": "Maks",
    "filters.price.helper": "Geser bar • Maks. Rp {max}",
    "filters.sort.label": "Urutkan",
    "filters.option.all": "Semua",
    "filters.option.type.villa": "Villa",
    "filters.option.type.house": "Rumah",
    "filters.option.type.land": "Tanah",
    "filters.option.status.ready": "Ready",
    "filters.option.status.offplan": "Off-plan",
    "filters.option.status.sold": "Sold",
    "filters.option.purpose.investment": "Investasi",
    "filters.option.purpose.residential": "Hunian",
    "filters.option.sort.newest": "Terbaru",
    "filters.option.sort.price_asc": "Harga terendah",
    "filters.option.sort.price_desc": "Harga tertinggi",
    "filters.option.sort.roi_desc": "ROI tertinggi",

    "properties.title": "Cari Properti",
    "properties.subtitle": "Filter cepat, bandingkan dengan tenang—lalu WhatsApp untuk cek ketersediaan.",
    "properties.filterTitle": "Filter",
    "properties.empty.title": "Belum ada yang sesuai",
    "properties.empty.desc":
      "Coba sesuaikan filter (area/budget), atau WhatsApp preferensimu—kami bantu shortlist opsi yang paling mendekati.",
    "properties.pagination": "Halaman {page} dari {totalPages}",

    "property.purpose.investment": "Investasi",
    "property.purpose.residential": "Hunian",
    "property.status.ready": "Ready",
    "property.status.offplan": "Off-plan",
    "property.status.sold": "Sold",
    "property.ownership.freehold": "Freehold",
    "property.ownership.leasehold": "Leasehold",

    "property.detail.notFound.title": "Listing tidak ditemukan",
    "property.detail.notFound.desc": "Coba kembali ke halaman listing, atau WhatsApp kami untuk rekomendasi unit lain.",

    "investment.title": "Panduan Investasi",
    "investment.subtitle":
      "Ringkas dan praktis—fokus pada hal yang benar-benar memengaruhi ROI villa bisnis dan feasibility lahan (villa / resto / retreat).",
    "investment.card1.title": "Tentukan tujuan",
    "investment.card1.desc": "Hunian, villa bisnis, atau land banking. Tujuan akan menentukan area, tipe, dan budget.",
    "investment.card2.title": "Cek demand area",
    "investment.card2.desc": "Untuk villa bisnis: cek ADR, occupancy, dan pembanding—bukan hanya foto.",
    "investment.card3.title": "Feasibility lahan",
    "investment.card3.desc": "Akses jalan, kontur, utilitas, dan potensi pemanfaatan perlu dicek realistis.",

    "investment.process.title": "Alur pembelian (ringkas)",
    "investment.process.step1": "Konsultasi preferensi (budget, area, tujuan: hunian / bisnis / investasi)",
    "investment.process.step2": "Kami siapkan shortlist 3–6 opsi paling relevan + poin pembanding",
    "investment.process.step3": "Video walkthrough / site visit",
    "investment.process.step4": "Cek ketersediaan dan skenario deal",
    "investment.process.step5": "Negosiasi + koordinasi pihak terkait (owner/agent/notaris kamu)",
    "investment.process.step6": "Closing sesuai kesepakatan",

    "investment.faq.title": "FAQ",
    "investment.faq.q1.q": "Leasehold vs Freehold — lebih cocok yang mana?",
    "investment.faq.q1.a":
      "Tergantung tujuan. Freehold cocok untuk kepemilikan jangka panjang. Leasehold sering lebih efisien untuk strategi yield—pastikan klausul perpanjangan jelas.",
    "investment.faq.q2.q": "Kalau cari tanah untuk bisnis (villa/resto), apa yang perlu dicek?",
    "investment.faq.q2.a":
      "Fokus pada feasibility: akses jalan, kontur & drainase, utilitas, lingkungan sekitar, serta zonasi/aturan setempat. Untuk legal formal, koordinasikan dengan notaris/ahli kamu.",
    "investment.faq.q3.q": "ROI yang ditampilkan itu dijamin?",
    "investment.faq.q3.a":
      "Tidak. ROI bersifat indikatif berdasarkan asumsi pasar (ADR, occupancy, biaya). Jika perlu, kami bisa bantu buat skenario yang lebih konservatif.",

    "agent.title": "Jual properti bersama Artaniar",
    "agent.subtitle":
      "Untuk owner yang ingin proses intake rapi dan follow-up cepat. Isi data inti di sini—lanjutnya via WhatsApp.",
    "agent.benefit1": "Intake terstruktur: area, harga, tipe, link media, dan catatan penting.",
    "agent.benefit2": "Follow-up lebih cepat: kami bisa mulai review lebih awal.",
    "agent.benefit3": "Langkah berikutnya jelas: requirement, pengecekan, dan alur listing.",
    "agent.privacy": "Privasi: data hanya dipakai untuk follow-up submission ini. Estimasi respons: hari yang sama (jam kerja).",
    "agent.heroCard.title": "Form intake listing owner",
    "agent.heroCard.desc": "Kirim data inti—kami lanjutkan pertanyaan berikutnya dengan format yang rapi.",

    "agent.form.title": "Submit detail properti",
    "agent.form.desc": "Isi data yang diperlukan, lalu klik “Kirim via WhatsApp” agar terkirim dalam format yang rapi.",
    "agent.form.name": "Nama",
    "agent.form.namePh": "Nama kamu",
    "agent.form.wa": "Nomor WhatsApp",
    "agent.form.waPh": "Contoh: +62 812-xxxx-xxxx",
    "agent.form.waHint": "Tips: sertakan kode negara (+62).",
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
    "agent.form.notesPh": "Akses jalan, land/building size, bedrooms, legal notes, urgensi, dll.",
    "agent.form.optional": "Opsional",
    "agent.form.responseTitle": "Langkah berikutnya",
    "agent.form.responseDesc": "Setelah pesan terkirim, kami akan balas requirement dan proses selanjutnya.",
    "agent.form.disclaimer": "Dengan mengirim, kamu setuju dihubungi via WhatsApp untuk verifikasi dan tindak lanjut.",
    "agent.form.submit": "Kirim via WhatsApp",
    "agent.form.toastTitle": "Membuka WhatsApp…",
    "agent.form.toastDesc": "Pesan sudah terisi otomatis dengan detail properti kamu.",

    "footer.headline": "Artaniar",
    "footer.tagline":
      "Artaniar adalah agen properti Bali yang berfokus pada kebutuhan buyer—respons cepat, shortlist terkurasi, dan pendampingan hingga proses transaksi selesai.",
    "footer.explore": "Menu",
    "footer.contact": "Kontak",
    "footer.home": "Beranda",
    "footer.browse": "Cari Properti",
    "footer.agentGuide": "Jual Properti",
    "footer.guide": "Panduan Investasi",
    "footer.disclaimer": "Disclaimer: Informasi listing bersifat indikatif. Ketersediaan dan harga dapat berubah.",
    "footer.instagramLabel": "Instagram",
    "footer.instagramHandle": "@artaniar.property",

    "notfound.title": "404",
    "notfound.subtitle": "Halaman tidak ditemukan",
    "notfound.back": "Kembali ke Beranda",
  },
};