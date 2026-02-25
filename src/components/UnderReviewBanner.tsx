export function UnderReviewBanner() {
  return (
    <div
      role="alert"
      className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
    >
      <strong>Content under review</strong> — This content is being updated.
      Verify details directly with the CCO before relying on this information.
    </div>
  )
}
