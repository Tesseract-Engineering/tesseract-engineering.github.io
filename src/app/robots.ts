import type { MetadataRoute } from "next";

import { absolute } from "@/lib/agents";

export const dynamic = "force-static";

/** robots.txt: everything may be crawled; points crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absolute("/sitemap.xml"),
  };
}
