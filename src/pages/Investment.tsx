import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { CheckCircle2 } from "lucide-react";

export default function Investment() {
  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-ink))]">
      <HeaderNav />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-24 pb-16">
        <div className="rounded-[2.25rem] border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-7 md:p-10 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
          <h1 className="font-serif text-4xl">Investment Guide</h1>
          <p className="mt-3 text-[hsl(var(--brand-ink)/0.70)] leading-relaxed">
            Ringkas, praktis, dan fokus pada hal yang memengaruhi ROI villa bisnis—plus cara memilih tanah yang masuk akal untuk dibangun (villa / resto / retreat).
          </p>

          <div className="mt-6">
            <WhatsAppCTA context={{ intent: "Konsultasi" }} label="Diskusi strategi investment" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { title: "Tentukan tujuan", text: "Hunian, villa bisnis, atau land banking? Tujuan memengaruhi area, tipe, dan budget." },
            { title: "Cek demand area", text: "Untuk villa bisnis: lihat ADR, occupancy, dan competitor set. Jangan hanya terpukau foto." },
            { title: "Feasibility lahan", text: "Untuk tanah: akses jalan, kontur, utilitas, dan potensi pemanfaatan (villa / resto / retreat) harus masuk akal." },
          ].map((c) => (
            <Card key={c.title} className="rounded-3xl border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6">

              <div className="font-semibold">{c.title}</div>
              <div className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)] leading-relaxed">{c.text}</div>
            </Card>
          ))}
        </div>

        <Separator className="my-10 bg-[hsl(var(--brand-ink)/0.10)]" />

        <div className="grid gap-8">
          <section>
            <h2 className="font-serif text-2xl">Proses beli (high-level)</h2>
            <div className="mt-3 grid gap-2">
              {[
                "Konsultasi preferensi (budget, area, tujuan: tinggal / bisnis / investasi)",
                "Shortlist 3–6 opsi paling relevan + poin pembanding",
                "Video walkthrough / site visit",
                "Cek availability & skenario deal",
                "Negosiasi + koordinasi pihak terkait (owner/agent/notaris Anda)",
                "Closing sesuai kesepakatan",
              ].map((s) => (
                <div key={s} className="flex items-start gap-2 rounded-2xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-4">

                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[hsl(var(--brand-accent))]" />
                  <div className="text-sm text-[hsl(var(--brand-ink)/0.78)]">{s}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl">FAQ</h2>
            <Accordion type="single" collapsible className="mt-3">
              <AccordionItem value="q1" className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 px-4">
                <AccordionTrigger className="font-medium">Leasehold vs Freehold, yang mana lebih baik?</AccordionTrigger>
                <AccordionContent className="text-sm text-[hsl(var(--brand-ink)/0.75)] leading-relaxed">
                  Tergantung tujuan. Freehold cocok untuk kepemilikan jangka panjang. Leasehold sering lebih efisien untuk strategi yield, asalkan klausul perpanjangan jelas.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2" className="mt-3 rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 px-4">
                <AccordionTrigger className="font-medium">Kalau saya cari tanah untuk bisnis (villa/resto), apa yang harus dicek?</AccordionTrigger>
                <AccordionContent className="text-sm text-[hsl(var(--brand-ink)/0.75)] leading-relaxed">
                  Fokus ke feasibility: akses jalan, kontur & drainase, utilitas, lingkungan sekitar, serta zonasi/aturan setempat. Untuk detail legal formal, koordinasikan dengan notaris/ahli Anda.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3" className="mt-3 rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 px-4">
                <AccordionTrigger className="font-medium">Apakah ROI yang ditampilkan dijamin?</AccordionTrigger>
                <AccordionContent className="text-sm text-[hsl(var(--brand-ink)/0.75)] leading-relaxed">
                  Tidak. ROI adalah indikasi berbasis data pasar dan asumsi (ADR, occupancy, biaya). Kami bantu buat skenario konservatif agar lebih realistis.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppFloatingCTA />
    </div>
  );
}
