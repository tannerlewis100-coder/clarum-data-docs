## Goal
Eliminate the standalone `/coa-library` page and bring its core value — viewing each product's Certificate of Analysis — directly into the **ProductCard** itself, so users get the COA inline without leaving the catalog.

## 1. Remove the COA Library page

- **Delete** `src/pages/COALibrary.tsx`.
- **`src/App.tsx`**: remove the `import COALibrary from "./pages/COALibrary"` line and the `<Route path="/coa-library" element={<COALibrary />} />` route.
- **`src/components/Header.tsx`**: remove the `{ label: "COA Library", to: "/coa-library", accent: true }` nav item.
- **`src/components/Footer.tsx`**: remove the `{ label: "COA Library", to: "/coa-library" }` link.
- **`src/pages/Index.tsx`**: replace the four `to="/coa-library"` CTAs (lines 107, 164, 245, 376). Repoint them to `/shop` with copy like “Browse Tested Compounds” / “See COAs in the Catalog”, since COAs now live on each card.
- **`src/pages/About.tsx`** (line 149): same treatment — repoint to `/shop`.
- **`src/pages/ProductDetail.tsx`** (lines 258–263): remove the “View Full COA Library →” link. Replace with a direct **View COA** / **Download COA** pair (already partially present in the testing card).

## 2. Bring COA into the ProductCard

Update `src/components/ProductCard.tsx` so each card has an inline COA experience.

**Replace the small `COA` pill link** (currently `Link to="/coa-library?product=..."` on lines 122–129) with a **“View COA” button** that opens a lightweight modal/dialog showing that product's certificate.

**Data wiring**
- The cards consume `WcProduct` from WooCommerce (no `coaImage`/`coaUrl` fields). Reuse the local catalog in `src/data/products.ts` (`allProducts`) by matching on `product.slug` (or `getProductSlug`) to pull `coaImage`, `coaUrl`, and the `coa` panel data (purity, assay, identity, heavyMetals, tamc, tymc, sku, date, form). Add a small helper, e.g. `getLocalCoa(slug)`, in `src/data/products.ts`.
- If a local match exists with `coaImage` or `coaUrl`, treat the product as **COA-available**; otherwise show "COA available upon batch release" and disable the view button.

**Card UI changes**
- Top-right of the art panel: small **“COA Verified”** gold chip when a COA exists; otherwise a muted **“Batch pending”** chip.
- In the trust-badges row, replace the current `Link` to /coa-library with a **`<button>`** styled identically (gold pill, ShieldCheck icon, label “View COA”) that opens the inline modal. Stop event propagation so the parent `Link to /product/:slug` is not triggered.

**Inline COA modal (new component or co-located)**
- Create `src/components/ProductCoaModal.tsx` (uses existing `ui/dialog` primitive for accessibility / focus trap, styled to match the dark/gold theme).
- Contents:
  - Header: product name + dosage, "Pass" badge, batch SKU + test date.
  - Image preview: render `coaImage` on white background (per `mem://features/coa-library` rule). If only `coaUrl` exists, embed via the same `getEmbedUrl` Google Drive `/preview` helper (move that helper from `COALibrary.tsx` into `src/lib/utils.ts` or into the new modal file).
  - 6-panel test grid (Purity, Assay, Identity, Heavy Metals, TAMC, TYMC) reusing the styling currently in `COALibrary.tsx` lines 294–312.
  - Footer actions: **View Full Report** (opens `coaUrl` in new tab) and **Download** (same link with `download` attr where possible — Drive folders open externally).
  - Close button + click-outside dismiss.

## 3. Polish & cleanup

- Verify `CoaCard.tsx` (used elsewhere?). Quick `rg` check during implementation; if unused after removal, delete it. Currently I see no other importers besides `COALibrary`, so it can likely be removed.
- Ensure SEO: no broken internal links to `/coa-library`. A 404 shouldn't fire because the route is gone — the NotFound page will catch any external inbound link, which is acceptable.
- Keep brand tone: gold accents on dark navy, "Research Use Only" reminder beneath the COA modal footer.

## Files touched
- Delete: `src/pages/COALibrary.tsx`, possibly `src/components/CoaCard.tsx`
- Edit: `src/App.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/ProductCard.tsx`, `src/pages/Index.tsx`, `src/pages/About.tsx`, `src/pages/ProductDetail.tsx`, `src/data/products.ts` (add `getLocalCoa` helper)
- New: `src/components/ProductCoaModal.tsx`

## Result
- `/coa-library` no longer exists anywhere in nav, footer, homepage, or product page.
- Every product card has a **View COA** button that opens an inline modal with the certificate image + 6-panel results + download link, sourced per-product. Cards without a COA show a clean “Batch pending” state — no fake data.
