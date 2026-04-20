import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-ink))]">
      <HeaderNav />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-24 pb-16">
        <div className="rounded-[2.25rem] overflow-hidden border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
          <div className="grid md:grid-cols-2">
            <div className="p-7 md:p-10">
              <h1 className="font-serif text-4xl">Tentang Artaniar</h1>
              <p className="mt-3 text-[hsl(var(--brand-ink)/0.70)] leading-relaxed">
                Artaniar adalah kurator properti Bali yang fokus pada keputusan yang rapi: data pasar, potensi ROI, dan legalitas.
                Kami bukan sekadar “listing sebanyak-banyaknya”—kami memilih unit yang masuk akal untuk tujuan Anda.
              </p>
              <div className="mt-7">
                <WhatsAppCTA context={{ intent: "Konsultasi" }} label="Konsultasi & ceritakan kebutuhan Anda" />
              </div>
            </div>
            <div className="relative min-h-[260px] md:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1800&q=80"
                alt="Bali atmosphere"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[hsl(var(--brand-ink))]/25" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card className="rounded-3xl border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6">
            <div className="font-semibold">Kurasi yang tegas</div>
            <div className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">Kualitas inventory lebih penting daripada kuantitas.</div>
          </Card>
          <Card className="rounded-3xl border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6">
            <div className="font-semibold">Transparansi dokumen</div>
            <div className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">Checklist legal disajikan jelas untuk minim risiko.</div>
          </Card>
          <Card className="rounded-3xl border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6">
            <div className="font-semibold">Pendampingan closing</div>
            <div className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">Shortlist → viewing → negosiasi → serah terima.</div>
          </Card>
        </div>
      </main>

      <Footer />
      <WhatsAppFloatingCTA />
    </div>
  );
}
