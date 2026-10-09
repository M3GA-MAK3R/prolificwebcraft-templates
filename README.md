# ProlificWebCraft — Client Intake & Catalog Templates

A reusable kit of intake templates, validation scripts, and CI checks designed to **prevent data scrambles, duplicate products, image/name mismatches, and untracked schema drift** on full-stack e-commerce builds.

Born from real pain on the [xpress-yourself-boutique](https://github.com/M3GA-MAK3R/xpress-yourself-boutique) project (Pearl Heart Necklace duplicated, copy-pasted descriptions across n6/b9, swatches whose hex didn't match the variant name, group-card representatives mixing brooches with necklaces). This kit makes those classes of bugs structurally impossible — or at least loud and CI-blocking.

## What's in here

| Path | Purpose |
|---|---|
| [`templates/onboarding/client-kickoff.md`](templates/onboarding/client-kickoff.md) | Run this on day-1 of a new client. Captures brand, scope, stack, channels, decision-makers. |
| [`templates/contracts/sow-template.md`](templates/contracts/sow-template.md) | Formal Statement of Work template — the signed contract for each engagement; supersedes the kickoff brief's bare signature lines. |
| [`templates/edits-intake/edit-request.md`](templates/edits-intake/edit-request.md) | Drop-in form for **every** post-launch edit request. Forces the client to specify scope, files, asset URLs, and acceptance criteria upfront. |
| [`templates/catalog-spec/catalog-spec.yaml`](templates/catalog-spec/catalog-spec.yaml) | Single source of truth for product data. Replace ad-hoc JS objects with a YAML spec validated by CI. |
| [`templates/catalog-spec/IMAGE-NAMING.md`](templates/catalog-spec/IMAGE-NAMING.md) | Image asset naming rules so `/images/products/<slug>.jpg` always matches the product `slug`. |
| [`templates/qa/pre-merge-checklist.md`](templates/qa/pre-merge-checklist.md) | Pre-merge gate: run before opening any PR that touches catalog data. |
| [`scripts/validate-catalog.mjs`](scripts/validate-catalog.mjs) | Node validator. Run locally or in CI. Catches dupes, broken image refs, swatch/name mismatches, orphan variants, missing fields. |
| [`.github/workflows/validate-catalog.yml`](.github/workflows/validate-catalog.yml) | GitHub Actions workflow — drop into target repo to block bad merges. |
| [`.github/ISSUE_TEMPLATE/client-edit-batch.md`](.github/ISSUE_TEMPLATE/client-edit-batch.md) | Linear/GitHub issue template for client-edit batches. |

## How to use this on a new client

1. **Day 0 (pre-kickoff):** copy [`templates/onboarding/client-kickoff.md`](templates/onboarding/client-kickoff.md) to a fresh Notion/Obsidian/doc, send to client, fill together on call.
2. **Sign the SOW:** copy [`templates/contracts/sow-template.md`](templates/contracts/sow-template.md), fill every `{{field}}`, and route it through the Prolific Documenso fork ([M3GA-MAK3R/d0cum3n50](https://github.com/M3GA-MAK3R/d0cum3n50)) for e-signature. No work begins until the SOW is signed.
3. **Catalog setup:** copy [`templates/catalog-spec/catalog-spec.yaml`](templates/catalog-spec/catalog-spec.yaml) into the project repo at `data/catalog-spec.yaml`. Have the client populate it (or you populate it once from their existing data and have them sign off).
4. **Wire validation:** copy [`scripts/validate-catalog.mjs`](scripts/validate-catalog.mjs) into the project repo. Add `\"validate:catalog\": \"node scripts/validate-catalog.mjs\"` to `package.json`. Drop [`.github/workflows/validate-catalog.yml`](.github/workflows/validate-catalog.yml) into the project's `.github/workflows/`.
5. **Ongoing edits:** every time the client requests a change, point them at [`templates/edits-intake/edit-request.md`](templates/edits-intake/edit-request.md). No edit gets started until the form is filled.
6. **Pre-merge:** run [`templates/qa/pre-merge-checklist.md`](templates/qa/pre-merge-checklist.md) before opening any catalog PR.

## Sourcing from Saltcorn

For live ProlificWebCraft engagements, the CRM-of-record is **Saltcorn**
(deployed on the VPS, reachable at `saltcorn.smartmortal.net`). Client and
catalog data are exported from Saltcorn into the client repo on demand.

1. Store per-client Saltcorn credentials in `/root/.hermes/clients/<slug>/.env`
   (`SALTCORN_BASE_URL`, `SALTCORN_API_TOKEN`, `SALTCORN_TABLE`).
2. Export the table. Two verified paths:

   **Via Saltcorn REST API** (`/api/<table>/`, Bearer-token auth — a 401 means
   the path exists but the token is missing; a 404 means the table name is
   wrong):

   ```bash
   source /root/.hermes/clients/<slug>/.env
   curl -sH "Authorization: Bearer $SALTCORN_API_TOKEN" \
     "$SALTCORN_BASE_URL/api/$SALTCORN_TABLE/" > /tmp/catalog.json
   ```

   **Via Postgres directly** (Saltcorn's own DB on the VPS; relation names
   append `table` — a table named `catalog` appears as `catalogtable`,
   verify with `\dt`):

   ```bash
   docker exec saltcorn-postgres psql -U saltcorn -d saltcorn \
     -c "COPY (SELECT json_agg(row_to_json(t)) FROM ${SALTCORN_TABLE}table) TO STDOUT WITH CSV" \
     > /tmp/catalog.json
   ```

3. Convert the JSON to the YAML catalog spec following the export rules below,
   then validate:

   ```bash
   node scripts/validate-catalog.mjs templates/catalog-spec/catalog-spec.yaml --images public
   ```

   *(The Twenty exporter at [`scripts/twenty-export.mjs`](scripts/twenty-export.mjs)
   is retained for existing Twenty accounts — see Legacy below.)*

4. In CI, the checked-in fixture at `tests/fixtures/expected-catalog.yaml` is the
   source of truth. Any exporter must produce a byte-for-byte match when run in
   dry-run mode against the same input.

**Export rules** (enforced by the validator):

- YAML output stays within the validator parser subset: mappings, sequences, `>` block scalars, and single-line flow lists only.
- Descriptions are emitted with `>`.
- `tags` and `members` remain single-line flow lists.
- Strings are always quoted in the emitted YAML, even when YAML would allow an unquoted scalar (stable, diff-friendly output).
- Output always ends with exactly one trailing newline.

### Legacy / alternate CRM: Twenty

`scripts/twenty-export.mjs` and the `dry-run-twenty-export` CI job are retained
for accounts still on Twenty CRM. **No new accounts are provisioned against
Twenty** — all new engagements source from Saltcorn. The Saltcorn REST path
above (`/api/<table>/` with `Authorization: Bearer <token>`) is preferred over
psql when an API token is available.

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
