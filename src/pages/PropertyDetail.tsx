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

const formatIdr = (value: number) =>
  new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(value);

export default function PropertyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    let cancelled = false;
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

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-ink))]">
      <HeaderNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-16">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-5 rounded-full text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-ink)/0.06)]"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Kembali
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
            <h1 className="font-serif text-2xl">Listing tidak ditemukan</h1>
            <p className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">Coba kembali ke halaman listings atau konsultasi untuk rekomendasi unit lain.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => navigate("/properties")}
                className="rounded-full bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)]"
              >
                Lihat listings
              </Button>
              <WhatsAppCTA context={{ intent: "Konsultasi" }} />
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
                    <Spec label="Status" value={property.status} />
                    <Spec label="Ownership" value={property.ownership} />
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
                      {property.legal.notes ?? "Catatan: untuk verifikasi legal formal, silakan koordinasi dengan notaris/ahli Anda. Kami bantu rapikan informasi dan komunikasi ke pihak terkait."}
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
                    {property.purpose}
                  </Badge>
                  <Badge className="rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]">
                    {property.status}
                  </Badge>
                  <Badge className="rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]">
                    {property.ownership}
                  </Badge>
                </div>

                <h1 className="mt-4 font-serif text-3xl leading-tight">{property.title}</h1>

                <div className="mt-2 flex items-center gap-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">
                  <MapPin className="h-4 w-4" />
                  {property.location.area}, {property.location.city} • Kode: {property.code}
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <div>
                    <div className="text-xs text-[hsl(var(--brand-ink)/0.60)]">Harga</div>
                    <div className="text-2xl font-semibold">Rp {formatIdr(property.price)}</div>
                  </div>
                  {property.roi != null && (
                    <div className="rounded-2xl bg-[hsl(var(--brand-ink))] px-3 py-2 text-[hsl(var(--brand-ink-foreground))]">
                      <div className="text-[11px] opacity-85">ROI</div>
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
                    label={sold ? "Minta unit serupa" : "Cek availability via WhatsApp"}
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <WhatsAppCTA
                      variant="soft"
                      className="h-11 w-full justify-center rounded-2xl"
                      context={{ ...quickContext.base, intent: "Minta video" }}
                      label="Video"
                    />
                    <WhatsAppCTA
                      variant="soft"
                      className="h-11 w-full justify-center rounded-2xl"
                      context={{ ...quickContext.base, intent: "Cek ketersediaan" }}
                      label="Ready?"
                    />
                    <WhatsAppCTA
                      variant="soft"
                      className="h-11 w-full justify-center rounded-2xl"
                      context={{ ...quickContext.base, intent: "Negosiasi" }}
                      label="Deal"
                    />
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-2xl border-[hsl(var(--brand-ink)/0.16)] bg-white/70 hover:bg-white"
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <Video className="mr-2 h-4 w-4" /> Request virtual tour
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
