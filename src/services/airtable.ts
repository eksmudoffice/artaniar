import type { Property, PropertyPurpose, PropertyStatus, PropertyType } from "@/data/properties";
import type { NewsPost } from "@/data/news";

const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID as string | undefined;
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN as string | undefined;

const API_ORIGIN = "https://api.airtable.com/v0";

type AirtableAttachment = { url: string; filename?: string };
type AirtableRecord<TFields> = { id: string; createdTime?: string; fields: TFields };

function requireEnv() {
  if (!AIRTABLE_BASE_ID) throw new Error("Missing VITE_AIRTABLE_BASE_ID");
  if (!AIRTABLE_TOKEN) throw new Error("Missing VITE_AIRTABLE_TOKEN");
}

function authHeaders() {
  requireEnv();
  return {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    "Content-Type": "application/json",
  };
}

async function fetchAllRecords<TFields>(table: string) {
  const records: Array<AirtableRecord<TFields>> = [];
  let offset: string | undefined;

  while (true) {
    const url = new URL(`${API_ORIGIN}/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`);
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url.toString(), { headers: authHeaders() });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Airtable error (${table}): ${res.status} ${text}`);
    }

    const json = (await res.json()) as { records: Array<AirtableRecord<TFields>>; offset?: string };
    records.push(...(json.records ?? []));
    offset = json.offset;
    if (!offset) break;
  }

  return records;
}

function toArrayString(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x)).filter(Boolean);
  if (typeof v === "string") {
    return v
      .split(/\r?\n|,/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function toText(v: unknown): string | undefined {
  if (typeof v === "string") {
    const s = v.trim();
    return s ? s : undefined;
  }
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "true" : "false";

  if (Array.isArray(v)) {
    const s = v
      .map((x) => {
        if (typeof x === "string") return x;
        if (x && typeof x === "object") {
          const anyObj = x as Record<string, unknown>;
          if (typeof anyObj.name === "string") return anyObj.name;
          if (typeof anyObj.value === "string") return anyObj.value;
          if (typeof anyObj.id === "string") return anyObj.id;
        }
        return String(x);
      })
      .map((x) => x.trim())
      .filter(Boolean)
      .join(", ");
    return s ? s : undefined;
  }

  if (v && typeof v === "object") {
    const anyObj = v as Record<string, unknown>;
    if (typeof anyObj.name === "string") return anyObj.name.trim() || undefined;
    if (typeof anyObj.value === "string") return anyObj.value.trim() || undefined;
    if (typeof anyObj.id === "string") return anyObj.id.trim() || undefined;
  }

  return undefined;
}

function toNumber(v: unknown): number | undefined {
  if (typeof v === "number") return Number.isFinite(v) ? v : undefined;
  if (typeof v === "string") {
    const n = Number(v.replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function toBool(v: unknown): boolean | undefined {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["true", "yes", "y", "1"].includes(s)) return true;
    if (["false", "no", "n", "0"].includes(s)) return false;
  }
  return undefined;
}

function toOneOf<T extends string>(v: unknown, allowed: readonly T[], fallback: T): T {
  const s = typeof v === "string" ? (v.trim() as T) : undefined;
  return s && (allowed as readonly string[]).includes(s) ? s : fallback;
}

type PropertyFields = {
  slug?: string;
  code?: string;
  title?: string;
  type?: PropertyType;
  purpose?: PropertyPurpose;
  status?: PropertyStatus;
  city?: unknown;
  area?: unknown;
  price?: number;
  currency?: string;
  ownership?: Property["ownership"];

  TOPLIST?: boolean;

  images?: AirtableAttachment[];

  highlights?: string | string[];
  description?: string;

  roi?: number;
  bedrooms?: number;
  bathrooms?: number;
  landSize?: number;
  buildingSize?: number;
  pool?: boolean;

  carport?: number;
  roadWidth?: number;
  powerVa?: number;
  water?: Property["water"];
  furnished?: boolean;
  view?: Property["view"];

  yearBuilt?: number;
  zoning?: string;

  tags?: string | string[];

  lat?: number;
  lng?: number;

  legalChecklist?: string | string[];
  legalNotes?: string;

  roiNightlyRateIdr?: number;
  roiOccupancy?: number;
  roiDisclaimer?: string;

  createdAt?: string;
};

export async function listAirtableProperties(): Promise<Property[]> {
  const records = await fetchAllRecords<PropertyFields>("Properties");

  return records
    .map((r) => {
      const f = r.fields ?? {};
      const slug = toText(f.slug);
      const title = toText(f.title);

      if (!slug || !title) return null;

      const images = Array.isArray(f.images) ? f.images.map((a) => a?.url).filter(Boolean) : [];

      const checklist = toArrayString(f.legalChecklist);
      const roiNightlyRateIdr = toNumber(f.roiNightlyRateIdr);
      const roiOccupancy = toNumber(f.roiOccupancy);
      const roiDisclaimer = toText(f.roiDisclaimer);

      const createdAt =
        toText(f.createdAt) != null
          ? new Date(toText(f.createdAt)!).toISOString()
          : r.createdTime
            ? new Date(r.createdTime).toISOString()
            : new Date().toISOString();

      const p: Property = {
        id: r.id,
        code: toText(f.code) ?? slug,
        slug,
        title,

        type: toOneOf<PropertyType>(f.type, ["Villa", "Rumah", "Tanah"] as const, "Villa"),
        purpose: toOneOf<PropertyPurpose>(f.purpose, ["Investment", "Residential"] as const, "Investment"),
        location: {
          area: (toText(f.area) || "Bali") as string,
          city: (toText(f.city) || "Bali") as "Bali",
        },

        price: toNumber(f.price) ?? 0,
        currency: "IDR",
        roi: toNumber(f.roi),
        status: toOneOf<PropertyStatus>(f.status, ["Ready", "Off-plan", "Sold"] as const, "Ready"),

        bedrooms: toNumber(f.bedrooms),
        bathrooms: toNumber(f.bathrooms),
        landSize: toNumber(f.landSize),
        buildingSize: toNumber(f.buildingSize),
        pool: toBool(f.pool),

        toplist: Boolean(toBool(f.TOPLIST)),

        carport: toNumber(f.carport),
        roadWidth: toNumber(f.roadWidth),
        powerVa: toNumber(f.powerVa),
        water: toOneOf<NonNullable<Property["water"]>>(f.water, ["PDAM", "Well", "Other"] as const, "Other"),
        furnished: toBool(f.furnished),
        view: toOneOf<NonNullable<Property["view"]>>(f.view, ["Ocean", "Ricefield", "Jungle", "Garden", "City"] as const, "Garden"),

        ownership: toOneOf<Property["ownership"]>(f.ownership, ["Freehold", "Leasehold"] as const, "Leasehold"),
        yearBuilt: toNumber(f.yearBuilt),
        zoning: toText(f.zoning),

        images: images.length ? images : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"],
        highlights: (() => {
          const h = toArrayString(f.highlights);
          return h.length ? h : ["Listing tersedia — minta detail via WhatsApp."];
        })(),
        description: toText(f.description) ?? "Klik WhatsApp untuk info lengkap (availability, detail legal, dan opsi unit serupa).",

        tags: (() => {
          const t = toArrayString(f.tags);
          return t.length ? t : undefined;
        })(),

        coordinates:
          toNumber(f.lat) != null && toNumber(f.lng) != null
            ? { lat: toNumber(f.lat)!, lng: toNumber(f.lng)! }
            : undefined,

        legal: {
          checklist: checklist.length ? checklist : ["Minta dokumen pendukung & pengecekan notaris/ahli Anda."],
          notes: toText(f.legalNotes),
        },

        roiProjection:
          roiNightlyRateIdr != null || roiOccupancy != null || roiDisclaimer
            ? {
                nightlyRateIdr: roiNightlyRateIdr,
                occupancy: roiOccupancy,
                disclaimer:
                  roiDisclaimer ??
                  "Proyeksi ROI bersifat indikatif berdasarkan asumsi pasar dan dapat berubah mengikuti seasonality & strategi pricing.",
              }
            : undefined,

        createdAt,
      };

      return p;
    })
    .filter((x): x is Property => Boolean(x));
}

type NewsFields = {
  slug?: string;
  title?: string;
  excerpt?: string;
  coverImage?: AirtableAttachment[] | string;
  authorName?: string;
  publishedAt?: string;
  tags?: string | string[];
  content?: string;
};

export async function listAirtableNews(): Promise<NewsPost[]> {
  const records = await fetchAllRecords<NewsFields>("News");

  return records
    .map((r) => {
      const f = r.fields ?? {};
      const slug = toText(f.slug);
      const title = toText(f.title);
      if (!slug || !title) return null;

      const cover =
        Array.isArray(f.coverImage)
          ? f.coverImage[0]?.url
          : typeof f.coverImage === "string"
            ? f.coverImage
            : undefined;

      const publishedAt =
        toText(f.publishedAt) != null
          ? new Date(toText(f.publishedAt)!).toISOString()
          : r.createdTime
            ? new Date(r.createdTime).toISOString()
            : new Date().toISOString();

      const text = toText(f.content) ?? "";
      const blocks = text
        ? text
            .split(/\n{2,}/g)
            .map((p) => p.trim())
            .filter(Boolean)
            .map((p) => ({ type: "p" as const, text: p }))
        : [{ type: "p" as const, text: toText(f.excerpt) ?? "" }].filter((b) => b.text);

      const post: NewsPost = {
        id: r.id,
        slug,
        title,
        excerpt: toText(f.excerpt) ?? "",
        content: blocks.length ? blocks : [{ type: "p", text: "" }],
        coverImage:
          cover ??
          "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1800&q=80",
        authorName: toText(f.authorName) ?? "Artaniar Property",
        publishedAt,
        tags: (() => {
          const t = toArrayString(f.tags);
          return t.length ? t : [];
        })(),
      };

      return post;
    })
    .filter((x): x is NewsPost => Boolean(x));
}