/**
 * Artaniar — Persistent cache with TTL (separate keys per data type)
 *
 * Design: "stale-while-revalidate"
 * 1. Render cache yang ada (sekejap)
 * 2. Background fetch untuk refresh data
 * 3. Next load ambil dari cache yang sudah refreshed
 */

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/** bump jika schema berubah supaya cache lama invalidate otomatis */
const SCHEMA_VERSION = 1;

function isExpired(timestamp: number): boolean {
  return Date.now() - timestamp > CACHE_TTL_MS;
}

function readKey<T>(key: string): { data: T; loadedAt: number; source: "airtable" | "local"; version: number } | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { data: T; loadedAt: number; source: "airtable" | "local"; version: number };
    if (parsed.version !== SCHEMA_VERSION) return null;
    if (isExpired(parsed.loadedAt)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeKey<T>(key: string, data: T, source: "airtable" | "local"): void {
  try {
    localStorage.setItem(key, JSON.stringify({ data, loadedAt: Date.now(), source, version: SCHEMA_VERSION }));
  } catch {
    // localStorage quota / private mode — silent fail, fallback di memory cache tetap jalan
  }
}

function removeKey(key: string): void {
  localStorage.removeItem(key);
}

// ---- Properties ----

const PROP_KEY = "artaniar::properties";

export function setCachedProperties<T>(data: T[], source: "airtable" | "local"): void {
  writeKey(PROP_KEY, data, source);
}

export function getCachedProperties<T>(): { data: T[]; source: "airtable" | "local"; loadedAt: number } | null {
  const entry = readKey<T[]>(PROP_KEY);
  if (!entry) return null;
  return { data: entry.data, source: entry.source, loadedAt: entry.loadedAt };
}

// ---- Areas ----

const AREA_KEY = "artaniar::areas";

export function setCachedAreas(data: { id: string; name: string }[], source: "airtable" | "local"): void {
  writeKey(AREA_KEY, data, source);
}

export function getCachedAreas(): { data: { id: string; name: string }[]; source: "airtable" | "local"; loadedAt: number } | null {
  const entry = readKey<{ id: string; name: string }[]>(AREA_KEY);
  if (!entry) return null;
  return { data: entry.data, source: entry.source, loadedAt: entry.loadedAt };
}

// ---- News ----

const NEWS_KEY = "artaniar::news";

export function setCachedNews<T>(data: T[], source: "airtable" | "local"): void {
  writeKey(NEWS_KEY, data, source);
}

export function getCachedNews<T>(): { data: T[]; source: "airtable" | "local"; loadedAt: number } | null {
  const entry = readKey<T[]>(NEWS_KEY);
  if (!entry) return null;
  return { data: entry.data, source: entry.source, loadedAt: entry.loadedAt };
}

// ---- Global invalidate ----

export function invalidateCache(): void {
  removeKey(PROP_KEY);
  removeKey(AREA_KEY);
  removeKey(NEWS_KEY);
}
