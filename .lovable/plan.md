

## Copy Uploaded COA PNGs to Project and Update Paths

**What's happening**: You've uploaded 10 high-quality COA screenshot PNGs. These need to be copied into `public/coa/` and the `coaImage` paths in `src/data/products.ts` updated to match the actual filenames.

### Step 1: Copy uploaded images to `public/coa/`

Copy each uploaded file to `public/coa/` keeping their original filenames:
- `user-uploads://BPC-157-_5mg.png` -> `public/coa/BPC-157-(5mg).png`
- `user-uploads://BPC-157-_10mg.png` -> `public/coa/BPC-157-(10mg).png`
- `user-uploads://2X-Blend-CJCIpamorelin.png` -> `public/coa/2X-Blend-CJCIpamorelin.png`
- `user-uploads://4X-Blend.png` -> `public/coa/4X-Blend.png`
- `user-uploads://5-Amino-1MQ-_5mg.png` -> `public/coa/5-Amino-1MQ-(5mg).png`
- `user-uploads://5-Amino-1MQ-_50mg.png` -> `public/coa/5-Amino-1MQ-(50mg).png`
- `user-uploads://8X-Blend.png` -> `public/coa/8X-Blend.png`
- `user-uploads://ACE-031.png` -> `public/coa/ACE-031.png`
- `user-uploads://AOD-9604.png` -> `public/coa/AOD-9604.png`
- `user-uploads://B12.png` -> `public/coa/B12.png`

### Step 2: Update `src/data/products.ts`

Update `coaImage` paths for these 10 products to match the new PNG filenames. The paths already match for most -- just need to verify and fix any mismatches (e.g. `2X-Blend-CJCIpamorelin.png`, `4X-Blend.png`, `8X-Blend.png`).

Products updated:
- BPC-157 (5mg) -> `/coa/BPC-157-(5mg).png`
- BPC-157 (10mg) -> `/coa/BPC-157-(10mg).png`
- 2X Blend CJC/Ipamorelin -> `/coa/2X-Blend-CJCIpamorelin.png`
- 4X Blend -> `/coa/4X-Blend.png`
- 5-Amino-1MQ (5mg) -> `/coa/5-Amino-1MQ-(5mg).png`
- 5-Amino-1MQ (50mg) -> `/coa/5-Amino-1MQ-(50mg).png`
- 8X Blend -> `/coa/8X-Blend.png`
- ACE-031 -> `/coa/ACE-031.png`
- AOD 9604 -> `/coa/AOD-9604.png`
- B12 -> `/coa/B12.png`

### Result
- These 10 products will show the real, high-quality lab report screenshots when "View Certificate" is clicked
- Remaining products keep their current images/placeholders until more PNGs are uploaded

### Files Modified
- `public/coa/` -- 10 new PNG files added
- `src/data/products.ts` -- update `coaImage` paths for 10 products

