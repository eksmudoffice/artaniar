import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import { PropertyService } from "@/services/propertyService";
import type { Property } from "@/data/properties";
import PropertyGallery from "@/components/properties/PropertyGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { CheckCircle2, ChevronLeft, Compass, MapPin, TrendingUp, Video } from "lucide-react";
import { useLocale } from "@/i18n/use-locale";
import Seo, { SITE_ORIGIN } from "@/components/seo/Seo";

const formatIdr = (value: number) =>
  new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(value);

export default function PropertyDetail() {
  const { t } = useLocale();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Fast-path: kalau data sudah di-cache (dari home/properties page),
    // langsung find tanpa show loading skeleton. Ini membuat internal navigation
    // (klik property card dari listing) render INSTANT — tanpa flicker skeleton→content.
    const snap = PropertyService.getDebugSnapshot();
    if (snap.cache.loaded && snap.cache.count > 0) {
      PropertyService.getPropertyBySlug(slug || "").then((p) => {
        if (cancelled) return;
        setProperty(p);
        setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }

    // Slow path: data belum di-cache (direct link / hard refresh ke detail page)
    setLoading(true);
    PropertyService.getPropertyBySlug(slug || "").then((p) => {
      if (cancelled) return;
      setProperty(p);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const sold = property?.status === "Sold";

  const quickContext = useMemo(() => {
    if (!property) return { base: { intent: "Konsultasi" as const } };
    return {
      base: {
        propertyTitle: property.title,
        listingCode: property.code,
        location: property.location.area,
      },
    };
  }, [property]);

  const canonicalPath = property ? `/properties/${property.slug}` : `/properties/${slug ?? ""}`;
  const seoTitle = property
    ? `${property.title} | Artaniar Property`
    : "Detail Properti | Artaniar Property";

  const seoDesc = property
    ? `${property.type} di ${property.location.area}, ${property.location.city}. Status: ${property.status}. Harga: Rp ${formatIdr(
        property.price,
      )}.`
    : "Detail listing properti di Artaniar Property.";

  const seoImage = property?.images?.[0];

  const jsonLd = useMemo(() => {
    if (!property) return undefined;

    const listingUrl = `${SITE_ORIGIN}/properties/${property.slug}`;
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      url: listingUrl,
      name: property.title,
      description: property.description,
      image: property.images?.slice(0, 6) ?? [],
      datePosted: property.createdAt,
      category: property.type,
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "IDR",
        availability:
          property.status === "Sold"
            ? "https://schema.org/SoldOut"
            : "https://schema.org/InStock",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: property.location.area,
        addressRegion: property.location.city,
        addressCountry: "ID",
      },
    };
  }, [property]);

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-ink))]">
      <Seo
        title={seoTitle}
        description={seoDesc}
        canonicalPath={canonicalPath}
        image={seoImage}
        jsonLd={jsonLd}
      />
      <HeaderNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-16">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-5 rounded-full text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-ink)/0.06)]"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> {t("cta.back")}
        </Button>

        {loading ? (
          <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
            <Skeleton className="aspect-[16/11] w-full rounded-3xl" />
            <div className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="mt-3 h-4 w-1/2" />
              <Skeleton className="mt-6 h-10 w-full rounded-full" />
              <Skeleton className="mt-3 h-10 w-full rounded-full" />
            </div>
          </div>
        ) : !property ? (
          <div className="rounded-[2rem] border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-8 text-center shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
            <h1 className="font-serif text-2xl">{t("property.detail.notFound.title")}</h1>
            <p className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("property.detail.notFound.desc")}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => navigate("/properties")}
                className="rounded-full bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)]"
              >
                {t("cta.viewListings")}
              </Button>
              <WhatsAppCTA context={{ intent: "Konsultasi" }} label={t("cta.consult")} />
            </div>
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <PropertyGallery images={property.images} />

              <div className="mt-7 grid gap-6">
                <section>
                  <h2 className="font-serif text-2xl">Kenapa unit ini menarik</h2>
                  <div className="mt-3 grid gap-2">
                    {property.highlights.map((h) => (
                      <div key={h} className="flex gap-2 rounded-2xl bg-white/70 p-4 border border-[hsl(var(--brand-ink)/0.10)]">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-[hsl(var(--brand-accent))]" />
                        <div className="text-sm text-[hsl(var(--brand-ink)/0.78)] leading-relaxed">{h}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="font-serif text-2xl">Spesifikasi</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Spec label="Tipe" value={property.type} />
                    <Spec
                      label="Status"
                      value={
                        property.status === "Ready"
                          ? t("property.status.ready")
                          : property.status === "Off-plan"
                            ? t("property.status.offplan")
                            : t("property.status.sold")
                      }
                    />
                    <Spec
                      label="Ownership"
                      value={property.ownership === "Freehold" ? t("property.ownership.freehold") : t("property.ownership.leasehold")}
                    />
                    {property.bedrooms != null && <Spec label="Bedrooms" value={`${property.bedrooms}`} />}
                    {property.bathrooms != null && <Spec label="Bathrooms" value={`${property.bathrooms}`} />}
                    {property.landSize != null && <Spec label="Land size" value={`${property.landSize} m²`} />}
                    {property.buildingSize != null && <Spec label="Building size" value={`${property.buildingSize} m²`} />}
                    {property.yearBuilt != null && <Spec label="Year built" value={`${property.yearBuilt}`} />}
                    {property.zoning && <Spec label="Zoning" value={property.zoning} />}
                  </div>
                </section>

                {property.roi != null && (
                  <section>
                    <h2 className="font-serif text-2xl">ROI & proyeksi</h2>
                    <div className="mt-3 rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6">
                      <div className="flex items-center gap-2 font-semibold">
                        <TrendingUp className="h-5 w-5 text-[hsl(var(--brand-accent))]" />
                        ROI indikatif: {property.roi}% / tahun
                      </div>
                      {property.roiProjection && (
                        <div className="mt-3 grid gap-2 text-sm text-[hsl(var(--brand-ink)/0.75)]">
                          {property.roiProjection.nightlyRateIdr != null && (
                            <div>Nightly rate acuan: Rp {formatIdr(property.roiProjection.nightlyRateIdr)}</div>
                          )}
                          {property.roiProjection.occupancy != null && (
                            <div>Occupancy acuan: {Math.round(property.roiProjection.occupancy * 100)}%</div>
                          )}
                          <div className="text-xs text-[hsl(var(--brand-ink)/0.60)] leading-relaxed">
                            {property.roiProjection.disclaimer}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                <section>
                  <h2 className="font-serif text-2xl">Kesiapan & catatan penting</h2>
                  <div className="mt-3 rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6">
                    <div className="flex items-center gap-2 font-semibold">
                      <Compass className="h-5 w-5 text-[hsl(var(--brand-accent))]" /> Checklist ringkas
                    </div>
                    <div className="mt-3 grid gap-2">
                      {property.legal.checklist.map((c) => (
                        <div key={c} className="flex items-start gap-2 text-sm text-[hsl(var(--brand-ink)/0.78)]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-[hsl(var(--brand-accent))]" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-[hsl(var(--brand-ink)/0.60)] leading-relaxed">
                      {property.legal.notes ??
                        "Catatan: untuk verifikasi legal formal, silakan koordinasi dengan notaris/ahli Anda. Kami bantu rapikan informasi dan komunikasi ke pihak terkait."}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Card className="rounded-3xl border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-6 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
                <div className="flex flex-wrap gap-2">
                  <Badge className="rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]">
                    {property.type}
                  </Badge>
                  <Badge className="rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]">
                    {property.purpose === "Investment" ? t("property.purpose.investment") : t("property.purpose.residential")}
                  </Badge>
                  <Badge className="rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]">
                    {property.status === "Ready"
                      ? t("property.status.ready")
                      : property.status === "Off-plan"
                        ? t("property.status.offplan")
                        : t("property.status.sold")}
                  </Badge>
                  <Badge className="rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]">
                    {property.ownership === "Freehold" ? t("property.ownership.freehold") : t("property.ownership.leasehold")}
                  </Badge>
                </div>

                <h1 className="mt-4 font-serif text-3xl leading-tight">{property.title}</h1>

                <div className="mt-2 flex items-center gap-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">
                  <MapPin className="h-4 w-4" />
                  {property.location.area}, {property.location.city} • {t("label.listingCode")}: {property.code}
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <div>
                    <div className="text-xs text-[hsl(var(--brand-ink)/0.60)]">{t("label.price")}</div>
                    <div className="text-2xl font-semibold">Rp {formatIdr(property.price)}</div>
                  </div>
                  {property.roi != null && (
                    <div className="rounded-2xl bg-[hsl(var(--brand-ink))] px-3 py-2 text-[hsl(var(--brand-ink-foreground))]">
                      <div className="text-[11px] opacity-85">{t("label.roi")}</div>
                      <div className="text-sm font-semibold">{property.roi}%</div>
                    </div>
                  )}
                </div>

                <Separator className="my-5 bg-[hsl(var(--brand-ink)/0.10)]" />

                <div className="grid gap-3">
                  <WhatsAppCTA
                    className="h-12 w-full justify-center text-base"
                    context={{
                      ...quickContext.base,
                      intent: sold ? "Konsultasi" : "Cek ketersediaan",
                    }}
                    label={sold ? t("cta.similarUnit") : t("cta.checkAvailability")}
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <WhatsAppCTA
                      variant="soft"
                      className="h-11 w-full justify-center rounded-2xl"
                      context={{ ...quickContext.base, intent: "Minta video" }}
                      label={t("cta.requestVideo")}
                    />
                    <WhatsAppCTA
                      variant="soft"
                      className="h-11 w-full justify-center rounded-2xl"
                      context={{ ...quickContext.base, intent: "Cek ketersediaan" }}
                      label={t("cta.ready")}
                    />
                    <WhatsAppCTA
                      variant="soft"
                      className="h-11 w-full justify-center rounded-2xl"
                      context={{ ...quickContext.base, intent: "Negosiasi" }}
                      label={t("cta.deal")}
                    />
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-2xl border-[hsl(var(--brand-ink)/0.16)] bg-white/70 hover:bg-white"
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <Video className="mr-2 h-4 w-4" /> {t("cta.virtualTour")}
                    </a>
                  </Button>
                </div>

                <div className="mt-5 text-xs text-[hsl(var(--brand-ink)/0.60)] leading-relaxed">
                  Dengan klik WhatsApp, pesan akan terisi otomatis dengan info listing & pertanyaan “Masih available?”.
                </div>
              </Card>
            </aside>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppFloatingCTA />
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-4">
      <div className="text-xs text-[hsl(var(--brand-ink)/0.60)]">{label}</div>
      <div className="mt-1 text-sm font-semibold text-[hsl(var(--brand-ink))]">{value}</div>
    </div>
  );
}