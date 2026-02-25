import { SEOHead } from '@/components/SEOHead'

export default function OfflinePage() {
  return (
    <>
      <SEOHead
        title="Offline"
        description="You are currently offline."
        path="/~offline"
      />

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-gray-100 p-4">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 5.636a9 9 0 11-12.728 0M12 9v4m0 4h.01"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          You&apos;re offline
        </h1>
        <p className="mt-2 max-w-md text-sm text-gray-600">
          Previously viewed pages are still available. Go back to a page
          you&apos;ve visited before, or reconnect to the internet to access
          new content.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 inline-flex min-h-[44px] items-center rounded-lg bg-gray-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          type="button"
        >
          Go back
        </button>
      </div>
    </>
  )
}
