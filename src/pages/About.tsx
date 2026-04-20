import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/i18n/use-locale";

export default function About() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-ink))]">
      <HeaderNav />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-24 pb-16">
        <div className="rounded-[2.25rem] overflow-hidden border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
          <div className="grid md:grid-cols-2">
            <div className="p-7 md:p-10">
              <h1 className="font-serif text-4xl">{t("about.title")}</h1>
              <p className="mt-3 text-[hsl(var(--brand-ink)/0.70)] leading-relaxed">{t("about.p1")}</p>
              <p className="mt-3 text-[hsl(var(--brand-ink)/0.70)] leading-relaxed">{t("about.p2")}</p>
              <div className="mt-7">
                <WhatsAppCTA context={{ intent: "Konsultasi" }} label={t("about.cta")} />
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
            <div className="font-semibold">{t("about.card1.title")}</div>
            <div className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("about.card1.desc")}</div>
          </Card>
          <Card className="rounded-3xl border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6">
            <div className="font-semibold">{t("about.card2.title")}</div>
            <div className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("about.card2.desc")}</div>
          </Card>
          <Card className="rounded-3xl border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6">
            <div className="font-semibold">{t("about.card3.title")}</div>
            <div className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("about.card3.desc")}</div>
          </Card>
        </div>
      </main>

      <Footer />
      <WhatsAppFloatingCTA />
    </div>
  );
}