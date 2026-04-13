

## Redesign Expanded COA Card to Match Product Card Style

**Problem**: When clicking "View Certificate", the COA image expands to full width across 3 columns, making it overwhelmingly large. The user wants it to feel like a contained product card instead.

**Solution**: Instead of spanning the full grid width, keep the card in its single column and show the COA image in a compact, styled card format — similar to the shop's product cards — with a constrained image preview, product info header, test results summary, and action buttons.

### Changes to `src/pages/COALibrary.tsx`

1. **Remove full-width expansion** — delete the `sm:col-span-2 lg:col-span-3` class when expanded. The card stays in its single grid cell.

2. **Redesign expanded content** to look like a premium product card:
   - COA image shown in a contained `aspect-[8.5/11]` container (letter-size ratio) with `max-h-[400px]` and `object-cover object-top`, rounded corners, inside a white background wrapper
   - Below the image: a compact row of test result fields (Purity, Assay, Identity, Heavy Metals, TAMC, TYMC) in a 3×2 mini-grid using small labels and values with green check marks
   - Action buttons styled like the shop cards: a primary "View Full COA" button (emerald) and a secondary "Google Drive" icon button, both compact and rounded

3. **Add click-to-enlarge modal** — clicking the COA image preview opens a fullscreen lightbox modal (reusing the pattern from `CoaCard.tsx`) so users can still see the full document when they want to.

4. **Smooth expand/collapse** — use `max-height` + `overflow-hidden` with a 300ms transition for the reveal animation.

### Visual Result

```text
┌─────────────────────────┐
│▌ BPC-157         [PASS] │  ← collapsed card (unchanged)
│▌ 5mg Lyophilized...     │
│▌ 99%+ | HM: ND | 6Panel│
│▌ View Certificate →     │
│                         │
│  ┌───────────────────┐  │  ← expanded: contained image
│  │   COA PDF Image   │  │     (click to enlarge)
│  │   (aspect ratio   │  │
│  │    constrained)    │  │
│  └───────────────────┘  │
│  Purity  Assay  Identity│  ← mini test results grid
│  HM      TAMC   TYMC   │
│                         │
│  [View Full COA] [🔗]   │  ← action buttons
└─────────────────────────┘
```

### Files Modified
- `src/pages/COALibrary.tsx` — restructure expanded state, add modal, remove col-span overrides

