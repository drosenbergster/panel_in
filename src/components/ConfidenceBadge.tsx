import type { ConfidenceLevel } from '@/types/content'

interface ConfidenceBadgeProps {
  level: ConfidenceLevel
}

const BADGE_STYLES: Record<ConfidenceLevel, { bg: string; text: string; label: string }> = {
  verified: { bg: 'bg-green-50', text: 'text-green-700', label: 'Verified' },
  partial: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Verify with CCO' },
  gap: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Not yet available' },
}

export function ConfidenceBadge({ level }: ConfidenceBadgeProps) {
  const style = BADGE_STYLES[level] ?? BADGE_STYLES.gap
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}
      aria-label={`Confidence: ${style.label}`}
    >
      {style.label}
    </span>
  )
}
