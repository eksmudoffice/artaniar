import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/translations";
import { cn } from "@/lib/utils";

export default function LanguageToggle({
  value,
  onChange,
  transparent,
  className,
}: {
  value: Locale;
  onChange: (next: Locale) => void;
  transparent?: boolean;
  className?: string;
}) {
  const base =
    "rounded-full px-3 py-2 text-xs font-semibold transition-colors border";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full p-1",
        transparent ? "bg-white/10 border border-white/15" : "bg-white/60 border border-[hsl(var(--brand-ink)/0.12)]",
        className,
      )}
      role="group"
      aria-label="Language selector"
    >
      <Button
        type="button"
        variant="ghost"
        onClick={() => onChange("en")}
        className={cn(
          base,
          value === "en"
            ? transparent
              ? "bg-white text-[hsl(var(--brand-ink))] border-white/0 hover:bg-white"
              : "bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] border-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-ink)/0.92)]"
            : transparent
              ? "text-white/85 border-white/15 hover:bg-white/10"
              : "text-[hsl(var(--brand-ink))] border-transparent hover:bg-white",
        )}
      >
        EN
      </Button>

      <Button
        type="button"
        variant="ghost"
        onClick={() => onChange("id")}
        className={cn(
          base,
          value === "id"
            ? transparent
              ? "bg-white text-[hsl(var(--brand-ink))] border-white/0 hover:bg-white"
              : "bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] border-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-ink)/0.92)]"
            : transparent
              ? "text-white/85 border-white/15 hover:bg-white/10"
              : "text-[hsl(var(--brand-ink))] border-transparent hover:bg-white",
        )}
      >
        ID
      </Button>
    </div>
  );
}