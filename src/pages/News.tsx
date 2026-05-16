import { useEffect, useState, useMemo } from "react";
import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import Seo, { SITE_ORIGIN } from "@/components/seo/Seo";
import { NewsService } from "@/services/newsService";
import type { NewsPost } from "@/data/news";
import NewsCard from "@/components/news/NewsCard";
import { Separator } from "@/components/ui/separator";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { Skeleton } from "@/components/ui/skeleton";

export default function News() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    NewsService.listNews()
      .then((res) => {
        if (cancelled) return;
        setPosts(res.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[News] load error:", err);
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const canonicalPath = "/news";
  const title = "News & Insights | Artaniar Property";
  const description =
    "Artikel singkat dan praktis seputar properti Bali: checklist beli, ownership (leasehold/freehold), dan insight yang membantu kamu ambil keputusan.";

  const ogImage = posts[0]?.coverImage;

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Artaniar Property News",
      url: `${SITE_ORIGIN}${canonicalPath}`,
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        datePublished: p.publishedAt,
        image: p.coverImage,
        url: `${SITE_ORIGIN}/news/${p.slug}`,
        author: { "@type": "Organization", name: p.authorName },
      })),
    };
  }, [posts]);

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-ink))]">
      <Seo title={title} description={description} canonicalPath={canonicalPath} image={ogImage} jsonLd={jsonLd} />
      <HeaderNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-16">
        <section className="rounded-[2.25rem] border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-7 md:p-10 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-4xl leading-tight">News & Insights</h1>
              <p className="mt-3 text-[hsl(var(--brand-ink)/0.72)] leading-relaxed max-w-2xl">{description}</p>
            </div>

            <div className="sm:self-end">
              <WhatsAppCTA context={{ intent: "Minta rekomendasi properti" }} label="Konsultasi" />
            </div>
          </div>

          <Separator className="my-7 bg-[hsl(var(--brand-ink)/0.10)]" />

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 overflow-hidden">
                  <Skeleton className="aspect-[16/9] w-full" />
                  <div className="p-4 grid gap-3">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-12 rounded-full" />
                      <Skeleton className="h-5 w-12 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[hsl(var(--brand-ink)/0.70)]">Belum ada artikel.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <NewsCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingCTA />
    </div>
  );
}