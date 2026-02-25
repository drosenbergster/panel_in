import { Component } from 'react'

import type { ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  pageTitle?: string
  pageSlug?: string
}

interface State {
  hasError: boolean
}

export class ContentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ContentErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      const subject = encodeURIComponent(
        `Content error: ${this.props.pageTitle || 'Unknown page'}`
      )
      const body = encodeURIComponent(
        `Page: ${this.props.pageTitle || 'Unknown'}\nSlug: ${this.props.pageSlug || 'Unknown'}\n\nThe content on this page failed to load.\n`
      )
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-red-800">
            This content couldn&apos;t be loaded.
          </p>
          <p className="mt-2 text-sm text-red-700">
            Try refreshing the page. If the problem persists, check your
            internet connection.
          </p>
          <div className="mt-3 flex items-center justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-800 hover:bg-red-200"
              type="button"
            >
              Refresh page
            </button>
            <a
              href={`mailto:feedback@panelin.org?subject=${subject}&body=${body}`}
              className="text-sm text-red-700 underline"
            >
              Report this issue
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
