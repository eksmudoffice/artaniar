import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { useLocale } from "@/i18n/use-locale";

export type AdvancedFiltersValue = {
  landMin: string;
  buildingMax: string;
  bedsMin: string;
  bathsMin: string;
  pool: "Any" | "Yes" | "No";

  carport: "Any" | "Yes" | "No";
  roadMin: string;
  powerMin: string;
  water: "Any" | "PDAM" | "Well" | "Other";
  furnished: "Any" | "Yes" | "No";
  view: "Any" | "Ocean" | "Ricefield" | "Jungle" | "Garden" | "City";
};

const normalizeInt = (raw: string) => raw.replace(/[^\d]/g, "").replace(/^0+(?=\d)/, "");

export default function AdvancedFilters({
  value,
  onChange,
}: {
  value: AdvancedFiltersValue;
  onChange: (next: AdvancedFiltersValue) => void;
}) {
  const { locale } = useLocale();
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const text = useMemo(() => {
    const isId = locale === "id";
    return {
      advancedTitle: isId ? "Advanced (kategori)" : "Advanced (by category)",
      advancedSubtitle: isId ? "Ukuran, akses, utilitas, dan view." : "Size, access, utilities, and view.",

      landMin: isId ? "Luas tanah (min m²)" : "Land size (min m²)",
      landPh: isId ? "cth: 300" : "ex: 300",

      buildingMax: isId ? "Luas bangunan (maks m²)" : "Building size (max m²)",
      buildingPh: isId ? "cth: 250" : "ex: 250",

      bedsMin: isId ? "Kamar (min)" : "Beds (min)",
      bathsMin: isId ? "Kamar mandi (min)" : "Baths (min)",

      carport: isId ? "Carport" : "Carport",
      roadMin: isId ? "Lebar jalan (min m)" : "Road width (min m)",
      powerMin: isId ? "Listrik (min VA)" : "Electricity (min VA)",

      water: isId ? "Sumber air" : "Water",
      furnished: isId ? "Furnish" : "Furnished",
      view: isId ? "View" : "View",
      pool: isId ? "Kolam renang" : "Pool",

      any: isId ? "Bebas" : "Any",
      yes: isId ? "Ya" : "Yes",
      no: isId ? "Tidak" : "No",

      ex2: isId ? "cth: 2" : "ex: 2",
      ex4: isId ? "cth: 4" : "ex: 4",
      ex5500: isId ? "cth: 5500" : "ex: 5500",
    };
  }, [locale]);

  const el = React.createElement;

  return el(
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
          el("div", { className: "text-sm font-semibold text-[hsl(var(--brand-ink))]" }, text.advancedTitle),
          el("div", { className: "text-[11px] text-[hsl(var(--brand-ink)/0.65)]" }, text.advancedSubtitle),
        ),
      ),
      el(
        "div",
        {
          className:
            "text-xs font-semibold text-[hsl(var(--brand-ink)/0.70)] transition-transform " + (advancedOpen ? "rotate-180" : ""),
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
            el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, text.landMin),
            el(Input, {
              inputMode: "numeric",
              value: value.landMin,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, landMin: normalizeInt(e.target.value) }),
              placeholder: text.landPh,
              className: "rounded-2xl bg-white/70",
            }),
          ),

          el(
            "div",
            { className: "grid gap-2" },
            el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, text.buildingMax),
            el(Input, {
              inputMode: "numeric",
              value: value.buildingMax,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                onChange({ ...value, buildingMax: normalizeInt(e.target.value) }),
              placeholder: text.buildingPh,
              className: "rounded-2xl bg-white/70",
            }),
          ),

          el(
            "div",
            { className: "grid grid-cols-2 gap-3" },
            el(
              "div",
              { className: "grid gap-2" },
              el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, text.bedsMin),
              el(Input, {
                inputMode: "numeric",
                value: value.bedsMin,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, bedsMin: normalizeInt(e.target.value) }),
                placeholder: text.ex2,
                className: "rounded-2xl bg-white/70",
              }),
            ),
            el(
              "div",
              { className: "grid gap-2" },
              el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, text.bathsMin),
              el(Input, {
                inputMode: "numeric",
                value: value.bathsMin,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, bathsMin: normalizeInt(e.target.value) }),
                placeholder: text.ex2,
                className: "rounded-2xl bg-white/70",
              }),
            ),
          ),

          el(
            "div",
            { className: "grid gap-2" },
            el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, text.carport),
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
                text.any,
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
                text.yes,
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
                text.no,
              ),
            ),
          ),

          el(
            "div",
            { className: "grid grid-cols-2 gap-3" },
            el(
              "div",
              { className: "grid gap-2" },
              el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, text.roadMin),
              el(Input, {
                inputMode: "numeric",
                value: value.roadMin,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, roadMin: normalizeInt(e.target.value) }),
                placeholder: text.ex4,
                className: "rounded-2xl bg-white/70",
              }),
            ),
            el(
              "div",
              { className: "grid gap-2" },
              el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, text.powerMin),
              el(Input, {
                inputMode: "numeric",
                value: value.powerMin,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, powerMin: normalizeInt(e.target.value) }),
                placeholder: text.ex5500,
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
              el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, text.water),
              el(
                Select,
                { value: value.water, onValueChange: (v: string) => onChange({ ...value, water: v as AdvancedFiltersValue["water"] }) },
                el(SelectTrigger, { className: "rounded-2xl bg-white/70" }, el(SelectValue, { placeholder: text.any })),
                el(
                  SelectContent,
                  null,
                  el(SelectItem, { value: "Any" }, text.any),
                  el(SelectItem, { value: "PDAM" }, "PDAM"),
                  el(SelectItem, { value: "Well" }, "Well"),
                  el(SelectItem, { value: "Other" }, "Other"),
                ),
              ),
            ),
            el(
              "div",
              { className: "grid gap-2" },
              el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, text.furnished),
              el(
                Select,
                {
                  value: value.furnished,
                  onValueChange: (v: string) => onChange({ ...value, furnished: v as AdvancedFiltersValue["furnished"] }),
                },
                el(SelectTrigger, { className: "rounded-2xl bg-white/70" }, el(SelectValue, { placeholder: text.any })),
                el(
                  SelectContent,
                  null,
                  el(SelectItem, { value: "Any" }, text.any),
                  el(SelectItem, { value: "Yes" }, text.yes),
                  el(SelectItem, { value: "No" }, text.no),
                ),
              ),
            ),
          ),

          el(
            "div",
            { className: "grid gap-2" },
            el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, text.view),
            el(
              Select,
              { value: value.view, onValueChange: (v: string) => onChange({ ...value, view: v as AdvancedFiltersValue["view"] }) },
              el(SelectTrigger, { className: "rounded-2xl bg-white/70" }, el(SelectValue, { placeholder: text.any })),
              el(
                SelectContent,
                null,
                el(SelectItem, { value: "Any" }, text.any),
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
            el(Label, { className: "text-sm text-[hsl(var(--brand-ink))]" }, text.pool),
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
                text.any,
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
                text.yes,
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
                text.no,
              ),
            ),
          ),
        )
      : null,
  );
}