export function initErrorReporting() {
  if (typeof window === 'undefined') return

  window.addEventListener('error', (event) => {
    reportError({
      message: event.message,
      source: event.filename,
      line: event.lineno,
      col: event.colno,
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    reportError({
      message: `Unhandled rejection: ${event.reason}`,
    })
  })
}

function reportError(details: Record<string, unknown>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // Sentry SDK would capture this automatically when configured
    console.error('[Panel In Error]', details)
  }
}
