import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { PropertyQuery } from "@/services/propertyService";
import { AREAS, type PropertyPurpose, type PropertyStatus, type PropertyType } from "@/data/properties";

const PRICE_MAX = 12_000_000_000;

const formatIdrCompact = (value: number) =>
  new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(value);

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

  return (
    <div className="grid gap-5">
      {!compact && (
        <div>
          <div className="font-serif text-xl text-[hsl(var(--brand-ink))]">Filter</div>
          <p className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">Persempit pilihan dan fokus ke unit yang paling relevan.</p>
        </div>
      )}

      <div className="grid gap-2">
        <Label className="text-sm text-[hsl(var(--brand-ink))]">Search</Label>
        <Input
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          placeholder="Cari area, judul, atau kode (contoh: ART-ULU)"
          className="rounded-2xl bg-white/70"
        />
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label className="text-sm text-[hsl(var(--brand-ink))]">Tipe</Label>
            <Select value={value.type} onValueChange={(v) => onChange({ ...value, type: v as PropertyFiltersValue["type"] })}>
              <SelectTrigger className="rounded-2xl bg-white/70">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Semua</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Rumah">Rumah</SelectItem>
                <SelectItem value="Tanah">Tanah</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm text-[hsl(var(--brand-ink))]">Status</Label>
            <Select value={value.status} onValueChange={(v) => onChange({ ...value, status: v as PropertyFiltersValue["status"] })}>
              <SelectTrigger className="rounded-2xl bg-white/70">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Semua</SelectItem>
                <SelectItem value="Ready">Ready</SelectItem>
                <SelectItem value="Off-plan">Off-plan</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label className="text-sm text-[hsl(var(--brand-ink))]">Purpose</Label>
            <Select value={value.purpose} onValueChange={(v) => onChange({ ...value, purpose: v as PropertyFiltersValue["purpose"] })}>
              <SelectTrigger className="rounded-2xl bg-white/70">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Semua</SelectItem>
                <SelectItem value="Investment">Investment</SelectItem>
                <SelectItem value="Residential">Residential</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm text-[hsl(var(--brand-ink))]">Area</Label>
            <Select value={value.area} onValueChange={(v) => onChange({ ...value, area: v })}>
              <SelectTrigger className="rounded-2xl bg-white/70">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Semua</SelectItem>
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
        <div className="flex items-end justify-between">
          <Label className="text-sm text-[hsl(var(--brand-ink))]">Range harga</Label>
          <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">Rp {formatIdrCompact(value.priceRange[0])} – {formatIdrCompact(value.priceRange[1])}</div>
        </div>
        <Slider
          value={value.priceRange}
          max={PRICE_MAX}
          step={250_000_000}
          onValueChange={(v) => onChange({ ...value, priceRange: v as [number, number] })}
        />
      </div>

      <Separator className="bg-[hsl(var(--brand-ink)/0.10)]" />

      <div className="grid gap-2">
        <Label className="text-sm text-[hsl(var(--brand-ink))]">Sort</Label>
        <Select value={value.sort} onValueChange={(v) => onChange({ ...value, sort: v as PropertyFiltersValue["sort"] })}>
          <SelectTrigger className="rounded-2xl bg-white/70">
            <SelectValue placeholder="Pilih" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Terbaru</SelectItem>
            <SelectItem value="price_asc">Harga rendah</SelectItem>
            <SelectItem value="price_desc">Harga tinggi</SelectItem>
            <SelectItem value="roi_desc">ROI tertinggi</SelectItem>
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
          Reset
        </Button>
        <Button
          onClick={() => onChange({ ...value })}
          className="flex-1 rounded-2xl bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)]"
        >
          Terapkan
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
