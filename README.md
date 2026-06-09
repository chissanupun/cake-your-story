# Cake Your Story — by S&P

An interactive cake-builder campaign microsite. Users customize a virtual S&P cake, receive a personality archetype, and can share their creation via URL.

## What it does

1. **Age gate** — collects age range (submits to Google Forms, stores in `localStorage`)
2. **Hero** — landing screen with entry CTA and saved-cakes board shortcut
3. **Builder** — 4-step customizer:
   - Step 1: Packaging (Cup / Box / Classic board)
   - Step 2: Cake flavor (9 options: Butter Vanilla, Black Forest, Pandan Layer, etc.)
   - Step 3: Toppings — drag-and-drop onto the live cake preview (up to 3)
   - Step 4: Message (preset + free-text, draggable placement)
4. **Reveal** — personality archetype computed from tag scoring across all choices (20 archetypes)
5. **Share** — encodes cake state as base64 URL hash (`#cake=...`) for shareability
6. **Board** — locally saved creations with like/delete/remix

## Tech stack

| Layer | Detail |
|---|---|
| Framework | React 18.3.1 via UMD CDN (no bundler) |
| JSX | Babel Standalone 7.29.0 (in-browser transform) |
| Styling | Custom `bakespace-ds` design system (CSS tokens) |
| Icons | Phosphor Icons v2.1.1 |
| Persistence | `localStorage` |
| Hosting | Vercel (static) |

No build step. Open `index.html` directly or serve with any static server.

## Running locally

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

> Must be served over HTTP — Babel Standalone and module scripts require a server, not `file://`.

## Project structure

```
index.html          # Entry point; loads all scripts and DS tokens
src/
  data.js           # Content data + personality scoring engine (plain JS → window.CYS)
  confetti.js       # Confetti burst utility
  App.jsx           # Root component — screen router + state
  AgeGate.jsx       # Age range modal
  Hero.jsx          # Landing screen
  Builder.jsx       # 4-step cake customizer
  CakeStage.jsx     # Live cake preview (composites packaging + flavor + toppings)
  Reveal.jsx        # Personality result screen
  Share.jsx         # Share flow
  Board.jsx         # Saved cakes grid
  Shared.jsx        # Shared UI primitives
  tweaks-panel.jsx  # Dev tweaks panel (motion, confetti, starting vibe)
assets/
  cake/             # Cake flavor images (cup / box / Simple variants)
  Topping/          # Topping PNG overlays (1–8)
  pack-*.{png,webp} # Packaging compositing images
_ds/                # Design system bundle (tokens + styles)
vercel.json         # Vercel config (cache headers)
```

## Personality engine

`data.js` exposes `window.CYS.computePersonality(cake)`. Each choice (packaging, flavor, toppings, message, theme) carries mood tags. Tags are counted across all choices; the personality archetype with the highest weighted match score wins. Deterministic tie-breaking via a string hash of the cake config keeps results stable per combination.

## Sharing

`Share.jsx` serializes cake state to JSON → UTF-8 bytes → base64 → `#cake=<base64>`. On load, `App.jsx` checks `location.hash` and rehydrates the cake, then clears the hash from history.

## Tweaks panel

A dev-only overlay (bottom-right corner) exposes:
- Motion toggle (spring animations)
- Stickers toggle (ambient floating decorations)
- Confetti burst intensity (30–200)
- Starting vibe / campaign theme (Classic / Pride / Graduation / Christmas)

## Deployment

Deployed as a static site on Vercel. All assets served with `Cache-Control: no-cache` (see `vercel.json`).

```bash
vercel --prod
```
