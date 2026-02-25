import type { SourceType } from '@/types/content'

interface SourceCitationProps {
  url: string
  type: SourceType
  label?: string
}

const TYPE_LABELS: Record<SourceType, string> = {
  primary: 'Primary Source',
  secondary: 'Secondary Source',
  community_verified: 'Community Verified',
}

export function SourceCitation({ url, type, label }: SourceCitationProps) {
  const displayLabel = label || TYPE_LABELS[type]

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-gray-300 underline-offset-2 hover:text-gray-700 hover:decoration-gray-500"
      >
        {displayLabel}
      </a>
      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium uppercase text-gray-500">
        {type.replace(/_/g, ' ')}
      </span>
    </span>
  )
}
