import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type AirtableStatus = {
  airtable: {
    baseIdPresent: boolean;
    tokenPresent: boolean;
    enabled: boolean;
    lastError: string | null;
  };
  cache: {
    loaded: boolean;
    count: number;
    source: "airtable" | "local";
    loadedAt: number | null;
  };
};

function formatTime(ts: number | null) {
  if (!ts) return "-";
  const d = new Date(ts);
  return new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(d);
}

export default function AirtableStatusCard({
  value,
  className,
}: {
  value: AirtableStatus;
  className?: string;
}) {
  const ok = value.airtable.enabled && value.cache.source === "airtable" && value.cache.count > 0;

  return (
    <Card
      className={cn(
        "rounded-3xl border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-5 shadow-[0_18px_60px_-50px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-serif text-xl">Airtable Status</div>
          <div className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.72)]">
            Sumber data saat ini:{" "}
            <span className={cn("font-semibold", value.cache.source === "airtable" ? "text-[hsl(var(--brand-accent))]" : "")}>
              {value.cache.source.toUpperCase()}
            </span>
          </div>
        </div>

        <div
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold border",
            ok
              ? "bg-[hsl(var(--brand-accent))] text-[hsl(var(--brand-accent-foreground))] border-transparent"
              : "bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border-[hsl(var(--brand-ink)/0.12)]",
          )}
        >
          {ok ? "OK" : "CHECK"}
        </div>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-[hsl(var(--brand-ink)/0.78)]">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[hsl(var(--brand-ink)/0.10)] bg-[hsl(var(--brand-surface-2))] p-3">
            <div className="text-[11px] text-[hsl(var(--brand-ink)/0.62)]">Env present</div>
            <div className="mt-1 font-semibold">
              Base ID: {value.airtable.baseIdPresent ? "Yes" : "No"} • Token: {value.airtable.tokenPresent ? "Yes" : "No"}
            </div>
          </div>

          <div className="rounded-2xl border border-[hsl(var(--brand-ink)/0.10)] bg-[hsl(var(--brand-surface-2))] p-3">
            <div className="text-[11px] text-[hsl(var(--brand-ink)/0.62)]">Cache</div>
            <div className="mt-1 font-semibold">
              {value.cache.loaded ? "Loaded" : "Not loaded"} • {value.cache.count} items
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/60 p-3">
          <div className="text-[11px] text-[hsl(var(--brand-ink)/0.62)]">Last loaded</div>
          <div className="mt-1 font-semibold">{formatTime(value.cache.loadedAt)}</div>
        </div>

        {value.airtable.enabled && value.airtable.lastError ? (
          <div className="rounded-2xl border border-[hsl(var(--brand-accent))]/30 bg-[hsl(var(--brand-accent))]/10 p-3">
            <div className="text-[11px] font-semibold text-[hsl(var(--brand-ink))]">Airtable error</div>
            <div className="mt-1 text-xs text-[hsl(var(--brand-ink)/0.75)] leading-relaxed break-words">
              {value.airtable.lastError}
            </div>
          </div>
        ) : null}

        <div className="text-[11px] text-[hsl(var(--brand-ink)/0.62)] leading-relaxed">
          Catatan: panel ini tidak menampilkan token. Kalau source masih LOCAL padahal env sudah ada, biasanya karena table/field mismatch atau Airtable 401/403.
        </div>
      </div>
    </Card>
  );
}