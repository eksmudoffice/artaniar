import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLocale } from "@/i18n/use-locale";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLocale();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--brand-surface))]">
      <div className="text-center rounded-[2rem] border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 px-8 py-10 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
        <h1 className="text-5xl font-serif text-[hsl(var(--brand-ink))]">{t("notfound.title")}</h1>
        <p className="mt-2 text-base text-[hsl(var(--brand-ink)/0.70)]">{t("notfound.subtitle")}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[hsl(var(--brand-ink))] px-6 py-2.5 text-sm font-semibold text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)] transition-colors"
        >
          {t("notfound.back")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;