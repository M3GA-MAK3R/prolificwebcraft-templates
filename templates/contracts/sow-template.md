# Statement of Work — {{CLIENT_NAME}}

> **Template note (PM — delete before sending):** This turns a filled
> [Client Kickoff Brief](../onboarding/client-kickoff.md) into a signed
> engagement. Every `{{field}}` must be filled before sending.
> `[brackets]` are guidance only. **Not legal advice** — have counsel review
> Sections 14–17 once before first use.
>
> **Delivery:** after filling, render to PDF and route through the Prolific
> Documenso fork ([M3GA-MAK3R/d0cum3n50](https://github.com/M3GA-MAK3R/d0cum3n50))
> for e-signature. See the field map at the bottom for the Documenso mapping.

**Effective date:** {{EFFECTIVE_DATE}}
**Prepared by:** ProlificWebCraft

---

## 1. Parties

This Statement of Work ("SOW") is entered into between:

- **ProlificWebCraft** ("PWC" / "Provider") — an applied research & development
  studio engineering client-owned, production-grade systems. Represented by
  Stephen Brown, Founder ({{PWC_EMAIL}}).
- **{{CLIENT_NAME}}** ("Client") — represented by {{PRIMARY_CONTACT_NAME}},
  {{PRIMARY_CONTACT_EMAIL}}.

---

## 2. Engagement Overview

{{PROJECT_SUMMARY}}

PWC will deliver a production-grade, **client-owned** system for the
{{NICHE}} vertical, as scoped below. This SOW incorporates the [Client Kickoff
Brief](../onboarding/client-kickoff.md) dated {{KICKOFF_DATE}}, attached and
made part of this agreement by reference.

---

## 3. Scope of Work

PWC will deliver the following. Each row is a billable deliverable with its own
acceptance criterion.

| # | Deliverable | Acceptance criterion |
|---|---|---|
| 1 | {{DELIVERABLE_1}} | {{AC_1}} |
| 2 | {{DELIVERABLE_2}} | {{AC_2}} |
| 3 | {{DELIVERABLE_3}} | {{AC_3}} |

**Service(s) included:** {{SERVICES_INCLUDED}}
*(website-audit / notary-legal / boutique-ecommerce / local-pros /
health-beauty / care-plans / search-ai-visibility / paid-media-health-audit)*

---

## 4. Out of Scope

The following are explicitly **not** included. Anything not listed in Section 3
is out of scope by default and requires a written Change Order (Section 13).

- {{OUT_OF_SCOPE_1}}
- {{OUT_OF_SCOPE_2}}

---

## 5. Deliverables & Acceptance

- "Done" means a deliverable meets its acceptance criterion **and** the Client
  confirms acceptance in writing (email or tracked-issue comment).
- All source, config, and documentation are delivered into a Client-owned
  GitHub repository (Section 9).
- No deliverable is complete until the GitHub Handoff & Docs package
  (Section 9) has been delivered.

---

## 6. Timeline & Milestones

| Milestone | Deliverable(s) | Target date | Payment due |
|---|---|---|---|
| M1 | {{M1_SCOPE}} | {{M1_DATE}} | ${{M1_AMOUNT}} |
| M2 | {{M2_SCOPE}} | {{M2_DATE}} | ${{M2_AMOUNT}} |
| Launch | Production release | {{LAUNCH_DATE}} | ${{FINAL_AMOUNT}} |

---

## 7. Pricing & Payment

- **Total fixed fee:** ${{TOTAL_FEE}} (fixed price, not hourly).
- **Schedule:** milestone-based, as listed in Section 6. Each milestone payment
  is due on delivery of that milestone, before work on the next begins.
- **Out-of-scope rate:** ${{HOURLY_RATE}}/hr for approved Change Order work.
- **Invoicing:** via {{INVOICING_PLATFORM}}; net {{NET_DAYS}} days.

---

## 8. Ownership & Intellectual Property

- Upon full payment, all deliverables, source code, design assets, and
  documentation are **owned by the Client** and licensed to PWC solely as
  needed to perform maintenance under Section 10.
- Code lives in a **Client-owned GitHub repository**; the Client is the owner,
  PWC holds collaborator access for the engagement duration.
- PWC retains ownership of pre-existing tools, templates, and know-how used to
  deliver the work; the Client receives an irrevocable, perpetual license to
  use them within the delivered system.

---

## 9. GitHub Handoff & Documentation

Included with every engagement — the **GitHub Handoff & Docs** package:

- Full source repository (Client-owned, private by default).
- `README` covering setup, deploy, and content-editing instructions.
- Environment/config documentation (secrets live in the shared password vault
  — never in the repo or chat).
- A 30-minute recorded handoff walkthrough.

---

## 10. Post-Launch Support & Care Plan

- **Bug-fix window:** PWC fixes defects reported within {{BUG_FIX_DAYS}} days of
  launch at no additional cost.
- **Care Plan (retainer):** {{CARE_PLAN_TIER}} — {{CARE_PLAN_DESCRIPTION}}.
  ${{CARE_PLAN_FEE}}/month, includes {{CARE_PLAN_HOURS}} hours of updates and
  {{CARE_PLAN_ITEMS}}.
- Post-launch edits are requested via the
  [Edit Request form](../edits-intake/edit-request.md); no edit starts until
  the form is filled.

---

## 11. Client Responsibilities

The Client will:

- Provide all brand assets listed in the Kickoff Brief before kickoff; missing
  assets pause the project.
- Provide timely approval of copy/design within {{APPROVAL_SLA}} of each request.
- Grant access to required accounts (GitHub, domain/DNS, hosting, payment
  processor) per the Kickoff Brief.
- Keep all secrets in the shared password vault — never in email, DM, or chat.

---

## 12. Assumptions & Dependencies

- {{ASSUMPTION_1}}
- {{ASSUMPTION_2}}
- Payment processor and third-party accounts are verified and available in the
  Client's jurisdiction.

---

## 13. Change Management

- Any change to scope, timeline, or deliverables requires a written Change Order.
- Change Orders are priced separately and do not begin until signed by both
  parties.
- **No scope creep** — ad-hoc requests outside Section 3 route to a Change Order
  or the Care Plan, never absorbed silently.

---

## 14. Warranty & Bug-Fix Window

- PWC warrants deliverables function per their acceptance criteria for
  {{BUG_FIX_DAYS}} days post-launch; defects in that window are fixed at no cost.
- `[Legal review: refine warranty scope, add limitation-of-liability and any
  indemnification language per counsel before first use.]`

---

## 15. Confidentiality

Each party holds the other's confidential information (client data, pricing,
proprietary methods) in confidence and does not disclose it to third parties,
except as required by law.

---

## 16. Termination

- Either party may terminate on {{NOTICE_DAYS}} days written notice.
- On termination, the Client pays for all completed milestones; in-progress
  work is invoiced pro-rata.
- Upon payment, PWC delivers all work product in its current state.

---

## 17. Governing Law

This SOW is governed by the laws of {{JURISDICTION}}; disputes are resolved in
{{VENUE}}.

---

## 18. Entire Agreement

This SOW, together with the referenced Kickoff Brief and any signed Change
Orders, is the entire agreement between the parties and supersedes all prior
discussions.

---

## Signature Block

By signing, each party agrees to the scope, pricing, timeline, and terms above.

**Client**

Signature: ______________________________

Name: {{CLIENT_SIGNER_NAME}} · Title: {{CLIENT_SIGNER_TITLE}} · Date: {{CLIENT_SIGN_DATE}}

**ProlificWebCraft**

Signature: ______________________________

Name: Stephen Brown · Title: Founder · Date: {{PWC_SIGN_DATE}}

---

## Documenso Field Map *(internal — for the d0cum3n50 template)*

| Placeholder | Documenso field | Notes |
|---|---|---|
| {{CLIENT_NAME}} | text | prefill from kickoff |
| {{EFFECTIVE_DATE}} | date | |
| {{TOTAL_FEE}} / amount fields | number | currency |
| {{CLIENT_SIGNER_NAME}} | name | |
| Signature line (Client) | signature | signable |
| {{CLIENT_SIGN_DATE}} | date | |
| Signature line (PWC) | signature | signable |
| {{PWC_SIGN_DATE}} | date | |

*Exact Documenso field-type enum names to be confirmed against d0cum3n50's
field schema in the Documenso phase — do not hardcode before then.*
