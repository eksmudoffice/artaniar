import { useEffect, useMemo, useRef, useState } from "react";
import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters, {
  DEFAULT_FILTERS,
  toQuery,
  type PropertyFiltersValue,
} from "@/components/properties/PropertyFiltersFreeText";
import { PropertyService } from "@/services/propertyService";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { SearchX } from "lucide-react";
import { useLocale } from "@/i18n/use-locale";
import { Input } from "@/components/ui/input";
import TopListingsCarousel from "@/components/properties/TopListingsCarousel";
import { Property } from "@/data/properties";
import MobileFilterFab from "@/components/cta/MobileFilterFab";
import Seo, { SITE_ORIGIN } from "@/components/seo/Seo";
import AirtableStatusCard from "@/components/debug/AirtableStatusCard";

function isDebugEnabled() {
  const params = new URLSearchParams(window.location.search);
  return params.get("debug") === "1";
}

function preloadImage(href: string) {
  if (!href) return;
  const existing = document.head.querySelector<HTMLLinkElement>(`link[rel="preload"][as="image"][href="${href}"]`);
  if (existing) return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = href;
  document.head.appendChild(link);
}

export default function Index() {
  const { t } = useLocale();
  const [filters, setFilters] = useState<PropertyFiltersValue>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Awaited<ReturnType<typeof PropertyService.listProperties>>["items"]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);

  const [airtableStatus, setAirtableStatus] = useState(() => PropertyService.getDebugSnapshot());
  const [reloadingAirtable, setReloadingAirtable] = useState(false);

  const query = useMemo(() => ({ ...toQuery(filters), page, pageSize: 12 }), [filters, page]);

  const debugEnabled = useMemo(() => isDebugEnabled(), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    PropertyService.listProperties(query)
      .then((res) => {
        if (cancelled) return;
        setItems(res.items);
        setTotalPages(res.totalPages);
        setLoading(false);
        if (debugEnabled) setAirtableStatus(PropertyService.getDebugSnapshot());
      })
      .catch((err) => {
        console.error("[Index] listProperties error:", err);
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debugEnabled, query]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    let cancelled = false;
    // Prioritaskan featured/toplist untuk hero/top section (fetch kecil, cepat)
    PropertyService.listFeatured(8).then((items) => {
      if (cancelled) return;
      setTopListings(items);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const budget = useMemo(() => {
    const min = filters.priceRange[0] ? filters.priceRange[0] : undefined;
    const max = filters.priceRange[1] ? filters.priceRange[1] : undefined;
    return { min, max };
  }, [filters.priceRange]);

  const quickKeyword = filters.search.trim();

  const [topListings, setTopListings] = useState<Property[]>([]);

  // Preload FIRST featured image (thumb preferred) to make the hero feel instant.
  useEffect(() => {
    const first = topListings[0];
    if (!first) return;
    const heroSrc = first.imagesThumb?.[0] || first.images?.[0];
    if (heroSrc) preloadImage(heroSrc);
  }, [topListings]);

  const seoTitle = "Artaniar Property — Bali Property Listings";
  const seoDesc =
    "Cari properti Bali dengan filter cepat dan detail lengkap. Lihat top listings, bandingkan opsi, lalu konsultasi via WhatsApp untuk cek ketersediaan.";
  const seoImage = topListings[0]?.images?.[0] ? topListings[0].images[0] : `${SITE_ORIGIN}/placeholder.svg`;

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Artaniar Property",
      url: SITE_ORIGIN,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_ORIGIN}/properties?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
  }, []);

  const forceReload = async () => {
    setReloadingAirtable(true);
    const snap = await PropertyService.reload();
    setAirtableStatus(snap);

    // also refresh visible listings using current query
    const res = await PropertyService.listProperties(query);
    setItems(res.items);
    setTotalPages(res.totalPages);
    setReloadingAirtable(false);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-ink))]" ref={topRef}>
      <Seo title={seoTitle} description={seoDesc} canonicalPath="/" image={seoImage} jsonLd={jsonLd} />
      <HeaderNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-16">
        {/* TOP LISTINGS */}
        <TopListingsCarousel items={topListings} />
        {debugEnabled ? (
          <div className="mt-3 text-xs text-[hsl(var(--brand-ink)/0.62)]">
            TopListings debug: {topListings.length} item(s)
          </div>
        ) : null}

        {/* LISTINGS SECTION */}
        <section className="mt-10">
          {debugEnabled ? (
            <>
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-[hsl(var(--brand-ink)/0.62)]">
                  Debug: kalau tetap LOCAL, biasanya table/field mismatch atau akses Airtable (401/403).
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={forceReload}
                  disabled={reloadingAirtable}
                  className="rounded-full border-[hsl(var(--brand-ink)/0.16)] bg-white/70 hover:bg-white"
                >
                  {reloadingAirtable ? "Reloading…" : "Force reload Airtable"}
                </Button>
              </div>

              <AirtableStatusCard className="mb-6" value={airtableStatus} />
            </>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-serif text-3xl">{t("home.listings.resultsTitle")}</h3>
              <p className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("home.listings.resultsDesc")}</p>
            </div>

            <div className="hidden lg:flex">
              <WhatsAppCTA
                context={{
                  intent: "Konsultasi",
                  location: filters.area !== "All" ? filters.area : undefined,
                  budgetIdr: budget,
                }}
                label={t("cta.consult")}
              />
            </div>
          </div>

          <Separator className="my-6 bg-[hsl(var(--brand-ink)/0.10)]" />

          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            <div className="hidden lg:block">
              <div className="sticky top-24 rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-5 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
                <PropertyFilters value={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
              </div>
            </div>

            <div>
              {loading ? (
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 overflow-hidden"
                    >
                      <Skeleton className="aspect-[16/11] w-full" />
                      <div className="p-4 grid gap-3">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex gap-2">
                          <Skeleton className="h-9 w-full rounded-full" />
                          <Skeleton className="h-9 w-24 rounded-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="rounded-[2rem] border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-8 text-center shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(var(--brand-surface-2))]">
                    <SearchX className="h-6 w-6 text-[hsl(var(--brand-ink)/0.60)]" />
                  </div>
                  <h4 className="mt-4 font-serif text-2xl">{t("properties.empty.title")}</h4>
                  <p className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("properties.empty.desc")}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setFilters(DEFAULT_FILTERS)}
                      className="rounded-full border-[hsl(var(--brand-ink)/0.16)] bg-white/70 hover:bg-white"
                    >
                      {t("cta.reset")}
                    </Button>
                    <WhatsAppCTA
                      context={{
                        intent: "Konsultasi",
                        budgetIdr: budget,
                        location: filters.area !== "All" ? filters.area : undefined,
                      }}
                      label={t("cta.consult")}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p) => (
                      <PropertyCard key={p.id} property={p} budget={budget} />
                    ))}
                  </div>

                  <div className="mt-7 flex items-center justify-between">
                    <Button
                      variant="outline"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="rounded-full border-[hsl(var(--brand-ink)/0.16)] bg-white/70 hover:bg-white"
                    >
                      {t("cta.prev")}
                    </Button>
                    <div className="text-sm text-[hsl(var(--brand-ink)/0.70)]">
                      {t("properties.pagination").replace("{page}", String(page)).replace("{totalPages}", String(totalPages))}
                    </div>
                    <Button
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="rounded-full bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)]"
                    >
                      {t("cta.next")}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* HERO */}
        <section className="mt-10 rounded-[2.25rem] border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)] overflow-hidden">
          <div className="grid gap-6 p-6 md:p-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand-ink)/0.12)] bg-[hsl(var(--brand-surface-2))] px-4 py-2 text-xs font-semibold text-[hsl(var(--brand-ink))]">
                {t("home.listings.badge")}
              </div>

              <h2 className="mt-4 font-serif text-4xl leading-tight">{t("home.listings.title")}</h2>
              <p className="mt-2 text-[hsl(var(--brand-ink)/0.72)] leading-relaxed">{t("home.listings.desc")}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppCTA
                  context={{
                    intent: "Konsultasi",
                    location: filters.area !== "All" ? filters.area : undefined,
                    budgetIdr: budget,
                  }}
                  label={t("cta.consult")}
                  className="h-12 px-7 text-base"
                />

                <div className="flex-1">
                  <div className="rounded-full border border-[hsl(var(--brand-ink)/0.14)] bg-white/70 px-4 py-2.5 flex items-center gap-3">
                    <div className="text-xs font-semibold text-[hsl(var(--brand-ink)/0.65)] shrink-0">
                      {t("home.listings.searchLabel")}
                    </div>
                    <Input
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                      placeholder={t("home.listings.searchPlaceholder")}
                      className="h-7 border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="mt-1 text-[11px] text-[hsl(var(--brand-ink)/0.62)]">{t("home.listings.searchHint")}</div>
                </div>

                <div className="hidden lg:block" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-[hsl(var(--brand-ink)/0.10)] bg-[hsl(var(--brand-surface-2))] p-6">
              <div className="font-serif text-2xl">{t("home.listings.ctaCardTitle")}</div>
              <p className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.72)] leading-relaxed">{t("home.listings.ctaCardDesc")}</p>
              <div className="mt-5 flex flex-col gap-2">
                <WhatsAppCTA
                  context={{
                    intent: "Minta shortlist",
                    location: filters.area !== "All" ? filters.area : undefined,
                    budgetIdr: budget,
                  }}
                  label={t("cta.requestShortlist")}
                  className="w-full justify-center"
                />
                <WhatsAppCTA
                  variant="soft"
                  context={{
                    intent: quickKeyword ? `Cari: ${quickKeyword}` : "Konsultasi",
                    location: filters.area !== "All" ? filters.area : undefined,
                    budgetIdr: budget,
                  }}
                  label={t("cta.whatsapp")}
                  className="w-full justify-center"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingCTA />

      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="bottom" className="rounded-t-[2rem] bg-[hsl(var(--brand-surface))]">
          <SheetHeader>
            <SheetTitle className="font-serif text-[hsl(var(--brand-ink))]">{t("properties.filterTitle")}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 pb-3">
            <PropertyFilters compact value={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
          </div>
        </SheetContent>
      </Sheet>

      <MobileFilterFab label={t("properties.filterTitle")} onClick={() => setFilterOpen(true)} />
    </div>
  );
}