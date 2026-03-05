import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { SEOHead } from '@/components/SEOHead'
import { useLocalStorage } from '@/hooks/useLocalStorage'

import type { WizardState } from '@/types/content'

const EMPTY_WIZARD: WizardState = { licenseType: '', counties: [], payers: [] }

export default function Home() {
  const router = useRouter()
  const [wizardState, setWizardState] = useLocalStorage<WizardState>('wizardState', EMPTY_WIZARD)
  const hasExistingState = wizardState.licenseType !== ''

  const handleStartOver = useCallback(() => {
    setWizardState(EMPTY_WIZARD)
    router.push('/start')
  }, [setWizardState, router])

  return (
    <>
      <SEOHead
        title="Panel In"
        description="Personalized, step-by-step credentialing guidance for Oregon therapists. Answer three questions to receive your complete paneling pathway."
        path="/"
      />

      <div className="py-8 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Oregon therapist credentialing,
          <br />
          step by step.
        </h1>

        <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
          Credentialing is confusing, fragmented, and slow. Panel In
          cuts through the paperwork — giving you a clear, personalized
          path to panel with Medicaid CCOs, Medicare, and
          TRICARE&nbsp;/&nbsp;VA Community Care so more Oregonians can
          access the care they need.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          {hasExistingState ? (
            <>
              <Link
                href="/start"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Continue Your Pathway
              </Link>
              <button
                onClick={handleStartOver}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Start Over
              </button>
            </>
          ) : (
            <Link
              href="/start"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Get Started
            </Link>
          )}
        </div>

        <dl aria-label="What Panel In offers" className="mt-10 grid gap-5 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <dt className="flex items-center gap-2 font-semibold text-gray-900">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Who it&apos;s for
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-gray-600">
              Oregon-licensed therapists paneling with Medicaid CCOs,
              Medicare, or TRICARE / VA Community Care.
            </dd>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <dt className="flex items-center gap-2 font-semibold text-gray-900">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Less confusion
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-gray-600">
              One clear checklist per payer — no more guessing which
              forms to file, where to send them, or what order to go in.
            </dd>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <dt className="flex items-center gap-2 font-semibold text-gray-900">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              More access
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-gray-600">
              Every therapist who panels in is one more provider
              Oregonians can reach — especially in underserved rural areas.
            </dd>
          </div>
        </dl>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            How it works
          </h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            <li className="rounded-lg border border-gray-200 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                1
              </div>
              <p className="mt-3 font-medium text-gray-900">
                Answer three questions
              </p>
              <p className="mt-1 text-sm text-gray-600">
                License type, counties you serve, and which payers
                you&apos;re targeting.
              </p>
            </li>
            <li className="rounded-lg border border-gray-200 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                2
              </div>
              <p className="mt-3 font-medium text-gray-900">
                Get your pathway
              </p>
              <p className="mt-1 text-sm text-gray-600">
                We map your counties to the right CCOs and group by shared
                credentialing to cut duplicate work.
              </p>
            </li>
            <li className="rounded-lg border border-gray-200 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                3
              </div>
              <p className="mt-3 font-medium text-gray-900">
                Work through each checklist
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Step-by-step instructions with forms, contacts, and
                timelines for every application.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </>
  )
}
