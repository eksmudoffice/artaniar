import type { NewsPost } from "@/data/news";

export default function NewsContent({ post }: { post: NewsPost }) {
  return (
    <article className="prose prose-zinc max-w-none prose-headings:font-serif prose-headings:text-[hsl(var(--brand-ink))] prose-p:text-[hsl(var(--brand-ink)/0.78)] prose-li:text-[hsl(var(--brand-ink)/0.78)]">
      {post.content.map((block, idx) => {
        if (block.type === "h2") return <h2 key={idx}>{block.text}</h2>;
        if (block.type === "ul")
          return (
            <ul key={idx}>
              {block.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          );
        return <p key={idx}>{block.text}</p>;
      })}
    </article>
  );
}