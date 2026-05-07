# Pre-Merge QA Checklist

> Run through this list **before** marking a PR ready for review. Half of these
> failures are invisible to the validator — only a human clicking the site can
> catch them.

PR: ____________________   Reviewer: ____________________   Date: __________

---

## 1. Validator & build

- [ ] `node scripts/validate-catalog.mjs` exits 0 with no warnings
- [ ] `npm run build` completes with no errors
- [ ] No new console errors or warnings in browser devtools on the affected pages
- [ ] No new ESLint / TypeScript errors

## 2. Navigation walkthrough (manual click test)

> **Click every nav entry.** This is the only way to catch sections that exist
> in code but never render on the page (a Jewelry section was missing for a
> full sprint because no one clicked the link).

For every nav item / route in the site:

- [ ] The link is reachable from the homepage
- [ ] The destination page loads without 404 or blank-screen
- [ ] At least one card / product / piece of content is visible
- [ ] The expected number of cards matches `catalog-spec.yaml`:
      `<page>` expected: ____  actual: ____
- [ ] Page title and breadcrumb match the nav label

## 3. Catalog integrity

For every product changed in this PR:

- [ ] Product card image matches product detail-page image
- [ ] All variant swatches render with correct color (no white squares)
- [ ] Multi-color variant names (`A & B`, `A/B`) use a CSS gradient, not solid hex
- [ ] Clicking a variant swatch updates the displayed image
- [ ] Description text is unique to the product (not copy-pasted from a sibling)
- [ ] Price renders with currency symbol and two decimals
- [ ] Add-to-cart still works (if applicable)

## 4. Image audit

- [ ] No broken image icons anywhere on affected pages
- [ ] All images load over HTTPS (no mixed content)
- [ ] All filenames match `IMAGE-NAMING.md` rules
- [ ] No image > 500 KB committed (run `du -h public/images/products/*.jpg | sort -h | tail`)

## 5. Responsive sanity

- [ ] Desktop (1440 px) — layout intact, no overflow
- [ ] Tablet (768 px) — nav collapses correctly, cards re-flow
- [ ] Mobile (375 px) — text readable, buttons tappable, no horizontal scroll
- [ ] Product detail page works on mobile (variant selector, image gallery)

## 6. Functional smoke tests

- [ ] Contact form submits and produces expected confirmation
- [ ] Email send (if any) actually arrives in the destination inbox — **test, don't trust**
- [ ] Auth flow (if any): sign-in, sign-out, password reset
- [ ] Payment flow (if any): test card processes through Stripe test mode
- [ ] Search (if any) returns results for a known product name

## 7. SEO & meta

- [ ] Page `<title>` is unique per route
- [ ] OpenGraph image is set on share-eligible pages
- [ ] No `noindex` left over from staging
- [ ] Sitemap regenerated if routes were added/removed

## 8. Repo hygiene

- [ ] PR description references the edit-request ticket
- [ ] Commit messages reference scope-table item numbers (`fix: edit #3 — …`)
- [ ] No `console.log`, `debugger`, commented-out blocks, or TODOs without ticket links
- [ ] No secrets or `.env` values committed
- [ ] CI is green

## 9. Client acceptance

- [ ] Deploy preview URL shared with client
- [ ] Client has clicked through and **confirmed in writing**
- [ ] Outstanding client comments are either addressed or filed as a new batch

---

**Sign-off:** This PR satisfies every item above to the best of my knowledge.

Reviewer name: ____________________   Signature / date: ____________________
