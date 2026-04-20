import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, X } from "lucide-react";
import { useLocale } from "@/i18n/use-locale";
import { AREAS, type PropertyPurpose, type PropertyStatus, type PropertyType } from "@/data/properties";
import type { PropertyQuery } from "@/services/propertyService";

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

  // Advanced (by category)
  landMin: string;
  buildingMax: string;
  bedsMin: string;
  bathsMin: string;
  pool: "Any" | "Yes" | "No";

  carport: "Any" | "Yes" | "No";
  roadMin: string; // meters
  powerMin: string; // VA
  water: "Any" | "PDAM" | "Well" | "Other";
  furnished: "Any" | "Yes" | "No";
  view: "Any" | "Ocean" | "Ricefield" | "Jungle" | "Garden" | "City";

  sort: NonNullable<PropertyQuery["sort"]>;
};

type Props = {
  value: PropertyFiltersValue;
  onChange: (next: PropertyFiltersValue) => void;
  onReset: () => void;
  compact?: boolean;
};

const normalizeInt = (raw: string) => raw.replace(/[^\d]/g, "").replace(/^0+(?=\d)/, "");

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

export default function PropertyFiltersFreeText({ value, onChange, onReset, compact = false }: Props) {
  const { t } = useLocale();
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const advancedTokens = useMemo(() => buildAdvancedTokens(value), [value]);

  const activeChips = useMemo(() => {
    const chips: Array<{ key: string; label: string; onClear: () => void }> = [];

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

    if (advancedTokens.trim()) {
      chips.push({
        key: "advanced",
        label: "Advanced filters",
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

    return chips;
  }, [advancedTokens, onChange, value]);

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

  const el = React.createElement;

  const header = !compact
    ? el(
        "div",
        null,
        el("div", { className: "font-serif text-xl text-[hsl(var(--brand-ink))]" }, t("filters.title")),
        el("p", { className: "mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]" }, t("filters.subtitle")),
      )
    : null;

  const chips =
    activeChips.length > 0
      ? el(
          "div",
          { className: "flex flex-wrap gap-2" },
          ...activeChips.map((c) =>
            el(
              Badge,
              {
                key: c.key,
                className:
                  "rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)] px-3 py-1",
              },
              c.label,
              el(
                "button",
                {
                  type: "button",
                  onClick: c.onClear,
                  className: "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/5",
                  "aria-label": `Clear ${c.key}`,
                } as React.ButtonHTMLAttributes<HTMLButtonElement>,
                el(X, { className: "h-3 w-3" }),
              ),
            ),
          ),
        )
      : null;

  return el(
    "div",
    { className: "grid gap-5" },
    header,

    el(
      "div",
      { className: "grid gap-2" },
      el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, t("filters.search.label")),
      el(Input, {
        value: value.search,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, search: e.target.value }),
        placeholder: t("filters.search.placeholder"),
        className: "rounded-2xl bg-white/70",
      }),
    ),

    el(
      "div",
      { className: "grid gap-4" },
      el(
        "div",
        { className: "grid grid-cols-2 gap-3" },
        el(
          "div",
          { className: "grid gap-2" },
          el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, t("filters.type.label")),
          el(
            Select,
            {
              value: value.type,
              onValueChange: (v: string) => onChange({ ...value, type: v as PropertyFiltersValue["type"] }),
            },
            el(SelectTrigger, { className: "rounded-2xl bg-white/70" }, el(SelectValue, { placeholder: t("filters.option.all") })),
            el(
              SelectContent,
              null,
              el(SelectItem, { value: "All" }, t("filters.option.all")),
              el(SelectItem, { value: "Villa" }, t("filters.option.type.villa")),
              el(SelectItem, { value: "Rumah" }, t("filters.option.type.house")),
              el(SelectItem, { value: "Tanah" }, t("filters.option.type.land")),
            ),
          ),
        ),
        el(
          "div",
          { className: "grid gap-2" },
          el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, t("filters.status.label")),
          el(
            Select,
            {
              value: value.status,
              onValueChange: (v: string) => onChange({ ...value, status: v as PropertyFiltersValue["status"] }),
            },
            el(SelectTrigger, { className: "rounded-2xl bg-white/70" }, el(SelectValue, { placeholder: t("filters.option.all") })),
            el(
              SelectContent,
              null,
              el(SelectItem, { value: "All" }, t("filters.option.all")),
              el(SelectItem, { value: "Ready" }, t("filters.option.status.ready")),
              el(SelectItem, { value: "Off-plan" }, t("filters.option.status.offplan")),
              el(SelectItem, { value: "Sold" }, t("filters.option.status.sold")),
            ),
          ),
        ),
      ),

      el(
        "div",
        { className: "grid grid-cols-2 gap-3" },
        el(
          "div",
          { className: "grid gap-2" },
          el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, t("filters.purpose.label")),
          el(
            Select,
            {
              value: value.purpose,
              onValueChange: (v: string) => onChange({ ...value, purpose: v as PropertyFiltersValue["purpose"] }),
            },
            el(SelectTrigger, { className: "rounded-2xl bg-white/70" }, el(SelectValue, { placeholder: t("filters.option.all") })),
            el(
              SelectContent,
              null,
              el(SelectItem, { value: "All" }, t("filters.option.all")),
              el(SelectItem, { value: "Investment" }, t("filters.option.purpose.investment")),
              el(SelectItem, { value: "Residential" }, t("filters.option.purpose.residential")),
            ),
          ),
        ),
        el(
          "div",
          { className: "grid gap-2" },
          el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, t("filters.area.label")),
          el(
            Select,
            {
              value: value.area,
              onValueChange: (v: string) => onChange({ ...value, area: v }),
            },
            el(SelectTrigger, { className: "rounded-2xl bg-white/70" }, el(SelectValue, { placeholder: t("filters.option.all") })),
            el(SelectContent, null, el(SelectItem, { value: "All" }, t("filters.option.all")), ...AREAS.map((a) => el(SelectItem, { key: a, value: a }, a))),
          ),
        ),
      ),
    ),

    el(
      "div",
      { className: "grid gap-3" },
      el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, t("filters.price.label")),
      el(
        "div",
        { className: "rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/60 p-4" },
        el(
          "div",
          { className: "grid gap-5" },
          el(
            "div",
            null,
            el(
              "div",
              { className: "flex items-baseline justify-between gap-3" },
              el("div", { className: "text-xs text-[hsl(var(--brand-ink)/0.70)]" }, t("filters.price.min")),
              el("div", { className: "text-sm font-semibold text-[hsl(var(--brand-ink))]" }, `Rp ${formatIdrCompact(priceMin)}`),
            ),
            el(Slider, {
              className: "mt-3",
              value: [priceMin],
              max: PRICE_MAX,
              step: 5_000_000,
              onValueChange: (v: number[]) => setPriceMin(v[0] ?? 0),
            }),
          ),
          el(
            "div",
            null,
            el(
              "div",
              { className: "flex items-baseline justify-between gap-3" },
              el("div", { className: "text-xs text-[hsl(var(--brand-ink)/0.70)]" }, t("filters.price.max")),
              el("div", { className: "text-sm font-semibold text-[hsl(var(--brand-ink))]" }, `Rp ${formatIdrCompact(priceMax)}`),
            ),
            el(Slider, {
              className: "mt-3",
              value: [priceMax],
              max: PRICE_MAX,
              step: 5_000_000,
              onValueChange: (v: number[]) => setPriceMax(v[0] ?? PRICE_MAX),
            }),
          ),
        ),
      ),
    ),

    el(
      "div",
      { className: "grid gap-2" },
      el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, t("filters.sort.label")),
      el(
        Select,
        {
          value: value.sort,
          onValueChange: (v: string) => onChange({ ...value, sort: v as PropertyFiltersValue["sort"] }),
        },
        el(SelectTrigger, { className: "rounded-2xl bg-white/70" }, el(SelectValue, { placeholder: t("filters.option.sort.newest") })),
        el(
          SelectContent,
          null,
          el(SelectItem, { value: "newest" }, t("filters.option.sort.newest")),
          el(SelectItem, { value: "price_asc" }, t("filters.option.sort.price_asc")),
          el(SelectItem, { value: "price_desc" }, t("filters.option.sort.price_desc")),
          el(SelectItem, { value: "roi_desc" }, t("filters.option.sort.roi_desc")),
        ),
      ),
    ),

    el(
      "div",
      { className: "rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/55" },
      el(
        "button",
        {
          type: "button",
          onClick: () => setAdvancedOpen((s) => !s),
          className: "w-full px-4 py-3 flex items-center justify-between gap-3",
          "aria-expanded": advancedOpen,
        } as React.ButtonHTMLAttributes<HTMLButtonElement>,
        el(
          "div",
          { className: "flex items-center gap-2" },
          el(
            "div",
            { className: "grid h-9 w-9 place-items-center rounded-2xl bg-[hsl(var(--brand-surface-2))]" },
            el(SlidersHorizontal, { className: "h-4 w-4 text-[hsl(var(--brand-ink)/0.70)]" }),
          ),
          el(
            "div",
            { className: "text-left" },
            el("div", { className: "text-sm font-semibold text-[hsl(var(--brand-ink))]" }, "Advanced (by category)"),
            el("div", { className: "text-[11px] text-[hsl(var(--brand-ink)/0.65)]" }, "Ukuran, akses, utilitas, dan view."),
          ),
        ),
        el(
          "div",
          {
            className:
              "text-xs font-semibold text-[hsl(var(--brand-ink)/0.70)] transition-transform " +
              (advancedOpen ? "rotate-180" : ""),
          },
          "▾",
        ),
      ),

      advancedOpen
        ? el(
            "div",
            { className: "px-4 pb-4 grid gap-4" },

            el(
              "div",
              { className: "grid gap-2" },
              el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, "Land size (min m²)"),
              el(Input, {
                inputMode: "numeric",
                value: value.landMin,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, landMin: normalizeInt(e.target.value) }),
                placeholder: "ex: 300",
                className: "rounded-2xl bg-white/70",
              }),
            ),

            el(
              "div",
              { className: "grid gap-2" },
              el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, "Building size (max m²)"),
              el(Input, {
                inputMode: "numeric",
                value: value.buildingMax,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange({ ...value, buildingMax: normalizeInt(e.target.value) }),
                placeholder: "ex: 250",
                className: "rounded-2xl bg-white/70",
              }),
            ),

            el(
              "div",
              { className: "grid grid-cols-2 gap-3" },
              el(
                "div",
                { className: "grid gap-2" },
                el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, "Beds (min)"),
                el(Input, {
                  inputMode: "numeric",
                  value: value.bedsMin,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, bedsMin: normalizeInt(e.target.value) }),
                  placeholder: "ex: 2",
                  className: "rounded-2xl bg-white/70",
                }),
              ),
              el(
                "div",
                { className: "grid gap-2" },
                el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, "Baths (min)"),
                el(Input, {
                  inputMode: "numeric",
                  value: value.bathsMin,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange({ ...value, bathsMin: normalizeInt(e.target.value) }),
                  placeholder: "ex: 2",
                  className: "rounded-2xl bg-white/70",
                }),
              ),
            ),

            el(
              "div",
              { className: "grid gap-2" },
              el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, "Carport"),
              el(
                "div",
                { className: "grid grid-cols-3 gap-2" },
                el(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => onChange({ ...value, carport: "Any" }),
                    className:
                      "rounded-2xl border-[hsl(var(--brand-ink)/0.16)] " +
                      (value.carport === "Any"
                        ? "bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))]"
                        : "bg-white/70 hover:bg-white"),
                  },
                  "Any",
                ),
                el(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => onChange({ ...value, carport: "Yes" }),
                    className:
                      "rounded-2xl border-[hsl(var(--brand-ink)/0.16)] " +
                      (value.carport === "Yes"
                        ? "bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))]"
                        : "bg-white/70 hover:bg-white"),
                  },
                  "Yes",
                ),
                el(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => onChange({ ...value, carport: "No" }),
                    className:
                      "rounded-2xl border-[hsl(var(--brand-ink)/0.16)] " +
                      (value.carport === "No"
                        ? "bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))]"
                        : "bg-white/70 hover:bg-white"),
                  },
                  "No",
                ),
              ),
            ),

            el(
              "div",
              { className: "grid grid-cols-2 gap-3" },
              el(
                "div",
                { className: "grid gap-2" },
                el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, "Road width (min m)"),
                el(Input, {
                  inputMode: "numeric",
                  value: value.roadMin,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, roadMin: normalizeInt(e.target.value) }),
                  placeholder: "ex: 4",
                  className: "rounded-2xl bg-white/70",
                }),
              ),
              el(
                "div",
                { className: "grid gap-2" },
                el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, "Electricity (min VA)"),
                el(Input, {
                  inputMode: "numeric",
                  value: value.powerMin,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange({ ...value, powerMin: normalizeInt(e.target.value) }),
                  placeholder: "ex: 5500",
                  className: "rounded-2xl bg-white/70",
                }),
              ),
            ),

            el(
              "div",
              { className: "grid grid-cols-2 gap-3" },
              el(
                "div",
                { className: "grid gap-2" },
                el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, "Water"),
                el(
                  Select,
                  {
                    value: value.water,
                    onValueChange: (v: string) => onChange({ ...value, water: v as PropertyFiltersValue["water"] }),
                  },
                  el(SelectTrigger, { className: "rounded-2xl bg-white/70" }, el(SelectValue, { placeholder: "Any" })),
                  el(
                    SelectContent,
                    null,
                    el(SelectItem, { value: "Any" }, "Any"),
                    el(SelectItem, { value: "PDAM" }, "PDAM"),
                    el(SelectItem, { value: "Well" }, "Well"),
                    el(SelectItem, { value: "Other" }, "Other"),
                  ),
                ),
              ),
              el(
                "div",
                { className: "grid gap-2" },
                el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, "Furnished"),
                el(
                  Select,
                  {
                    value: value.furnished,
                    onValueChange: (v: string) => onChange({ ...value, furnished: v as PropertyFiltersValue["furnished"] }),
                  },
                  el(SelectTrigger, { className: "rounded-2xl bg-white/70" }, el(SelectValue, { placeholder: "Any" })),
                  el(
                    SelectContent,
                    null,
                    el(SelectItem, { value: "Any" }, "Any"),
                    el(SelectItem, { value: "Yes" }, "Yes"),
                    el(SelectItem, { value: "No" }, "No"),
                  ),
                ),
              ),
            ),

            el(
              "div",
              { className: "grid gap-2" },
              el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, "View"),
              el(
                Select,
                {
                  value: value.view,
                  onValueChange: (v: string) => onChange({ ...value, view: v as PropertyFiltersValue["view"] }),
                },
                el(SelectTrigger, { className: "rounded-2xl bg-white/70" }, el(SelectValue, { placeholder: "Any" })),
                el(
                  SelectContent,
                  null,
                  el(SelectItem, { value: "Any" }, "Any"),
                  el(SelectItem, { value: "Ocean" }, "Ocean"),
                  el(SelectItem, { value: "Ricefield" }, "Ricefield"),
                  el(SelectItem, { value: "Jungle" }, "Jungle"),
                  el(SelectItem, { value: "Garden" }, "Garden"),
                  el(SelectItem, { value: "City" }, "City"),
                ),
              ),
            ),

            el(
              "div",
              { className: "grid gap-2" },
              el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, "Pool"),
              el(
                "div",
                { className: "grid grid-cols-3 gap-2" },
                el(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => onChange({ ...value, pool: "Any" }),
                    className:
                      "rounded-2xl border-[hsl(var(--brand-ink)/0.16)] " +
                      (value.pool === "Any"
                        ? "bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))]"
                        : "bg-white/70 hover:bg-white"),
                  },
                  "Any",
                ),
                el(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => onChange({ ...value, pool: "Yes" }),
                    className:
                      "rounded-2xl border-[hsl(var(--brand-ink)/0.16)] " +
                      (value.pool === "Yes"
                        ? "bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))]"
                        : "bg-white/70 hover:bg-white"),
                  },
                  "Yes",
                ),
                el(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => onChange({ ...value, pool: "No" }),
                    className:
                      "rounded-2xl border-[hsl(var(--brand-ink)/0.16)] " +
                      (value.pool === "No"
                        ? "bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))]"
                        : "bg-white/70 hover:bg-white"),
                  },
                  "No",
                ),
              ),
            ),
          )
        : null,
    ),

    chips,

    el(Separator, { className: "bg-[hsl(var(--brand-ink)/0.10)]" }),

    el(
      "div",
      { className: "flex gap-2" },
      el(
        Button,
        {
          variant: "outline",
          onClick: onReset,
          className: "flex-1 rounded-2xl border-[hsl(var(--brand-ink)/0.16)] bg-white/70 hover:bg-white",
        },
        t("cta.reset"),
      ),
      el(
        Button,
        {
          onClick: () => onChange({ ...value }),
          className:
            "flex-1 rounded-2xl bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)]",
        },
        t("cta.apply"),
      ),
    ),
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