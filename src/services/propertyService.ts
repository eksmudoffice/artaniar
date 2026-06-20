import {
  properties as localProperties,
  AREAS as FALLBACK_AREAS,
  type Property,
  type PropertyPurpose,
  type PropertyStatus,
  type PropertyType,
} from "@/data/properties";
import {
  listAirtableProperties,
  listAirtableFeaturedProperties,
  listAirtableAreas,
  type AreaRecord,
} from "@/services/airtable";

import {
  getCachedProperties,
  setCachedProperties,
  getCachedAreas,
  setCachedAreas,
  invalidateCache,
} from "@/services/cache";

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

const includesLoose = (value: string, query: string) =>
  value.toLowerCase().includes(query.trim().toLowerCase());

const parseAdvanced = (
  raw?: string,
): {
  numeric: NumericRule[];
  pool?: PoolRule;
  furnished?: FurnishedRule;
  water?: WaterRule;
  view?: ViewRule;
} => {
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
      water = {
        key: "water",
        value: v === "pdam" ? "PDAM" : v === "well" ? "Well" : "Other",
      };
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

    const m = lower.match(
      /^(land|building|beds|baths|carport|road|power)\s*(>=|<=|=|>|<)\s*(\d+)$/,
    );
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

const CACHE_TTL_MS = 10 * 60 * 1000;

let cached: Property[] | null = null;
let cachedAreas: AreaRecord[] | null = null;
let lastSource: DataSource = "local";
let lastAirtableError: string | null = null;
let lastLoadedAt: number | null = null;

/**
 * Preload promise — pending fetch di-deduplicate supaya
 * dua komponen mount sekaligus tidak trigger double fetch.
 */
let propertiesPreloadPromise: Promise<Property[]> | null = null;

async function loadAreasFromAirtable(): Promise<AreaRecord[]> {
  try {
    const items = await listAirtableAreas();
    cachedAreas = items.length ? items : [];
    setCachedAreas(cachedAreas, "airtable");
    return cachedAreas;
  } catch (e) {
    console.warn(
      "[PropertyService] loadAreas error:",
      e instanceof Error ? e.message : String(e),
    );
    cachedAreas = [];
    return cachedAreas;
  }
}

function isMissingEnv(): boolean {
  const tokenPresent = Boolean(import.meta.env.VITE_AIRTABLE_TOKEN);
  const basePresent = Boolean(import.meta.env.VITE_AIRTABLE_BASE_ID);
  const tableIdPresent = Boolean(import.meta.env.VITE_AIRTABLE_TABLE_ID);
  return !tokenPresent || !basePresent || !tableIdPresent;
}

function useLocalFallback(): Property[] {
  cached = localProperties;
  lastSource = "local";
  lastAirtableError = null;
  lastLoadedAt = Date.now();
  setCachedProperties(cached, "local");
  propertiesPreloadPromise = null;
  return cached;
}

async function loadFreshProperties(): Promise<Property[]> {
  if (isMissingEnv()) {
    return useLocalFallback();
  }

  // Pastikan areas sudah loaded — areas table kecil, callnya cepat
  let areas: AreaRecord[];
  if (cachedAreas != null) {
    areas = cachedAreas;
  } else {
    try {
      areas = await loadAreasFromAirtable();
    } catch {
      areas = [];
    }
  }
  const areaNameById = new Map(areas.map((a) => [a.id, a.name]));

  try {
    const items = await listAirtableProperties(areaNameById);

    cached = items.length ? items : localProperties;
    lastSource = items.length ? "airtable" : "local";
    lastAirtableError = items.length
      ? null
      : "Airtable returned 0 valid records (check required fields: slug, title).";
    lastLoadedAt = Date.now();
    setCachedProperties(cached, lastSource);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    lastAirtableError = msg;
    cached = localProperties;
    lastSource = "local";
    lastLoadedAt = Date.now();
    setCachedProperties(cached, "local");
  }

  propertiesPreloadPromise = null;
  return cached;
}

async function loadAllProperties(force = false): Promise<Property[]> {
  if (!force && cached) return cached;

  // Cek persistent cache (localStorage) — immediate render tanpa wait
  if (!force) {
    const persistent = getCachedProperties<Property>();
    if (persistent) {
      cached = persistent.data;
      lastSource = persistent.source;
      lastLoadedAt = persistent.loadedAt;

      // Stale half-life check: cache > 5 min tapi masih valid (< 10 min)
      // → render cache sekarang, revalidate di background
      const age = Date.now() - persistent.loadedAt;
      if (age > CACHE_TTL_MS / 2 && !propertiesPreloadPromise) {
        propertiesPreloadPromise = loadFreshProperties();
        propertiesPreloadPromise.catch(() => {});
      }
      return cached;
    }
  }

  // Deduplicate: kalau sudah ada promise yang berjalan, piggy-back
  if (propertiesPreloadPromise) {
    return propertiesPreloadPromise;
  }

  propertiesPreloadPromise = loadFreshProperties();
  return propertiesPreloadPromise;
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

  /** Preload data di awal app — call dari module-level atau App.tsx. */
  preload(): Promise<Property[]> {
    if (cached) return Promise.resolve(cached);
    if (propertiesPreloadPromise) return propertiesPreloadPromise;

    propertiesPreloadPromise = loadAllProperties(false);
    return propertiesPreloadPromise;
  },

  async reload() {
    invalidateCache();
    cachedAreas = null;
    cached = null;
    propertiesPreloadPromise = null;
    await loadAllProperties(true);
    return PropertyService.getDebugSnapshot();
  },

  async getAvailableAreas(): Promise<string[]> {
    // Try cached Airtable areas
    if (cachedAreas == null) {
      // Coba dari persistent cache dulu
      const cachedPersist = getCachedAreas();
      if (cachedPersist) {
        cachedAreas = cachedPersist.data;
      } else {
        const tokenPresent = Boolean(import.meta.env.VITE_AIRTABLE_TOKEN);
        const basePresent = Boolean(import.meta.env.VITE_AIRTABLE_BASE_ID);
        const areaTableIdPresent = Boolean(import.meta.env.VITE_AIRTABLE_TABLE_AREA_ID);
        if (tokenPresent && basePresent && areaTableIdPresent) {
          await loadAreasFromAirtable();
        }
      }
    }
    if (cachedAreas && cachedAreas.length > 0) {
      return cachedAreas.map((a) => a.name);
    }
    // Fallback: areas dari data properties yang sudah loaded
    const data = await loadAllProperties(false);
    const fromData = Array.from(
      new Set(data.map((p) => p.location.area).filter(Boolean)),
    );
    return fromData.length ? fromData : Array.from(FALLBACK_AREAS);
  },

  async getPropertyBySlug(slug: string): Promise<Property | null> {
    const data = await loadAllProperties(false);
    return data.find((p) => p.slug === slug || p.code === slug) ?? null;
  },

  async listFeatured(limit = 8) {
    // Fetch featured from Airtable langsung (kecil, cepat) tanpa menunggu full preload.
    if (isMissingEnv()) {
      return localProperties.filter((p) => p.toplist).slice(0, limit);
    }

    if (import.meta.env.DEV) {
      console.log("[PropertyService] listFeatured: fetching from Airtable…");
    }

    // Areas optional: kalau belum ada, coba ambil cepat.
    let areas: AreaRecord[] = cachedAreas ?? [];
    if (!areas.length) {
      const cachedPersist = getCachedAreas();
      if (cachedPersist) areas = cachedPersist.data;
      else {
        try {
          areas = await loadAreasFromAirtable();
        } catch {
          areas = [];
        }
      }
    }

    const areaNameById = new Map(areas.map((a) => [a.id, a.name]));

    try {
      const items = await listAirtableFeaturedProperties(areaNameById, limit);
      if (import.meta.env.DEV) {
        console.log("[PropertyService] listFeatured: Airtable returned", items.length, "items");
        console.log("[PropertyService] listFeatured sample:", items.slice(0, 2));
      }
      return items;
    } catch (e) {
      if (import.meta.env.DEV) {
        console.warn(
          "[PropertyService] listFeatured: Airtable failed, using local fallback:",
          e instanceof Error ? e.message : String(e),
        );
      }
      return localProperties.filter((p) => p.toplist).slice(0, limit);
    }

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

    const step = (_label: string) => () => {
      /* filter steps — debugging suppressed */
    };

    if (search && search.trim()) {
      data = data.filter(
        (p) =>
          includesLoose(p.title, search) ||
          includesLoose(p.location.area, search) ||
          includesLoose(p.code, search),
      );
    }
    step("search")();
    if (type && type !== "All") data = data.filter((p) => p.type === type);
    step("type")();
    if (purpose && purpose !== "All") data = data.filter((p) => p.purpose === purpose);
    step("purpose")();
    if (status && status !== "All") data = data.filter((p) => p.status === status);
    step("status")();
    if (area && area !== "All") data = data.filter((p) => p.location.area === area);
    step("area")();
    if (priceMin != null) data = data.filter((p) => p.price >= priceMin);
    if (priceMax != null) data = data.filter((p) => p.price <= priceMax);
    step("price")();

    if (advanced && advanced.trim()) {
      const rules = parseAdvanced(advanced);
      if (rules.pool) data = data.filter((p) => (p.pool ?? false) === rules.pool!.value);
      if (rules.furnished)
        data = data.filter((p) => (p.furnished ?? false) === rules.furnished!.value);
      if (rules.water) data = data.filter((p) => (p.water ?? "Other") === rules.water!.value);
      if (rules.view) data = data.filter((p) => (p.view ?? "Garden") === rules.view!.value);
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
    step("advanced")();

    if (topOnly) data = data.filter((p) => p.toplist);
    step("topOnly")();

    if (sort === "newest") {
      data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    if (sort === "price_asc") data.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") data.sort((a, b) => b.price - a.price);
    if (sort === "roi_desc") data.sort((a, b) => (b.roi ?? 0) - (a.roi ?? 0));
    step("sort")();

    const total = data.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const items = data.slice(start, start + pageSize);

    return { items, total, totalPages };
  },
};