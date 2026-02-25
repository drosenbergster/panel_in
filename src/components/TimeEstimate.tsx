interface TimeEstimateProps {
  minutes: number
}

export function TimeEstimate({ minutes }: TimeEstimateProps) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
      <span aria-hidden="true">⏱</span>
      <span>~{minutes} min</span>
    </span>
  )
}
