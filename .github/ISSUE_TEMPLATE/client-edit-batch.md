---
name: Client edit batch
about: A numbered batch of edits requested by a client. One ticket = one branch = one PR.
title: "client-edits-YYYY-MM-DD — <client name>"
labels: ["client-edits"]
assignees: []
---

<!--
  Fill out every section below. If a section doesn't apply, write "n/a"
  rather than deleting it — future-you will appreciate the audit trail.

  Hard rules:
    - This ticket is FROZEN once work begins.
    - Mid-sprint amendments require a NEW ticket — do not edit the scope table.
    - "Done" requires the client's written acceptance, not just a green PR.
-->

## Meta

- **Client:**
- **Site / repo:**
- **Branch:** `feat/client-edits-YYYY-MM-DD`
- **Quoted hours:** ____   **Rate:** $____   **Total:** $____
- **Deposit received:** ☐ yes ☐ no   date: ____
- **Target completion:** YYYY-MM-DD

## Scope (numbered, exhaustive)

| # | Type | Target | Change requested |
|---|------|--------|------------------|
| 1 |      |        |                  |
| 2 |      |        |                  |
| 3 |      |        |                  |

**Total edits:** ____   (cap = 10; split bigger jobs into multiple batches)

## Acceptance criteria

For each numbered edit above, list a testable acceptance check.

- [ ] #1 — …
- [ ] #2 — …
- [ ] #3 — …

## Out of scope

> Things the client mentioned but are NOT in this batch:
- …

## Assets

- [ ] All images delivered ≥1200px on long edge
- [ ] Image filenames match `IMAGE-NAMING.md`
- [ ] Copy delivered as plain text (not PDF/Word)
- [ ] All hex codes / gradients confirmed by client
- [ ] All product data captured in `catalog-spec.yaml`

## Definition of Done

- [ ] PR merged to `main`
- [ ] Production deploy verified at: ______________
- [ ] Validator passes in CI
- [ ] QA checklist passed (`templates/qa/pre-merge-checklist.md`)
- [ ] **Client confirmed acceptance in writing** (paste link / quote here)
- [ ] Final invoice sent

## References

- Edit-request form: `templates/edits-intake/edit-request.md`
- QA checklist: `templates/qa/pre-merge-checklist.md`
- Catalog spec: `templates/catalog-spec/catalog-spec.yaml`
- Image rules: `templates/catalog-spec/IMAGE-NAMING.md`
