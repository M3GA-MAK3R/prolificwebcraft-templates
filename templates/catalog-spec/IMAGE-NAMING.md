# Image Naming Convention

> **The single rule:** the image filename MUST match the product `slug`.
> Variants append `-<variant-slug>` to the product slug.
> No exceptions, no creative file names, no `IMG_4837.jpg`.

---

## The rule

```
/public/images/products/<product-slug>.jpg                        ← default image
/public/images/products/<product-slug>-<variant-slug>.jpg         ← per-variant image
```

`<variant-slug>` = the variant `name` lowercased, with `&` → `-and-` and any
non-alphanumeric run → single `-`.

## Examples

| Product `name`                | Variant `name`     | File path |
|-------------------------------|--------------------|-----------|
| Ornate Jacket Brooch          | (default)          | `/images/products/ornate-jacket-brooch.jpg` |
| Ornate Jacket Brooch          | Blue               | `/images/products/ornate-jacket-brooch-blue.jpg` |
| Ornate Jacket Brooch          | Cream              | `/images/products/ornate-jacket-brooch-cream.jpg` |
| Jeweled Leopard Face Brooch   | Black & Silver     | `/images/products/jeweled-leopard-face-brooch-black-and-silver.jpg` |
| Pearl Heart Necklace          | (default)          | `/images/products/pearl-heart-necklace.jpg` |

## Why this rule exists

In a previous build, image files were named after the original photographer's
filename (e.g. `IMG_4837.jpg`). When two photos were nearly identical, the same
JPG got assigned to two different products — the **Pearl Heart Necklace was
duplicated** (n3 + n6) because both pointed at the same image and nobody
noticed during review.

Forcing the filename to derive from the slug means:

1. The validator can flag a duplicate `(name, image)` pair.
2. Two products can never accidentally share the same image (slugs are unique).
3. A diff in the PR reviewer's eyes is human-readable: `pearl-heart-necklace.jpg`
   tells you what the product is supposed to be.

## Format & resolution

- **Format:** `.jpg` for photography, `.png` only when transparency is required.
- **Resolution:** ≥ 1200 px on the long edge; square crop preferred for grid cards.
- **File size:** target < 250 KB after compression (use `mozjpeg -quality 80` or
  Squoosh). The CI workflow will warn if any file > 500 KB.
- **Color space:** sRGB. No Display P3, no embedded color profiles other than sRGB.

## When the client provides un-named files

1. Rename them locally to match the slug **before** committing.
2. If the client sends 30 photos labelled `IMG_*.jpg`, do not commit them.
   Send back the spec and ask which photo is which slug.
3. Document the renaming map in the edit-request ticket so the client can
   confirm before merge.

## Anti-patterns (do not do this)

- ❌ `Pearl_Heart_Necklace_FINAL_v2.jpg`
- ❌ `pearl heart necklace.jpg` (spaces)
- ❌ `pearlHeartNecklace.jpg` (camelCase)
- ❌ `n3.jpg` (id, not slug — opaque to humans)
- ❌ `pearl-heart.jpg` (truncated, doesn't match slug)
- ✅ `pearl-heart-necklace.jpg`
