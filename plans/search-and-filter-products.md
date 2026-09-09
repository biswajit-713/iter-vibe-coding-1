# Plan: Add Search and Category Filter to Product List

## Goal

Add a text search input and a category dropdown filter so users can narrow down the 10-product list by name and category. Both filters work together (AND logic).

---

## Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| State location | `App.jsx` (lifted state) | Single source of truth; child components stay controlled/pure |
| Filtering logic | `getFilteredProducts(products, search, category)` utility | Pure function, easy to unit test independently |
| Component split | `SearchBar` + `CategoryFilter` as separate components | Single-responsibility, independently testable |
| Category data source | Derived from `products.js` via `getUniqueCategories()` | No hardcoding; auto-adapts if products change |
| Styling | Add to existing `src/index.css` | Matches current pattern (single global CSS file) |
| Search target | Product `name` field only, case-insensitive substring match | Simple and intuitive |
| Category UI | `<select>` dropdown with "All Categories" default | Compact, space-efficient |

---

## Files to Create

### 1. `src/utils/filterProducts.js` — Pure filtering logic

```js
getFilteredProducts(products, searchTerm, selectedCategory)
```
- `searchTerm`: case-insensitive substring match on `product.name`
- `selectedCategory`: exact match on `product.category`; empty string = show all
- Returns filtered array (never mutates input)

```js
getUniqueCategories(products)
```
- Returns sorted array of unique category strings from products
- e.g. `["Accessories", "Electronics", "Home", "Stationery"]`

### 2. `src/components/SearchBar.jsx` — Text search input

- Props: `value` (string), `onChange` (callback receiving new value)
- Renders an `<input type="text">` with placeholder "Search products..."
- Controlled component (value + onChange)

### 3. `src/components/CategoryFilter.jsx` — Category dropdown

- Props: `categories` (string[]), `value` (string), `onChange` (callback)
- Renders a `<select>` with "All Categories" as the first `<option>`
- One `<option>` per category from the `categories` prop
- Controlled component

### 4. Test files (TDD — write these first)

| Test file | Tests |
|---|---|
| `src/utils/__tests__/filterProducts.test.js` | `getFilteredProducts`: returns all products when no filters; filters by name (partial, case-insensitive); filters by category; combines search + category; returns empty array when nothing matches. `getUniqueCategories`: returns sorted unique categories. |
| `src/components/__tests__/SearchBar.test.js` | Renders input with placeholder; displays current value; calls onChange when user types. |
| `src/components/__tests__/CategoryFilter.test.js` | Renders "All Categories" + all category options; displays current value; calls onChange on selection. |
| `src/__tests__/App.test.jsx` | Integration: all products visible initially; typing in search reduces visible products; selecting category reduces visible products; product count updates dynamically; combining search + category narrows results; "All Categories" shows all products again. |

---

## Files to Modify

### 1. `src/App.jsx`

**Changes:**
- Add `useState` for `searchTerm` (string, default `""`) and `selectedCategory` (string, default `""`)
- Import `SearchBar`, `CategoryFilter`, `getFilteredProducts`, `getUniqueCategories`
- Compute `filteredProducts = getFilteredProducts(products, searchTerm, selectedCategory)`
- Extract categories via `getUniqueCategories(products)`
- Render `SearchBar` and `CategoryFilter` between header and `ProductList`
- Pass `filteredProducts` (not `products`) to `ProductList`
- Update subtitle to show `filteredProducts.length` of `products.length` (e.g. "3 of 10 products")

### 2. `src/index.css`

**Add styles for:**

```
.filter-bar          — flex row container for search + dropdown, gap, margin-bottom
.filter-bar input    — flex: 1, padding, border, border-radius, font-size (matches .product-card aesthetic)
.filter-bar select   — padding, border, border-radius, font-size, min-width
.no-results          — centered text, gray, padding for empty state
```

---

## Implementation Order (TDD)

1. **Write all tests first** (4 test files)
2. **Run tests** — confirm they fail (red phase)
3. **Implement `filterProducts.js`** — run unit tests, confirm pass
4. **Implement `SearchBar.jsx`** — run component tests, confirm pass
5. **Implement `CategoryFilter.jsx`** — run component tests, confirm pass
6. **Modify `App.jsx`** — wire up state + new components, run integration tests
7. **Add CSS styles** to `src/index.css`
8. **Run full test suite** — `npm run test`
9. **Manual smoke test** — `npm run dev`, verify in browser

---

## Edge Cases Handled

| Case | Behavior |
|---|---|
| Empty search + "All Categories" | Shows all 10 products |
| Search matches nothing | Shows "No products match your filters." message |
| Category matches nothing (with search) | Shows "No products match your filters." message |
| Search is case-insensitive | "mouse" matches "Wireless Mouse" |
| Partial search match | "key" matches "Mechanical Keyboard" |
| Subtitle reflects filtered count | "3 of 10 products" updates live |

---

## Checklist

- [ ] Write tests for `getFilteredProducts` and `getUniqueCategories`
- [ ] Write tests for `SearchBar` component
- [ ] Write tests for `CategoryFilter` component
- [ ] Write integration tests for `App` filtering flow
- [ ] Implement `src/utils/filterProducts.js`
- [ ] Implement `src/components/SearchBar.jsx`
- [ ] Implement `src/components/CategoryFilter.jsx`
- [ ] Modify `src/App.jsx` to add state + wire components
- [ ] Add filter bar and no-results styles to `src/index.css`
- [ ] Run `npm run test` — all tests pass
- [ ] Run `npm run dev` — manual verification
