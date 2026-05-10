import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

export default function MobileFilterFab({
  className,
  label = "Filter",
  onClick,
}: {
  className?: string;
  label?: string;
  onClick: () => void;
}) {
  return (
    <div className={cn("fixed right-4 bottom-24 z-40 lg:hidden", className)}>
      <Button
        type="button"
        onClick={onClick}
        className="h-12 rounded-full px-5 shadow-[0_18px_45px_-22px_rgba(0,0,0,0.6)] bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)]"
      >
        <Filter className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </div>
  );
}