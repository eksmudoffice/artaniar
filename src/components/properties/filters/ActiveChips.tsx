import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export type FilterChip = { key: string; label: string; onClear: () => void };

export default function ActiveChips({ chips }: { chips: FilterChip[] }) {
  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
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
  );
}