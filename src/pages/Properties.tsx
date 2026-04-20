import { useEffect, useMemo, useState } from "react";
import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters, { DEFAULT_FILTERS, toQuery, type PropertyFiltersValue } from "@/components/properties/PropertyFilters";
import { PropertyService } from "@/services/propertyService";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Filter, SearchX } from "lucide-react";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { useLocale } from "@/i18n/use-locale";

export default function Properties() {
  const { t } = useLocale();
  const [filters, setFilters] = useState<PropertyFiltersValue>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Awaited<ReturnType<typeof PropertyService.listProperties>>["items"]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const query = useMemo(() => ({ ...toQuery(filters), page, pageSize: 9 }), [filters, page]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    PropertyService.listProperties(query).then((res) => {
      if (cancelled) return;
      setItems(res.items);
      setTotalPages(res.totalPages);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const budget = useMemo(() => {
    const min = filters.priceRange[0] ? filters.priceRange[0] : undefined;
    const max = filters.priceRange[1] ? filters.priceRange[1] : undefined;
    return { min, max };
  }, [filters.priceRange]);

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-ink))]">
      <HeaderNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-16">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-5 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
              <PropertyFilters value={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-serif text-3xl">{t("properties.title")}</h1>
                <p className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("properties.subtitle")}</p>
              </div>

              <div className="flex gap-2 lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full border-[hsl(var(--brand-ink)/0.16)] bg-white/70 hover:bg-white"
                    >
                      <Filter className="mr-2 h-4 w-4" /> {t("properties.filterTitle")}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="rounded-t-[2rem] bg-[hsl(var(--brand-surface))]">
                    <SheetHeader>
                      <SheetTitle className="font-serif text-[hsl(var(--brand-ink))]">{t("properties.filterTitle")}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 pb-3">
                      <PropertyFilters compact value={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <Separator className="my-6 bg-[hsl(var(--brand-ink)/0.10)]" />

            {loading ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, idx) => (
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
                <h2 className="mt-4 font-serif text-2xl">{t("properties.empty.title")}</h2>
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
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <PropertyCard key={p.id} property={p} budget={budget} />
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="rounded-full border-[hsl(var(--brand-ink)/0.16)] bg-white/70 hover:bg-white"
                  >
                    Prev
                  </Button>
                  <div className="text-sm text-[hsl(var(--brand-ink)/0.70)]">
                    {t("properties.pagination").replace("{page}", String(page)).replace("{totalPages}", String(totalPages))}
                  </div>
                  <Button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="rounded-full bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)]"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloatingCTA />
    </div>
  );
}