import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWhatsAppMessage, buildWhatsAppUrl, type WhatsAppMessageContext } from "@/utils/whatsapp";
import { MessageCircle, PhoneCall } from "lucide-react";

const DEFAULT_PHONE = "6282237067649";

export function WhatsAppCTA({
  className,
  context,
  variant = "primary",
  utmSource = "artaniar_web",
  label,
}: {
  className?: string;
  context: WhatsAppMessageContext;
  variant?: "primary" | "soft";
  utmSource?: string;
  label?: string;
}) {
  const message = buildWhatsAppMessage(context);
  const href = buildWhatsAppUrl({
    phone: DEFAULT_PHONE,
    message,
    utm: { utm_source: utmSource },
  });

  const isSoft = variant === "soft";

  return (
    <Button
      asChild
      className={cn(
        "rounded-full px-6 gap-2 shadow-sm",
        isSoft
          ? "bg-white/80 text-foreground hover:bg-white border border-border"
          : "bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)]",
        className,
      )}
    >
      <a href={href} target="_blank" rel="noreferrer">
        <MessageCircle className="h-4 w-4" />
        {label ?? "Konsultasi via WhatsApp"}
      </a>
    </Button>
  );
}

export function CallCTA({ className, phone = "+62 812-3456-7890" }: { className?: string; phone?: string }) {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "rounded-full px-6 gap-2 border-[hsl(var(--brand-ink)/0.18)] bg-white/70 hover:bg-white",
        className,
      )}
    >
      <a href={`tel:${phone.replace(/\s/g, "")}`}>
        <PhoneCall className="h-4 w-4" />
        Call
      </a>
    </Button>
  );
}