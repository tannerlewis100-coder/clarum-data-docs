

## Plan: Add 15% Discount Popup

A modal popup that offers 15% off in exchange for email and phone number, with two playful CTA buttons.

### Design
- Appears after a short delay (e.g., 5 seconds) on first visit
- Uses existing Dialog component styled with the site's navy/gold theme
- Stores dismissal in localStorage so it only shows once
- Two buttons: gold "YES, I LOVE SAVING MONEY" and a muted "No, I'd rather pay full price"

### Implementation

**New file: `src/components/DiscountPopup.tsx`**
- State managed with useState + useEffect (timer + localStorage check)
- Form with email input and phone number input
- Submit button: "YES, I LOVE SAVING MONEY" (gold variant)
- Dismiss link: "No, I'd rather pay full price" (muted text)
- On submit, stores `clarum-discount-shown` in localStorage and closes
- On dismiss, same localStorage flag, closes popup

**Edit: `src/App.tsx`**
- Import and render `<DiscountPopup />` alongside other global components

