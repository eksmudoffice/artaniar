export type WhatsAppMessageContext = {
  propertyTitle?: string;
  listingCode?: string;
  location?: string;
  budgetIdr?: { min?: number; max?: number };
  intent?: "Minta video" | "Cek ketersediaan" | "Negosiasi" | "Konsultasi";
};

const formatIdrCompact = (value: number) => {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, "")} M`;
  if (abs >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(0)} jt`;
  return `Rp ${value.toLocaleString("id-ID")}`;
};

export const buildWhatsAppMessage = (ctx: WhatsAppMessageContext) => {
  const lines: string[] = [];
  lines.push("Halo Artaniar,");

  if (ctx.intent) lines.push(`Saya ingin *${ctx.intent}*.`);

  if (ctx.propertyTitle) {
    lines.push(
      `Saya tertarik dengan: *${ctx.propertyTitle}*${ctx.listingCode ? ` (Kode: ${ctx.listingCode})` : ""}.`,
    );
  }

  if (ctx.location) lines.push(`Preferensi area: ${ctx.location}.`);

  if (ctx.budgetIdr?.min || ctx.budgetIdr?.max) {
    const min = ctx.budgetIdr.min ? formatIdrCompact(ctx.budgetIdr.min) : undefined;
    const max = ctx.budgetIdr.max ? formatIdrCompact(ctx.budgetIdr.max) : undefined;
    lines.push(`Perkiraan budget: ${min ?? "-"} – ${max ?? "-"}.`);
  }

  lines.push("Mohon informasikan apakah unit ini masih tersedia.");
  return lines.join("\n");
};

export const buildWhatsAppUrl = ({
  phone,
  message,
  utm,
}: {
  phone: string; // ex: 628123...
  message: string;
  utm?: Record<string, string>;
}) => {
  const base = `https://wa.me/${encodeURIComponent(phone)}`;
  const params = new URLSearchParams();
  params.set("text", message);

  if (utm) {
    const utmString = Object.entries(utm)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
    params.set("utm", utmString);
  }

  return `${base}?${params.toString()}`;
};