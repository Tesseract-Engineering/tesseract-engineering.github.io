# Tesseract website

Live at https://tesseract-engineering.github.io.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and shadcn/ui. It's exported as a static site and hosted on GitHub Pages.

## Run it locally

```sh
npm install
npm run dev        # http://localhost:3000, reloads as you edit
```

Before pushing:

```sh
npm run lint
npm run build      # writes the static site to out/
npx serve out      # optional: preview the exact files that will be deployed
```

## Where things live

| Path | What it is |
|---|---|
| `src/lib/site.ts` | **All the copy**: headline, sections, companies, contact email. Edit text here. |
| `src/app/page.tsx` | The page, composed from the sections below. |
| `src/app/layout.tsx` | Fonts (Newsreader, Inter, IBM Plex Mono), page title and description, social previews. |
| `src/app/globals.css` | Design tokens (colours, radii, fonts) and the shadcn/ui theme mapping. |
| `src/components/site/` | One component per section (nav, hero, product showcase, integrations, security, team, footer) and the Request a demo dialog. |
| `src/components/site/mockups/` | Product mock-ups: the workspace dashboard under the hero (`dashboard.tsx`) and the four integration tabs. |
| `src/components/ui/` | shadcn/ui components (button, tabs, dialog). These files are ours to edit. |

### Design tokens

Use the brand colours as Tailwind classes: `bg-paper`, `bg-paper-2`, `text-ink`, `text-stone` (secondary text), `text-forest` / `bg-forest` (the accent, used sparingly), and on black blocks `text-on-dark`, `text-stone-dark`, `border-line-dark`. Use `rounded-box` (8px) for boxes and `rounded-btn` (4px) for buttons, and `font-display` for serif headings.

### Adding a shadcn/ui component

```sh
npx shadcn@latest add <component>    # e.g. accordion, input
```

It picks up the brand theme from `globals.css` automatically.

## Deploying

Pushing to `main` deploys. `.github/workflows/deploy.yml` lints, builds and publishes `out/` to GitHub Pages; this needs Settings → Pages → Source set to **GitHub Actions**.

Because the site is a static export, server-only Next.js features (API routes, server actions, middleware, image optimisation) aren't available. Request a demo works by starting an email.
