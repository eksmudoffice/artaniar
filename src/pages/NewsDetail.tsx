import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderNav from "@/components/branding/HeaderNav";
import Footer from "@/components/branding/Footer";
import WhatsAppFloatingCTA from "@/components/cta/WhatsAppFloatingCTA";
import Seo, { SITE_ORIGIN } from "@/components/seo/Seo";
import { newsPosts } from "@/data/news";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import NewsContent from "@/components/news/NewsContent";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

function formatDate(value: string) {
  const d = new Date(value);
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(d);
}

export default function NewsDetail() {
  const { slug } = useParams();
  const post = newsPosts.find((p) => p.slug === slug);

  const canonicalPath = post ? `/news/${post.slug}` : `/news/${slug ?? ""}`;
  const title = post ? `${post.title} | Artaniar Property` : "Artikel | Artaniar Property";
  const description = post?.excerpt ?? "Artikel properti Bali dari Artaniar Property.";

  const jsonLd = useMemo(() => {
    if (!post) return undefined;
    const url = `${SITE_ORIGIN}/news/${post.slug}`;
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: [post.coverImage],
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: { "@type": "Organization", name: post.authorName },
      publisher: { "@type": "Organization", name: "Artaniar Property" },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      keywords: post.tags.join(", "),
    };
  }, [post]);

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-ink))]">
      <Seo title={title} description={description} canonicalPath={canonicalPath} image={post?.coverImage} jsonLd={jsonLd} />
      <HeaderNav />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-24 pb-16">
        {!post ? (
          <section className="rounded-[2rem] border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 p-8 text-center shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
            <h1 className="font-serif text-3xl">Artikel tidak ditemukan</h1>
            <p className="mt-2 text-sm text-[hsl(var(--brand-ink)/0.70)]">Coba kembali ke halaman News.</p>
            <div className="mt-6">
              <Link
                to="/news"
                className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--brand-ink))] px-6 py-2.5 text-sm font-semibold text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)] transition-colors"
              >
                Kembali ke News
              </Link>
            </div>
          </section>
        ) : (
          <>
            <Button
              asChild
              variant="ghost"
              className="mb-5 rounded-full text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-ink)/0.06)]"
            >
              <Link to="/news">
                <ChevronLeft className="mr-1 h-4 w-4" /> News
              </Link>
            </Button>

            <article className="overflow-hidden rounded-[2.25rem] border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)]">
              <div className="relative">
                <div className="aspect-[16/9] overflow-hidden bg-black/5">
                  <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" loading="eager" />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <div className="text-xs text-white/85">{formatDate(post.publishedAt)}</div>
                  <h1 className="mt-2 font-serif text-3xl md:text-4xl leading-tight text-white max-w-3xl">
                    {post.title}
                  </h1>
                  <p className="mt-3 text-sm md:text-base text-white/85 max-w-3xl leading-relaxed">{post.excerpt}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} className="rounded-full bg-white/85 text-[hsl(var(--brand-ink))] border border-white/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <NewsContent post={post} />

                <Separator className="my-8 bg-[hsl(var(--brand-ink)/0.10)]" />

                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <div className="font-serif text-2xl">Butuh rekomendasi unit yang cocok?</div>
                    <div className="mt-1 text-sm text-[hsl(var(--brand-ink)/0.72)]">
                      Kirim area + budget + tujuan, nanti kami bantu shortlist.
                    </div>
                  </div>
                  <div className="flex">
                    <WhatsAppCTA context={{ intent: "Minta shortlist (dari artikel News)" }} label="Konsultasi via WhatsApp" />
                  </div>
                </div>
              </div>
            </article>
          </>
        )}
      </main>

      <Footer />
      <WhatsAppFloatingCTA />
    </div>
  );
}