# Zesty — Delicious Food, Delivered Fast

Food delivery web app. Burgers, pizza, Asian, desserts and drinks, hot and fresh in 20–30 minutes.

## What's in here

- `index.html` — the full app, self-contained (single file, images inlined). Open it in a browser, no build step needed.
- Working menu with category filter, search, favourites and veg / non-veg marks
- Cart drawer with quantities, free delivery over $20, promo codes (`FIRST50`, `PIZZAFRI`)
- Guest checkout (UPI / Card / COD) with order confirmation and tracking steps
- Testimonial carousel, app-download banner, light + dark mode

## Status

Frontend first, mock data only. No backend yet — orders and payments are demo-only in the browser. The Go backend (Postgres + Razorpay/UPI) plugs in later, behind the same API seam.

## Run it

Just open `index.html`, or serve it:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Live app: https://github.com/dusmamud/zesty
