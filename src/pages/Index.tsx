import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import { WhatsAppCTA, CallCTA } from "@/components/cta/WhatsAppCTA";
import { ArrowRight, Building2, Sparkles, Timer, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/properties/PropertyCard";

export default function Index() {
  const featured = properties.filter((p) => p.status !== "Sold").slice(0, 4);

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
                Respons cepat • Shortlist sesuai budget • Siap untuk tinggal / bisnis
              </div>

              <h1 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
                Mencari properti di Bali?
                <span className="block italic">Kami bantu dari shortlist hingga deal.</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
                Untuk hunian, villa bisnis, maupun tanah potensial untuk pengembangan. Sampaikan budget dan area yang diinginkan—kami bantu pilih opsi
                yang relevan, lalu koordinasi viewing dan negosiasi.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppCTA context={{ intent: "Konsultasi" }} className="h-12 px-7 text-base" />
                <Link
                  to="/properties"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 text-base font-semibold text-white hover:bg-white/15 transition-colors"
                >
                  Lihat listings <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <CallCTA className="h-12 px-7 text-base" />
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Timer className="h-4 w-4" /> Respons cepat
                  </div>
                  <div className="mt-1 text-sm text-white/75">
                    Follow-up rapi: availability, video, hingga jadwal viewing.
                  </div>
                </div>
                <div className="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Building2 className="h-4 w-4" /> Satu PIC
                  </div>
                  <div className="mt-1 text-sm text-white/75">
                    Satu kontak untuk koordinasi owner/agent/notaris Anda.
                  </div>
                </div>
                <div className="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <TrendingUp className="h-4 w-4" /> Insight pasar
                  </div>
                  <div className="mt-1 text-sm text-white/75">
                    Insight area & strategi (hunian / bisnis / investment) yang praktis.
                  </div>
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
                Pilihan untuk hunian dan peluang bisnis (villa). Klik detail untuk spesifikasi lengkap, dengan CTA WhatsApp siap digunakan.
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
                <h2 className="font-serif text-3xl">Cara kerja kami (ringkas)</h2>
                <p className="mt-2 text-[hsl(var(--brand-ink)/0.70)] leading-relaxed">
                  Anda kirim budget, area, dan tujuan (tinggal / bisnis / investasi) → kami susun shortlist → kirim video/opsi → atur viewing → bantu
                  negosiasi. Proses efisien, komunikasi rapi.
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
                    <TrendingUp className="h-5 w-5 text-[hsl(var(--brand-accent))]" /> Insight pasar
                  </div>
                  <div className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">
                    Untuk villa bisnis: kami bantu membaca demand area dan asumsi ROI secara indikatif.
                  </div>
                </div>
                <div className="rounded-3xl bg-[hsl(var(--brand-surface-2))] p-5">
                  <div className="flex items-center gap-2 font-semibold">
                    <Building2 className="h-5 w-5 text-[hsl(var(--brand-accent))]" /> Dukungan deal
                  </div>
                  <div className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">
                    Kami bantu koordinasi viewing, komunikasi owner/agent, dan negosiasi agar deal lebih lancar.
                  </div>
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