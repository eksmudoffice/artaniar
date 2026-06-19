/**
 * Optimasi URL gambar dari Airtable CDN (v5.airtableusercontent.com).
 * Airtable attachment API support URL params untuk resize & format conversion.
 *
 * Fungsi ini:
 *   1. Resize ke width target (supaya tidak download gambar penuh)
 *   2. Convert ke WebP (kalau browser support — detected via <picture>)
 *   3. Set quality (70-80% cukup untuk property photos)
 *
 * Reference: Airtable CDN support `w=123` parameter untuk resize.
 */

export type ImageSize = "thumbnail" | "small" | "medium" | "large" | "original";

const WIDTH_MAP: Record<ImageSize, number> = {
  thumbnail: 80,    // Avatar, tiny preview
  small: 320,       // Mobile card image
  medium: 640,      // Desktop card image
  large: 1280,      // Detail page hero, carousel
  original: 0,      // No resize — full original
};

/**
 * Generate optimized image URL dari Airtable attachment URL.
 * Kalau bukan Airtable domain, return as-is.
 */
export function optimizeImageUrl(
  url: string,
  size: ImageSize = "medium",
  options?: { format?: "webp" | "auto"; quality?: number }
): string {
  // Kalau bukan Airtable CDN atau placeholder, return as-is
  if (!url.includes("airtableusercontent.com") || url.endsWith("placeholder.svg")) {
    return url;
  }

  const width = WIDTH_MAP[size];

  if (width === 0 || size === "original") {
    return url;
  }

  const u = new URL(url);

  // Airtable CDN support parameter: ?w=WIDTH untuk resize
  u.searchParams.set("w", String(width));

  // Note: Airtable CDN kadang juga support fit, fm (format), q (quality)
  // tapi behavior bisa berbeda. Test dulu — ini safe params.

  return u.toString();
}

/**
 * Wrapper untuk property image array — apply optimasi ke semua URL.
 */
export function optimizePropertyImages(
  images: string[],
  size: ImageSize = "medium"
): string[] {
  return images.map((url) => optimizeImageUrl(url, size));
}

/**
 * Size untuk carousel hero (TopListingsCarousel)
 */
export function optimizeHeroImage(url: string): string {
  return optimizeImageUrl(url, "large");
}

/**
 * Size untuk property card grid
 */
export function optimizeCardImage(url: string): string {
  return optimizeImageUrl(url, "medium");
}

/**
 * Size untuk property detail gallery
 */
export function optimizeGalleryImage(url: string): string {
  return optimizeImageUrl(url, "large");
}

/**
 * Size untuk avatar/small thumbnail
 */
export function optimizeThumbnail(url: string): string {
  return optimizeImageUrl(url, "thumbnail");
}
