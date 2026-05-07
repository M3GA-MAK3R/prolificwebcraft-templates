#!/usr/bin/env node
// ============================================================================
// validate-catalog.mjs — zero-deps catalog validator
// ----------------------------------------------------------------------------
// Usage:
//   node scripts/validate-catalog.mjs <path-to-catalog.yaml> [--images <dir>]
//
// Defaults:
//   <path-to-catalog.yaml> = templates/catalog-spec/catalog-spec.yaml
//   <images dir>           = public  (image paths in YAML are joined to this)
//
// Exit codes:
//   0  all checks pass
//   1  one or more errors
//
// What this catches (each rule maps to a real bug from xpress-yourself-boutique):
//   1. Duplicate product `id`               -> impossible-to-debug rendering
//   2. Duplicate product `slug`             -> URL collisions
//   3. Duplicate (name, image) pair         -> Pearl Heart Necklace n3 == n6
//   4. Missing image file on disk           -> Royal Blue swatch with wrong img
//   5. Variant name with `&` or `/` lacks CSS gradient color -> j3 swatch lied
//   6. Group members with mismatched category -> pearls-clusters mixed brooches+necklaces
//   7. Orphan group reference                -> product cites a group that doesn't exist
//   8. Missing required fields               -> silent NaN renders
//   9. Description copy-pasted between products in same category -> n6 desc == b9 desc
// ============================================================================

import { readFileSync, existsSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------- args ----------
const args = process.argv.slice(2);
const yamlPath = resolve(
  args[0] || join(__dirname, "..", "templates", "catalog-spec", "catalog-spec.yaml")
);
const imagesIdx = args.indexOf("--images");
const imagesDir = resolve(
  imagesIdx >= 0 ? args[imagesIdx + 1] : join(dirname(yamlPath), "..", "..", "public")
);

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

// ---------- minimal YAML parser (subset sufficient for catalog-spec.yaml) ----
// Supports: nested mappings via indentation, sequences (`- `), scalars,
// quoted strings, folded `>` block scalars, inline flow lists `[a, b]`,
// `#` comments, blank lines.
//
// Deliberately tiny — if you need more, swap in `js-yaml` later.
function parseYAML(src) {
  const lines = src.split(/\r?\n/);
  let i = 0;

  function curLine() {
    while (i < lines.length) {
      const raw = lines[i];
      const stripped = raw.replace(/(^|\s)#.*$/, "").trimEnd();
      if (stripped.trim() === "") { i++; continue; }
      return { raw, stripped, indent: raw.match(/^ */)[0].length };
    }
    return null;
  }

  function parseScalar(s) {
    s = s.trim();
    if (s === "" || s === "~" || s === "null") return null;
    if (s === "true") return true;
    if (s === "false") return false;
    if (/^-?\d+$/.test(s)) return parseInt(s, 10);
    if (/^-?\d+\.\d+$/.test(s)) return parseFloat(s);
    if (/^".*"$/.test(s)) return s.slice(1, -1);
    if (/^'.*'$/.test(s)) return s.slice(1, -1);
    if (/^\[.*\]$/.test(s)) {
      const inner = s.slice(1, -1).trim();
      if (!inner) return [];
      return inner.split(",").map(x => parseScalar(x));
    }
    return s;
  }

  function parseFolded(baseIndent) {
    // `>` block: read continuation lines indented deeper than baseIndent,
    // join with spaces. NOTE: the caller has already advanced `i` past the
    // line containing `>` (the mapping/sequence machinery does `i++` before
    // calling parseValue), so we do NOT advance here — we read from `i`.
    const parts = [];
    while (i < lines.length) {
      const raw = lines[i];
      if (raw.trim() === "") { i++; continue; }
      const ind = raw.match(/^ */)[0].length;
      if (ind <= baseIndent) break;
      parts.push(raw.trim());
      i++;
    }
    return parts.join(" ");
  }

  function parseBlock(parentIndent) {
    // Returns either an object (mapping) or array (sequence) or scalar.
    const first = curLine();
    if (!first) return null;
    if (first.indent <= parentIndent) return null;

    const myIndent = first.indent;
    const isSeq = first.stripped.trimStart().startsWith("- ");

    if (isSeq) {
      const out = [];
      while (true) {
        const cur = curLine();
        if (!cur || cur.indent !== myIndent) break;
        const trimmed = cur.stripped.trimStart();
        if (!trimmed.startsWith("- ")) break;
        const rest = trimmed.slice(2);
        // Sequence item could be:
        //   - scalar
        //   - key: value   (mapping starts on same line)
        //   - (mapping continues on next lines)
        if (/^[A-Za-z_][\w-]*\s*:/.test(rest)) {
          // mapping; reconstruct: pretend this line is a mapping at indent+2
          // by replacing the "- " with two spaces and re-parsing as a mapping.
          // Simpler: parse the inline `key: value` then continue with deeper lines.
          const obj = {};
          const m = rest.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
          if (m) {
            const k = m[1], v = m[2];
            i++;
            obj[k] = parseValue(v, myIndent + 2);
          }
          // continuation lines at indent myIndent+2
          while (true) {
            const c2 = curLine();
            if (!c2 || c2.indent !== myIndent + 2) break;
            if (c2.stripped.trimStart().startsWith("- ")) break;
            const m2 = c2.stripped.trimStart().match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
            if (!m2) break;
            const k2 = m2[1], v2 = m2[2];
            i++;
            obj[k2] = parseValue(v2, myIndent + 2);
          }
          out.push(obj);
        } else {
          i++;
          out.push(parseScalar(rest));
        }
      }
      return out;
    }

    // mapping
    const obj = {};
    while (true) {
      const cur = curLine();
      if (!cur || cur.indent !== myIndent) break;
      if (cur.stripped.trimStart().startsWith("- ")) break;
      const m = cur.stripped.trimStart().match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
      if (!m) { i++; continue; }
      const k = m[1], v = m[2];
      i++;
      obj[k] = parseValue(v, myIndent);
    }
    return obj;
  }

  function parseValue(inlineVal, parentIndent) {
    if (inlineVal === ">") return parseFolded(parentIndent);
    if (inlineVal === "|") return parseFolded(parentIndent); // treat literal same-ish
    if (inlineVal !== "") return parseScalar(inlineVal);
    // value continues on next deeper-indented lines
    return parseBlock(parentIndent);
  }

  return parseBlock(-1);
}

// ---------- load catalog ----------
if (!existsSync(yamlPath)) {
  console.error(`✗ Catalog file not found: ${yamlPath}`);
  process.exit(1);
}
let catalog;
try {
  catalog = parseYAML(readFileSync(yamlPath, "utf8"));
} catch (e) {
  console.error(`✗ Failed to parse YAML: ${e.message}`);
  process.exit(1);
}

const products = catalog?.products || [];
const groups = catalog?.groups || [];
const categories = catalog?.categories || [];
const categoryIds = new Set(categories.map(c => c.id));

// ---------- checks ----------
const REQUIRED = ["id", "slug", "name", "category", "price", "image", "description"];
const seenIds = new Map();
const seenSlugs = new Map();
const seenNameImage = new Map();
const groupCategory = new Map();   // groupId -> first-seen category
const groupMembers = new Map();    // groupId -> [productId]
const descByCategory = new Map();  // category -> Map(normalizedDesc -> productId)

function imageExists(p) {
  if (!p) return false;
  // Strip leading `/` to join under imagesDir.
  const rel = p.replace(/^\//, "");
  return existsSync(join(imagesDir, rel));
}

function isMultiColorName(name) {
  return /[&/]|\band\b/i.test(name);
}
function isCSSGradient(color) {
  return typeof color === "string" && /gradient\s*\(/i.test(color);
}

for (const p of products) {
  // 1. required fields
  for (const f of REQUIRED) {
    if (p[f] === undefined || p[f] === null || p[f] === "") {
      err(`[${p.id || "?"}] missing required field: ${f}`);
    }
  }

  // 2. duplicate id
  if (p.id) {
    if (seenIds.has(p.id)) {
      err(`duplicate product id: ${p.id} (also at ${seenIds.get(p.id)})`);
    } else {
      seenIds.set(p.id, p.name || "?");
    }
  }

  // 3. duplicate slug
  if (p.slug) {
    if (seenSlugs.has(p.slug)) {
      err(`duplicate slug: ${p.slug} (used by ${seenSlugs.get(p.slug)} and ${p.id})`);
    } else {
      seenSlugs.set(p.slug, p.id);
    }
  }

  // 4. duplicate (name, image) — Pearl Heart Necklace bug
  if (p.name && p.image) {
    const k = `${p.name}::${p.image}`;
    if (seenNameImage.has(k)) {
      err(`duplicate (name, image) pair — ${p.id} duplicates ${seenNameImage.get(k)}: "${p.name}" + ${p.image}`);
    } else {
      seenNameImage.set(k, p.id);
    }
  }

  // 5. category exists
  if (p.category && categoryIds.size > 0 && !categoryIds.has(p.category)) {
    err(`[${p.id}] unknown category "${p.category}"`);
  }

  // 6. main image exists on disk
  if (p.image && !imageExists(p.image)) {
    warn(`[${p.id}] main image not found on disk: ${p.image}  (looked under ${imagesDir})`);
  }

  // 7. variants
  if (Array.isArray(p.variants)) {
    const vSeen = new Set();
    for (const v of p.variants) {
      if (!v || !v.name) { err(`[${p.id}] variant missing name`); continue; }
      if (vSeen.has(v.name)) err(`[${p.id}] duplicate variant name: ${v.name}`);
      vSeen.add(v.name);

      if (!v.color) err(`[${p.id} / ${v.name}] variant missing color`);
      if (!v.image) err(`[${p.id} / ${v.name}] variant missing image`);

      // multi-color name must use CSS gradient
      if (isMultiColorName(v.name) && v.color && !isCSSGradient(v.color)) {
        err(`[${p.id} / ${v.name}] multi-color variant name but solid color "${v.color}" — use a CSS gradient`);
      }
      if (v.image && !imageExists(v.image)) {
        warn(`[${p.id} / ${v.name}] variant image not found on disk: ${v.image}`);
      }
    }
  }

  // 8. group bookkeeping
  if (p.group) {
    if (!groupCategory.has(p.group)) {
      groupCategory.set(p.group, p.category);
    } else if (groupCategory.get(p.group) !== p.category) {
      err(`group "${p.group}" mixes categories: ${groupCategory.get(p.group)} vs ${p.category} (product ${p.id})`);
    }
    if (!groupMembers.has(p.group)) groupMembers.set(p.group, []);
    groupMembers.get(p.group).push(p.id);
  }

  // 9. duplicate description within category
  if (p.description && p.category) {
    const norm = String(p.description).trim().toLowerCase().replace(/\s+/g, " ");
    if (!descByCategory.has(p.category)) descByCategory.set(p.category, new Map());
    const m = descByCategory.get(p.category);
    if (m.has(norm)) {
      err(`[${p.id}] description is identical to ${m.get(norm)} (in category "${p.category}") — copy-paste leak`);
    } else {
      m.set(norm, p.id);
    }
  }
}

// 10. orphan group references — products cite groups that don't exist
const declaredGroupIds = new Set(groups.map(g => g.id));
for (const [gid, members] of groupMembers) {
  if (declaredGroupIds.size > 0 && !declaredGroupIds.has(gid)) {
    err(`group "${gid}" referenced by ${members.join(", ")} but not declared in groups[]`);
  }
}
// 11. groups[] declares members that don't exist
for (const g of groups) {
  if (!Array.isArray(g.members)) continue;
  for (const memberId of g.members) {
    if (!seenIds.has(memberId)) {
      err(`group "${g.id}" lists member "${memberId}" but no such product exists`);
    }
  }
}

// ---------- report ----------
const total = products.length;
console.log(`Catalog: ${yamlPath}`);
console.log(`Images dir: ${imagesDir}`);
console.log(`Products: ${total}   Groups: ${groups.length}   Categories: ${categories.length}`);
console.log("");

if (warnings.length) {
  console.log(`⚠  ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`   - ${w}`);
  console.log("");
}
if (errors.length) {
  console.log(`✗  ${errors.length} error(s):`);
  for (const e of errors) console.log(`   - ${e}`);
  console.log("");
  console.log("FAIL");
  process.exit(1);
} else {
  console.log("✓  All catalog rules pass.");
  process.exit(0);
}
