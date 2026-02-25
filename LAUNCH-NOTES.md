# Panel In — Launch Notes

## Launch Date: 2026-02-24

## Status: Soft Launch (Jenny Feedback Phase)

All 6 epics (26 stories) are implemented. The application is deployed and
functional. Jenny can begin working through her full pathway and providing
feedback.

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
- [ ] Jenny Dry Run: Walk full pathway (9 CCOs + Medicare)
- [ ] Contact Verification: Test phone numbers, emails, portal URLs
- [ ] Statutory Citation Check: ORS/OAR citations vs oregonlegislature.gov
- [x] npm audit: 0 vulnerabilities
- [x] All tests passing (130/130)
- [x] Build clean (36 SSG pages, 30 content files)

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
