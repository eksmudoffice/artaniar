import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delayMs?: number;
  priority?: boolean;
  fallbackSrc?: string;
};

export default function DeferredImage({
  src,
  alt,
  className,
  imgClassName,
  delayMs = 250,
  priority = false,
  fallbackSrc = "/placeholder.svg",
}: Props) {
  const [activeSrc, setActiveSrc] = useState<string>(priority ? src : fallbackSrc);

  useEffect(() => {
    if (priority) {
      setActiveSrc(src);
      return;
    }

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      setActiveSrc(src);
    };

    // Prefer idle time; fallback to small timeout.
    const anyWin = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId: number | null = null;
    const timeoutId = window.setTimeout(() => {
      if (idleId == null) start();
    }, delayMs);

    if (typeof anyWin.requestIdleCallback === "function") {
      idleId = anyWin.requestIdleCallback(start, { timeout: 1500 });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      if (idleId != null && typeof anyWin.cancelIdleCallback === "function") anyWin.cancelIdleCallback(idleId);
    };
  }, [delayMs, priority, src]);

  return (
    <div className={cn("relative", className)}>
      <img
        src={activeSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = fallbackSrc;
        }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}