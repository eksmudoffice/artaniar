import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/use-locale";

export default function FilterActions({ onReset, onApply }: { onReset: () => void; onApply: () => void }) {
  const { t } = useLocale();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={onReset}
        className="flex-1 rounded-2xl border-[hsl(var(--brand-ink)/0.16)] bg-white/70 hover:bg-white"
      >
        {t("cta.reset")}
      </Button>
      <Button
        onClick={onApply}
        className="flex-1 rounded-2xl bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)]"
      >
        {t("cta.apply")}
      </Button>
    </div>
  );
}