import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/investment", label: "Investment" },
  { to: "/about", label: "About" },
];

export default function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = useMemo(() => {
    // only hero page starts transparent
    return location.pathname === "/" && !scrolled;
  }, [location.pathname, scrolled]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "bg-[hsl(var(--brand-surface))]/85 backdrop-blur-md border-b border-[hsl(var(--brand-ink)/0.10)] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)]",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={cn("flex h-16 items-center justify-between", transparent ? "" : "")}>
          <Link to="/" className="flex items-center gap-2">
            <div
              className={cn(
                "grid h-9 w-9 place-items-center rounded-2xl",
                transparent ? "bg-white/10 border border-white/15" : "bg-[hsl(var(--brand-ink))]",
              )}
            >
              <span className={cn("font-serif text-lg", transparent ? "text-white" : "text-[hsl(var(--brand-ink-foreground))]")}>
                A
              </span>
            </div>
            <div className={cn("leading-tight", transparent ? "text-white" : "text-[hsl(var(--brand-ink))]")}>
              <div className="font-serif text-base tracking-wide">Artaniar</div>
              <div
                className={cn(
                  "text-[11px] tracking-[0.18em] uppercase",
                  transparent ? "text-white/70" : "text-[hsl(var(--brand-ink)/0.60)]",
                )}
              >
                Bali Property Agent
              </div>
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
                    transparent
                      ? "text-white/85 hover:text-white"
                      : "text-[hsl(var(--brand-ink)/0.75)] hover:text-[hsl(var(--brand-ink))]",
                    isActive && (transparent ? "text-white" : "text-[hsl(var(--brand-ink))]"),
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <WhatsAppCTA
              context={{ intent: "Konsultasi" }}
              label="Konsultasi"
              variant={transparent ? "soft" : "primary"}
              className={cn(transparent ? "bg-white text-[hsl(var(--brand-ink))] hover:bg-white/90" : "")}
            />
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "rounded-2xl",
                    transparent
                      ? "text-white hover:bg-white/10"
                      : "text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-ink)/0.06)]",
                  )}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm bg-[hsl(var(--brand-surface))]">
                <SheetHeader>
                  <SheetTitle className="font-serif text-[hsl(var(--brand-ink))]">Artaniar</SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-2">
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
                    <WhatsAppCTA
                      className="w-full justify-center"
                      context={{ intent: "Konsultasi" }}
                      label="Konsultasi via WhatsApp"
                    />
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