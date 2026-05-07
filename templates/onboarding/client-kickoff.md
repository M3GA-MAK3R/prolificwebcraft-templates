# Client Onboarding — Kickoff Brief

> Fill this out **together** on the kickoff call. Anything ambiguous becomes a billable scope item later. Do not start coding until every section has a value or an explicit "N/A — agreed".

---

## 1. Identity & Decision Makers

| Field | Answer |
|---|---|
| Client / Brand name | |
| Primary contact (name, email, phone) | |
| Final-decision approver (must sign off on copy/design) | |
| Backup contact (when primary is unavailable) | |
| Time zone & preferred working hours | |
| Preferred communication channel (Slack/Email/Telegram/SMS) | |
| Response SLA expectation (e.g. 24h) | |

## 2. Scope of Work

- [ ] **In scope** (explicit list — be exhaustive):
    -
- [ ] **Out of scope** (explicit list — anything not here is a change order):
    -
- [ ] **Phase 1 deliverable** (MVP — what does "launched" mean?):
- [ ] **Phase 2+ deliverables** (next milestones, optional):

## 3. Tech Stack & Hosting

| Layer | Choice | Notes / Existing Account? |
|---|---|---|
| Frontend framework | | |
| Backend / API | | |
| Database | | |
| Auth provider | | |
| Payments (Stripe? PayPal? Square?) | | |
| Email transactional (Resend? Postmark? SendGrid?) | | |
| Hosting (Vercel? Hostinger? Railway?) | | |
| Domain registrar | | |
| DNS provider | | |
| Analytics (GA4? Plausible?) | | |
| Error monitoring (Sentry?) | | |

## 4. Brand Assets — Required at Kickoff

- [ ] Logo (vector preferred — SVG/AI/PDF)
- [ ] Brand color palette (hex codes — primary, secondary, accent, neutrals)
- [ ] Typography (font names + license proof if not Google/free)
- [ ] Brand voice / tone-of-voice doc
- [ ] Tagline / one-liner
- [ ] About / company story (final approved copy)
- [ ] Product photography source (folder or CDN — see [IMAGE-NAMING](../catalog-spec/IMAGE-NAMING.md) for naming rules)

**Asset delivery format:** Google Drive folder / Dropbox / shared Notion (one source of truth — never email attachments).

> 🚨 **Hard rule:** if any asset above is missing, the project is paused until it lands. Don't start with placeholder logos and "we'll swap later." It always becomes a half-day scramble at launch.

## 5. Catalog / Content (E-commerce only)

- [ ] Number of products at launch: ____
- [ ] Number of categories: ____
- [ ] **Catalog source of truth**: where the canonical product data lives (spreadsheet? CMS? our YAML spec?). Pick one — answer in **next** section.
- [ ] Variants used? Yes / No — if yes, what dimensions (color? size? material?) ____
- [ ] Inventory tracking? Manual / Real-time / N/A
- [ ] Pricing strategy: flat / tiered / discount codes? ____

> **Strong recommendation:** use the [catalog-spec.yaml](../catalog-spec/catalog-spec.yaml) format. A spreadsheet is fine for collection, but the canonical version lives in the repo and is CI-validated.

## 6. Legal & Compliance

- [ ] Privacy policy — existing or need drafted?
- [ ] Terms of service — existing or need drafted?
- [ ] Refund / shipping policy — existing or need drafted?
- [ ] PCI scope (if taking payments — Stripe Checkout = SAQ-A, custom = SAQ-D)
- [ ] GDPR / CCPA applicability
- [ ] Age-restricted products? (alcohol, CBD, etc.)
- [ ] Accessibility target: WCAG AA / AAA / not specified

## 7. SEO & Marketing

- [ ] Target keywords (top 5)
- [ ] Existing site URL (if migrating — capture redirects)
- [ ] Existing GA4 / GSC / FB Pixel access
- [ ] Robots.txt / sitemap requirements
- [ ] Social platforms to integrate (links only, or full feed?)

## 8. Repos, Access, Secrets

| Item | Status |
|---|---|
| GitHub repo created (private?) | |
| Client GitHub username (added as collaborator?) | |
| Vercel / hosting team membership | |
| Supabase / DB project owner | |
| Stripe account (live mode access timing) | |
| Domain DNS access (registrar login or delegation) | |
| Email account for the brand (e.g. `hello@brand.com`) | |
| Shared password manager vault (1Password / Bitwarden) | |

> 🚨 **Hard rule:** all secrets go in the shared vault. **Never** in DMs, email, or commit messages. If the client doesn't have a vault, ProlificWebCraft creates one and grants them access.

## 9. Timeline & Payment

- [ ] Kickoff date: ____
- [ ] Target launch date: ____
- [ ] Hard deadline (event-tied)? Yes / No — date: ____
- [ ] Total fee: $____
- [ ] Payment schedule (deposit / milestone / final): ____
- [ ] Hourly rate for out-of-scope work: $____
- [ ] Invoicing platform: ____

## 10. Post-launch Maintenance

- [ ] Hosting fees — who pays? (handoff plan)
- [ ] Bug-fix window (e.g. 14 days post-launch — included)
- [ ] Retainer offered? Hours/month and rate
- [ ] How does the client request edits **after** launch? → answer: **using the [edit-request form](../edits-intake/edit-request.md)** (link them now, not later)
- [ ] Training session(s) included? Recording delivered?

## 11. Risk Register

List anything that could blow up the project. Examples:
- Client provides product photos late → blocks launch
- Stripe verification takes 5+ business days → blocks live payments
- Custom domain DNS controlled by a third party
- Payment processor not available in client's country

| Risk | Mitigation | Owner |
|---|---|---|
| | | |

---

## Sign-off

By signing below, both parties agree the scope, deliverables, timeline, and tech-stack choices above are accurate as of kickoff. Changes require a written addendum.

**Client:** ________________________ Date: ____

**ProlificWebCraft (Stephen Brown):** ________________________ Date: ____
