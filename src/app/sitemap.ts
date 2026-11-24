import type { MetadataRoute } from "next";

import { absolute, pages } from "@/lib/agents";

export const dynamic = "force-static";

/** sitemap.xml: every indexable page, last modified at the build that published it. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((page) => ({ url: absolute(page.path), lastModified }));
}
