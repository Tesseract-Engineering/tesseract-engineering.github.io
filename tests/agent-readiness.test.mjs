// Checks the static export in out/ for what search engines and AI agents read: JSON-LD, metadata,
// sitemap.xml, robots.txt, llms.txt and the 404 page. Run `npm run build` first, then `npm test`.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const SITE = "https://tesseract-engineering.github.io";
const out = new URL("../out/", import.meta.url);
const read = (path) => {
  const file = new URL(path, out);
  assert.ok(existsSync(file), `out/${path} is missing: run \`npm run build\` first`);
  return readFileSync(file, "utf8");
};
const home = () => read("index.html");
const meta = (html, attr, name) =>
  html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1];
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));

test("home page has Organization JSON-LD with contact details", () => {
  const [org] = jsonLd(home());
  assert.ok(org, "no JSON-LD on the home page");
  assert.equal(org["@context"], "https://schema.org");
  assert.equal(org["@type"], "Organization");
  assert.equal(org.name, "Tesseract");
  assert.equal(org.url, `${SITE}/`);
  assert.ok(org.description.length > 50);
  assert.ok(org.knowsAbout.length > 0);
  assert.equal(org.contactPoint["@type"], "ContactPoint");
  assert.ok(org.contactPoint.contactType);
  assert.match(org.contactPoint.email, /@/);
});

test("every JSON-LD knowsAbout term appears in the home page's own text", () => {
  const html = home().toLowerCase();
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, "");
  for (const term of jsonLd(home())[0].knowsAbout) assert.ok(visible.includes(term.toLowerCase()), term);
});

test("home page has lang, canonical, og:type, og:image and a product title", () => {
  const html = home();
  assert.match(html, /<html lang="en"/);
  assert.match(html, new RegExp(`<link rel="canonical" href="${SITE}/?"`));
  assert.equal(meta(html, "property", "og:type"), "website");
  assert.match(meta(html, "property", "og:image") ?? "", new RegExp(`^${SITE}/og.png$`));
  assert.match(html, /<title>Tesseract · Enterprise knowledge infrastructure<\/title>/);
});

test("og:image is a 1200x630 PNG", () => {
  const html = home();
  const src = meta(html, "property", "og:image");
  assert.equal(meta(html, "property", "og:image:type"), "image/png");
  const file = new URL(src.replace(`${SITE}/`, ""), out);
  const png = readFileSync(file);
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});

test("book-a-demo has its own canonical URL", () => {
  assert.match(read("book-a-demo/index.html"), new RegExp(`<link rel="canonical" href="${SITE}/book-a-demo/"`));
});

test("sitemap.xml lists every page with lastmod, in the sitemaps.org format", () => {
  const xml = read("sitemap.xml");
  assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>/);
  assert.match(xml, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const locs = urls.map((u) => u.match(/<loc>(.*?)<\/loc>/)[1]);
  assert.deepEqual(locs, [`${SITE}/`, `${SITE}/book-a-demo/`]);
  for (const url of urls) assert.match(url, /<lastmod>\d{4}-\d{2}-\d{2}T[\d:.]+Z<\/lastmod>/);
});

test("robots.txt allows crawling and points to the sitemap", () => {
  const txt = read("robots.txt");
  assert.match(txt, /User-Agent: \*\nAllow: \//);
  assert.match(txt, new RegExp(`Sitemap: ${SITE}/sitemap.xml`));
});

test("llms.txt follows llmstxt.org and says when to use Tesseract", () => {
  const txt = read("llms.txt");
  const lines = txt.split("\n");
  assert.equal(lines[0], "# Tesseract", "must start with a single H1");
  assert.equal(lines.filter((l) => l.startsWith("# ")).length, 1);
  assert.match(lines[2], /^> \S/, "blockquote summary after the H1");
  assert.match(txt, /\n## When to use Tesseract\n/);
  assert.match(txt, /\n## Pages\n\n- \[[^\]]+\]\(https:\/\/[^)]+\)/);
  assert.ok(txt.includes(`${SITE}/book-a-demo/`));
  assert.doesNotMatch(txt, /undefined|\[object Object\]/);
});

test("404 page explains the error and links to the sitemap and llms.txt", () => {
  const html = read("404.html");
  assert.match(html, /Page not found/);
  assert.match(html, /href="\/sitemap.xml"/);
  assert.match(html, /href="\/llms.txt"/);
  assert.match(html, /<meta name="robots" content="noindex"/);
});
