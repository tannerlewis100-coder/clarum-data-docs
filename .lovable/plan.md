

## Add 10 More COA PNG Images

Copy the 10 newly uploaded COA screenshots to `public/coa/` and update `coaImage` paths in `src/data/products.ts`.

### Step 1: Copy files to `public/coa/`

| Upload | Destination |
|---|---|
| `BPC-157-_20mg.png` | `public/coa/BPC-157-(20mg).png` |
| `Cagrilintide.png` | `public/coa/Cagrilintide.png` |
| `CJC-1295-With-DAC.png` | `public/coa/CJC-1295-With-DAC.png` |
| `CJC-1295-Without-DAC.png` | `public/coa/CJC-1295-Without-DAC.png` |
| `DSIP-_5mg.png` | `public/coa/DSIP-(5mg).png` |
| `DSIP-_15mg.png` | `public/coa/DSIP-(15mg).png` |
| `Epitalon-_10mg.png` | `public/coa/Epitalon-(10mg).png` |
| `FOXO4.png` | `public/coa/FOXO4.png` |
| `GDF-8.png` | `public/coa/GDF-8.png` |
| `GHK-Cu-_50mg.png` | `public/coa/GHK-Cu-(50mg).png` |

### Step 2: Update `src/data/products.ts`

Update `coaImage` for these 10 products to point to the new PNG files. Most paths should already match from the earlier bulk update -- just verify and fix any mismatches.

### Files Modified
- `public/coa/` -- 10 new PNG files
- `src/data/products.ts` -- verify/fix `coaImage` paths for 10 products

