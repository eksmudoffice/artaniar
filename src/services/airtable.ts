import type {
  Property,
  PropertyPurpose,
  PropertyStatus,
  PropertyType,
} from "@/data/properties";
import type { NewsPost } from "@/data/news";

const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID as string | undefined;
const AIRTABLE_TABLE_ID = import.meta.env.VITE_AIRTABLE_TABLE_ID as string | undefined;
const AIRTABLE_TABLE_AREA_ID = import.meta.env.VITE_AIRTABLE_TABLE_AREA_ID as string | undefined;
const AIRTABLE_TABLE_NEWS_ID = import.meta.env.VITE_AIRTABLE_TABLE_NEWS_ID as string | undefined;
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN as string | undefined;

const API_ORIGIN = "https://api.airtable.com/v0";
const MAX_AIRTABLE_PAGES = 20;

type AirtableAttachment = {
  url: string;
  filename?: string;
  thumbnails?: {
    small?: { url: string };
    large?: { url: string };
    full?: { url: string };
  };
};
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

async function fetchAllRecords<TFields>(
  table: string,
  opts?: {
    maxRecords?: number;
    filterByFormula?: string;
    sort?: Array<{ field: string; direction?: "asc" | "desc" }>;
  },
) {
  const records: Array<AirtableRecord<TFields>> = [];
  let offset: string | undefined;
  let page = 0;

  while (true) {
    page += 1;
    if (page > MAX_AIRTABLE_PAGES) break;

    const url = new URL(`${API_ORIGIN}/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`);
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    if (opts?.maxRecords != null) url.searchParams.set("maxRecords", String(opts.maxRecords));
    if (opts?.filterByFormula) url.searchParams.set("filterByFormula", opts.filterByFormula);
    if (opts?.sort?.length) {
      for (const [i, s] of opts.sort.entries()) {
        url.searchParams.set(`sort[${i}][field]`, s.field);
        if (s.direction) url.searchParams.set(`sort[${i}][direction]`, s.direction);
      }
    }

    const res = await fetch(url.toString(), { headers: authHeaders() });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Airtable error (${table}): ${res.status} ${text}`);
    }

    const json = (await res.json()) as {
      records: Array<AirtableRecord<TFields>>;
      offset?: string;
    };
    records.push(...(json.records ?? []));

    // Stop conditions
    if (opts?.maxRecords != null && records.length >= opts.maxRecords) {
      return records.slice(0, opts.maxRecords);
    }

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

function toIsoDate(v: unknown): string | undefined {
  const s = toText(v);
  if (!s) return undefined;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function getField(f: Record<string, unknown>, ...keys: string[]): unknown {
  for (const key of keys) {
    // exact
    if (key in f) return f[key];
    // case-insensitive
    const ciKey = Object.keys(f).find((k) => k.toLowerCase() === key.toLowerCase());
    if (ciKey != null) return f[ciKey];
  }
  return undefined;
}

function getAllFields(raw: Record<string, unknown>): Record<string, unknown> {
  // Build a case-insensitive flat map
  const flat: Record<string, unknown> = { ...raw };
  for (const [k, v] of Object.entries(raw)) {
    // hyphenated / slugified variants
    const slug = k.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!(slug in flat)) flat[slug] = v;
  }
  return flat;
}

function normalizeKey(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[_/]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[–—-]/g, "-");
}

function normalizeType(v: unknown): PropertyType {
  const s = toText(v);
  if (!s) return "Villa";
  const k = normalizeKey(s);
  if (["villa"].includes(k)) return "Villa";
  if (["rumah", "house", "home"].includes(k)) return "Rumah";
  if (["tanah", "land", "plot"].includes(k)) return "Tanah";
  return "Villa";
}

function normalizePurpose(v: unknown): PropertyPurpose {
  const s = toText(v);
  if (!s) return "Investment";
  const k = normalizeKey(s);
  if (["investment", "invest", "inv"].includes(k)) return "Investment";
  if (["residential", "residence", "living", "home"].includes(k)) return "Residential";
  return "Investment";
}

function normalizeStatus(v: unknown): PropertyStatus {
  const s = toText(v);
  if (!s) return "Ready";
  const k = normalizeKey(s);
  if (["ready", "available"].includes(k)) return "Ready";
  if (["off-plan", "offplan", "off plan", "pre-sale", "presale"].includes(k)) return "Off-plan";
  if (["sold", "closed"].includes(k)) return "Sold";
  return "Ready";
}

function normalizeOwnership(v: unknown): Property["ownership"] {
  const s = toText(v);
  if (!s) return "Leasehold";
  const k = normalizeKey(s);
  if (["freehold", "shm", "hak milik"].includes(k)) return "Freehold";
  if (["leasehold", "lease", "hgb", "hak guna"].includes(k)) return "Leasehold";
  return "Leasehold";
}

function normalizeWater(v: unknown): NonNullable<Property["water"]> {
  const s = toText(v);
  if (!s) return "Other";
  const k = normalizeKey(s);
  if (["pdam"].includes(k)) return "PDAM";
  if (["well", "sumur", "borewell", "bore well"].includes(k)) return "Well";
  return "Other";
}

function normalizeView(v: unknown): NonNullable<Property["view"]> {
  const s = toText(v);
  if (!s) return "Garden";
  const k = normalizeKey(s);
  if (["ocean", "sea", "ocean view", "sea view"].includes(k)) return "Ocean";
  if (["ricefield", "rice field", "sawah"].includes(k)) return "Ricefield";
  if (["jungle", "forest"].includes(k)) return "Jungle";
  if (["garden", "pool", "green"].includes(k)) return "Garden";
  if (["city", "urban"].includes(k)) return "City";
  return "Garden";
}

export type AreaRecord = {
  id: string;
  name: string;
};

type AreaFields = {
  Name?: string;
  name?: string;
  Nama?: string;
  nama?: string;
};

type PropertyFields = {
  slug?: string;
  code?: string;
  title?: string;

  // Location
  area?: unknown;
  areaName?: unknown;
  city?: unknown;
  Area?: unknown; // linked record to Area table

  price?: unknown;
  currency?: unknown;

  images?: AirtableAttachment[];

  TOPLIST?: unknown;

  status?: unknown;
  type?: unknown;
  purpose?: unknown;

  roi?: unknown;
  bedrooms?: unknown;
  bathrooms?: unknown;
  landSize?: unknown;
  buildingSize?: unknown;
  pool?: unknown;
  carport?: unknown;
  roadWidth?: unknown;
  powerVa?: unknown;
  water?: unknown;
  furnished?: unknown;
  view?: unknown;
  yearBuilt?: unknown;
  ownership?: unknown;

  tags?: unknown;
  highlights?: unknown;
  description?: unknown;

  lat?: unknown;
  lng?: unknown;
  Ing?: unknown; // seen as a possible typo

  legalChecklist?: unknown;
  legalNotes?: unknown;

  roiNightlyRateIdr?: unknown;
  roiOccupancy?: unknown;
  roiDisclaimer?: unknown;

  createdAt?: unknown;
};

function resolveLinkedAreaName(rawField: unknown, nameById: Map<string, string>): string | undefined {
  // Airtable linked record: array of objects with .id, or array of plain record ids
  if (Array.isArray(rawField)) {
    for (const item of rawField) {
      if (item && typeof item === "object") {
        const anyItem = item as Record<string, unknown>;
        // case 1: array of { id: "recXXX", ... } (expanded linked records from lookup)
        if (typeof anyItem.id === "string") {
          const resolved = nameById.get(anyItem.id);
          if (resolved) return resolved;
        }
        // case 2: array of { name: "..." }
        if (typeof anyItem.name === "string") return anyItem.name;
      }
      // case 3: array of plain strings (record ids)
      if (typeof item === "string") {
        const resolved = nameById.get(item);
        if (resolved) return resolved;
      }
    }
  }
  return undefined;
}

function pickThumbUrl(a: AirtableAttachment | undefined): string | undefined {
  if (!a) return undefined;
  return a.thumbnails?.large?.url || a.thumbnails?.full?.url || a.url;
}

export async function listAirtableAreas(): Promise<AreaRecord[]> {
  const baseId = AIRTABLE_BASE_ID;
  const tableId = AIRTABLE_TABLE_AREA_ID;
  const token = AIRTABLE_TOKEN;
  if (!baseId || !tableId || !token) return [];

  try {
    const records = await fetchAllRecords<AreaFields>(tableId);
    return records
      .map((r) => {
        const f = getAllFields(r.fields ?? {});
        const name = toText(f.Name) || toText(f.name) || toText(f.Nama) || toText(f.nama);
        if (!name) return null;
        return { id: r.id, name };
      })
      .filter(Boolean) as AreaRecord[];
  } catch (e) {
    console.warn("[Airtable] failed to load areas:", e instanceof Error ? e.message : String(e));
    return [];
  }
}

export async function listAirtableProperties(nameByAreaId?: Map<string, string>): Promise<Property[]> {
  requireEnv();
  const records = await fetchAllRecords<PropertyFields>(AIRTABLE_TABLE_ID!);
  const areaMap = nameByAreaId && nameByAreaId.size > 0 ? nameByAreaId : null;

  let missingCount = 0;
  const result = records
    .map((r) => {
      const f = getAllFields(r.fields ?? {});
      const slug =
        toText(f.slug) ??
        toText(f.name) ??
        toText(f.title) ??
        toText(f.projectname) ??
        toText(f.projecttitle) ??
        toText(f.id);
      const title =
        toText(f.title) ??
        toText(f.name) ??
        toText(f.projecttitle) ??
        toText(f.projectname) ??
        toText(f.id);

      if (!slug || !title) {
        missingCount++;
        return null;
      }

      const imagesFull = Array.isArray(f.images) ? f.images.map((a) => a?.url).filter(Boolean) : [];
      const imagesThumb = Array.isArray(f.images) ? f.images.map((a) => pickThumbUrl(a)).filter(Boolean) : [];

      const checklist = toArrayString(f.legalChecklist);
      const roiNightlyRateIdr = toNumber(f.roiNightlyRateIdr);
      const roiOccupancy = toNumber(f.roiOccupancy);
      const roiDisclaimer = toText(f.roiDisclaimer);

      const createdAt =
        toIsoDate(f.createdAt) ??
        (r.createdTime ? new Date(r.createdTime).toISOString() : new Date().toISOString());

      const lat = toNumber(f.lat);
      const lng = toNumber(f.lng ?? f.Ing);

      let area: string | undefined;
      if (areaMap) {
        area =
          resolveLinkedAreaName(getField(f, "Area"), areaMap) ||
          toText(getField(f, "areaName")) ||
          toText(getField(f, "area"));
      }
      area = area ?? (toText(getField(f, "areaName")) || toText(getField(f, "area")) || "Bali");

      const p: Property = {
        id: r.id,
        code: toText(f.code) ?? slug,
        slug,
        title,

        type: normalizeType(f.type),
        purpose: normalizePurpose(f.purpose),
        location: {
          area,
          city: (toText(f.city) || "Bali") as "Bali",
        },

        price: toNumber(f.price) ?? 0,
        currency: "IDR",
        roi: toNumber(f.roi),
        status: normalizeStatus(f.status),

        bedrooms: toNumber(f.bedrooms),
        bathrooms: toNumber(f.bathrooms),
        landSize: toNumber(f.landSize),
        buildingSize: toNumber(f.buildingSize),
        pool: toBool(f.pool),

        carport: toNumber(f.carport),
        roadWidth: toNumber(f.roadWidth),
        powerVa: toNumber(f.powerVa),
        water: normalizeWater(f.water),
        furnished: toBool(f.furnished),
        view: normalizeView(f.view),

        yearBuilt: toNumber(f.yearBuilt),
        zoning: "",

        ownership: normalizeOwnership(f.ownership),

        tags: toArrayString(f.tags),

        highlights: toArrayString(f.highlights),
        description: toText(f.description) ?? "",

        images: imagesFull,
        imagesThumb: imagesThumb.length ? imagesThumb : imagesFull,

        toplist: toBool(f.toplist ?? f.TOPLIST) ?? false,

        coordinates: lat != null && lng != null ? { lat, lng } : undefined,

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

  if (missingCount > 0) {
    // debugging suppressed
  }
  return result;
}

export async function listAirtableFeaturedProperties(
  nameByAreaId?: Map<string, string>,
  limit = 8,
): Promise<Property[]> {

  requireEnv();
  const records = await fetchAllRecords<PropertyFields>(AIRTABLE_TABLE_ID!, {
    maxRecords: limit,
    // TOPLIST adalah nama field yang kita mapping ke p.toplist
    // Jangan set sort: nama field di Airtable sering beda (bisa bikin 422 dan hasil kosong)
    filterByFormula: "OR({TOPLIST}=TRUE(), {toplist}=TRUE())",
  });
  const areaMap = nameByAreaId && nameByAreaId.size > 0 ? nameByAreaId : null;

  let missingCount = 0;
  const result = records
    .map((r) => {
      const f = getAllFields(r.fields ?? {});
      const slug =
        toText(f.slug) ??
        toText(f.name) ??
        toText(f.title) ??
        toText(f.projectname) ??
        toText(f.projecttitle) ??
        toText(f.id);
      const title =
        toText(f.title) ??
        toText(f.name) ??
        toText(f.projecttitle) ??
        toText(f.projectname) ??
        toText(f.id);

      if (!slug || !title) {
        missingCount++;
        return null;
      }

      const imagesFull = Array.isArray(f.images) ? f.images.map((a) => a?.url).filter(Boolean) : [];
      const imagesThumb = Array.isArray(f.images) ? f.images.map((a) => pickThumbUrl(a)).filter(Boolean) : [];

      const checklist = toArrayString(f.legalChecklist);
      const roiNightlyRateIdr = toNumber(f.roiNightlyRateIdr);
      const roiOccupancy = toNumber(f.roiOccupancy);
      const roiDisclaimer = toText(f.roiDisclaimer);

      const createdAt = toIsoDate(f.createdAt) ?? (r.createdTime ? new Date(r.createdTime).toISOString() : new Date().toISOString());

      const lat = toNumber(f.lat);
      const lng = toNumber(f.lng ?? f.Ing);

      // Resolve area: try linked table first (case-sensitive "Area" for linked field,
      // case-insensitive "area" for any text/lookup field), then inline fields
      let area: string | undefined;
      if (areaMap) {
        area =
          resolveLinkedAreaName(getField(f, "Area"), areaMap) ||
          toText(getField(f, "areaName")) ||
          toText(getField(f, "area"));
      }
      area = area ?? (toText(getField(f, "areaName")) || toText(getField(f, "area")) || "Bali");

      const p: Property = {
        id: r.id,
        code: toText(f.code) ?? slug,
        slug,
        title,

        type: normalizeType(f.type),
        purpose: normalizePurpose(f.purpose),
        location: {
          area,
          city: (toText(f.city) || "Bali") as "Bali",
        },

        price: toNumber(f.price) ?? 0,
        currency: "IDR",
        roi: toNumber(f.roi),
        status: normalizeStatus(f.status),

        bedrooms: toNumber(f.bedrooms),
        bathrooms: toNumber(f.bathrooms),
        landSize: toNumber(f.landSize),
        buildingSize: toNumber(f.buildingSize),
        pool: toBool(f.pool),

        carport: toNumber(f.carport),
        roadWidth: toNumber(f.roadWidth),
        powerVa: toNumber(f.powerVa),
        water: normalizeWater(f.water),
        furnished: toBool(f.furnished),
        view: normalizeView(f.view),

        yearBuilt: toNumber(f.yearBuilt),
        zoning: "",

        ownership: normalizeOwnership(f.ownership),

        tags: toArrayString(f.tags),

        highlights: toArrayString(f.highlights),
        description: toText(f.description) ?? "",

        images: imagesFull,
        imagesThumb: imagesThumb.length ? imagesThumb : imagesFull,

        toplist: toBool(f.toplist ?? f.TOPLIST) ?? false,

        coordinates: lat != null && lng != null ? { lat, lng } : undefined,

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

  if (missingCount > 0) {
    // debugging suppressed
  }
  return result;
}

type NewsFields = {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  date?: string;
  coverImage?: AirtableAttachment[] | string;
  tags?: string | string[];
  authorName?: string;
};

type ContentBlock = NewsPost["content"][number];

function parseContentFromText(raw?: string): ContentBlock[] {
  if (!raw) return [{ type: "p", text: "" }];

  const blocks: ContentBlock[] = [];
  const lines = raw.split(/\r?\n/);
  let currentList: string[] | null = null;

  const flushList = () => {
    if (currentList && currentList.length > 0) {
      blocks.push({ type: "ul", items: currentList });
      currentList = null;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }

    // h2: "## Heading" or "-- Heading" or lines that look like headings
    if (/^#{2,}\s*/.test(trimmed)) {
      flushList();
      blocks.push({ type: "h2", text: trimmed.replace(/^#{2,}\s*/, "") });
      continue;
    }

    if (/^-\s+/.test(trimmed)) {
      if (!currentList) currentList = [];
      currentList.push(trimmed.replace(/^-\s+/, ""));
      continue;
    }

    if (/^\*\s+/.test(trimmed)) {
      if (!currentList) currentList = [];
      currentList.push(trimmed.replace(/^\*\s+/, ""));
      continue;
    }

    // numbered list
    if (/^\d+\.\s+/.test(trimmed)) {
      if (!currentList) currentList = [];
      currentList.push(trimmed.replace(/^\d+\.\s+/, ""));
      continue;
    }

    flushList();
    blocks.push({ type: "p", text: trimmed });
  }

  flushList();

  // If no blocks were produced, return a single paragraph with the raw text
  if (blocks.length === 0) {
    return [{ type: "p", text: raw }];
  }

  return blocks;
}

export async function listAirtableNews(): Promise<NewsPost[]> {
  const baseId = AIRTABLE_BASE_ID;
  const tableId = AIRTABLE_TABLE_NEWS_ID;
  const token = AIRTABLE_TOKEN;
  if (!baseId || !tableId || !token) return [];

  try {
    const records = await fetchAllRecords<NewsFields>(tableId);
    let skipped = 0;

    const result = records
      .map((r): NewsPost | null => {
        const f = getAllFields(r.fields ?? {});
        const slug = toText(f.slug);
        const title = toText(f.title);

        if (!slug || !title) {
          skipped++;
          return null;
        }

        // Parse cover image: Airtable attachment or URL string
        let coverImage = "";
        const ci = f.coverImage;
        if (Array.isArray(ci)) {
          coverImage = ci[0]?.url ?? "";
        } else {
          coverImage = toText(ci) ?? "";
        }

        const tags = toArrayString(f.tags);
        const contentText = toText(f.content) ?? "";
        const publishedAt =
          toIsoDate(f.date) ?? (r.createdTime ? new Date(r.createdTime).toISOString() : new Date().toISOString());

        return {
          id: r.id,
          slug,
          title,
          excerpt: toText(f.excerpt) ?? "",
          content: parseContentFromText(contentText),
          coverImage,
          authorName: toText(f.authorName) ?? "Artaniar Property",
          publishedAt,
          tags,
        };
      })
      .filter(Boolean) as NewsPost[];

    // Sort newest first
    result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return result;
  } catch (e) {
    console.warn("[Airtable News] failed to load:", e instanceof Error ? e.message : String(e));
    return [];
  }
}