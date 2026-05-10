import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import AgentSubmitListingForm from "@/components/agent/AgentSubmitListingForm";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/i18n/use-locale";
import Seo from "@/components/seo/Seo";

export default function AgentGuide() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-ink))]">
      <Seo
        title={`${t("nav.agentGuide")} | Artaniar Property`}
        description={t("agent.subtitle")}
        canonicalPath="/agent-guide"
      />
      <HeaderNav />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-24 pb-16">
        <div className="rounded-[2.25rem] overflow-hidden border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
          <div className="grid md:grid-cols-[1.05fr_0.95fr]">
            <div className="p-7 md:p-10">
              <h1 className="font-serif text-4xl leading-tight">{t("agent.title")}</h1>
              <p className="mt-3 text-[hsl(var(--brand-ink)/0.72)] leading-relaxed">
                {t("agent.subtitle")}
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  t("agent.benefit1"),
                  t("agent.benefit2"),
                  t("agent.benefit3"),
                ].map((b) => (
                  <div
                    key={b}
                    className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-[hsl(var(--brand-surface-2))] p-4 text-sm text-[hsl(var(--brand-ink)/0.78)]"
                  >
                    {b}
                  </div>
                ))}
              </div>

              <div className="mt-7 text-xs text-[hsl(var(--brand-ink)/0.62)] leading-relaxed">
                {t("agent.privacy")}
              </div>
            </div>

            <div className="relative min-h-[240px] md:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1800&q=80"
                alt="Submit listing"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[hsl(var(--brand-ink))]/30" />
              <div className="absolute inset-0 p-7 md:p-10 flex items-end">
                <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur px-5 py-4 text-white">
                  <div className="font-serif text-xl">{t("agent.heroCard.title")}</div>
                  <div className="mt-1 text-sm text-white/85">{t("agent.heroCard.desc")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="mt-8 rounded-[2rem] border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6 md:p-8 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl">{t("agent.form.title")}</h2>
            <p className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("agent.form.desc")}</p>
          </div>

          <div className="mt-6">
            <AgentSubmitListingForm />
          </div>
        </Card>
      </main>

      <Footer />
      <WhatsAppFloatingCTA />
    </div>
  );
}