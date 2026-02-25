import { useState, useCallback, useEffect, useRef } from 'react'

import { formatCountyName } from '@/lib/format'

import type { WizardState } from '@/types/content'

export const OREGON_COUNTIES = [
  'baker', 'benton', 'clackamas', 'clatsop', 'columbia', 'coos',
  'crook', 'curry', 'deschutes', 'douglas', 'gilliam', 'grant',
  'harney', 'hood river', 'jackson', 'jefferson', 'josephine', 'klamath',
  'lake', 'lane', 'lincoln', 'linn', 'malheur', 'marion',
  'morrow', 'multnomah', 'polk', 'sherman', 'tillamook', 'umatilla',
  'union', 'wallowa', 'wasco', 'washington', 'wheeler', 'yamhill',
]

const LICENSE_TYPES = [
  { value: 'lcsw', label: 'LCSW', supported: true },
  { value: 'lpc', label: 'LPC', supported: false },
  { value: 'lmft', label: 'LMFT', supported: false },
]

const PAYER_OPTIONS = [
  { value: 'medicaid', label: 'Medicaid / OHP' },
  { value: 'medicare', label: 'Medicare' },
]

interface IntakeFormProps {
  onComplete: (state: WizardState) => void
}

export function IntakeForm({ onComplete }: IntakeFormProps) {
  const [step, setStep] = useState(1)
  const [licenseType, setLicenseType] = useState('')
  const [counties, setCounties] = useState<string[]>([])
  const [payers, setPayers] = useState<string[]>([])
  const fieldsetRef = useRef<HTMLFieldSetElement>(null)

  useEffect(() => {
    if (!fieldsetRef.current) return
    const firstInput = fieldsetRef.current.querySelector('input')
    firstInput?.focus()
  }, [step])

  const canAdvance =
    (step === 1 && licenseType !== '') ||
    (step === 2 && counties.length > 0) ||
    (step === 3 && payers.length > 0)

  const handleNext = useCallback(() => {
    if (step < 3) {
      setStep((s) => s + 1)
    } else {
      onComplete({ licenseType, counties, payers })
    }
  }, [step, licenseType, counties, payers, onComplete])

  const handleBack = useCallback(() => {
    setStep((s) => Math.max(1, s - 1))
  }, [])

  const toggleCounty = useCallback((county: string) => {
    setCounties((prev) =>
      prev.includes(county) ? prev.filter((c) => c !== county) : [...prev, county]
    )
  }, [])

  const togglePayer = useCallback((payer: string) => {
    setPayers((prev) =>
      prev.includes(payer) ? prev.filter((p) => p !== payer) : [...prev, payer]
    )
  }, [])

  return (
    <div className="py-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500" role="status" aria-live="polite">
        {[1, 2, 3].map((s) => (
          <span key={s} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                s === step
                  ? 'bg-gray-900 text-white'
                  : s < step
                    ? 'bg-gray-200 text-gray-700'
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              {s}
            </span>
            {s < 3 && <span className="h-px w-6 bg-gray-200" />}
          </span>
        ))}
        <span className="ml-2">Step {step} of 3</span>
      </div>

      {step === 1 && (
        <fieldset ref={fieldsetRef}>
          <legend className="text-xl font-semibold text-gray-900">
            What is your license type?
          </legend>
          <p className="mt-1 text-sm text-gray-600">
            Select the license you&apos;ll use for billing.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {LICENSE_TYPES.map((lt) => (
              <label
                key={lt.value}
                className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                  licenseType === lt.value
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="licenseType"
                  value={lt.value}
                  checked={licenseType === lt.value}
                  onChange={() => setLicenseType(lt.value)}
                  className="h-4 w-4 accent-gray-900"
                />
                <span className="font-medium text-gray-900">{lt.label}</span>
                {!lt.supported && (
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                    Partial support — some content may not be verified
                  </span>
                )}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset ref={fieldsetRef}>
          <legend className="text-xl font-semibold text-gray-900">
            Which counties will you serve?
          </legend>
          <p className="mt-1 text-sm text-gray-600">
            Select all counties where you&apos;ll provide services (in-person or
            telehealth). {counties.length > 0 && (
              <span className="font-medium text-gray-900">
                {counties.length} selected
              </span>
            )}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {OREGON_COUNTIES.map((county) => (
              <label
                key={county}
                className={`flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  counties.includes(county)
                    ? 'border-gray-900 bg-gray-50 font-medium text-gray-900'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={counties.includes(county)}
                  onChange={() => toggleCounty(county)}
                  className="h-4 w-4 accent-gray-900"
                />
                {formatCountyName(county)}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset ref={fieldsetRef}>
          <legend className="text-xl font-semibold text-gray-900">
            Which payers are you targeting?
          </legend>
          <p className="mt-1 text-sm text-gray-600">
            Select the insurance pathways you want to pursue.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {PAYER_OPTIONS.map((po) => (
              <label
                key={po.value}
                className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                  payers.includes(po.value)
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={payers.includes(po.value)}
                  onChange={() => togglePayer(po.value)}
                  className="h-4 w-4 accent-gray-900"
                />
                <span className="font-medium text-gray-900">{po.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex gap-3">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {step === 3 ? 'See My Pathway' : 'Next'}
        </button>
      </div>
    </div>
  )
}
