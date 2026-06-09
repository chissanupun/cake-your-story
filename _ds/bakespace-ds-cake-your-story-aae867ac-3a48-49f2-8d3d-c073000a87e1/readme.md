# Cake Your Story by S&P — Design System

A premium, playful, social-first design system for **“Cake Your Story by S&P”** — a campaign microsite where Gen Z and young-millennial fans design their own cake, name it, and share it to their socials. The aesthetic is *extremely cute + premium*: chubby sticker typography, claymorphic depth, a delicious high-contrast palette, and springy, tactile motion. Think Spotify Wrapped energy meets a Sanrio/Duolingo seasonal page — **not** enterprise SaaS.

> **Sources:** This system was authored from a written brand brief (no codebase or Figma was attached). There is no external repo or design file to link. If/when production assets (illustrated character stickers, brand fonts, photography) become available, drop them into `assets/` and update the relevant tokens/cards.

---

## Brand context

- **Product:** A single-surface, mobile-first **campaign microsite** (the “cake builder”), optimised for in-app browsers (TikTok, Instagram, Threads). Users pick a base → frosting → toppings → name it → preview → share.
- **Audience:** Gen Z & young millennials. Mobile-native, meme-fluent, screenshot-and-share behaviour.
- **Personality:** Cute, generous, a little chaotic, premium-but-approachable. The brand is your enthusiastic baker friend, not a corporation.
- **Signature visual:** the **sticker wordmark** — chubby Fredoka with a thick dark-chocolate outline and a lifted drop shadow, so type reads like a peel-and-stick sticker.

---

## CONTENT FUNDAMENTALS — how we write

- **Voice:** warm, playful, second-person. We talk *to* the user (“**your** cake”, “**you’re** the baker”), never about ourselves in corporate “we” terms beyond friendly asides.
- **Casing:** Sentence case everywhere — headlines, buttons, labels. Display lockups (the logo, big hero words) may use Title Case for rhythm. **Avoid ALL-CAPS** except tiny eyebrows/labels (`--ls-label`, e.g. “NEW DROP”).
- **Tone:** short, punchy, encouraging. Imperatives for actions (“Bake my cake”, “Drop it on”, “Share your story”). Light, never snarky.
- **Emoji:** **yes, intentionally** — food + sparkle emoji are part of the brand’s sticker language (🍒 🧁 🍓 ✦ 🎂). Use as playful accents and as stand-ins for product stickers, not as bullet decoration in body copy. One or two per moment, max.
- **Examples:**
  - Hero: “Cake your story. ✦” / “Design a cake that’s *so* you.”
  - CTA: “Bake my cake →”, “Add this topping”, “Name it & share”
  - Empty/helper: “Tap a topping to drop it on 🍓”, “That code expired 🥲”
  - Success toast: “Strawberry added to your cake!”, “Saved to your story 🎉”
- **Don’t:** enterprise speak (“leverage”, “seamless solution”), exclamation overload, long paragraphs. Keep it skimmable on a phone held one-handed.

---

## VISUAL FOUNDATIONS

**Color.** Split-background system built on a **Cream White `#FDFBF7` base for every screen** — soft, clean, fresh-cream. **Cherry Red `#D90429` is never a solid block**; it appears as a dynamic **“strawberry-sauce” drip** that cuts organically through the cream at section edges and transitions (see the `Drip` component), plus on CTAs and small accents. Other accents: **Frosting Blue `#A2D2FF`** (playful cake elements, focus rings), **Matcha `#84A98C`** (secondary/positive), **Soft Gold `#F4A261`** (sparkles, badges). **Dark chocolate `#3B2314`** is the universal ink + outline. A **soft pink `#FF8FB1`** is reserved exclusively for the *selected* glow. Imagery/illustration should be **warm**, saturated, candy-bright — never cool, muted, or grainy.

**Type.** Two-and-a-half families. **Fredoka** (`--font-display`) is the chubby rounded face for the logo + headlines, always rendered with the **sticker recipe** (`.sticker-text`: chocolate `-webkit-text-stroke` + layered `--sticker-shadow`). **Plus Jakarta Sans** (`--font-body`) is the friendly geometric workhorse for all UI and reading text, tuned for small mobile screens (16px base min). **Baloo 2** (`--font-numeric`) handles big rounded numerals (streaks, counts, stats).

**Spacing & layout.** 8pt-based, plush rhythm (`--space-*`). Microsite content column caps at `--microsite-max` (480px) — design mobile-first, center on larger screens with generous cream margins. Fixed bottom CTA bar on the builder; everything else scrolls.

**Radii.** Ultra-rounded “cake & cream” contours: cards at `--radius-lg` (24px) / `--radius-xl` (32px), pills (`--radius-pill`) for every button and chip, and an organic `--radius-blob` for the occasional cream splat.

**Backgrounds.** Every screen sits on the **cream base** (no muddy gradients, no solid cherry fields). The signature accent is the **strawberry-sauce drip** — an organic, seamlessly-tiling cherry wavy band with hanging drips + detached droplets — used to cut cherry through the cream at section tops, bottoms, and transitions (`Drip` component). The only gradients allowed are *soft radial spotlights* behind the cake preview and subtle frosting/cream-tint vignettes. Extra decoration comes from the **sticker-bomb** motif — whimsical floating food/sparkle stickers scattered at the edges, gently drifting.

**Depth & borders.** This is the system’s fingerprint: a **thick chocolate keyline** (`--bw-ink` 3px / `--bw-ink-bold` 4px) on nearly every surface, paired with **claymorphic** shadows (`--elev-*`) — soft outer lift + inner icing sheen, *not* flat material elevation. Buttons add a hard chocolate **drop-edge** that compresses on press.

**Cards** = white/cream fill, thick chocolate border, `--radius-lg`, `--elev-md`. Selected interactive cards swap the border to pink and gain `--glow-selected` (soft pink halo) + a 3px lift + a popped-in ✓.

**Motion.** Everything is springy and tactile. Hover = a 1–2px lift + slight brightness. Press = shift *down* 2px into the drop-edge (CTAs) or scale 0.96. State changes use `--ease-spring` overshoot. Toppings **drop on** the cake (`drop-on`), selections **pop in** (`pop-in`), background stickers **float** continuously (`float-idle` / `float-drift`, 5–7s), and sparkles **twinkle**. All decorative loops respect `prefers-reduced-motion`.

**Transparency & blur.** Used sparingly — a faint white scrim behind floating labels, the radial spotlight glow. No heavy glassmorphism.

---

## ICONOGRAPHY

- **Functional UI icons:** **Phosphor Icons** (rounded weight) loaded from CDN — chosen for its plump, friendly, rounded-stroke geometry that matches Fredoka’s curves. Use `weight="bold"` or `weight="fill"` for prominent actions; default/regular for quiet affordances. Stroke icons sit on `--text-body`; filled icons can take accent colors.
  - CDN: `https://unpkg.com/@phosphor-icons/web` (then `<i class="ph-bold ph-heart"></i>`).
  - **Substitution flag:** Phosphor is a substitution — no brand icon set was supplied. Swap for the official set when available.
- **Food & sparkle “stickers”:** emoji (🍒 🧁 🍓 🍰 ✦ ⭐️) are used as **product stand-ins** in choice cards, the cake preview, and the sticker-bomb motif. These are placeholders for illustrated character stickers (cherries with cute faces, cream dollops) — **supply real art** to replace them for production.
- **No** custom hand-drawn SVG icon system; **no** unicode-symbol icons beyond the sparkle glyphs.

---

## INDEX — what’s in this system

**Root**
- `styles.css` — the single entry point consumers link. `@import`s every token + font file.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill manifest for using this system in Claude Code.

**Tokens** (`tokens/`)
- `fonts.css` — Google Fonts (Fredoka, Plus Jakarta Sans, Baloo 2). *See font-substitution note.*
- `colors.css` · `typography.css` · `spacing.css` · `elevation.css` · `motion.css`

**Foundation cards** (`guidelines/`) — the specimen cards shown in the Design System tab: brand colors, cream surfaces, accents, effects; display/body/numeric type; spacing, radii, elevation, motion; logo lockup, sticker-bomb.

**Components** (`components/`)
- `actions/` — **Button** (tactile pill CTA) *(starting point)*
- `selection/` — **ChoiceCard** (base/topping picker) *(starting point)*
- `decor/` — **Drip** (strawberry-sauce cherry edge)
- `cake/` — **CakePreview** (live layered render stage)
- `forms/` — **Input**, **Switch**
- `feedback/` — **Badge**, **Toast**

**UI kits** (`ui_kits/`)
- `microsite/` — the Cake Your Story builder microsite: landing → builder → share screens, interactive.

---

## Using the runtime

Components compile into a bundle exposed on `window.BakeSpaceDSCakeYourStory_aae867`. In any card/screen HTML, link `styles.css`, load `_ds_bundle.js`, then:

```js
const { Button, ChoiceCard, CakePreview, Badge, Toast, Input, Switch } =
  window.BakeSpaceDSCakeYourStory_aae867;
```

(Do not hand-edit `_ds_bundle.js`, `_ds_manifest.json`, or `_adherence.oxlintrc.json` — they’re generated.)
