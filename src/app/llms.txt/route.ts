import { llmsTxt } from "@/lib/agents";

// Written to out/llms.txt at build time (a static export only prerenders forced-static routes).
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
