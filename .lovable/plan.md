

## Fix: Inner Content Wrappers Collapsing to 300px

The homepage sections use Tailwind's `container` utility, which relies on the project's custom container config (only `2xl: 1400px` is defined in `tailwind.config.ts`). This can cause unexpected width behavior at certain breakpoints.

### Changes

**File: `src/pages/Index.tsx`** — Replace `container mx-auto px-4 lg:px-8` with `w-full max-w-7xl mx-auto px-6 lg:px-8` on all inner wrapper divs:

1. **Hero** (line 37): `container mx-auto px-4 lg:px-8` → `w-full max-w-7xl mx-auto px-6 lg:px-8`
2. **Testing Standards** (line 135): same swap
3. **Brand Story** (line 257): same swap
4. **Featured Products** (line 299): `container mx-auto px-4 lg:px-8` → `w-full max-w-7xl mx-auto px-6 lg:px-8`
5. **Closing CTA** (line 330): same swap

This ensures every section's inner div explicitly fills its parent (`w-full`) and caps at a readable max width (`max-w-7xl` = 1280px).

