import Link from 'next/link'
import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-gray-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-semibold text-gray-900">
            Panel In
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/start"
              className="inline-flex min-h-[44px] items-center rounded-md px-3 py-2 text-gray-600 transition-colors hover:text-gray-900"
            >
              My Pathway
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <p className="text-center text-sm text-gray-500">
            Panel In — Oregon therapist credentialing guidance.
            Content is for informational purposes only.
          </p>
        </div>
      </footer>
    </div>
  )
}
