

## Fix COA Images: Remove Bad JPGs, Use Google Drive PDF Embeds

**The core problem**: The 48 JPG files in `/public/coa/` have overlapping text and look AI-generated. They are not usable as certificate previews.

**The constraint**: Most products link to Google Drive *folders* (not individual files), which cannot be embedded in an iframe. Only B12 has a direct file URL that works as an iframe embed.

### What changes

**`src/pages/COALibrary.tsx`** — Reorder the expanded content priority:

1. **First priority: `coaEmbed` / direct file URL** — Show the iframe PDF preview (currently only B12). Keep the gold loading spinner.

2. **Second priority: `coaUrl` folder link (most products)** — Show a styled placeholder with a prominent "View Full Report on Google Drive" button. No broken image. Clean dark container matching the card design.

3. **Remove `coaImage` from expanded view entirely** — The `product.coaImage` check on line 225 gets removed. The bad JPGs will no longer display when expanding a card.

4. **Remove the fullscreen image modal** — Since images are no longer shown in expansion, the `selectedImage` state and modal (lines 56, 360-397) are removed.

**`src/data/products.ts`** — Add a comment explaining how to enable inline PDF preview for more products: change `coaUrl` from a folder link to a file link, or add a `coaEmbed` field with the direct `/file/d/{ID}/preview` URL.

**No changes to `CoaCard.tsx`** — It's not used on the COA Library page.

### How to get inline previews for more products

For each Google Drive folder, you'd open it, find the PDF file inside, copy its file ID, and add it as `coaEmbed: "https://drive.google.com/file/d/{FILE_ID}/preview"` in `products.ts`. Each product you do this for will immediately show the real PDF inline instead of the placeholder. This is something you can do gradually, product by product.

### Result
- No more broken/overlapping-text images anywhere
- B12 shows real inline PDF preview
- All other products show a clean placeholder with a button to view on Drive
- As you add `coaEmbed` file URLs to products, they automatically get inline previews

### Files modified
- `src/pages/COALibrary.tsx`
- `src/data/products.ts` (comment only)

