

## Crop All 45 COA Images

**What's happening**: Every COA image (1000x1300) has dark gray borders — about 97px on the left, 16px on the right, and 16px on the bottom. The actual lab report document sits in a consistent region across all 45 images. We'll auto-crop all of them to remove these borders cleanly.

### Step 1: Batch crop all 45 PNGs in `public/coa/`

Write a Python script that:
1. Iterates all `.png` files in `public/coa/`
2. For each image, detects the content region by finding where pixels differ from the dark border color `rgb(30, 30, 31)`
3. Crops to the content bounds with a small uniform padding (2-4px)
4. Overwrites the original file with the cropped version
5. Reports before/after dimensions

Based on analysis, all 45 images share the same content bounds (top=0, bottom=1284, left=97, right=984), so cropping will produce clean ~887x1284 documents showing just the lab report with no surrounding dark chrome.

### Files Modified
- All 45 PNG files in `public/coa/` — cropped in-place

