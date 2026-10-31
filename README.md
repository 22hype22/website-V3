# Oversite website

The Oversite marketing site, rebuilt one-to-one from the live AlphaLedger site with the Oversite name and mark:
loading screen, hero with the laptop lid opening on scroll, Key Figures counters, the pinned FEATURES journey
(three cards sliding across, the badge growing into the "Full Power" bento as the page turns black), Supported
Platforms, the GPU board riding in under "Powered by Industry Grade", Why Oversite with the chart animations,
pricing with the monthly/yearly toggle and Additional Solutions, More about us, FAQ accordion, Stay Ahead, the
closing call to action and the footer with a legal bar that sticks to the bottom of the screen.

Every scroll curve (start, length, easing, breakpoints) was measured off the live page with Playwright and
reproduced in GSAP, so the two scroll the same at 1440, 768 and 390 wide.

## Stack

- Next.js 16 (App Router, TypeScript), exported as a fully static site
- Tailwind CSS v4 with shadcn/ui tokens (used for the app shell; the page itself reuses the live site's Webflow stylesheet)
- GSAP 3.15 with every plugin registered in `src/lib/gsap.ts` (ScrollTrigger, SplitText, TextPlugin, DrawSVG, CustomEase, …) and the `useGSAP` hook
- Lenis for smooth scrolling (lerp .1, wheel multiplier .7, like the live site), ticking inside GSAP and feeding ScrollTrigger
- Motion for in-view triggers
- lottie-web for the live site's Lottie charts
- React Bits `SplitText` (installed through both `shadcn` and `jsrepo`, in `src/components/SplitText.jsx`), available for headings
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

`out/` is the static site, ready for any host that serves it from the domain root (Railway uses this).

```bash
npm run build:relative
```

`out-relative/` is the same site with page-relative paths, for hosting under a sub-path (GitHub Pages uses this).

```bash
npm run build:artifact
```

`out-artifact/` additionally moves Next's `_next` folder under `n/`, for hosts that reserve top-level names starting with an underscore.

## Deploy (Railway)

The repo carries the same Railway setup as the Oversite CAD repo: `railway.json` and `.nixpacks.toml` build with
Node 22 (`npm ci`, `npm run build`) and start `node server.mjs`, which serves the static export from `out/` on
`PORT` and answers `/health` for the healthcheck. Connect the GitHub repo to a Railway service and every push deploys.

## GitHub Pages

`.github/workflows/pages.yml` builds the page-relative export and publishes it to GitHub Pages on every push.
Pages has to be switched on once in the repository settings (Settings → Pages → Source: GitHub Actions); the site
is then served at the repository's Pages URL.

## Where things live

- `src/components/site/` one component per section, in page order; `Site.tsx` assembles them
  (`Preloader`, `Navbar`, `Hero`, `Get`, `Products`, `CardsMobile`, `Supported`, `Perfom`, `Why`, `Discover`, `More`, `Faq`, `Stay`, `Blog`, `Footer`, `Cursor`)
- `src/components/site/primitives.tsx` the shared pieces: `Split` (the live site's four text effects), `Counter`, `LottiePlayer`, `Brand`, `Mark`, `useFadeUps`
- `src/styles/webflow.css` the live site's stylesheet with its asset URLs pointed at `public/al/`
- `src/styles/overrides.css` the font, the fluid root size, and the few things done here instead of by Webflow's runtime (preloader, brand lockup, mobile menu, FAQ, pricing toggle, cursor, badge cards)
- `src/config/site.ts` the brand name, links and contact address used across the site; `assistantEndpoint` points the help chat at a server (POST `{ messages }`, reply `{ reply }`) instead of its built-in answers
- `src/components/site/Assistant.tsx` the help chat window opened from the FAQ's "Got something else?" button; `src/lib/assistant.ts` holds its knowledge base and matching
- `src/lib/gsap.ts` the GSAP plugin registry and shared eases
- `public/al/` images from the live site, `public/lottie/` its Lottie files, `public/video/` the dashboard videos, `public/assets/` the Oversite mark
- `scripts/relative-export.mjs` rewrites the export to page-relative paths

## Copy and placeholders

All copy, links, prices and FAQs come from the Oversite content handover (managed Discord bots, the fleet, pricing,
ER:LC bots, the process). The dashboard videos and laptop screenshots in the hero and fleet cards are still the
reference site's own and carry its mark; swap them for Oversite material in `public/video` and `public/al`.

## Claude Code setup

`.claude/` (skills, agents, settings), `.agents/`, `.mcp.json`, `skills-lock.json` and `claudex.toml` are copied
from the Oversite CAD repo so the same skills, MCP servers and Claudex profiles are available here.
