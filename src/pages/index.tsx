import Link from 'next/link'

import { SEOHead } from '@/components/SEOHead'
import { useLocalStorage } from '@/hooks/useLocalStorage'

import type { WizardState } from '@/types/content'

const EMPTY_WIZARD: WizardState = { licenseType: '', counties: [], payers: [] }

export default function Home() {
  const [wizardState] = useLocalStorage<WizardState>('wizardState', EMPTY_WIZARD)
  const hasExistingState = wizardState.licenseType !== ''

  return (
    <>
      <SEOHead
        title="Panel In"
        description="Personalized, step-by-step credentialing guidance for Oregon therapists. Answer three questions, get your complete paneling pathway."
        path="/"
      />

      <div className="py-8 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Oregon therapist credentialing,
          <br />
          step by step.
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
          Panel In maps your license type and counties to the exact CCOs you
          need, then walks you through each application. Three questions in,
          personalized pathway out.
        </p>

        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-gray-900">Who it&apos;s for</dt>
            <dd className="mt-1 text-sm leading-relaxed text-gray-600">
              Oregon-licensed therapists (LCSW in v1.0) paneling with Medicaid
              CCOs or Medicare as individual practitioners.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What it does</dt>
            <dd className="mt-1 text-sm leading-relaxed text-gray-600">
              Maps your counties to CCOs, sequences applications by shared
              credentialing, and tracks your progress through each checklist.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Why it exists</dt>
            <dd className="mt-1 text-sm leading-relaxed text-gray-600">
              The barrier to rural behavioral healthcare isn&apos;t therapist
              willingness — it&apos;s administrative opacity. We make paneling
              navigable.
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          {hasExistingState ? (
            <>
              <Link
                href="/start"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Continue Your Pathway
              </Link>
              <Link
                href="/start"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Start Over
              </Link>
            </>
          ) : (
            <Link
              href="/start"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Get Started
            </Link>
          )}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            How it works
          </h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            <li className="rounded-lg border border-gray-200 p-4">
              <span className="text-sm font-semibold text-gray-400">1</span>
              <p className="mt-1 font-medium text-gray-900">
                Answer three questions
              </p>
              <p className="mt-1 text-sm text-gray-600">
                License type, counties you serve, and which payers you&apos;re
                targeting.
              </p>
            </li>
            <li className="rounded-lg border border-gray-200 p-4">
              <span className="text-sm font-semibold text-gray-400">2</span>
              <p className="mt-1 font-medium text-gray-900">
                Get your pathway
              </p>
              <p className="mt-1 text-sm text-gray-600">
                We map your counties to CCOs and sequence them by shared
                credentialing to save you duplicate work.
              </p>
            </li>
            <li className="rounded-lg border border-gray-200 p-4">
              <span className="text-sm font-semibold text-gray-400">3</span>
              <p className="mt-1 font-medium text-gray-900">
                Work through each checklist
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Step-by-step instructions with forms, contacts, and timelines
                for every CCO application.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </>
  )
}
