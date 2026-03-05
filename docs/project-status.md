# Panel In — Project Status

**Last updated:** 2026-03-05

## Current Phase: Soft Launch — Jenny Feedback Phase

All 6 epics (26 stories) are implemented, deployed, and live at [panelin.vercel.app](https://panelin.vercel.app).

### Phase Progress

| Phase | Status | Key Deliverable |
|-------|--------|-----------------|
| **1. Analysis** | Complete | Product brief, domain research, content research sprint |
| **2. Planning** | Complete | PRD (45 FRs, 32 NFRs, 6 user journeys), UX Design Specification |
| **3. Solutioning** | Complete | Architecture Decision Document, Epics & Stories (6 epics, 26 stories) |
| **4. Implementation** | **Complete** | All 26 stories delivered, 134 tests passing, 37 SSG pages |

### Implementation Summary

| Epic | Stories | Status |
|------|---------|--------|
| 1: Project Foundation & Personalized Pathway | 5 | Complete |
| 2: Credentialing Content & Trust System | 8 | Complete |
| 3: Interactive Progress & User Tools | 5 | Complete |
| 4: Offline Access & Print | 3 | Complete |
| 5: Content Governance & Admin | 2 | Complete |
| 6: Analytics, Monitoring & Launch Readiness | 3 | Complete |
| **Total** | **26** | **All complete** |

### Post-Implementation

| Change | Date | Description |
|--------|------|-------------|
| UX polish | 2026-02-25 | Typography plugin, remark-gfm for tables, step heading cards, callout sections, table styling |
| Security hardening | 2026-02-25 | 7 security headers (CSP, HSTS, etc.), URL protocol validation, path traversal guard, X-Powered-By suppressed |
| TriWest payer support | 2026-03-05 | Added TRICARE / VA Community Care (TriWest) as third payer option with full step-by-step checklist |
| UX audit improvements | 2026-03-05 | Stronger selected states, payer descriptions, clickable dashboard cards, section nav on long pages, zebra-striped tables, tel: links, landing page copy refresh |

### Content Stats

- 17 checklists (15 Oregon CCOs + Medicare/PECOS + TriWest TRICARE & VA Community Care)
- 8 guides (NPI, CAQH, OHA MMIS, malpractice, taxonomy, telehealth, mobile clinic, ORS 743B.454)
- 3 reference pages (credentialing relationships, reimbursement rates, prior authorization)
- 2 templates (hospital admission plan, seclusion & restraint)
- 37 total SSG pages

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Pages Router (not App Router) | Simpler, battle-tested, better AI agent output for SSG content site |
| Framework-agnostic content | MDX + scripts never import from next/ — survives framework migration |
| localStorage (no user accounts in v1.0) | 80% of value with 0% infrastructure cost; accounts in v1.1 |
| Medicare treated as pathway entry alongside CCOs | Consistent hierarchy; same checklist structure |
| TriWest (TRICARE + VA CCN) as third payer | Federal programs grouped in dedicated dashboard section; same MDX checklist pattern |
| Dedicated Gmail for issue reports | Zero-infrastructure feedback loop; mailto: with pre-populated context |
| Shared credentialing visually grouped on dashboard | CareOregon (3 CCOs) and PacificSource (2 areas) — major "aha!" moment |

## Open Items & Risks

| Item | Type | Priority | Notes |
|------|------|----------|-------|
| 3 CCOs at `gap` confidence | Content gap | High | Advanced Health, Cascade, Yamhill need direct CCO verification |
| Jenny dry run feedback | Validation | High | Jenny needs to walk full pathway and report back |
| January 2027 State Plan Transition | Regulatory risk | High | Content sprint required when details are published |
| HB 4083 bill progress | Strategic monitoring | Medium | Track through 2026 session |
| Jenny CCO outreach (2 remaining emails) | Content research | Medium | See `jenny-questions-for-ccos.md` |
| Source URL link integrity checking | Implementation gap | Low | Add to build script or GitHub Action |

## Next Steps

1. **Jenny dry run** — Walk full 9-CCO + Medicare + TriWest pathway, report issues
2. **CCO outreach** — Verify enrollment steps for 3 gap-confidence CCOs
3. **Source URL check** — Verify all `source_url` frontmatter links resolve
4. **Phone/email spot-check** — Test contact info in checklists
5. **Content iteration** — Update checklists based on Jenny's feedback
