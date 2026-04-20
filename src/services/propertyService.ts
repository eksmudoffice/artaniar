import { properties, type Property, type PropertyPurpose, type PropertyStatus, type PropertyType } from "@/data/properties";

export type PropertyQuery = {
  search?: string;
  type?: PropertyType | "All";
  purpose?: PropertyPurpose | "All";
  status?: PropertyStatus | "All";
  area?: string | "All";
  priceMin?: number;
  priceMax?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "roi_desc";
  page?: number;
  pageSize?: number;
};

const includesLoose = (value: string, query: string) =>
  value.toLowerCase().includes(query.trim().toLowerCase());

export const PropertyService = {
  async listProperties(query: PropertyQuery) {
    // backend-ready shape
    const {
      search,
      type,
      purpose,
      status,
      area,
      priceMin,
      priceMax,
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

    data.sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "roi_desc") return (b.roi ?? 0) - (a.roi ?? 0);
      // newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const total = data.length;
    const start = (page - 1) * pageSize;
    const items = data.slice(start, start + pageSize);

    // simulate API latency
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
