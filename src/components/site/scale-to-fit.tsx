"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Lays its children out at a fixed design width and zooms them down to fit the container,
 * so a product mock-up keeps its exact layout at every screen size, like a screenshot.
 * It fades in once measured, so the first paint never shows the unscaled size.
 */
export function ScaleToFit({ width, children, className }: { width: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      // fit the content box: clientWidth includes the padding
      const cs = getComputedStyle(el);
      const inner = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      setZoom(Math.min(1, inner / width));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className={className}>
      <div
        style={{ width, zoom: zoom ?? 1, opacity: zoom === null ? 0 : 1 }}
        className="mx-auto transition-opacity duration-500"
      >
        {children}
      </div>
    </div>
  );
}
