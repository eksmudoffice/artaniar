import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[hsl(var(--brand-surface-2))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-serif text-2xl text-[hsl(var(--brand-ink))]">Artaniar</div>
            <p className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)] leading-relaxed max-w-sm">
              Properti Bali untuk hunian, villa bisnis, dan tanah potensial—dengan respon cepat, shortlist rapi, dan pendampingan deal sampai tuntas.
            </p>

            <div className="mt-5">
              <WhatsAppCTA context={{ intent: "Konsultasi" }} />
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-[hsl(var(--brand-ink))]">Explore</div>
            <div className="mt-3 grid gap-2 text-[hsl(var(--brand-ink)/0.75)]">
              <Link to="/properties" className="hover:text-[hsl(var(--brand-ink))]">Browse listings</Link>
              <Link to="/investment" className="hover:text-[hsl(var(--brand-ink))]">Investment guide</Link>
              <Link to="/about" className="hover:text-[hsl(var(--brand-ink))]">About Artaniar</Link>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-[hsl(var(--brand-ink))]">Contact</div>
            <div className="mt-3 grid gap-2 text-[hsl(var(--brand-ink)/0.75)]">
              <a className="inline-flex items-center gap-2 hover:text-[hsl(var(--brand-ink))]" href="mailto:hello@artaniar.com">
                <Mail className="h-4 w-4" /> hello@artaniar.com
              </a>
              <a className="inline-flex items-center gap-2 hover:text-[hsl(var(--brand-ink))]" href="#" aria-label="Instagram">
                <Instagram className="h-4 w-4" /> @artaniar
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-[hsl(var(--brand-ink)/0.10)]" />

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-[hsl(var(--brand-ink)/0.60)]">
          <div>© {new Date().getFullYear()} Artaniar. All rights reserved.</div>
          <div className="leading-relaxed">
            Disclaimer: Informasi listing bersifat indikatif. Ketersediaan & harga dapat berubah.
          </div>
        </div>
      </div>
    </footer>
  );
}
