import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { EmblaCarouselType } from "embla-carousel-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Property } from "@/data/properties";
import { MapPin, TrendingUp } from "lucide-react";
import { optimizeHeroImage } from "@/utils/imageOptimizer";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { useLocale } from "@/i18n/use-locale";
import DeferredImage from "@/components/media/DeferredImage";

const formatIdr = (value: number) =>
  new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(value);

function AutoSlide({ api, intervalMs = 3000 }: { api: EmblaCarouselType | undefined; intervalMs?: number }) {
  useEffect(() => {
    if (!api) return;

    const id = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [api, intervalMs]);

  return null;
}

export default function TopListingsCarousel({
  items,
  className,
  title,
  subtitle,
}: {
  items: Property[];
  className?: string;
  title?: string;
  subtitle?: string;
}) {
  const { t } = useLocale();
  const [api, setApi] = useState<EmblaCarouselType | undefined>(undefined);

  const slides = useMemo(() => {
    if (!items.length) return [];
    if (items.length >= 8) return items;
    const target = 10;
    const out: Property[] = [];
    for (let i = 0; i < target; i++) out.push(items[i % items.length]!);
    return out;
  }, [items]);

  const purposeLabel = (p: Property["purpose"]) =>
    p === "Investment" ? t("property.purpose.investment") : t("property.purpose.residential");

  const statusLabel = (s: Property["status"]) =>
    s === "Ready" ? t("property.status.ready") : s === "Off-plan" ? t("property.status.offplan") : t("property.status.sold");

  const ownershipLabel = (o: Property["ownership"]) =>
    o === "Freehold" ? t("property.ownership.freehold") : t("property.ownership.leasehold");

  return (
    <section
      className={cn(
        "rounded-[2.25rem] border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)] overflow-hidden",
        className,
      )}
    >
      <div className="p-6 md:p-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl">{title ?? t("home.topListings.title")}</h1>
            <p className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.72)] max-w-2xl leading-relaxed">
              {subtitle ?? t("home.topListings.subtitle")}
            </p>
          </div>

          <div className="hidden md:flex">
            <WhatsAppCTA context={{ intent: "Minta rekomendasi top listings" }} label={t("cta.consult")} />
          </div>
        </div>

        <div className="mt-6">
          <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
            <AutoSlide api={api} intervalMs={3000} />

            <CarouselContent>
              {slides.map((p, idx) => {
                const coverRaw = p.imagesThumb?.[0] || p.images?.[0] || "/placeholder.svg";
                const cover = optimizeHeroImage(coverRaw);
                const sold = p.status === "Sold";
                const key = `${p.id}_${idx}`;
                const isFirstSlide = idx === 0;

                return (
                  <CarouselItem key={key} className="basis-[92%] sm:basis-[72%] lg:basis-[58%]">
                    <div className="grid gap-5 md:grid-cols-[1.15fr_0.85fr] md:items-stretch">
                      <Link
                        to={`/properties/${p.slug}`}
                        className="group relative overflow-hidden rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-black/5"
                      >
                        <div className="aspect-[16/11] md:aspect-[16/10] overflow-hidden">
                          <DeferredImage
                            src={cover}
                            alt={p.title}
                            priority={isFirstSlide}
                            delayMs={isFirstSlide ? 0 : 450}
                            className="h-full w-full"
                            imgClassName={cn("transition-transform duration-500 group-hover:scale-[1.04]", sold ? "grayscale" : "")}
                          />
                        </div>
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                        <div className="absolute left-3 top-3 flex gap-2">
                          <Badge className="rounded-full px-3 py-1 text-[11px] bg-white/85 text-[hsl(var(--brand-ink))] border border-white/50">
                            {p.type}
                          </Badge>
                          {sold ? (
                            <Badge className="rounded-full px-3 py-1 text-[11px] bg-[hsl(var(--brand-accent))] text-[hsl(var(--brand-accent-foreground))]">
                              {statusLabel(p.status)}
                            </Badge>
                          ) : null}
                        </div>

                        {p.roi != null ? (
                          <div className="absolute right-3 top-3">
                            <Badge className="rounded-full px-3 py-1 text-[11px] bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))]">
                              <TrendingUp className="mr-1 h-3.5 w-3.5" /> {p.roi}% ROI
                            </Badge>
                          </div>
                        ) : null}

                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <div className="flex items-center gap-2 text-white/90 text-xs">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {p.location.area}, {p.location.city}
                            </span>
                          </div>
                          <div className="mt-1 text-white">
                            <div className="font-serif text-xl leading-snug line-clamp-2">{p.title}</div>
                            <div className="mt-1 text-sm text-white/90">Rp {formatIdr(p.price)}</div>
                          </div>
                        </div>
                      </Link>

                      <div className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-[hsl(var(--brand-surface-2))] p-6 flex flex-col">
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="secondary"
                            className="rounded-full bg-white/70 text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]"
                          >
                            {purposeLabel(p.purpose)}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="rounded-full bg-white/70 text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]"
                          >
                            {statusLabel(p.status)}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="rounded-full bg-white/70 text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]"
                          >
                            {ownershipLabel(p.ownership)}
                          </Badge>
                        </div>

                        <div className="mt-4 grid gap-2 text-sm text-[hsl(var(--brand-ink)/0.78)]">
                          {p.highlights.slice(0, 3).map((h) => (
                            <div key={h} className="line-clamp-1">
                              • {h}
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 grid gap-2">
                          <WhatsAppCTA
                            className="w-full justify-center"
                            context={{
                              intent: sold ? "Minta unit serupa" : "Cek ketersediaan",
                              propertyTitle: p.title,
                              listingCode: p.code,
                              location: p.location.area,
                            }}
                            label={t("cta.askWhatsapp")}
                          />
                          <Link
                            to={`/properties/${p.slug}`}
                            className="inline-flex items-center justify-center rounded-full border border-[hsl(var(--brand-ink)/0.16)] bg-white/70 px-5 py-2.5 text-sm font-medium text-[hsl(var(--brand-ink))] hover:bg-white transition-colors"
                          >
                            {t("cta.detail")}
                          </Link>
                        </div>

                        <div className="mt-auto pt-4 text-[11px] text-[hsl(var(--brand-ink)/0.62)] leading-relaxed">
                          {t("label.listingCode")}: <span className="font-semibold">{p.code}</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="left-3 rounded-full bg-white/85 hover:bg-white border border-[hsl(var(--brand-ink)/0.12)]" />
            <CarouselNext className="right-3 rounded-full bg-white/85 hover:bg-white border border-[hsl(var(--brand-ink)/0.12)]" />
          </Carousel>
        </div>

        <div className="mt-4 flex md:hidden">
          <WhatsAppCTA className="w-full justify-center" context={{ intent: "Minta rekomendasi top listings" }} label={t("cta.consult")} />
        </div>
      </div>
    </section>
  );
}