import { useState, useCallback } from 'react'

import { SEOHead } from '@/components/SEOHead'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface CodeField {
  key: string
  label: string
  placeholder: string
}

const FIELDS: CodeField[] = [
  { key: 'npi', label: 'NPI Number', placeholder: '1234567890' },
  { key: 'taxonomy', label: 'Taxonomy Code', placeholder: '104100000X' },
  { key: 'caqh', label: 'CAQH ID', placeholder: '12345678' },
  { key: 'license', label: 'License Number', placeholder: 'C12345' },
  { key: 'taxId', label: 'Tax ID / SSN (last 4)', placeholder: '1234' },
  { key: 'address', label: 'Practice Address', placeholder: '123 Main St, Portland, OR 97201' },
]

type CodeValues = Record<string, string>

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable
    }
  }, [value])

  if (!value) return null

  return (
    <button
      onClick={handleCopy}
      className="inline-flex min-h-[44px] items-center rounded-md border border-gray-200 px-3 text-sm transition-colors hover:bg-gray-50"
      type="button"
      aria-label={`Copy ${value}`}
    >
      {copied ? (
        <span className="text-green-600">Copied!</span>
      ) : (
        <span className="text-gray-600">Copy</span>
      )}
    </button>
  )
}

export default function QuickCodesPage() {
  const [codes, setCodes, hydrated] = useLocalStorage<CodeValues>('quickCodes', {})

  const updateField = useCallback(
    (key: string, value: string) => {
      setCodes((prev) => ({ ...prev, [key]: value }))
    },
    [setCodes]
  )

  return (
    <>
      <SEOHead
        title="Quick Codes"
        description="Copy your key provider codes for fast form filling."
        path="/quick-codes"
      />

      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900">Quick Codes</h1>
        <p className="mt-1 text-sm text-gray-600">
          Enter your key data codes once. Copy them with one tap when filling
          out CCO portal forms. All data stays in your browser — nothing is
          sent to any server.
        </p>

        {!hydrated ? (
          <p className="mt-6 text-sm text-gray-500">Loading your codes...</p>
        ) : (
          <div className="mt-6 space-y-4">
            {FIELDS.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={`code-${field.key}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    id={`code-${field.key}`}
                    type="text"
                    value={codes[field.key] ?? ''}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="min-h-[44px] flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <CopyButton value={codes[field.key] ?? ''} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">
            <strong>Privacy:</strong> Your codes are stored only in this
            browser&apos;s local storage. They are never transmitted to any
            server. Clear your browser data to remove them, or use the button
            below.
          </p>
          <button
            onClick={() => setCodes({})}
            className="mt-2 text-xs text-gray-400 underline underline-offset-2 hover:text-gray-600"
            type="button"
          >
            Clear all codes
          </button>
        </div>
      </div>
    </>
  )
}
