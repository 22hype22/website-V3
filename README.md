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
