

## Show Real COA Images in Expanded Card View

**Problem**: The expanded card currently shows either an iframe (B12 only) or a generic placeholder. You want the actual lab report scans (`/public/coa/*.jpg`) to display when clicking "View Certificate."

**Solution**: Add image display as the primary expanded content, using the `coaImage` path already stored on each product. Display it cleanly in a scrollable white container with a fullscreen modal on click.

### Changes to `src/pages/COALibrary.tsx`

**Expanded content section (lines 222-260)** — replace the current placeholder fallback with a three-tier priority:

1. **If `coaImage` exists** (most products): Show the JPG in a white-background scrollable container (`max-h-[700px]`, `rounded-xl`, `overflow-auto`, `bg-white`). Add a click handler to open a fullscreen modal. Include a subtle "Click to enlarge" hint overlay.

2. **If no `coaImage` but `embedUrl` exists** (B12): Keep the iframe with gold spinner as-is.

3. **If neither**: Show the current placeholder with "Open Full Report" button.

**Add fullscreen image modal** (new state + JSX at bottom of component):
- `selectedImage` state tracking which product's image is open
- Dark overlay (`bg-black/90 backdrop-blur-sm`) with scrollable full-size image
- Close button (X) + "Open in Drive" link in a top bar
- Click outside to dismiss

### Result
- Click "View Certificate" → card expands → shows the real lab report JPG at full width in a clean white container
- Click the image → fullscreen modal for detailed reading
- No blurry/overlapping text — images displayed at native resolution with proper containment

### Files Modified
- `src/pages/COALibrary.tsx`

