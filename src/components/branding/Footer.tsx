import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { Instagram, Mail } from "lucide-react";
import { useLocale } from "@/i18n/use-locale";
import artaniarLogo from "@/assets/artaniar-logo.png";

const INSTAGRAM_URL = "https://instagram.com/artaniar.property";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="mt-16 bg-[hsl(var(--brand-surface-2))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={artaniarLogo}
                alt="Artaniar"
                className="h-10 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            <p className="mt-3 text-sm text-[hsl(var(--brand-ink)/0.72)] leading-relaxed max-w-md">
              {t("footer.tagline")}
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <WhatsAppCTA context={{ intent: "Konsultasi" }} label={t("cta.consult")} />
              <div className="text-xs text-[hsl(var(--brand-ink)/0.62)] leading-relaxed">
                {t("footer.disclaimer")}
              </div>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-[hsl(var(--brand-ink))]">{t("footer.explore")}</div>
            <div className="mt-3 grid gap-2 text-[hsl(var(--brand-ink)/0.75)]">
              <Link to="/" className="hover:text-[hsl(var(--brand-ink))]">
                {t("footer.home")}
              </Link>
              <Link to="/properties" className="hover:text-[hsl(var(--brand-ink))]">
                {t("footer.browse")}
              </Link>
              <Link to="/agent-guide" className="hover:text-[hsl(var(--brand-ink))]">
                {t("footer.agentGuide")}
              </Link>
              <Link to="/investment" className="hover:text-[hsl(var(--brand-ink))]">
                {t("footer.guide")}
              </Link>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-[hsl(var(--brand-ink))]">{t("footer.contact")}</div>
            <div className="mt-3 grid gap-2 text-[hsl(var(--brand-ink)/0.75)]">
              <a
                className="inline-flex items-center gap-2 hover:text-[hsl(var(--brand-ink))]"
                href="mailto:hello@artaniarpoperty.com"
              >
                <Mail className="h-4 w-4" /> hello@artaniarpoperty.com
              </a>
              <a
                className="inline-flex items-center gap-2 hover:text-[hsl(var(--brand-ink))]"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={t("footer.instagramLabel")}
              >
                <Instagram className="h-4 w-4" /> {t("footer.instagramHandle")}
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-[hsl(var(--brand-ink)/0.10)]" />

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-[hsl(var(--brand-ink)/0.60)]">
          <div>© {new Date().getFullYear()} Artaniar. All rights reserved.</div>
          <div className="leading-relaxed">hello@artaniarpoperty.com • {t("footer.instagramHandle")}</div>
        </div>
      </div>
    </footer>
  );
}