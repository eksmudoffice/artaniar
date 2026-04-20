import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import { WhatsAppCTA, CallCTA } from "@/components/cta/WhatsAppCTA";
import { ArrowRight, Building2, Sparkles, Timer, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/properties/PropertyCard";
import { useLocale } from "@/i18n/use-locale";

export default function Index() {
  const featured = properties.filter((p) => p.status !== "Sold").slice(0, 4);
  const { t } = useLocale();

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
            {/* Stronger contrast overlays for readability across bright images */}
            <div className="absolute inset-0 bg-[hsl(var(--brand-ink))]/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-[hsl(var(--brand-surface))]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/85 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                {t("home.badge")}
              </div>

              <h1 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
                {t("home.hero.title1")}
                <span className="block italic">{t("home.hero.title2")}</span>
              </h1>

              <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{t("home.hero.desc")}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppCTA context={{ intent: "Konsultasi" }} className="h-12 px-7 text-base" label={t("cta.consult")} />
                <Link
                  to="/properties"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 text-base font-semibold text-white hover:bg-white/15 transition-colors"
                >
                  {t("home.hero.browse")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <CallCTA className="h-12 px-7 text-base" />
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Timer className="h-4 w-4" /> {t("home.trust.fast.title")}
                  </div>
                  <div className="mt-1 text-sm text-white/75">{t("home.trust.fast.desc")}</div>
                </div>

                <div className="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Building2 className="h-4 w-4" /> {t("home.trust.pic.title")}
                  </div>
                  <div className="mt-1 text-sm text-white/75">{t("home.trust.pic.desc")}</div>
                </div>

                <div className="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <TrendingUp className="h-4 w-4" /> {t("home.trust.insight.title")}
                  </div>
                  <div className="mt-1 text-sm text-white/75">{t("home.trust.insight.desc")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
            <div>
              <h2 className="font-serif text-3xl leading-tight">{t("home.featured.title")}</h2>
              <p className="mt-2 text-[hsl(var(--brand-ink)/0.70)]">{t("home.featured.desc")}</p>
            </div>
            <div className="md:justify-self-end">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--brand-accent))] px-6 py-3 text-sm font-semibold text-[hsl(var(--brand-accent-foreground))] hover:bg-[hsl(var(--brand-accent)/0.92)] transition-colors"
              >
                {t("home.featured.all")} <ArrowRight className="ml-2 h-4 w-4" />
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
                <h2 className="font-serif text-3xl">{t("home.process.title")}</h2>
                <p className="mt-2 text-[hsl(var(--brand-ink)/0.70)] leading-relaxed">{t("home.process.desc")}</p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/investment"
                    className="inline-flex items-center justify-center rounded-full border border-[hsl(var(--brand-ink)/0.16)] bg-white px-6 py-3 text-sm font-semibold text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-surface-2))] transition-colors"
                  >
                    {t("home.process.readGuide")}
                  </Link>
                  <WhatsAppCTA context={{ intent: "Konsultasi" }} label={t("home.process.requestShortlist")} />
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-3xl bg-[hsl(var(--brand-surface-2))] p-5">
                  <div className="flex items-center gap-2 font-semibold">
                    <TrendingUp className="h-5 w-5 text-[hsl(var(--brand-accent))]" /> {t("home.trust.insight.title")}
                  </div>
                  <div className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("home.trust.insight.desc")}</div>
                </div>
                <div className="rounded-3xl bg-[hsl(var(--brand-surface-2))] p-5">
                  <div className="flex items-center gap-2 font-semibold">
                    <Building2 className="h-5 w-5 text-[hsl(var(--brand-accent))]" /> {t("home.trust.pic.title")}
                  </div>
                  <div className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("home.trust.pic.desc")}</div>
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