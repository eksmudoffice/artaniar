import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useLocale } from "@/i18n/use-locale";

const PRICE_MAX = 100_000_000_000;

const formatIdrCompact = (value: number) =>
  new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(value);

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export default function PriceRange({
  value,
  onChange,
}: {
  value: [number, number];
  onChange: (next: [number, number]) => void;
}) {
  const { t } = useLocale();
  const priceMin = value[0];
  const priceMax = value[1];

  const setPriceMin = (nextMinRaw: number) => {
    const nextMin = clamp(nextMinRaw, 0, PRICE_MAX);
    const nextMax = clamp(Math.max(priceMax, nextMin), 0, PRICE_MAX);
    onChange([nextMin, nextMax]);
  };

  const setPriceMax = (nextMaxRaw: number) => {
    const nextMax = clamp(nextMaxRaw, 0, PRICE_MAX);
    const nextMin = clamp(Math.min(priceMin, nextMax), 0, PRICE_MAX);
    onChange([nextMin, nextMax]);
  };

  return (
    <div className="grid gap-3">
      <Label className="text-sm text-[hsl(var(--brand-ink))]">{t("filters.price.label")}</Label>

      <div className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/60 p-4">
        <div className="grid gap-5">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <div className="text-xs text-[hsl(var(--brand-ink)/0.70)]">{t("filters.price.min")}</div>
              <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">Rp {formatIdrCompact(priceMin)}</div>
            </div>
            <Slider className="mt-3" value={[priceMin]} max={PRICE_MAX} step={5_000_000} onValueChange={(v) => setPriceMin(v[0] ?? 0)} />
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

        <div className="sr-only">
          <input value={String(priceMin)} onChange={(e) => setPriceMin(Number(e.target.value || 0))} />
          <input value={String(priceMax)} onChange={(e) => setPriceMax(Number(e.target.value || 0))} />
        </div>
      </div>
    </div>
  );
}

export const PRICE_RANGE_MAX = PRICE_MAX;