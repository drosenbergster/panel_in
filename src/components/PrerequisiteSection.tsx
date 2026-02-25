import Link from 'next/link'

import { ConfidenceBadge } from './ConfidenceBadge'

import prerequisites from '@/data/prerequisites.json'

import type { ConfidenceLevel } from '@/types/content'

interface PrerequisiteItem {
  slug: string
  title: string
  confidence: ConfidenceLevel
}

export function PrerequisiteSection() {
  const items = prerequisites as PrerequisiteItem[]
  if (items.length === 0) return null

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900">
        Pre-Paneling Setup
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Complete these before starting your CCO applications.
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item.slug}
            className="flex min-h-[44px] items-center justify-between rounded-lg border border-gray-200 p-3"
          >
            <Link
              href={`/guides/${item.slug}`}
              className="text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900"
            >
              {item.title}
            </Link>
            <ConfidenceBadge level={item.confidence} />
          </li>
        ))}
      </ul>
    </section>
  )
}
