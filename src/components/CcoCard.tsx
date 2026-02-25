import Link from 'next/link'

import { formatCountyName } from '@/lib/format'

import type { CcoData } from '@/types/content'

interface CcoCardProps {
  cco: CcoData
  index: number
  selectedCounties: string[]
}

export function CcoCard({ cco, index, selectedCounties }: CcoCardProps) {
  const matchingCounties = cco.counties.filter((c) =>
    selectedCounties.includes(c)
  )

  return (
    <li className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300">
      <div className="flex items-start justify-between">
        <div>
          <span aria-hidden="true" className="text-sm font-semibold text-gray-500">
            {index}.
          </span>{' '}
          <Link
            href={`/pathway/${cco.slug}`}
            className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900"
          >
            {cco.title}
          </Link>
        </div>
        <span
          className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${
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
        Covers {matchingCounties.length} of your
        {' '}count{matchingCounties.length !== 1 ? 'ies' : 'y'}:{' '}
        {matchingCounties.map(formatCountyName).join(', ')}
      </p>
    </li>
  )
}
