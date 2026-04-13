

## Remove Bad COA Images, Use Clean Placeholders

The static JPG images in `/public/coa/` have overlapping text and look unprofessional. We'll stop using them entirely and replace the expanded view with either a real PDF iframe (when available) or a clean placeholder pointing users to Google Drive.

### Changes

**`src/pages/COALibrary.tsx`** (expanded content section, lines 216-279):

1. **Keep iframe for direct file URLs** (currently only B12) -- works as-is with the loading spinner.

2. **Add placeholder fallback** when there's no embed URL but there is a `coaUrl` (folder link):
   - A styled container matching the card design (`bg-white/[0.03]`, `border-white/[0.06]`, `rounded-xl`)
   - Icon (FileText or Shield) centered with a message: "Full lab report available on Google Drive"
   - A gold-styled "Open Full Report" button that opens the Drive folder in a new tab
   - Height ~200px, clean and minimal

3. **Remove static image display** -- the expanded section currently only shows iframes, so no image code to remove there. The card thumbnails (coaImage on the non-expanded card in `CoaCard.tsx`) are not used on this page, so no changes needed there.

4. **Keep everything else** -- test result chips, action buttons, animation, gold accent bar all stay the same.

### Result
- Click "View Certificate" on B12 -> expands with real PDF iframe
- Click "View Certificate" on any other product -> expands with a clean dark placeholder + "Open Full Report" button linking to Drive folder
- No more blurry/overlapping images anywhere

### Files Modified
- `src/pages/COALibrary.tsx` -- add placeholder block in expanded content

