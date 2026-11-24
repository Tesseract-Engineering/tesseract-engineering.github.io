import { ImageResponse } from "next/og";

import { ogImage } from "@/lib/agents";
import { hero, site } from "@/lib/site";

// The shared-link preview (og:image), drawn at build time in the site's colours: ink on paper.
// A route rather than the opengraph-image convention, so the exported file ends in .png and
// GitHub Pages serves it as image/png.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#fafaf9",
          color: "#0f0e0d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 56, fontWeight: 600 }}>
          <svg width="72" height="72" viewBox="0 0 32 32" fill="none" stroke="#0f0e0d" strokeWidth="1.6">
            <rect x="3" y="3" width="26" height="26" rx="2" />
            <rect x="10" y="10" width="12" height="12" rx="1" />
            <path d="M3 3l7 7M29 3l-7 7M3 29l7-7M29 29l-7-7" />
          </svg>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 72, lineHeight: 1.1, letterSpacing: -2, maxWidth: 960 }}>{hero.lead}</div>
      </div>
    ),
    { width: ogImage.width, height: ogImage.height },
  );
}
