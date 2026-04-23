

## Cinematic Hero Scroll Animation

Transform the hero into an Apple-style "scroll-driven" sequence where the headline, COA card, and proof points choreograph as the user scrolls — instead of everything appearing static on load.

### The experience (what the user will see)

```text
SCROLL 0%  ──────────────────────────────────────────────
   "Pharmaceutical Grade Peptides" eyebrow fades up
   Headline "Nothing Hidden." types/reveals word by word
   "Everything Tested." gold gradient sweeps across italic
   COA card sits small + tilted at 8°, slightly offset right

SCROLL 15% ──────────────────────────────────────────────
   Subhead + CTAs fade up from below with slight blur clear
   COA card untilts to 0°, scales 0.9 → 1.0
   Gold blur-orbs drift outward (parallax)

SCROLL 30% ──────────────────────────────────────────────
   COA card "fills in" — HPLC bar grows, check rows
   stagger in one by one (already animated, now driven
   by scroll position not autoplay)
   Stat pills fade in left-to-right as they enter view

SCROLL 50–80% ───────────────────────────────────────────
   Hero becomes "sticky" for ~1 viewport height.
   Headline subtly scales up + fades, COA card lifts
   and drifts upward with parallax depth
   Gold line-texture background scrolls slower (parallax)

SCROLL 100% ─────────────────────────────────────────────
   Hero releases, next section "We Test What Others Skip"
   slides up underneath with its own reveal cascade
```

Three signature touches that make it feel premium:
1. **Scroll-linked parallax** — COA card, blur orbs, and grid texture move at different speeds creating depth.
2. **Sticky hero with progress-driven animation** — the hero "holds" for one extra viewport while elements animate, then releases.
3. **Word-by-word headline reveal** on initial mount with a gold gradient sweep across the italic line (Awwwards staple).

### Technical approach

- **Library:** `framer-motion` (already aligns with React/Vite, ~30kb gzipped, no build changes). Uses `useScroll` + `useTransform` for scroll-linked values and `motion.div` for declarative animation.
- **Sticky container:** Wrap hero in a `relative h-[180vh]` outer with an inner `sticky top-0 h-screen` so the hero pins for one extra viewport of scroll while animations play out.
- **Scroll progress:** `useScroll({ target: heroRef, offset: ["start start", "end end"] })` gives 0→1 progress. Map to:
  - Headline: `y: [0, -40]`, `opacity: [1, 0.3]`, `scale: [1, 1.05]` (progress 0.5→1)
  - COA card: `rotate: [8, 0, -2]`, `y: [0, -80]`, `scale: [0.92, 1, 1.02]`
  - Blur orbs: `x` parallax at different multipliers (0.3x, 0.6x)
  - Grid texture: `y: [0, 100]` for slow background drift
- **Mount entrance:** `motion.span` per word in headline with `staggerChildren: 0.08`, `y: 20 → 0`, `opacity: 0 → 1`, `filter: blur(8px) → blur(0)`. Gold gradient sweep via animated `background-position` on the italic span.
- **Reduced motion:** Wrap all transforms in `useReducedMotion()` check — falls back to current static layout.
- **Mobile:** Disable sticky/parallax below `lg` breakpoint (keeps the existing layout intact, only adds the mount entrance).

### Files to change

- `src/pages/Index.tsx` — restructure the hero `<section>` into sticky wrapper + motion children. Other sections untouched.
- `package.json` — add `framer-motion` dependency.
- `src/hooks/use-scroll-reveal.ts` — unchanged; remaining sections still use it.

### Out of scope

- Other sections (Featured, Testing, COA, Footer) keep current reveal behavior.
- No changes to colors, copy, or COA card data.
- No video/canvas/WebGL — pure CSS transforms via framer-motion for performance.

