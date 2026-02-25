export function CommunityLink() {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
      <p className="text-sm font-medium text-blue-900">
        You&apos;re not alone in this process
      </p>
      <p className="mt-1 text-sm text-blue-700">
        Connect with other Oregon therapists navigating credentialing.
      </p>
      <a
        href="https://discord.gg/panelin"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-[44px] items-center text-sm font-medium text-blue-700 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-700"
      >
        Join the community →
      </a>
    </div>
  )
}
