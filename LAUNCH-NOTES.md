# Panel In — Launch Notes

## Launch Date: 2026-02-24

## Status: Soft Launch (Jenny Feedback Phase)

All 6 epics (26 stories) are implemented. The application is deployed and
functional at [panelin.vercel.app](https://panelin.vercel.app). Jenny can
begin working through her full pathway and providing feedback.

## Post-Launch Updates (2026-02-25)

### UX Polish (`151d76f`)
- Installed `@tailwindcss/typography` — prose class now renders proper headings, lists, paragraphs
- Installed `remark-gfm` — markdown tables render as styled HTML instead of raw pipe text
- Step headings redesigned as bordered cards with numbered circle buttons
- "Before You Start" sections styled as blue callouts with clipboard icon
- "Critical:" sections styled as amber warning callouts
- Non-step headings get gray left-border accent
- Tables get rounded borders, gray header row, alternating backgrounds
- TimeEstimate restyled as pill badge with clock icon
- Duplicate H1 from MDX content suppressed

### Security Hardening (`967e295`)
- Added 7 security headers: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control
- Suppressed `X-Powered-By: Next.js` header
- Added URL protocol whitelist in MDX link component (blocks `javascript:`/`data:` URIs)
- Added slug regex validation + `path.resolve()` guard in content loader
- Full security audit completed: 0 npm vulnerabilities, no secrets in codebase, all inputs safe

## Known Confidence Gaps

Three smaller CCOs have `gap` confidence — their enrollment processes need
direct verification with the CCO before upgrading:

| CCO | Counties | Action Needed |
|-----|----------|---------------|
| Advanced Health | Coos, Curry | Call provider services to confirm enrollment steps |
| Cascade Health Alliance | Klamath | Call provider services to confirm enrollment steps |
| Yamhill Community Care | Yamhill, Washington, Polk | Call provider services to confirm enrollment steps |

All other CCO checklists are at `partial` confidence (verified against
published materials but not confirmed end-to-end with the CCO).

## Pre-Launch Manual Checklist

- [ ] Primary Source Cross-Check: Verify each `source_url` resolves
- [ ] Jenny Dry Run: Walk full pathway (9 CCOs + Medicare + TriWest)
- [ ] Contact Verification: Test phone numbers, emails, portal URLs
- [ ] Statutory Citation Check: ORS/OAR citations vs oregonlegislature.gov
- [x] npm audit: 0 vulnerabilities
- [x] All tests passing (134/134)
- [x] Build clean (37 SSG pages, 31 content files)
- [x] Security audit: headers, XSS, secrets, path traversal — all clear
- [x] UX audit: typography, tables, visual hierarchy — all fixed

## Environment Variables (Vercel)

Set these when ready:

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible analytics domain | Optional |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry error tracking | Optional |

## Content Governance

- `/admin` page shows content freshness dashboard
- GitHub Action runs weekly (Mondays 9am UTC) to create issues for stale content
- Run `npm run pre-launch` anytime to check content health
