import { useEffect, useState } from "react";

/**
 * Mount komponen setelah browser idle (via requestIdleCallback) atau
 * setelah IntersectionObserver terpenuhi (element masuk viewport).
 *
 * Gunakan untuk komponen non-critical seperti footer, floating CTA, dsb
 * supaya main thread tidak tersumbat saat initial paint.
 */
export function useIdleMount(delayMs = 0) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let id: number | ReturnType<typeof setTimeout>;

    const activate = () => {
      id = setTimeout(() => setReady(true), delayMs);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(activate, { timeout: 2000 });
      return () => {
        window.cancelIdleCallback(idleId);
        clearTimeout(id);
      };
    } else {
      activate();
      return () => clearTimeout(id);
    }
  }, [delayMs]);

  return ready;
}

/**
 * Lazy-mount setelah element ref terlihat di viewport.
 * Berguna untuk footer yang di bawah fold.
 */
export function useIntersectMount(threshold = 0.01) {
  const [ready, setReady] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref || ready) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "200px" }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, ready, threshold]);

  return { ready, setRef };
}
