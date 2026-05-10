import { useEffect } from "react";

type SeoProps = {
  title: string;
  description?: string;
  canonicalPath?: string; // e.g. "/properties/abc"
  image?: string; // absolute URL preferred
  noIndex?: boolean;
  jsonLd?: unknown;
};

const SITE_ORIGIN = "https://artaniarproperty.com";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/placeholder.svg`;

function upsertMeta(attr: "name" | "property", key: string, content?: string) {
  if (!content) return;
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url?: string) {
  if (!url) return;
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

function setRobots(noIndex?: boolean) {
  const selector = 'meta[name="robots"]';
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!noIndex) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "robots");
    document.head.appendChild(el);
  }
  el.setAttribute("content", "noindex,nofollow");
}

function setJsonLd(jsonLd?: unknown) {
  const id = "seo-jsonld";
  const existing = document.getElementById(id);
  if (!jsonLd) {
    if (existing) existing.remove();
    return;
  }
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.text = JSON.stringify(jsonLd);
  if (existing) existing.remove();
  document.head.appendChild(script);
}

export default function Seo({ title, description, canonicalPath, image, noIndex, jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const canonicalUrl = canonicalPath ? `${SITE_ORIGIN}${canonicalPath}` : SITE_ORIGIN;
    setCanonical(canonicalUrl);

    upsertMeta("name", "description", description);

    const ogImage = image ?? DEFAULT_OG_IMAGE;

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Artaniar Property");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description ?? "");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", ogImage);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description ?? "");
    upsertMeta("name", "twitter:image", ogImage);

    setRobots(noIndex);
    setJsonLd(jsonLd);
  }, [canonicalPath, description, image, noIndex, title, jsonLd]);

  return null;
}

export { SITE_ORIGIN };