import { Link } from "react-router-dom";
import type { NewsPost } from "@/data/news";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function formatDate(value: string) {
  const d = new Date(value);
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

export default function NewsCard({ post, className }: { post: NewsPost; className?: string }) {
  return (
    <Link
      to={`/news/${post.slug}`}
      className={cn(
        "group block overflow-hidden rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-white/70 shadow-[0_18px_60px_-50px_rgba(0,0,0,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-50px_rgba(0,0,0,0.65)]",
        className,
      )}
    >
      <div className="relative">
        <div className="aspect-[16/10] overflow-hidden bg-black/5">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="text-[11px] text-white/85">{formatDate(post.publishedAt)}</div>
          <div className="mt-1 font-serif text-xl leading-snug text-white line-clamp-2">{post.title}</div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-[hsl(var(--brand-ink)/0.72)] leading-relaxed line-clamp-3">{post.excerpt}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              className="rounded-full bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] border border-[hsl(var(--brand-ink)/0.10)]"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}