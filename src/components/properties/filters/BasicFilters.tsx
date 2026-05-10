import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocale } from "@/i18n/use-locale";
import { AREAS, type PropertyPurpose, type PropertyStatus, type PropertyType } from "@/data/properties";

export type BasicFiltersValue = {
  search: string;
  type: PropertyType | "All";
  purpose: PropertyPurpose | "All";
  status: PropertyStatus | "All";
  area: string | "All";
};

export default function BasicFilters({
  value,
  onChange,
}: {
  value: BasicFiltersValue;
  onChange: (next: BasicFiltersValue) => void;
}) {
  const { t } = useLocale();

  return (
    <>
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
            <Select value={value.type} onValueChange={(v) => onChange({ ...value, type: v as BasicFiltersValue["type"] })}>
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
            <Select value={value.status} onValueChange={(v) => onChange({ ...value, status: v as BasicFiltersValue["status"] })}>
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
            <Select
              value={value.purpose}
              onValueChange={(v) => onChange({ ...value, purpose: v as BasicFiltersValue["purpose"] })}
            >
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
    </>
  );
}