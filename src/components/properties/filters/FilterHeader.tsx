import { useLocale } from "@/i18n/use-locale";

export default function FilterHeader({ compact }: { compact: boolean }) {
  const { t } = useLocale();

  if (compact) return null;

  return (
    <div>
      <div className="font-serif text-xl text-[hsl(var(--brand-ink))]">{t("filters.title")}</div>
      <p className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.70)]">{t("filters.subtitle")}</p>
    </div>
  );
}