

## Fix: Only Expand the Clicked COA Card (Not the Whole Row)

**Problem**: CSS Grid rows stretch to match the tallest item. When a card expands, sibling cards in the same row grow taller too, making it look like the whole row opened.

**Fix**: Add `items-start` to the grid container on line 143 of `src/pages/COALibrary.tsx`. This makes each card only take up as much vertical space as its own content needs.

### Change

**`src/pages/COALibrary.tsx`** line 143:
- Before: `className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"`
- After: `className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start"`

One line change. The expanded card will grow independently while its neighbors stay compact.

