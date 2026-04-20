import { properties, type Property, type PropertyPurpose, type PropertyStatus, type PropertyType } from "@/data/properties";

export type PropertyQuery = {
  search?: string;
  type?: PropertyType | "All";
  purpose?: PropertyPurpose | "All";
  status?: PropertyStatus | "All";
  area?: string | "All";
  priceMin?: number;
  priceMax?: number;
  advanced?: string; // free text tokens: land/building/beds/baths/pool
  sort?: "newest" | "price_asc" | "price_desc" | "roi_desc";
  page?: number;
  pageSize?: number;
};

type Op = ">" | ">=" | "<" | "<=" | "=";

type NumericRule = { key: "land" | "building" | "beds" | "baths"; op: Op; value: number };
type PoolRule = { key: "pool"; value: boolean };

const includesLoose = (value: string, query: string) =>
  value.toLowerCase().includes(query.trim().toLowerCase());

const parseAdvanced = (raw?: string): { numeric: NumericRule[]; pool?: PoolRule } => {
  if (!raw) return { numeric: [] };
  const tokens = raw
    .split(/[\s,;]+/g)
    .map((t) => t.trim())
    .filter(Boolean);

  const numeric: NumericRule[] = [];
  let pool: PoolRule | undefined;

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

    const m = lower.match(/^(land|building|beds|baths)\s*(>=|<=|=|>|<)\s*(\d+)$/);
    if (!m) continue;

    const key = m[1] as NumericRule["key"];
    const op = m[2] as Op;
    const value = Number(m[3]);
    if (!Number.isFinite(value)) continue;

    numeric.push({ key, op, value });
  }

  return { numeric, pool };
};

const compareOp = (left: number, op: Op, right: number) => {
  if (op === ">") return left > right;
  if (op === ">=") return left >= right;
  if (op === "<") return left < right;
  if (op === "<=") return left <= right;
  return left === right;
};

export const PropertyService = {
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
      page = 1,
      pageSize = 9,
    } = query;

    let data = [...properties];

    if (search && search.trim()) {
      data = data.filter(
        (p) =>
          includesLoose(p.title, search) ||
          includesLoose(p.location.area, search) ||
          includesLoose(p.code, search),
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

      if (rules.numeric.length) {
        data = data.filter((p) => {
          for (const r of rules.numeric) {
            const left =
              r.key === "land"
                ? p.landSize ?? 0
                : r.key === "building"
                  ? p.buildingSize ?? 0
                  : r.key === "beds"
                    ? p.bedrooms ?? 0
                    : p.bathrooms ?? 0;

            if (!compareOp(left, r.op, r.value)) return false;
          }
          return true;
        });
      }
    }

    data.sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "roi_desc") return (b.roi ?? 0) - (a.roi ?? 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const total = data.length;
    const start = (page - 1) * pageSize;
    const items = data.slice(start, start + pageSize);

    await new Promise((r) => setTimeout(r, 250));

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  },

  async getPropertyBySlug(slug: string): Promise<Property | null> {
    await new Promise((r) => setTimeout(r, 200));
    return properties.find((p) => p.slug === slug) ?? null;
  },
};