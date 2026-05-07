# Edit Request — Intake Form

> One form per **batch** of edits. File this as a Linear/GitHub issue using the
> `client-edit-batch` template. **No scope creep:** anything not listed here
> requires a NEW ticket — do not append mid-sprint.

---

## 1. Meta

- **Client:**
- **Site / Repo:**
- **Batch ID:** `client-edits-YYYY-MM-DD`
- **Requested by:** (client contact name + email)
- **Date filed:**
- **Target completion date:**
- **Branch name:** `feat/client-edits-YYYY-MM-DD`

---

## 2. Scope (numbered, exhaustive)

> Number every individual edit. If you cannot number it, it is not in scope.
> Re-opening this ticket to add items is forbidden — open a new batch.

| # | Type | Target | Change requested |
|---|------|--------|------------------|
| 1 | (text / image / product / nav / style / bug) | (page or product slug) | (one sentence) |
| 2 | | | |
| 3 | | | |

**Total edits in this batch:** ____  (hard cap: 10. Above 10 → split into two batches.)

---

## 3. Per-edit detail

> Repeat this block once per numbered edit above. Skip any block that is
> trivially obvious (e.g., a typo fix), but be explicit about file targets.

### Edit #1

- **Type:** text | image | product (add) | product (remove) | product (variant) | nav | style | copy | seo | bug
- **Files / paths affected:** (e.g., `src/data/pookalitaProducts.js`, `public/images/products/...`)
- **Asset URLs:** (paste links to any images, logos, copy docs the client provided)
- **Old value (if applicable):**
- **New value:**
- **Acceptance criteria:** (how the developer confirms it's done — be testable)
  - [ ] Visible at `<route>`
  - [ ] Card image matches product detail image
  - [ ] No console errors
- **Notes / context:**

### Edit #2
…

---

## 4. Out of scope (explicit)

> List anything the client mentioned in passing that is NOT being done in this
> batch. Forces the conversation upfront instead of mid-sprint.

- Example: "Adding new payment methods — punted to next batch."
- Example: "Mobile redesign — separate engagement."

---

## 5. Assets checklist

- [ ] All new images delivered at final resolution (≥1200px on long edge)
- [ ] All images named per `templates/catalog-spec/IMAGE-NAMING.md`
- [ ] All copy delivered as plain text (no PDFs / Word docs to retype)
- [ ] All product data fields populated in `templates/catalog-spec/catalog-spec.yaml`
- [ ] Hex codes for any color swatches confirmed by client
- [ ] Dual-color / gradient variants flagged (must use CSS gradient, not solid hex)

---

## 6. Pricing & timeline

- **Quoted hours:**
- **Rate:**
- **Fixed-price total:** $____
- **Deposit received:** ☐ yes ☐ no — date: ____
- **ETA to PR:**
- **Payment due on:** ☐ PR merge  ☐ deploy  ☐ client acceptance

---

## 7. Definition of Done

A batch is **Done** only when **all** are true:

- [ ] PR merged to `main`
- [ ] Production deploy verified (URL: ______________)
- [ ] Each acceptance criterion above is checked
- [ ] Validator passes in CI (`scripts/validate-catalog.mjs`)
- [ ] QA checklist passed (`templates/qa/pre-merge-checklist.md`)
- [ ] **Client has explicitly confirmed acceptance in writing** (email / Linear comment / Slack)
- [ ] Final invoice sent

> "I think it looks good" from the developer is **not** Done. Done = client says Done.

---

## 8. Amendments

> Anything not in the table above and discovered mid-sprint must be logged here
> AS A LINK to a new ticket. Never edit the scope table after work begins.

- (none)
