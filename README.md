# Oversite website

The Oversite marketing site: a loading screen that draws the mark and types the name, then a white hero,
a scroll-pinned product journey, a feature grid that turns the page black, the performance board, the
one-million counter, the chart cards, pricing, the dark "about" panels, a closing call to action, news and the
footer with the oversized wordmark.

## Stack

- Next.js (App Router, TypeScript), exported as a fully static site
- Tailwind CSS v4 with shadcn/ui tokens
- GSAP with every plugin registered in `src/lib/gsap.ts` (ScrollTrigger, SplitText, TextPlugin, DrawSVG, CustomEase, …) and the `useGSAP` hook
- Lenis for smooth scrolling, ticking inside GSAP and feeding ScrollTrigger
- Motion (Framer Motion) for the spring-driven news carousel and in-view nav highlighting
- React Bits `SplitText` (installed through both `shadcn` and `jsrepo`) for the hero headline
- Lucide icons

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build it

```bash
npm run build
```

`out/` is the static site, ready for any host that serves it from the domain root.

```bash
npm run build:relative
```

`out-relative/` is the same site with page-relative paths, for hosting under a sub-path or opening from a folder.

```bash
npm run build:artifact
```

`out-artifact/` additionally moves Next's `_next` folder under `n/`, for hosts that reserve top-level names starting with an underscore.

## Deploy (Railway)

The repo carries the same Railway setup as the Oversite CAD repo: `railway.json` and `.nixpacks.toml` build with
Node 22 (`npm ci`, `npm run build`) and start `node server.mjs`, which serves the static export from `out/` on
`PORT` and answers `/health` for the healthcheck. Connect the GitHub repo to a Railway service and every push deploys.

## Claude Code setup

`.claude/` (skills, agents, settings), `.agents/`, `.mcp.json`, `skills-lock.json` and `claudex.toml` are copied
from the Oversite CAD repo so the same skills, MCP servers and Claudex profiles are available here.

## Switches

`src/config/site.ts`

- `heroMockup`: the reference hero has a "Watch the film" pill and a laptop with the dashboard under the headline.
  Off by default; set it to `true` to bring them back.
- `name`, `email`: the brand name and contact address used across the site.

## Where things live

- `src/components/site/` one component per section, in page order (`Site.tsx` assembles them)
- `src/components/site/Dashboard.tsx`, `Laptop.tsx`, `Shield.tsx` the product visuals, built in HTML/CSS/SVG
- `src/styles/site.css` all layout and visual styling, in page order
- `src/lib/gsap.ts` the GSAP plugin registry and shared eases; `src/lib/hooks.ts` the reveal and count-up hooks
- `scripts/relative-export.mjs` rewrites the export to page-relative paths
