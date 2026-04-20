import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { PropertyQuery } from "@/services/propertyService";
import { AREAS, type PropertyPurpose, type PropertyStatus, type PropertyType } from "@/data/properties";
import { useLocale } from "@/i18n/use-locale";

const PRICE_MAX = 100_000_000_000;

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

    return chips;
  }, [onChange, value]);

  const priceMin = value.priceRange[0];
  const priceMax = value.priceRange[1];

  const setPriceMin = (raw: string) => {
    const nextMin = clamp(Number(raw || 0), 0, PRICE_MAX);
    const nextMax = clamp(Math.max(priceMax, nextMin), 0, PRICE_MAX);
    onChange({ ...value, priceRange: [nextMin, nextMax] });
  };

  const setPriceMax = (raw: string) => {
    const nextMax = clamp(Number(raw || 0), 0, PRICE_MAX);
    const nextMin = clamp(Math.min(priceMin, nextMax), 0, PRICE_MAX);
    onChange({ ...value, priceRange: [nextMin, nextMax] });
  };

  return (
    <div className="grid gap-5">
      {!compact && (
        <div>
          <div className="font-serif text-xl text-[hsl(var(--brand-ink))]">{t("filters.title")}</div>
          <p className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("filters.subtitle")}</p>
        </div>
      )}

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
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">{t("filters.price.min")}</div>
            <Input
              inputMode="numeric"
              value={String(priceMin)}
              onChange={(e) => setPriceMin(e.target.value.replace(/[^\d]/g, ""))}
              className="rounded-2xl bg-white/70"
            />
          </div>
          <div className="grid gap-2">
            <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">{t("filters.price.max")}</div>
            <Input
              inputMode="numeric"
              value={String(priceMax)}
              onChange={(e) => setPriceMax(e.target.value.replace(/[^\d]/g, ""))}
              className="rounded-2xl bg-white/70"
            />
          </div>
        </div>
        <div className="text-[11px] text-[hsl(var(--brand-ink)/0.60)]">
          Limit: Rp {formatIdrCompact(PRICE_MAX)}
        </div>
      </div>

      <Separator className="bg-[hsl(var(--brand-ink)/0.10)]" />

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
  sort: v.sort,
});