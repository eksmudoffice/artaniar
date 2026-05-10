import { useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "@/i18n/use-locale";
import type { PropertyQuery } from "@/services/propertyService";

import FilterHeader from "@/components/properties/filters/FilterHeader";
import BasicFilters, { type BasicFiltersValue } from "@/components/properties/filters/BasicFilters";
import PriceRange, { PRICE_RANGE_MAX } from "@/components/properties/filters/PriceRange";
import SortSelect from "@/components/properties/filters/SortSelect";
import AdvancedFilters, { type AdvancedFiltersValue } from "@/components/properties/filters/AdvancedFilters";
import ActiveChips, { type FilterChip } from "@/components/properties/filters/ActiveChips";
import FilterActions from "@/components/properties/filters/FilterActions";

const PRICE_MAX = PRICE_RANGE_MAX;

const formatIdrCompact = (value: number) =>
  new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(value);

const toNum = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
};

const buildAdvancedTokens = (v: PropertyFiltersValue) => {
  const tokens: string[] = [];

  const land = toNum(v.landMin);
  if (land != null) tokens.push(`land>=${land}`);

  const building = toNum(v.buildingMax);
  if (building != null) tokens.push(`building<=${building}`);

  const beds = toNum(v.bedsMin);
  if (beds != null) tokens.push(`beds>=${beds}`);

  const baths = toNum(v.bathsMin);
  if (baths != null) tokens.push(`baths>=${baths}`);

  if (v.pool === "Yes") tokens.push("pool");
  if (v.pool === "No") tokens.push("nopool");

  if (v.carport === "Yes") tokens.push("carport>=1");
  if (v.carport === "No") tokens.push("carport=0");

  const road = toNum(v.roadMin);
  if (road != null) tokens.push(`road>=${road}`);

  const power = toNum(v.powerMin);
  if (power != null) tokens.push(`power>=${power}`);

  if (v.water !== "Any") tokens.push(`water=${v.water.toLowerCase()}`);
  if (v.furnished === "Yes") tokens.push("furnished");
  if (v.furnished === "No") tokens.push("unfurnished");
  if (v.view !== "Any") tokens.push(`view=${v.view.toLowerCase()}`);

  return tokens.join(" ");
};

export type PropertyFiltersValue = BasicFiltersValue &
  AdvancedFiltersValue & {
    priceRange: [number, number];
    sort: NonNullable<PropertyQuery["sort"]>;
  };

type Props = {
  value: PropertyFiltersValue;
  onChange: (next: PropertyFiltersValue) => void;
  onReset: () => void;
  compact?: boolean;
};

export default function PropertyFiltersFreeText({ value, onChange, onReset, compact = false }: Props) {
  const { t } = useLocale();

  const advancedTokens = useMemo(() => buildAdvancedTokens(value), [value]);

  const chips = useMemo(() => {
    const out: FilterChip[] = [];

    if (value.type !== "All") out.push({ key: "type", label: value.type, onClear: () => onChange({ ...value, type: "All" }) });
    if (value.purpose !== "All")
      out.push({ key: "purpose", label: value.purpose, onClear: () => onChange({ ...value, purpose: "All" }) });
    if (value.status !== "All") out.push({ key: "status", label: value.status, onClear: () => onChange({ ...value, status: "All" }) });
    if (value.area !== "All") out.push({ key: "area", label: value.area, onClear: () => onChange({ ...value, area: "All" }) });

    const [min, max] = value.priceRange;
    if (min !== 0 || max !== PRICE_MAX) {
      out.push({
        key: "price",
        label: `Rp ${formatIdrCompact(min)} – ${formatIdrCompact(max)}`,
        onClear: () => onChange({ ...value, priceRange: [0, PRICE_MAX] }),
      });
    }

    if (advancedTokens.trim()) {
      out.push({
        key: "advanced",
        label: t("filters.advanced.chip"),
        onClear: () =>
          onChange({
            ...value,
            landMin: "",
            buildingMax: "",
            bedsMin: "",
            bathsMin: "",
            pool: "Any",
            carport: "Any",
            roadMin: "",
            powerMin: "",
            water: "Any",
            furnished: "Any",
            view: "Any",
          }),
      });
    }

    return out;
  }, [advancedTokens, onChange, t, value]);

  return (
    <div className="grid gap-5">
      <FilterHeader compact={compact} />

      <BasicFilters
        value={{
          search: value.search,
          type: value.type,
          purpose: value.purpose,
          status: value.status,
          area: value.area,
        }}
        onChange={(next) => onChange({ ...value, ...next })}
      />

      <PriceRange value={value.priceRange} onChange={(next) => onChange({ ...value, priceRange: next })} />

      <SortSelect value={value.sort} onChange={(next) => onChange({ ...value, sort: next })} />

      <AdvancedFilters
        value={{
          landMin: value.landMin,
          buildingMax: value.buildingMax,
          bedsMin: value.bedsMin,
          bathsMin: value.bathsMin,
          pool: value.pool,
          carport: value.carport,
          roadMin: value.roadMin,
          powerMin: value.powerMin,
          water: value.water,
          furnished: value.furnished,
          view: value.view,
        }}
        onChange={(next) => onChange({ ...value, ...next })}
      />

      <ActiveChips chips={chips} />

      <Separator className="bg-[hsl(var(--brand-ink)/0.10)]" />

      <FilterActions onReset={onReset} onApply={() => onChange({ ...value })} />
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

  landMin: "",
  buildingMax: "",
  bedsMin: "",
  bathsMin: "",
  pool: "Any",

  carport: "Any",
  roadMin: "",
  powerMin: "",
  water: "Any",
  furnished: "Any",
  view: "Any",

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
  advanced: buildAdvancedTokens(v).trim() ? buildAdvancedTokens(v).trim() : undefined,
  sort: v.sort,
});