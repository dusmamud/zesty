# Zesty — food delivery web app (SvelteKit)

Real SvelteKit build of the Zesty food-delivery app. Burgers, pizza, Asian, desserts
and drinks, hot and fresh in 20–30 minutes.

Live: https://zeesty.pages.dev

## Stack (locked, exact)

| Package | Version |
| --- | --- |
| Svelte | 5.57.3 |
| SvelteKit | 3.2.0 |
| Vite | 8.3.8 |
| TypeScript | 6.0.3 |
| Tailwind CSS | 4.3.5 (+ @tailwindcss/vite 4.3.5) |
| @sveltejs/adapter-static | 4.0.1 |
| @lucide/svelte | 1.74.0 |

Node 22.17+ required (developed with Node v26.13.1). All routes prerendered
(`export const prerender = true` in `src/routes/+layout.ts`), output is static
HTML in `build/` — no server runtime.

## SvelteKit 3 notes

- No `svelte.config.js` — config lives in `vite.config.ts` inside the `sveltekit()` plugin.
- No `$lib` — imports use the `#lib` subpath import declared in `package.json`
  (`imports` field), with file extensions, e.g. `import { DISHES } from '#lib/data.ts'`.
- Scaffolded with `npx sv@1.4.0 create --template minimal --types ts --no-install`,
  then versions pinned exactly and `adapter-auto` replaced with `adapter-static`.

## What's in the app

- Header (search, cart badge, Sign In), hero with 20–30 mins / 50% OFF floating cards
- Why Choose Us trio + 3-step How It Works
- Menu: 8 dishes across Burgers / Pizza / Asian / Desserts / Drinks, category filter,
  search, favourites, veg / non-veg marks, ratings and prices
- Working cart drawer: quantities, free delivery over $20, promo codes
  `FIRST50` (50% off) and `ZESTY20` (20% off)
- Guest checkout (UPI / Card / COD) with validation and an order-confirmation screen
- Testimonial carousel, app-download banner, trust row, footer, sticky mobile cart bar
- Photos are real Unsplash stock photos in `static/images/` (no AI images)

## Run it

```sh
pnpm install
pnpm run dev        # dev server
pnpm run check      # svelte-check (0 errors)
pnpm run build      # prerendered static site in build/
pnpm run preview    # serve the production build locally
```

## Status

Frontend only, mock data in `src/lib/data.ts`. No backend yet — orders and
payments are demo-only in the browser. A Go backend plugs in later behind the
same API seam.
