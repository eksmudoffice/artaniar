import { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { useLocale } from "@/i18n/use-locale";
import LanguageToggle from "@/components/branding/LanguageToggle";
import artaniarLogo from "@/assets/artaniar-logo.png";

export default function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, t } = useLocale();

  const navItems = useMemo(
    () => [
      { to: "/", label: t("nav.home") },
      { to: "/properties", label: t("nav.properties") },
      { to: "/agent-guide", label: t("nav.agentGuide") },
      { to: "/investment", label: t("nav.investment") },
    ],
    [t],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        "bg-[hsl(var(--brand-surface))]/92 backdrop-blur-md border-b border-[hsl(var(--brand-ink)/0.10)]",
        scrolled ? "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)]" : "",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center">
              <img
                src={artaniarLogo}
                alt="Artaniar"
                className="h-9 w-auto object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors",
                    "text-[hsl(var(--brand-ink)/0.75)] hover:text-[hsl(var(--brand-ink))]",
                    isActive ? "text-[hsl(var(--brand-ink))]" : "",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle value={locale} onChange={setLocale} transparent={false} />
            <WhatsAppCTA context={{ intent: "Konsultasi" }} label={t("cta.consult")} variant="primary" />
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-2xl text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-ink)/0.06)]"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm bg-[hsl(var(--brand-surface))]">
                <SheetHeader>
                  <SheetTitle className="font-serif text-[hsl(var(--brand-ink))]">
                    <div className="flex items-center gap-3">
                      <img
                        src={artaniarLogo}
                        alt="Artaniar"
                        className="h-8 w-auto object-contain"
                        loading="eager"
                        decoding="async"
                      />
                      <span className="sr-only">Artaniar</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-2">
                  <div className="pb-2">
                    <LanguageToggle value={locale} onChange={setLocale} />
                  </div>

                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "rounded-2xl px-4 py-3 text-sm font-medium",
                          isActive
                            ? "bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))]"
                            : "bg-white/60 text-[hsl(var(--brand-ink))] hover:bg-white",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}

                  <div className="pt-2">
                    <WhatsAppCTA className="w-full justify-center" context={{ intent: "Konsultasi" }} label={t("cta.consult")} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}