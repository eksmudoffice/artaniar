import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";

export default function WhatsAppFloatingCTA({ className }: { className?: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      // hide a bit when at top to avoid fighting hero CTA
      setVisible(window.scrollY > 220);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="rounded-3xl border border-[hsl(var(--brand-ink)/0.12)] bg-[hsl(var(--brand-surface))]/92 backdrop-blur-md shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)] p-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs font-semibold text-[hsl(var(--brand-ink))]">Butuh rekomendasi cepat?</div>
            <div className="text-[11px] text-[hsl(var(--brand-ink)/0.70)] truncate">
              Kirim preferensi budget dan area—kami bantu carikan opsi yang sesuai.
            </div>
          </div>
          <WhatsAppCTA className="shrink-0" context={{ intent: "Konsultasi" }} label="WhatsApp" />
        </div>
      </div>
    </div>
  );
}