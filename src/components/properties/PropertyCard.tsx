import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Property } from "@/data/properties";
import { MapPin, TrendingUp } from "lucide-react";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { useLocale } from "@/i18n/use-locale";

const formatIdr = (value: number) =>
  new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(value);

export default function PropertyCard({
  property,
  budget,
  className,
}: {
  property: Property;
  budget?: { min?: number; max?: number };
  className?: string;
}) {
  const { t } = useLocale();
  const cover = property.images[0] || "/placeholder.svg";
  const sold = property.status === "Sold";

  const purposeLabel =
    property.purpose === "Investment" ? t("property.purpose.investment") : t("property.purpose.residential");

  const statusLabel =
    property.status === "Ready"
      ? t("property.status.ready")
      : property.status === "Off-plan"
        ? t("property.status.offplan")
        : t("property.status.sold");

  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-3xl border-[hsl(var(--brand-ink)/0.10)] bg-white/70 backdrop-blur-sm shadow-[0_18px_60px_-50px_rgba(0,0,0,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-50px_rgba(0,0,0,0.65)]",
        className,
      )}
    >
      <div className="relative">
        <Link to={`/properties/${property.slug}`} className="block">
          <div className="aspect-[16/11] overflow-hidden">
            <img
              src={cover}
              alt={property.title}
              loading="lazy"
              className={cn(
                "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]",
                sold ? "grayscale" : "",
              )}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        </Link>

        <div className="absolute left-3 top-3 flex gap-2">
          <Badge
            className={cn(
              "rounded-full px-3 py-1 text-[11px]",
              "bg-white/85 text-[hsl(var(--brand-ink))] border border-white/50",
            )}
          >
            {property.type}
          </Badge>
          {sold && (
            <Badge className="rounded-full px-3 py-1 text-[11px] bg-[hsl(var(--brand-accent))] text-[hsl(var(--brand-accent-foreground))]">
              {t("property.status.sold")}
            </Badge>
          )}
        </div>

        {property.roi != null && (
          <div className="absolute right-3 top-3">
            <Badge className="rounded-full px-3 py-1 text-[11px] bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))]">
              <TrendingUp className="mr-1 h-3.5 w-3.5" /> {property.roi}% ROI
            </Badge>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center gap-2 text-white/90 text-xs">
            <MapPin className="h-4 w-4" />
            <span>
              {property.location.area}, {property.location.city}
            </span>
          </div>
          <div className="mt-1 text-white">
            <div className="font-serif text-lg leading-snug line-clamp-2">{property.title}</div>
            <div className="mt-1 text-sm text-white/90">Rp {formatIdr(property.price)}</div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]"
          >
            {purposeLabel}
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]"
          >
            {statusLabel}
          </Badge>
          {property.tags?.slice(0, 1).map((tItem) => (
            <Badge
              key={tItem}
              variant="secondary"
              className="rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]"
            >
              {tItem}
            </Badge>
          ))}
        </div>

        <div className="mt-3 grid gap-1 text-sm text-[hsl(var(--brand-ink)/0.75)]">
          {property.highlights.slice(0, 2).map((h) => (
            <div key={h} className="line-clamp-1">
              • {h}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <WhatsAppCTA
            className={cn("flex-1 justify-center", sold ? "opacity-95" : "")}
            context={{
              intent: sold ? "Konsultasi" : "Cek ketersediaan",
              propertyTitle: property.title,
              listingCode: property.code,
              location: property.location.area,
              budgetIdr: budget,
            }}
            label={sold ? t("cta.similarUnit") : t("cta.whatsapp")}
          />
          <Link
            to={`/properties/${property.slug}`}
            className="inline-flex items-center justify-center rounded-full border border-[hsl(var(--brand-ink)/0.16)] bg-white/70 px-4 text-sm font-medium text-[hsl(var(--brand-ink))] hover:bg-white transition-colors"
          >
            {t("cta.detail")}
          </Link>
        </div>
      </div>
    </Card>
  );
}