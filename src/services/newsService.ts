import { newsPosts as localNews, type NewsPost } from "@/data/news";
import { listAirtableNews } from "@/services/airtable";

type DataSource = "airtable" | "local";

let cached: NewsPost[] | null = null;
let lastSource: DataSource = "local";
let lastAirtableError: string | null = null;
let lastLoadedAt: number | null = null;

async function loadAllNews(force = false): Promise<NewsPost[]> {
  if (!force && cached) return cached;

  const tokenPresent = Boolean(import.meta.env.VITE_AIRTABLE_TOKEN);
  const basePresent = Boolean(import.meta.env.VITE_AIRTABLE_BASE_ID);
  const newsTableIdPresent = Boolean(import.meta.env.VITE_AIRTABLE_TABLE_NEWS_ID);

  if (!tokenPresent || !basePresent || !newsTableIdPresent) {
    cached = localNews;
    lastSource = "local";
    lastAirtableError = null;
    lastLoadedAt = Date.now();
    return cached;
  }

  try {
    const items = await listAirtableNews();
    cached = items.length ? items : localNews;
    lastSource = items.length ? "airtable" : "local";
    lastAirtableError = items.length
      ? null
      : "Airtable News returned 0 valid records (check required fields: slug, title).";
    lastLoadedAt = Date.now();
    return cached;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    lastAirtableError = msg;
    cached = localNews;
    lastSource = "local";
    lastLoadedAt = Date.now();
    return cached;
  }
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

  async reload() {
    await loadAllNews(true);
    return NewsService.getDebugSnapshot();
  },

  async listNews(query?: NewsQuery) {
    const { tag, page = 1, pageSize = 9 } = query ?? {};

    let data = [...(await loadAllNews(false))];
    console.log("[NewsService] loaded", data.length, "posts from", lastSource);

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
