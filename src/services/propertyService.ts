import { properties as localProperties, type Property, type PropertyPurpose, type PropertyStatus, type PropertyType } from "@/data/properties";
import { listAirtableProperties } from "@/services/airtable";

export type PropertyQuery = {
  search?: string;
  type?: PropertyType | "All";
  purpose?: PropertyPurpose | "All";
  status?: PropertyStatus | "All";
  area?: string | "All";
  priceMin?: number;
  priceMax?: number;
  advanced?: string; // free text tokens
  sort?: "newest" | "price_asc" | "price_desc" | "roi_desc";
  topOnly?: boolean;
  page?: number;
  pageSize?: number;
};

type Op = ">" | ">=" | "<" | "<=" | "=";

type NumericKey = "land" | "building" | "beds" | "baths" | "carport" | "road" | "power";
type NumericRule = { key: NumericKey; op: Op; value: number };

type PoolRule = { key: "pool"; value: boolean };
type FurnishedRule = { key: "furnished"; value: boolean };
type WaterRule = { key: "water"; value: NonNullable<Property["water"]> };
type ViewRule = { key: "view"; value: NonNullable<Property["view"]> };

const includesLoose = (value: string, query: string) => value.toLowerCase().includes(query.trim().toLowerCase());

const parseAdvanced = (
  raw?: string,
): { numeric: NumericRule[]; pool?: PoolRule; furnished?: FurnishedRule; water?: WaterRule; view?: ViewRule } => {
  if (!raw) return { numeric: [] };
  const tokens = raw
    .split(/[\s,;]+/g)
    .map((t) => t.trim())
    .filter(Boolean);

  const numeric: NumericRule[] = [];
  let pool: PoolRule | undefined;
  let furnished: FurnishedRule | undefined;
  let water: WaterRule | undefined;
  let view: ViewRule | undefined;

  for (const token of tokens) {
    const lower = token.toLowerCase();

    if (lower === "pool") {
      pool = { key: "pool", value: true };
      continue;
    }
    if (lower === "nopool" || lower === "no-pool") {
      pool = { key: "pool", value: false };
      continue;
    }

    if (lower === "furnished") {
      furnished = { key: "furnished", value: true };
      continue;
    }
    if (lower === "unfurnished") {
      furnished = { key: "furnished", value: false };
      continue;
    }

    const waterMatch = lower.match(/^water\s*=\s*(pdam|well|other)$/);
    if (waterMatch) {
      const v = waterMatch[1];
      water = { key: "water", value: v === "pdam" ? "PDAM" : v === "well" ? "Well" : "Other" };
      continue;
    }

    const viewMatch = lower.match(/^view\s*=\s*(ocean|ricefield|jungle|garden|city)$/);
    if (viewMatch) {
      const v = viewMatch[1];
      const map: Record<string, NonNullable<Property["view"]>> = {
        ocean: "Ocean",
        ricefield: "Ricefield",
        jungle: "Jungle",
        garden: "Garden",
        city: "City",
      };
      view = { key: "view", value: map[v] };
      continue;
    }

    const m = lower.match(/^(land|building|beds|baths|carport|road|power)\s*(>=|<=|=|>|<)\s*(\d+)$/);
    if (!m) continue;

    const key = m[1] as NumericRule["key"];
    const op = m[2] as Op;
    const value = Number(m[3]);
    if (!Number.isFinite(value)) continue;

    numeric.push({ key, op, value });
  }

  return { numeric, pool, furnished, water, view };
};

const compareOp = (left: number, op: Op, right: number) => {
  if (op === ">") return left > right;
  if (op === ">=") return left >= right;
  if (op === "<") return left < right;
  if (op === "<=") return left <= right;
  return left === right;
};

type DataSource = "airtable" | "local";

let cached: Property[] | null = null;
let lastSource: DataSource = "local";
let lastAirtableError: string | null = null;
let lastLoadedAt: number | null = null;

async function loadAllProperties(force = false): Promise<Property[]> {
  if (!force && cached) return cached;

  const tokenPresent = Boolean(import.meta.env.VITE_AIRTABLE_TOKEN);
  const basePresent = Boolean(import.meta.env.VITE_AIRTABLE_BASE_ID);
  const tableIdPresent = Boolean(import.meta.env.VITE_AIRTABLE_TABLE_ID);

  if (!tokenPresent || !basePresent || !tableIdPresent) {
    cached = localProperties;
    lastSource = "local";
    lastAirtableError = null;
    lastLoadedAt = Date.now();
    return cached;
  }

  try {
    const items = await listAirtableProperties();
    cached = items.length ? items : localProperties;
    lastSource = items.length ? "airtable" : "local";
    lastAirtableError = items.length ? null : "Airtable returned 0 valid records (check required fields: slug, title).";
    lastLoadedAt = Date.now();
    return cached;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    lastAirtableError = msg;
    cached = localProperties;
    lastSource = "local";
    lastLoadedAt = Date.now();
    return cached;
  }
}

export const PropertyService = {
  getDebugSnapshot() {
    const tokenPresent = Boolean(import.meta.env.VITE_AIRTABLE_TOKEN);
    const basePresent = Boolean(import.meta.env.VITE_AIRTABLE_BASE_ID);
    const tableIdPresent = Boolean(import.meta.env.VITE_AIRTABLE_TABLE_ID);

    return {
      airtable: {
        baseIdPresent: basePresent,
        tableIdPresent,
        tokenPresent,
        enabled: tokenPresent && basePresent && tableIdPresent,
        lastError: lastAirtableError,
      },
      cache: {
        loaded: Boolean(cached),
        count: cached?.length ?? 0,
        source: lastSource,
        loadedAt: lastLoadedAt,
      },
    };
  },

  async reload() {
    await loadAllProperties(true);
    return PropertyService.getDebugSnapshot();
  },

  async listProperties(query: PropertyQuery) {
    const {
      search,
      type,
      purpose,
      status,
      area,
      priceMin,
      priceMax,
      advanced,
      sort = "newest",
      topOnly = false,
      page = 1,
      pageSize = 9,
    } = query;

    let data = [...(await loadAllProperties(false))];

    if (search && search.trim()) {
      data = data.filter(
        (p) => includesLoose(p.title, search) || includesLoose(p.location.area, search) || includesLoose(p.code, search),
      );
    }

    if (type && type !== "All") data = data.filter((p) => p.type === type);
    if (purpose && purpose !== "All") data = data.filter((p) => p.purpose === purpose);
    if (status && status !== "All") data = data.filter((p) => p.status === status);
    if (area && area !== "All") data = data.filter((p) => p.location.area === area);

    if (priceMin != null) data = data.filter((p) => p.price >= priceMin);
    if (priceMax != null) data = data.filter((p) => p.price <= priceMax);

    if (advanced && advanced.trim()) {
      const rules = parseAdvanced(advanced);

      if (rules.pool) {
        data = data.filter((p) => (p.pool ?? false) === rules.pool!.value);
      }

      if (rules.furnished) {
        data = data.filter((p) => (p.furnished ?? false) === rules.furnished!.value);
      }

      if (rules.water) {
        data = data.filter((p) => (p.water ?? "Other") === rules.water!.value);
      }

      if (rules.view) {
        data = data.filter((p) => (p.view ?? "Garden") === rules.view!.value);
      }

      for (const rule of rules.numeric) {
        data = data.filter((p) => {
          const left =
            rule.key === "land"
              ? p.landSize
              : rule.key === "building"
                ? p.buildingSize
                : rule.key === "beds"
                  ? p.bedrooms
                  : rule.key === "baths"
                    ? p.bathrooms
                    : rule.key === "carport"
                      ? p.carport
                      : rule.key === "road"
                        ? p.roadWidth
                        : p.powerVa;

          if (left == null) return false;
          return compareOp(left, rule.op, rule.value);
        });
      }
    }

    if (topOnly) data = data.filter((p) => p.toplist);

    if (sort === "newest") data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (sort === "price_asc") data.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") data.sort((a, b) => b.price - a.price);
    if (sort === "roi_desc") data.sort((a, b) => (b.roi ?? 0) - (a.roi ?? 0));

    const total = data.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const items = data.slice(start, start + pageSize);

    return { items, total, totalPages };
  },
};
