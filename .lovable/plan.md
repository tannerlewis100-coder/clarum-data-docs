

## Full Dark Mode Redesign

Transform the entire site into a seamless dark experience with no white/light sections. Every page will use the navy color system with gold accents.

### Color System

| Token | Value | Usage |
|-------|-------|-------|
| Primary BG | `#0F1A2E` | Main sections |
| Alternate BG | `#0A1220` | Alternating sections |
| Card surface | `rgba(255,255,255,0.03)` | All cards |
| Card border | `rgba(255,255,255,0.06)` | All card borders |
| Text primary | `rgba(255,255,255,0.90)` | Headings |
| Text secondary | `rgba(255,255,255,0.50)` | Body text |
| Text tertiary | `rgba(255,255,255,0.25)` | Small/muted text |

### Files to Modify

**1. `src/index.css`** — Update `:root` CSS variables to dark values:
- `--background` → dark navy (`218 55% 7%`)
- `--foreground` → white 90% (`0 0% 100%`)
- `--card` → near-black (`220 60% 5%`)
- `--card-foreground` → white
- `--border` → `white/6%`
- `--input` → dark
- `--muted` / `--secondary` → darker navy shades
- `--muted-foreground` → white/50
- Add `--navy-alt: 216 60% 6%` for `#0A1220`

**2. `tailwind.config.ts`** — Add `navy-alt` color token for alternating sections.

**3. `src/pages/Index.tsx`** — Featured Products section:
- Change `bg-offwhite` → `bg-[#0A1220]`
- Add `border-t border-white/[0.03]` between sections
- Update heading `text-foreground` → `text-white`
- Update body `text-muted-foreground` → `text-white/50`
- Add gold dot-grid texture to alternating sections
- Add radial gold glow behind key sections

**4. `src/components/ProductCard.tsx`**:
- `bg-card` → `bg-white/[0.03]`
- `border-border` → `border-white/[0.06]`
- `text-foreground` → `text-white`
- `text-muted-foreground` → `text-white/30`
- `text-navy/40` (per-mg) → `text-white/20`
- ADD button: `bg-white/[0.06] text-white/80 border border-white/[0.08]` with `hover:bg-gold hover:text-navy`
- Arrow button: same glass style

**5. `src/pages/Shop.tsx`**:
- `bg-background` → `bg-[#0A1220]`
- Search input: dark glass styling (`bg-white/[0.04] border-white/[0.08]`)
- Select dropdown: same dark glass
- Price slider area: dark styling
- Count text: `text-white/50`

**6. `src/pages/About.tsx`**:
- Story section: `bg-background` → `bg-[#0A1220]`
- `text-foreground` → `text-white`, `text-muted-foreground` → `text-white/50`
- Values section: `bg-secondary` → `bg-[#0F1A2E]`
- Value cards: glass card style
- Divider: `border-white/[0.03]`

**7. `src/pages/Contact.tsx`**:
- Content section: `bg-background` → `bg-[#0A1220]`
- Form card: `bg-white/[0.03] border-white/[0.06]`
- Input fields: dark glass (`bg-white/[0.04] border-white/[0.08] text-white`)
- Contact info icons: dark glass bg
- Social/link pills: dark glass

**8. `src/pages/FAQ.tsx`**:
- Content section: `bg-background` → `bg-[#0A1220]`
- Accordion items: `bg-white/[0.03] border-white/[0.06]`
- Question text: `text-white`
- Answer text: `text-white/50`

**9. `src/pages/ProductDetail.tsx`**:
- Content section: `bg-background` → `bg-[#0A1220]`
- All `text-foreground` → `text-white`
- All `text-muted-foreground` → `text-white/50`
- COA results card: glass card style
- Variant buttons: dark glass inactive state
- `text-emerald-600` → `text-emerald-400`

**10. `src/components/CartDrawer.tsx`**:
- `bg-card` → `bg-[#0F1A2E]`
- `bg-background` items → `bg-white/[0.03]`
- All text: white/opacity variants
- Borders: `border-white/[0.06]`

**11. `src/pages/COALibrary.tsx`** — Already dark, minor consistency pass (ensure borders use `white/[0.06]`).

**12. Section separators** — Add `border-t border-white/[0.03]` between each major section across all pages.

**13. Subtle textures** — Add `gold-grid-texture` overlay on alternating `#0A1220` sections and radial `bg-gold/[0.02] blur-[100px]` glow accents behind key content areas.

### What stays the same
- Header (already dark)
- Footer (already dark)
- AgeGate and DiscountPopup (already dark navy)
- COA Library (already dark-themed)
- All existing COA data and Google Drive links

