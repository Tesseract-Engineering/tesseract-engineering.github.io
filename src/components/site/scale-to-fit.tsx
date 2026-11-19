"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Lays its children out at a fixed design width and scales them down to fit the container,
 * so a product mock-up keeps its exact layout at every screen size, like a screenshot.
 *
 * It scales with a transform rather than CSS `zoom`: zoom makes mobile browsers (iOS Safari in
 * particular) re-measure and boost text at the tiny effective size, so lines grow wider than the
 * layout allows and spill out of their boxes. A transform paints the finished desktop layout
 * smaller, so nothing reflows. The wrapper takes the scaled height, since a transform leaves the
 * layout box at full size. It fades in once measured, so the first paint never shows the unscaled size.
 */
export function ScaleToFit({ width, children, className }: { width: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ scale: number; height: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    const content = contentRef.current;
    if (!el || !content) return;
    const measure = () => {
      // fit the content box: clientWidth includes the padding
      const cs = getComputedStyle(el);
      const inner = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const scale = Math.min(1, inner / width);
      setFit({ scale, height: content.offsetHeight * scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(content);
    return () => ro.disconnect();
  }, [width]);

  const scale = fit?.scale ?? 1;

  return (
    <div ref={ref} className={className}>
      <div
        style={{ width: width * scale, height: fit?.height, opacity: fit === null ? 0 : 1 }}
        className="relative mx-auto transition-opacity duration-500"
      >
        <div
          ref={contentRef}
          style={{ width, transform: `scale(${scale})`, WebkitTextSizeAdjust: "100%", textSizeAdjust: "100%" }}
          className="absolute top-0 left-0 origin-top-left"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
