import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocale } from "@/i18n/use-locale";
import type { PropertyQuery } from "@/services/propertyService";

export default function SortSelect({
  value,
  onChange,
}: {
  value: NonNullable<PropertyQuery["sort"]>;
  onChange: (next: NonNullable<PropertyQuery["sort"]>) => void;
}) {
  const { t } = useLocale();

  return (
    <div className="grid gap-2">
      <Label className="text-sm text-[hsl(var(--brand-ink))]">{t("filters.sort.label")}</Label>
      <Select value={value} onValueChange={(v) => onChange(v as NonNullable<PropertyQuery["sort"]>)}>
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
  );
}