interface TimeEstimateProps {
  minutes: number
}

export function TimeEstimate({ minutes }: TimeEstimateProps) {
  return (
    <span className="not-prose mt-1 inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      ~{minutes} min
    </span>
  )
}
