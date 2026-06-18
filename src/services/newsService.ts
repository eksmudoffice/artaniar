import { newsPosts as localNews, type NewsPost } from "@/data/news";
import { listAirtableNews } from "@/services/airtable";
import { getCachedNews, setCachedNews, invalidateCache } from "@/services/cache";

type DataSource = "airtable" | "local";

const CACHE_TTL_MS = 10 * 60 * 1000;

let cached: NewsPost[] | null = null;
let lastSource: DataSource = "local";
let lastAirtableError: string | null = null;
let lastLoadedAt: number | null = null;

/** Deduplicate concurrent fetch */
let newsPreloadPromise: Promise<NewsPost[]> | null = null;

function useLocalFallback(): NewsPost[] {
  cached = localNews;
  lastSource = "local";
  lastAirtableError = null;
  lastLoadedAt = Date.now();
  setCachedNews(cached, "local");
  newsPreloadPromise = null;
  return cached;
}

async function loadFreshNews(): Promise<NewsPost[]> {
  const tokenPresent = Boolean(import.meta.env.VITE_AIRTABLE_TOKEN);
  const basePresent = Boolean(import.meta.env.VITE_AIRTABLE_BASE_ID);
  const newsTableIdPresent = Boolean(import.meta.env.VITE_AIRTABLE_TABLE_NEWS_ID);

  if (!tokenPresent || !basePresent || !newsTableIdPresent) {
    return useLocalFallback();
  }

  try {
    const items = await listAirtableNews();
    cached = items.length ? items : localNews;
    lastSource = items.length ? "airtable" : "local";
    lastAirtableError = items.length
      ? null
      : "Airtable News returned 0 valid records (check required fields: slug, title).";
    lastLoadedAt = Date.now();
    setCachedNews(cached, lastSource);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    lastAirtableError = msg;
    cached = localNews;
    lastSource = "local";
    lastLoadedAt = Date.now();
    setCachedNews(cached, "local");
  }

  newsPreloadPromise = null;
  return cached;
}

async function loadAllNews(force = false): Promise<NewsPost[]> {
  if (!force && cached) return cached;

  // Cek persistent cache (localStorage) — instant render
  if (!force) {
    const persistent = getCachedNews<NewsPost>();
    if (persistent) {
      cached = persistent.data;
      lastSource = persistent.source;
      lastLoadedAt = persistent.loadedAt;

      const age = Date.now() - persistent.loadedAt;
      if (age > CACHE_TTL_MS / 2 && !newsPreloadPromise) {
        newsPreloadPromise = loadFreshNews();
        newsPreloadPromise.catch(() => {});
      }
      return cached;
    }
  }

  if (newsPreloadPromise) return newsPreloadPromise;

  newsPreloadPromise = loadFreshNews();
  return newsPreloadPromise;
}

export type NewsQuery = {
  tag?: string;
  page?: number;
  pageSize?: number;
};

export const NewsService = {
  getDebugSnapshot() {
    const tokenPresent = Boolean(import.meta.env.VITE_AIRTABLE_TOKEN);
    const basePresent = Boolean(import.meta.env.VITE_AIRTABLE_BASE_ID);
    const newsTableIdPresent = Boolean(import.meta.env.VITE_AIRTABLE_TABLE_NEWS_ID);

    return {
      airtable: {
        baseIdPresent: basePresent,
        newsTableIdPresent: newsTableIdPresent,
        tokenPresent,
        enabled: tokenPresent && basePresent && newsTableIdPresent,
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

  /** Preload data di awal app. */
  preload(): Promise<NewsPost[]> {
    if (cached) return Promise.resolve(cached);
    if (newsPreloadPromise) return newsPreloadPromise;

    newsPreloadPromise = loadAllNews(false);
    return newsPreloadPromise;
  },

  async reload() {
    invalidateCache();
    cached = null;
    newsPreloadPromise = null;
    await loadAllNews(true);
    return NewsService.getDebugSnapshot();
  },

  async listNews(query?: NewsQuery) {
    const { tag, page = 1, pageSize = 9 } = query ?? {};

    let data = [...(await loadAllNews(false))];

    if (tag && tag.trim()) {
      const t = tag.trim().toLowerCase();
      data = data.filter((p) => p.tags.some((tg) => tg.toLowerCase() === t));
    }

    const total = data.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const items = data.slice(start, start + pageSize);

    return { items, total, totalPages };
  },

  async getNewsBySlug(slug: string): Promise<NewsPost | null> {
    const data = await loadAllNews(false);
    return data.find((p) => p.slug === slug) ?? null;
  },
};
