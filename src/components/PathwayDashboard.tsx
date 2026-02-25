import { OverwhelmMitigation } from './OverwhelmMitigation'
import { PrerequisiteSection } from './PrerequisiteSection'
import { CcoCard } from './CcoCard'

import type { CcoData, WizardState } from '@/types/content'

const CREDENTIALING_GROUPS: Record<string, { label: string; callout: string }> = {
  careoregon: {
    label: 'CareOregon Credentialing',
    callout:
      'One credential packet may cover all CareOregon-affiliated CCOs listed below — verify with CareOregon.',
  },
  pacificsource: {
    label: 'PacificSource Credentialing',
    callout:
      'PacificSource service areas share a credentialing process — verify with PacificSource.',
  },
}

interface GroupedPathway {
  type: 'standalone' | 'group'
  key: string
  label?: string
  callout?: string
  ccos: CcoData[]
}

export function groupByCredentialing(pathway: CcoData[]): GroupedPathway[] {
  const groups: GroupedPathway[] = []
  const consumed = new Set<string>()

  const parentOrder = Object.keys(CREDENTIALING_GROUPS)

  for (const parentSlug of parentOrder) {
    const grouped = pathway.filter(
      (c) => c.credentialing_parent === parentSlug && !consumed.has(c.slug)
    )
    if (grouped.length > 0) {
      const meta = CREDENTIALING_GROUPS[parentSlug]
      groups.push({
        type: 'group',
        key: parentSlug,
        label: meta.label,
        callout: meta.callout,
        ccos: grouped,
      })
      grouped.forEach((c) => consumed.add(c.slug))
    }
  }

  for (const cco of pathway) {
    if (!consumed.has(cco.slug)) {
      groups.push({ type: 'standalone', key: cco.slug, ccos: [cco] })
      consumed.add(cco.slug)
    }
  }

  return groups
}

function countTotalCoveredCounties(
  pathway: CcoData[],
  selectedCounties: string[]
): number {
  const covered = new Set<string>()
  for (const cco of pathway) {
    for (const c of cco.counties) {
      if (selectedCounties.includes(c)) covered.add(c)
    }
  }
  return covered.size
}

interface PathwayDashboardProps {
  wizardState: WizardState
  pathway: CcoData[]
  onChangeSelections: () => void
}

export function PathwayDashboard({
  wizardState,
  pathway,
  onChangeSelections,
}: PathwayDashboardProps) {
  const groups = groupByCredentialing(pathway)
  const coveredCounties = countTotalCoveredCounties(pathway, wizardState.counties)
  const totalApps =
    pathway.length + (wizardState.payers.includes('medicare') ? 1 : 0)

  let runningIndex = 1

  return (
    <div className="py-8">
      <OverwhelmMitigation />

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Your Paneling Pathway
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Your paneling plan: {totalApps} application{totalApps !== 1 ? 's' : ''}{' '}
            covering {coveredCounties} count{coveredCounties !== 1 ? 'ies' : 'y'}.
          </p>
        </div>
        <button
          onClick={onChangeSelections}
          className="inline-flex min-h-[44px] items-center rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Change selections
        </button>
      </div>

      <PrerequisiteSection />

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Your CCO Applications ({pathway.length})
        </h2>

        <div className="mt-4 space-y-4">
          {groups.map((group) => {
            if (group.type === 'group') {
              const startIdx = runningIndex
              runningIndex += group.ccos.length
              return (
                <div
                  key={group.key}
                  className="rounded-lg border border-blue-100 bg-blue-50/30 p-4"
                >
                  <h3 className="text-sm font-semibold text-blue-900">
                    {group.label}
                  </h3>
                  <p className="mt-1 text-xs text-blue-700">
                    {group.callout}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {group.ccos.map((cco, j) => (
                      <CcoCard
                        key={cco.slug}
                        cco={cco}
                        index={startIdx + j}
                        selectedCounties={wizardState.counties}
                      />
                    ))}
                  </ul>
                </div>
              )
            }

            const idx = runningIndex
            runningIndex += 1
            return (
              <ul key={group.key} className="space-y-2">
                <CcoCard
                  cco={group.ccos[0]}
                  index={idx}
                  selectedCounties={wizardState.counties}
                />
              </ul>
            )
          })}
        </div>
      </section>

      {wizardState.payers.includes('medicare') && (
        <section className="mt-6">
          <div className="rounded-lg border border-gray-200 p-4">
            <span aria-hidden="true" className="text-sm font-semibold text-gray-500">
              {pathway.length + 1}.
            </span>{' '}
            <span className="font-medium text-gray-900">
              Medicare Provider Enrollment (PECOS)
            </span>
            <span className="ml-2 rounded bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
              partial
            </span>
            <p className="mt-1 text-sm text-gray-600">
              National program — enroll via PECOS after completing CCO
              applications.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
