import type { Property, PropertyPurpose, PropertyStatus, PropertyType } from "@/data/properties";
import type { NewsPost } from "@/data/news";

const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID as string | undefined;
const AIRTABLE_TABLE_ID = import.meta.env.VITE_AIRTABLE_TABLE_ID as string | undefined;
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN as string | undefined;

const API_ORIGIN = "https://api.airtable.com/v0";

type AirtableAttachment = { url: string; filename?: string };
type AirtableRecord<TFields> = { id: string; createdTime?: string; fields: TFields };

function requireEnv() {
  if (!AIRTABLE_BASE_ID) throw new Error("Missing VITE_AIRTABLE_BASE_ID");
  if (!AIRTABLE_TABLE_ID) throw new Error("Missing VITE_AIRTABLE_TABLE_ID");
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
  requireEnv();
  const records = await fetchAllRecords<PropertyFields>(AIRTABLE_TABLE_ID!);

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

        carport: toNumber(f.carport),
        roadWidth: toNumber(f.roadWidth),
        powerVa: toNumber(f.powerVa),
        water: toOneOf<NonNullable<Property["water"]>>(f.water, ["PDAM", "Well", "Other"] as const, "Other"),
        furnished: toBool(f.furnished),
        view: toOneOf<NonNullable<Property["view"]>>(
          f.view,
          ["Ocean", "Ricefield", "Jungle", "Garden", "City"] as const,
          "Garden",
        ),

        yearBuilt: toNumber(f.yearBuilt),
        zoning: toText(f.zoning) ?? "",

        ownership: toOneOf<NonNullable<Property["ownership"]>>(f.ownership, ["Freehold", "Leasehold"] as const, "Leasehold"),

        tags: toArrayString(f.tags),

        highlights: toArrayString(f.highlights),
        description: toText(f.description) ?? "",

        images,

        toplist: toBool(f.TOPLIST) ?? false,

        coordinates:

          toNumber(f.lat) != null && toNumber(f.lng) != null
            ? {
                lat: toNumber(f.lat)!,
                lng: toNumber(f.lng)!,
              }
            : undefined,

        legal: {
          checklist,
          notes: toText(f.legalNotes),
        },

        roiProjection:
          roiNightlyRateIdr != null || roiOccupancy != null || roiDisclaimer != null
            ? {
                nightlyRateIdr: roiNightlyRateIdr,
                occupancy: roiOccupancy != null ? roiOccupancy / 100 : undefined,
                disclaimer: roiDisclaimer ?? "",
              }
            : undefined,

        createdAt,
      };

      return p;
    })
    .filter(Boolean) as Property[];
}

type NewsFields = {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  date?: string;
  coverImage?: AirtableAttachment[] | string;
  tags?: string | string[];
};

export async function listAirtableNews(): Promise<NewsPost[]> {
  // Note: this app's NewsPost model is richer than the Airtable fields mapper below.
  // Keep the existing behaviour (or local fallback elsewhere) by returning an empty list for now.
  void (await fetchAllRecords<NewsFields>("News"));
  return [];
}
