import { useCallback } from 'react'

import { SEOHead } from '@/components/SEOHead'
import { IntakeForm } from '@/components/IntakeForm'
import { useWizardState } from '@/hooks/useWizardState'
import { formatCountyName } from '@/lib/format'

import type { WizardState } from '@/types/content'

export default function StartPage() {
  const { wizardState, setWizardState, isComplete, pathway, reset, hydrated } = useWizardState()

  const handleComplete = useCallback(
    (state: WizardState) => {
      setWizardState(state)
    },
    [setWizardState]
  )

  if (!hydrated) {
    return (
      <>
        <SEOHead
          title="My Pathway"
          description="Your personalized Oregon therapist credentialing pathway."
          path="/start"
        />
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-gray-500">Loading your pathway...</p>
        </div>
      </>
    )
  }

  if (!isComplete) {
    return (
      <>
        <SEOHead
          title="Get Started"
          description="Answer three questions to receive your personalized Oregon therapist credentialing pathway."
          path="/start"
        />
        <IntakeForm onComplete={handleComplete} />
      </>
    )
  }

  return (
    <>
      <SEOHead
        title="My Pathway"
        description="Your personalized Oregon therapist credentialing pathway."
        path="/start"
      />
      <div className="py-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Your Paneling Pathway
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {pathway.length} CCO application{pathway.length !== 1 ? 's' : ''} based
              on your {wizardState.counties.length} selected count{wizardState.counties.length !== 1 ? 'ies' : 'y'}.
            </p>
          </div>
          <button
            onClick={reset}
            className="inline-flex min-h-[44px] items-center rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Change selections
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {pathway.map((cco, i) => {
            const matchingCounties = cco.counties.filter((c) =>
              wizardState.counties.includes(c)
            )
            return (
              <li
                key={cco.slug}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-sm font-semibold text-gray-500">
                      {i + 1}.
                    </span>{' '}
                    <span className="font-medium text-gray-900">
                      {cco.title}
                    </span>
                    {cco.credentialing_parent && (
                      <span className="ml-2 rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                        {cco.credentialing_parent} credentialing
                      </span>
                    )}
                  </div>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      cco.confidence === 'verified'
                        ? 'bg-green-50 text-green-700'
                        : cco.confidence === 'partial'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {cco.confidence}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Covers {matchingCounties.length} of your count{matchingCounties.length !== 1 ? 'ies' : 'y'}:{' '}
                  {matchingCounties.map(formatCountyName).join(', ')}
                </p>
              </li>
            )
          })}
        </ul>

        {wizardState.payers.includes('medicare') && (
          <div className="mt-6 rounded-lg border border-gray-200 p-4">
            <span className="text-sm font-semibold text-gray-500">
              {pathway.length + 1}.
            </span>{' '}
            <span className="font-medium text-gray-900">
              Medicare Provider Enrollment (PECOS)
            </span>
            <span className="ml-2 rounded bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
              partial
            </span>
            <p className="mt-1 text-sm text-gray-600">
              National program — enroll via PECOS after completing CCO applications.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
