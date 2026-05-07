# ProlificWebCraft — Client Intake & Catalog Templates

A reusable kit of intake templates, validation scripts, and CI checks designed to **prevent data scrambles, duplicate products, image/name mismatches, and untracked schema drift** on full-stack e-commerce builds.

Born from real pain on the [xpress-yourself-boutique](https://github.com/M3GA-MAK3R/xpress-yourself-boutique) project (Pearl Heart Necklace duplicated, copy-pasted descriptions across n6/b9, swatches whose hex didn't match the variant name, group-card representatives mixing brooches with necklaces). This kit makes those classes of bugs structurally impossible — or at least loud and CI-blocking.

## What's in here

| Path | Purpose |
|---|---|
| [`templates/onboarding/client-kickoff.md`](templates/onboarding/client-kickoff.md) | Run this on day-1 of a new client. Captures brand, scope, stack, channels, decision-makers. |
| [`templates/edits-intake/edit-request.md`](templates/edits-intake/edit-request.md) | Drop-in form for **every** post-launch edit request. Forces the client to specify scope, files, asset URLs, and acceptance criteria upfront. |
| [`templates/catalog-spec/catalog-spec.yaml`](templates/catalog-spec/catalog-spec.yaml) | Single source of truth for product data. Replace ad-hoc JS objects with a YAML spec validated by CI. |
| [`templates/catalog-spec/IMAGE-NAMING.md`](templates/catalog-spec/IMAGE-NAMING.md) | Image asset naming rules so `/images/products/<slug>.jpg` always matches the product `slug`. |
| [`templates/qa/pre-merge-checklist.md`](templates/qa/pre-merge-checklist.md) | Pre-merge gate: run before opening any PR that touches catalog data. |
| [`scripts/validate-catalog.mjs`](scripts/validate-catalog.mjs) | Node validator. Run locally or in CI. Catches dupes, broken image refs, swatch/name mismatches, orphan variants, missing fields. |
| [`.github/workflows/validate-catalog.yml`](.github/workflows/validate-catalog.yml) | GitHub Actions workflow — drop into target repo to block bad merges. |
| [`.github/ISSUE_TEMPLATE/client-edit-batch.md`](.github/ISSUE_TEMPLATE/client-edit-batch.md) | Linear/GitHub issue template for client-edit batches. |

## How to use this on a new client

1. **Day 0 (pre-kickoff):** copy [`templates/onboarding/client-kickoff.md`](templates/onboarding/client-kickoff.md) to a fresh Notion/Obsidian/doc, send to client, fill together on call.
2. **Catalog setup:** copy [`templates/catalog-spec/catalog-spec.yaml`](templates/catalog-spec/catalog-spec.yaml) into the project repo at `data/catalog-spec.yaml`. Have the client populate it (or you populate it once from their existing data and have them sign off).
3. **Wire validation:** copy [`scripts/validate-catalog.mjs`](scripts/validate-catalog.mjs) into the project repo. Add `"validate:catalog": "node scripts/validate-catalog.mjs"` to `package.json`. Drop [`.github/workflows/validate-catalog.yml`](.github/workflows/validate-catalog.yml) into the project's `.github/workflows/`.
4. **Ongoing edits:** every time the client requests a change, point them at [`templates/edits-intake/edit-request.md`](templates/edits-intake/edit-request.md). No edit gets started until the form is filled.
5. **Pre-merge:** run [`templates/qa/pre-merge-checklist.md`](templates/qa/pre-merge-checklist.md) before opening any catalog PR.

## Why each piece exists (lessons from xpress-yourself-boutique)

| Pain | Template that prevents it |
|---|---|
| Pearl Heart Necklace duplicated under two IDs (n3, n6) with same image | catalog-spec validator: unique `(name, image)` constraint |
| n6's description copy-pasted from b9 (talking about a brooch on a necklace) | catalog-spec validator: `category` must match keywords in `description` |
| j3 "Pink & Green" variant with solid pink hex `#FF69B4` | catalog-spec: `color` field must be a gradient if variant name has `&`/`/` |
| Royal Blue swatch using a non-royal-blue image | catalog-spec validator: variant `image` must exist in `assets/products/` |
| `pearls-clusters` group mixing brooch (b18) with necklace (n6) | catalog-spec: group members must share `category` |
| New jewelry section never rendered on page (data computed but not displayed) | qa checklist: "manually click each navigation entry, count cards" |
| 6-edit batch grew into 10+ ad-hoc bug fixes mid-stream | edit-request form: "no scope creep" clause + amendments require new ticket |
| Resend smoke test parked indefinitely | edit-request form: "Done = client-confirmed acceptance" |

## Re-using on a different stack

These templates assume:
- React/Vite frontend + Supabase backend (loose-fit for any JS stack)
- Linear or GitHub Issues for tracking
- Markdown-first documentation

Easy to swap. The validator script is plain Node — no project deps. The YAML spec is portable.

## License

MIT — use freely on any project, client work, or fork.

---

Maintained by [ProlificWebCraft](https://github.com/M3GA-MAK3R) · Stephen Brown
