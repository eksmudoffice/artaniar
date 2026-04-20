import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { X, SlidersHorizontal } from "lucide-react";
import type { PropertyQuery } from "@/services/propertyService";
import { AREAS, type PropertyPurpose, type PropertyStatus, type PropertyType } from "@/data/properties";
import { useLocale } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";

const PRICE_MAX = 100_000_000_000;
const LAND_MAX = 2_000; // m²
const BUILDING_MAX = 2_000; // m²
const BEDROOMS_MAX = 10;
const BATHROOMS_MAX = 10;

const formatIdrCompact = (value: number) =>
  new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(value);

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export type PropertyFiltersValue = {
  search: string;
  type: PropertyType | "All";
  purpose: PropertyPurpose | "All";
  status: PropertyStatus | "All";
  area: string | "All";
  priceRange: [number, number];
  landRange: [number, number];
  buildingRange: [number, number];
  bedroomsMin: number;
  bathroomsMin: number;
  poolOnly: boolean;
  sort: NonNullable<PropertyQuery["sort"]>;
};

export default function PropertyFilters({
  value,
  onChange,
  onReset,
  compact = false,
}: {
  value: PropertyFiltersValue;
  onChange: (next: PropertyFiltersValue) => void;
  onReset: () => void;
  compact?: boolean;
}) {
  const { t } = useLocale();
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const activeChips = useMemo(() => {
    const chips: { key: string; label: string; onClear: () => void }[] = [];

    if (value.type !== "All") chips.push({ key: "type", label: value.type, onClear: () => onChange({ ...value, type: "All" }) });
    if (value.purpose !== "All")
      chips.push({ key: "purpose", label: value.purpose, onClear: () => onChange({ ...value, purpose: "All" }) });
    if (value.status !== "All") chips.push({ key: "status", label: value.status, onClear: () => onChange({ ...value, status: "All" }) });
    if (value.area !== "All") chips.push({ key: "area", label: value.area, onClear: () => onChange({ ...value, area: "All" }) });

    const [min, max] = value.priceRange;
    if (min !== 0 || max !== PRICE_MAX) {
      chips.push({
        key: "price",
        label: `Rp ${formatIdrCompact(min)} – ${formatIdrCompact(max)}`,
        onClear: () => onChange({ ...value, priceRange: [0, PRICE_MAX] }),
      });
    }

    const [landMin, landMax] = value.landRange;
    if (landMin !== 0 || landMax !== LAND_MAX) {
      chips.push({
        key: "land",
        label: `Land ${landMin}–${landMax} m²`,
        onClear: () => onChange({ ...value, landRange: [0, LAND_MAX] }),
      });
    }

    const [bMin, bMax] = value.buildingRange;
    if (bMin !== 0 || bMax !== BUILDING_MAX) {
      chips.push({
        key: "building",
        label: `Building ${bMin}–${bMax} m²`,
        onClear: () => onChange({ ...value, buildingRange: [0, BUILDING_MAX] }),
      });
    }

    if (value.bedroomsMin > 0) {
      chips.push({
        key: "bedrooms",
        label: `Bedrooms ≥ ${value.bedroomsMin}`,
        onClear: () => onChange({ ...value, bedroomsMin: 0 }),
      });
    }

    if (value.bathroomsMin > 0) {
      chips.push({
        key: "bathrooms",
        label: `Bathrooms ≥ ${value.bathroomsMin}`,
        onClear: () => onChange({ ...value, bathroomsMin: 0 }),
      });
    }

    if (value.poolOnly) {
      chips.push({
        key: "pool",
        label: "Pool only",
        onClear: () => onChange({ ...value, poolOnly: false }),
      });
    }

    return chips;
  }, [onChange, value]);

  const priceMin = value.priceRange[0];
  const priceMax = value.priceRange[1];

  const setPriceMin = (nextMinRaw: number) => {
    const nextMin = clamp(nextMinRaw, 0, PRICE_MAX);
    const nextMax = clamp(Math.max(priceMax, nextMin), 0, PRICE_MAX);
    onChange({ ...value, priceRange: [nextMin, nextMax] });
  };

  const setPriceMax = (nextMaxRaw: number) => {
    const nextMax = clamp(nextMaxRaw, 0, PRICE_MAX);
    const nextMin = clamp(Math.min(priceMin, nextMax), 0, PRICE_MAX);
    onChange({ ...value, priceRange: [nextMin, nextMax] });
  };

  const landMin = value.landRange[0];
  const landMax = value.landRange[1];

  const setLandMin = (nextMinRaw: number) => {
    const nextMin = clamp(nextMinRaw, 0, LAND_MAX);
    const nextMax = clamp(Math.max(landMax, nextMin), 0, LAND_MAX);
    onChange({ ...value, landRange: [nextMin, nextMax] });
  };

  const setLandMax = (nextMaxRaw: number) => {
    const nextMax = clamp(nextMaxRaw, 0, LAND_MAX);
    const nextMin = clamp(Math.min(landMin, nextMax), 0, LAND_MAX);
    onChange({ ...value, landRange: [nextMin, nextMax] });
  };

  const buildingMin = value.buildingRange[0];
  const buildingMax = value.buildingRange[1];

  const setBuildingMin = (nextMinRaw: number) => {
    const nextMin = clamp(nextMinRaw, 0, BUILDING_MAX);
    const nextMax = clamp(Math.max(buildingMax, nextMin), 0, BUILDING_MAX);
    onChange({ ...value, buildingRange: [nextMin, nextMax] });
  };

  const setBuildingMax = (nextMaxRaw: number) => {
    const nextMax = clamp(nextMaxRaw, 0, BUILDING_MAX);
    const nextMin = clamp(Math.min(buildingMin, nextMax), 0, BUILDING_MAX);
    onChange({ ...value, buildingRange: [nextMin, nextMax] });
  };

  const bedroomsMin = value.bedroomsMin;
  const bathroomsMin = value.bathroomsMin;

  return (
    <div className="grid gap-5">
      {!compact && (
        <div>
          <div className="font-serif text-xl text-[hsl(var(--brand-ink))]">{t("filters.title")}</div>
          <p className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("filters.subtitle")}</p>
        </div>
      )}

      {/* QUICK FILTERS */}
      <div className="grid gap-2">
        <Label className="text-sm text-[hsl(var(--brand-ink))]">{t("filters.search.label")}</Label>
        <Input
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          placeholder={t("filters.search.placeholder")}
          className="rounded-2xl bg-white/70"
        />
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label className="text-sm text-[hsl(var(--brand-ink))]">{t("filters.type.label")}</Label>
            <Select value={value.type} onValueChange={(v) => onChange({ ...value, type: v as PropertyFiltersValue["type"] })}>
              <SelectTrigger className="rounded-2xl bg-white/70">
                <SelectValue placeholder={t("filters.option.all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{t("filters.option.all")}</SelectItem>
                <SelectItem value="Villa">{t("filters.option.type.villa")}</SelectItem>
                <SelectItem value="Rumah">{t("filters.option.type.house")}</SelectItem>
                <SelectItem value="Tanah">{t("filters.option.type.land")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm text-[hsl(var(--brand-ink))]">{t("filters.status.label")}</Label>
            <Select value={value.status} onValueChange={(v) => onChange({ ...value, status: v as PropertyFiltersValue["status"] })}>
              <SelectTrigger className="rounded-2xl bg-white/70">
                <SelectValue placeholder={t("filters.option.all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{t("filters.option.all")}</SelectItem>
                <SelectItem value="Ready">{t("filters.option.status.ready")}</SelectItem>
                <SelectItem value="Off-plan">{t("filters.option.status.offplan")}</SelectItem>
                <SelectItem value="Sold">{t("filters.option.status.sold")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label className="text-sm text-[hsl(var(--brand-ink))]">{t("filters.purpose.label")}</Label>
            <Select value={value.purpose} onValueChange={(v) => onChange({ ...value, purpose: v as PropertyFiltersValue["purpose"] })}>
              <SelectTrigger className="rounded-2xl bg-white/70">
                <SelectValue placeholder={t("filters.option.all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{t("filters.option.all")}</SelectItem>
                <SelectItem value="Investment">{t("filters.option.purpose.investment")}</SelectItem>
                <SelectItem value="Residential">{t("filters.option.purpose.residential")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm text-[hsl(var(--brand-ink))]">{t("filters.area.label")}</Label>
            <Select value={value.area} onValueChange={(v) => onChange({ ...value, area: v })}>
              <SelectTrigger className="rounded-2xl bg-white/70">
                <SelectValue placeholder={t("filters.option.all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{t("filters.option.all")}</SelectItem>
                {AREAS.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <Label className="text-sm text-[hsl(var(--brand-ink))]">{t("filters.price.label")}</Label>

        <div className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/60 p-4">
          <div className="grid gap-5">
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">{t("filters.price.min")}</div>
                <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">Rp {formatIdrCompact(priceMin)}</div>
              </div>
              <Slider
                className="mt-3"
                value={[priceMin]}
                max={PRICE_MAX}
                step={5_000_000}
                onValueChange={(v) => setPriceMin(v[0] ?? 0)}
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">{t("filters.price.max")}</div>
                <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">Rp {formatIdrCompact(priceMax)}</div>
              </div>
              <Slider
                className="mt-3"
                value={[priceMax]}
                max={PRICE_MAX}
                step={5_000_000}
                onValueChange={(v) => setPriceMax(v[0] ?? PRICE_MAX)}
              />
            </div>
          </div>

          {/* Keep hidden numeric inputs for accessibility / power users (not visible) */}
          <div className="sr-only">
            <input value={String(priceMin)} onChange={(e) => setPriceMin(Number(e.target.value || 0))} />
            <input value={String(priceMax)} onChange={(e) => setPriceMax(Number(e.target.value || 0))} />
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-sm text-[hsl(var(--brand-ink))]">{t("filters.sort.label")}</Label>
        <Select value={value.sort} onValueChange={(v) => onChange({ ...value, sort: v as PropertyFiltersValue["sort"] })}>
          <SelectTrigger className="rounded-2xl bg-white/70">
            <SelectValue placeholder={t("filters.option.sort.newest")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t("filters.option.sort.newest")}</SelectItem>
            <SelectItem value="price_asc">{t("filters.option.sort.price_asc")}</SelectItem>
            <SelectItem value="price_desc">{t("filters.option.sort.price_desc")}</SelectItem>
            <SelectItem value="roi_desc">{t("filters.option.sort.roi_desc")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ADVANCED FILTERS */}
      <div className={cn("rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/55", compact ? "" : "")}>
        <button
          type="button"
          onClick={() => setAdvancedOpen((s) => !s)}
          className="w-full px-4 py-3 flex items-center justify-between gap-3"
          aria-expanded={advancedOpen}
        >
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-[hsl(var(--brand-surface-2))]">
              <SlidersHorizontal className="h-4 w-4 text-[hsl(var(--brand-ink)/0.70)]" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">Advanced</div>
              <div className="text-[11px] text-[hsl(var(--brand-ink)/0.65)]">Land/building, beds, baths, pool</div>
            </div>
          </div>
          <div className={cn("text-xs font-semibold text-[hsl(var(--brand-ink)/0.70)] transition-transform", advancedOpen ? "rotate-180" : "")}>
            ▾
          </div>
        </button>

        {advancedOpen && (
          <div className="px-4 pb-4 grid gap-4">
            <div className="grid gap-3">
              <Label className="text-sm text-[hsl(var(--brand-ink))]">Land size (m²)</Label>

              <div className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-4">
                <div className="grid gap-5">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">Min</div>
                      <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">{landMin} m²</div>
                    </div>
                    <Slider className="mt-3" value={[landMin]} max={LAND_MAX} step={10} onValueChange={(v) => setLandMin(v[0] ?? 0)} />
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">Max</div>
                      <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">{landMax} m²</div>
                    </div>
                    <Slider className="mt-3" value={[landMax]} max={LAND_MAX} step={10} onValueChange={(v) => setLandMax(v[0] ?? LAND_MAX)} />
                  </div>
                </div>

                <div className="sr-only">
                  <input value={String(landMin)} onChange={(e) => setLandMin(Number(e.target.value || 0))} />
                  <input value={String(landMax)} onChange={(e) => setLandMax(Number(e.target.value || 0))} />
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Label className="text-sm text-[hsl(var(--brand-ink))]">Building size (m²)</Label>

              <div className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-4">
                <div className="grid gap-5">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">Min</div>
                      <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">{buildingMin} m²</div>
                    </div>
                    <Slider
                      className="mt-3"
                      value={[buildingMin]}
                      max={BUILDING_MAX}
                      step={10}
                      onValueChange={(v) => setBuildingMin(v[0] ?? 0)}
                    />
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">Max</div>
                      <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">{buildingMax} m²</div>
                    </div>
                    <Slider
                      className="mt-3"
                      value={[buildingMax]}
                      max={BUILDING_MAX}
                      step={10}
                      onValueChange={(v) => setBuildingMax(v[0] ?? BUILDING_MAX)}
                    />
                  </div>
                </div>

                <div className="sr-only">
                  <input value={String(buildingMin)} onChange={(e) => setBuildingMin(Number(e.target.value || 0))} />
                  <input value={String(buildingMax)} onChange={(e) => setBuildingMax(Number(e.target.value || 0))} />
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label className="text-sm text-[hsl(var(--brand-ink))]">Bedrooms (min)</Label>
                <div className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-4">
                  <div className="flex items-baseline justify-between">
                    <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">At least</div>
                    <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">{bedroomsMin}</div>
                  </div>
                  <Slider
                    className="mt-3"
                    value={[bedroomsMin]}
                    max={BEDROOMS_MAX}
                    step={1}
                    onValueChange={(v) => onChange({ ...value, bedroomsMin: v[0] ?? 0 })}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm text-[hsl(var(--brand-ink))]">Bathrooms (min)</Label>
                <div className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-4">
                  <div className="flex items-baseline justify-between">
                    <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">At least</div>
                    <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">{bathroomsMin}</div>
                  </div>
                  <Slider
                    className="mt-3"
                    value={[bathroomsMin]}
                    max={BATHROOMS_MAX}
                    step={1}
                    onValueChange={(v) => onChange({ ...value, bathroomsMin: v[0] ?? 0 })}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-4">
              <div>
                <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">Pool only</div>
                <div className="text-[11px] text-[hsl(var(--brand-ink)/0.65)]">Tampilkan listing yang punya pool</div>
              </div>
              <Switch checked={value.poolOnly} onCheckedChange={(checked) => onChange({ ...value, poolOnly: checked })} />
            </div>
          </div>
        )}
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeChips.map((c) => (
            <Badge
              key={c.key}
              className="rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)] px-3 py-1"
            >
              {c.label}
              <button
                type="button"
                onClick={c.onClear}
                className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/5"
                aria-label={`Clear ${c.key}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <Separator className="bg-[hsl(var(--brand-ink)/0.10)]" />

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onReset}
          className="flex-1 rounded-2xl border-[hsl(var(--brand-ink)/0.16)] bg-white/70 hover:bg-white"
        >
          {t("cta.reset")}
        </Button>
        <Button
          onClick={() => onChange({ ...value })}
          className="flex-1 rounded-2xl bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)]"
        >
          {t("cta.apply")}
        </Button>
      </div>
    </div>
  );
}

export const DEFAULT_FILTERS: PropertyFiltersValue = {
  search: "",
  type: "All",
  purpose: "All",
  status: "All",
  area: "All",
  priceRange: [0, PRICE_MAX],
  landRange: [0, LAND_MAX],
  buildingRange: [0, BUILDING_MAX],
  bedroomsMin: 0,
  bathroomsMin: 0,
  poolOnly: false,
  sort: "newest",
};

export const toQuery = (v: PropertyFiltersValue): PropertyQuery => ({
  search: v.search || undefined,
  type: v.type,
  purpose: v.purpose,
  status: v.status,
  area: v.area,
  priceMin: v.priceRange[0] || undefined,
  priceMax: v.priceRange[1] === PRICE_MAX ? undefined : v.priceRange[1],
  landMin: v.landRange[0] || undefined,
  landMax: v.landRange[1] === LAND_MAX ? undefined : v.landRange[1],
  buildingMin: v.buildingRange[0] || undefined,
  buildingMax: v.buildingRange[1] === BUILDING_MAX ? undefined : v.buildingRange[1],
  bedroomsMin: v.bedroomsMin || undefined,
  bathroomsMin: v.bathroomsMin || undefined,
  pool: v.poolOnly ? true : undefined,
  sort: v.sort,
});