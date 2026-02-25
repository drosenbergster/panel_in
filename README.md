# Panel In

**Credentialing guidance for Oregon behavioral health therapists.**

Panel In eliminates the opacity of Oregon's insurance paneling process. A therapist answers three intake questions — license type, service counties, payer targets — and receives a complete, personalized, sequenced pathway: which CCOs to apply to, in what order, with which forms, contacts, deadlines, and regulatory considerations.

## The Problem

Oregon has 16 Coordinated Care Organizations (CCOs), each with separate credentialing portals, applications, and provider requirements. 88% of Oregon counties lack adequate behavioral health providers — not because therapists are unwilling, but because the administrative path to practicing is impenetrable. Panel In is the credentialing department a solo practitioner can't afford to hire.

## Primary User

Jenny — a licensed clinical social worker launching a mobile clinic and telehealth practice across 21 Oregon counties (14 in-person, 7 telehealth-only), spanning 9 CCOs and Medicare. Jenny is real. Her successful paneling is the product's first validation.

## Technical Overview

| Aspect | v1.0 |
|--------|------|
| **Type** | Interactive content product (guided wizard, no auth/state) |
| **Framework** | Next.js 14+ (SSG/ISR) |
| **Content** | MDX with structured frontmatter (confidence, sources, freshness metadata) |
| **Deployment** | Vercel (auto-deploy from git push) |
| **Offline** | Service worker (cache-first for content) |
| **Analytics** | Privacy-respecting (Plausible/Umami), no cookies, no PII |
| **Auth** | None in v1.0 (added in v1.1) |

## Project Status

**Current phase:** Planning complete (PRD finished). Next: UX Design, Architecture, Epics & Stories.

See [docs/project-status.md](docs/project-status.md) for detailed progress.

## Repository Structure

```
panel_in/
├── README.md                          # This file
├── docs/                              # Project knowledge and status
│   └── project-status.md              # Planning progress and next steps
├── _bmad-output/                      # All BMAD workflow output artifacts
│   ├── bmad-ideal-workflow.md         # Workflow reference guide
│   └── planning-artifacts/            # Planning phase deliverables
│       ├── prd.md                     # Product Requirements Document (complete)
│       ├── product-brief-panel_in-2026-02-24.md
│       ├── content-research-sprint-2026-02-24.md
│       ├── jenny-paneling-guide.md
│       ├── jenny-questions-for-ccos.md
│       ├── index.md                   # Artifact catalog
│       └── research/
│           └── domain-oregon-therapist-insurance-paneling-research-2026-02-24.md
├── _bmad/                             # BMAD framework (v6.0.3)
│   ├── _config/                       # Agent, workflow, and tool manifests
│   ├── bmm/                           # Build-Measure Module (main workflow engine)
│   ├── cis/                           # Creative Intelligence Suite
│   └── core/                          # Core framework (party mode, brainstorming, etc.)
└── .cursor/
    └── commands/                      # Cursor IDE slash commands for BMAD workflows
```

## Planning Artifacts

| Artifact | Status | Description |
|----------|--------|-------------|
| **Domain Research** | Complete | Oregon therapist insurance paneling landscape |
| **Content Research Sprint** | Complete | Deep dive into CCO-specific requirements, regulatory context |
| **Jenny's Paneling Guide** | Complete | Step-by-step guide for Jenny's specific situation |
| **Jenny's Questions for CCOs** | Complete | Outstanding questions requiring CCO outreach |
| **Product Brief** | Complete | Product definition, vision, competitive analysis |
| **PRD** | Complete (12 steps) | Full requirements: 45 FRs, 32 NFRs, 6 user journeys, domain/regulatory analysis |

## Key Differentiators

- **Accuracy at the county/CCO level** — exact steps, forms, contacts for your specific situation
- **Content depth as moat** — defensibility through sustained editorial effort, not technology
- **Do No Harm principle** — verified info with sources; gaps acknowledged honestly with redirects
- **Privacy by design** — zero tracking, zero cookies, zero user data in v1.0

## Regulatory Context

Panel In launches into a regulatory inflection point (2026-2028):

- **HB 4083** — Oregon centralized credentialing reform (active in 2026 session)
- **October 2026** — Associate Deadline changing Medicaid billing eligibility
- **January 2027** — State Plan Transition from Prioritized List to standard Medicaid
- **ORS 743B.454** — "Bill from day one" statute (core value proposition)

## Next Steps (BMAD Workflow)

Run each in a fresh Cursor context window:

1. `/bmad-bmm-validate-prd` — Optional: validate PRD completeness
2. `/bmad-bmm-create-ux-design` — Recommended: UX design from user journeys
3. `/bmad-bmm-create-architecture` — Required: technical architecture decisions
4. `/bmad-bmm-create-epics-and-stories` — Required: break FRs into implementable stories
5. `/bmad-bmm-check-implementation-readiness` — Required: final alignment gate

## Built With

- [BMAD Method](https://github.com/bmadcode/BMAD-METHOD) v6.0.3 — AI-assisted product development framework
- [Next.js](https://nextjs.org/) 14+ — React framework (planned)
- [Vercel](https://vercel.com/) — Deployment platform (planned)
