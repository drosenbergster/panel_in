# Panel In

**Credentialing guidance for Oregon behavioral health therapists.**

Panel In eliminates the opacity of Oregon's insurance paneling process. A therapist answers three intake questions — license type, service counties, payer targets — and receives a complete, personalized, sequenced pathway: which CCOs to apply to, in what order, with which forms, contacts, deadlines, and regulatory considerations.

**Live at:** [panelin.vercel.app](https://panelin.vercel.app)

## The Problem

Oregon has 16 Coordinated Care Organizations (CCOs), each with separate credentialing portals, applications, and provider requirements. 88% of Oregon counties lack adequate behavioral health providers — not because therapists are unwilling, but because the administrative path to practicing is impenetrable. Panel In is the credentialing department a solo practitioner can't afford to hire.

## Primary User

Jenny — a licensed clinical social worker launching a mobile clinic and telehealth practice across 21 Oregon counties (14 in-person, 7 telehealth-only), spanning 9 CCOs and Medicare. Jenny is real. Her successful paneling is the product's first validation.

## Technical Overview

| Aspect | v1.0 |
|--------|------|
| **Type** | Interactive content product (guided wizard + checklist tracking) |
| **Framework** | Next.js 16 (Pages Router, SSG) |
| **Content** | MDX with structured frontmatter (confidence, sources, freshness metadata) |
| **Styling** | Tailwind CSS 4 + @tailwindcss/typography |
| **Deployment** | Vercel (auto-deploy from git push) |
| **Offline** | Serwist service worker (cache-first for content) |
| **Analytics** | Privacy-respecting (Plausible, no cookies, no PII) |
| **Auth** | None in v1.0 (localStorage only; accounts planned for v1.1) |
| **Tests** | 130 passing (Vitest + Testing Library) |
| **Security** | Full CSP, HSTS, X-Frame-Options, URL validation, path traversal guards |

## Project Status

**Current phase:** Soft Launch — Jenny Feedback Phase (all 6 epics complete, 26 stories delivered).

See [docs/project-status.md](docs/project-status.md) for detailed progress and [LAUNCH-NOTES.md](LAUNCH-NOTES.md) for deployment status.

## Features

- **3-step intake wizard** — license type, counties, payer selection
- **Personalized pathway dashboard** — grouped by credentialing parent (CareOregon, PacificSource)
- **16 CCO checklists** — step-by-step with interactive progress tracking
- **5 prerequisite guides** — NPI, CAQH, OHA MMIS, malpractice insurance, taxonomy codes
- **Reference pages** — credentialing relationships, reimbursement rates, prior authorization
- **Templates** — hospital admission plan, seclusion & restraint policy letter
- **Quick Codes** — copy-paste station for NPI, taxonomy, CAQH ID, license number
- **Private notes** — per-step annotations stored locally
- **Content trust signals** — confidence badges, source citations, last-verified dates
- **Offline access** — service worker with cache-first strategy
- **Print optimization** — clean print stylesheet for all content pages
- **Admin dashboard** — content freshness monitoring at `/admin`

## Repository Structure

```
panel_in/
├── content/                           # MDX content files
│   ├── cco/                           # 16 CCO checklists
│   ├── guides/                        # 8 prerequisite & supplemental guides
│   ├── reference/                     # 3 reference pages
│   └── templates/                     # 2 downloadable templates
├── src/
│   ├── components/                    # React components
│   ├── hooks/                         # Custom hooks (localStorage, checklist, wizard)
│   ├── lib/                           # Content loading, MDX components, utilities
│   ├── pages/                         # Next.js pages (pathway, guides, reference, etc.)
│   └── styles/                        # Tailwind CSS
├── docs/                              # Project status tracking
├── _bmad-output/                      # BMAD planning artifacts (PRD, architecture, etc.)
├── _bmad/                             # BMAD framework (v6.0.3)
├── scripts/                           # Build-time validation, route generation
├── LAUNCH-NOTES.md                    # Deployment status and known gaps
└── README.md                          # This file
```

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

## Development

```bash
npm install
npm run dev          # Start dev server (localhost:3000)
npm test             # Run unit tests (130 passing)
npm run build        # Production build (36 SSG pages)
npm run pre-launch   # Content health check
```

## Built With

- [BMAD Method](https://github.com/bmadcode/BMAD-METHOD) v6.0.3 — AI-assisted product development framework
- [Next.js](https://nextjs.org/) 16.1.6 — React framework (Pages Router, SSG)
- [Tailwind CSS](https://tailwindcss.com/) 4 — Utility-first CSS
- [Vercel](https://vercel.com/) — Deployment platform
