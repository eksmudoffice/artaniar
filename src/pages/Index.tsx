import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import { WhatsAppCTA, CallCTA } from "@/components/cta/WhatsAppCTA";
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/properties/PropertyCard";

export default function Index() {
  const featured = properties
    .filter((p) => p.status !== "Sold")
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-ink))]">
      <HeaderNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=2400&q=80"
              alt="Bali property"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[hsl(var(--brand-ink))]/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-[hsl(var(--brand-surface))]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/85 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Curated Bali Properties • Legal-ready • ROI-driven
              </div>

              <h1 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
                Bali property, lebih tenang karena
                <span className="block italic">kurasi & legal checking</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
                Artaniar membantu Anda menemukan vila, rumah, atau tanah di Bali yang masuk akal secara data—dan aman secara dokumen.
                Mulai dari shortlist hingga negosiasi.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppCTA context={{ intent: "Konsultasi" }} className="h-12 px-7 text-base" />
                <Link
                  to="/properties"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 text-base font-semibold text-white hover:bg-white/15 transition-colors"
                >
                  Browse listings <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <CallCTA className="h-12 px-7 text-base" />
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <div className="text-white font-semibold">Curated</div>
                  <div className="mt-1 text-sm text-white/75">Hanya unit yang clear value & demand.</div>
                </div>
                <div className="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <div className="text-white font-semibold">Legal checking</div>
                  <div className="mt-1 text-sm text-white/75">Bantu verifikasi dokumen sebelum closing.</div>
                </div>
                <div className="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <div className="text-white font-semibold">Market insight</div>
                  <div className="mt-1 text-sm text-white/75">ROI indikatif, pricing, & comps area.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
            <div>
              <h2 className="font-serif text-3xl leading-tight">Featured listings</h2>
              <p className="mt-2 text-[hsl(var(--brand-ink)/0.70)]">
                Beberapa unit unggulan untuk investment & hunian. Klik detail untuk spesifikasi lengkap dan CTA WhatsApp siap pakai.
              </p>
            </div>
            <div className="md:justify-self-end">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--brand-accent))] px-6 py-3 text-sm font-semibold text-[hsl(var(--brand-accent-foreground))] hover:bg-[hsl(var(--brand-accent)/0.92)] transition-colors"
              >
                Lihat semua listings <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
          <div className="rounded-[2.25rem] border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6 md:p-10 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.65)]">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="font-serif text-3xl">Cara kerja kami (singkat)</h2>
                <p className="mt-2 text-[hsl(var(--brand-ink)/0.70)] leading-relaxed">
                  Anda kirim preferensi budget & area → kami kurasi shortlist → cek legalitas → bantu negosiasi. Fokusnya: keputusan cepat, namun tetap aman.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/investment"
                    className="inline-flex items-center justify-center rounded-full border border-[hsl(var(--brand-ink)/0.16)] bg-white px-6 py-3 text-sm font-semibold text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-surface-2))] transition-colors"
                  >
                    Baca Investment Guide
                  </Link>
                  <WhatsAppCTA context={{ intent: "Konsultasi" }} label="Minta shortlist" />
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-3xl bg-[hsl(var(--brand-surface-2))] p-5">
                  <div className="flex items-center gap-2 font-semibold">
                    <TrendingUp className="h-5 w-5 text-[hsl(var(--brand-accent))]" /> ROI-ready
                  </div>
                  <div className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">Kami tampilkan USP & ROI indikatif agar Anda bisa bandingkan cepat.</div>
                </div>
                <div className="rounded-3xl bg-[hsl(var(--brand-surface-2))] p-5">
                  <div className="flex items-center gap-2 font-semibold">
                    <ShieldCheck className="h-5 w-5 text-[hsl(var(--brand-accent))]" /> Due diligence
                  </div>
                  <div className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">Checklist legal & dokumen kami letakkan jelas di halaman detail.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingCTA />
    </div>
  );
}
