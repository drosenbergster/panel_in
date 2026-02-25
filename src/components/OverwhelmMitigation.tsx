import { useLocalStorage } from '@/hooks/useLocalStorage'

export function OverwhelmMitigation() {
  const [collapsed, setCollapsed] = useLocalStorage('overwhelmCollapsed', false)

  return (
    <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex min-h-[44px] w-full items-center justify-between text-left"
        aria-expanded={!collapsed}
      >
        <span className="text-sm font-semibold text-blue-900">
          Before you begin — a note on pacing
        </span>
        <span className="ml-2 text-blue-700" aria-hidden="true">
          {collapsed ? '+' : '−'}
        </span>
      </button>
      {!collapsed && (
        <div className="mt-2 text-sm leading-relaxed text-blue-800">
          <p>
            This pathway may include several applications. You don&apos;t need
            to do them all at once.{' '}
            <strong>Most practitioners spread this across multiple sessions.</strong>
          </p>
          <p className="mt-2">
            Start with your highest-coverage CCO (it&apos;s listed first).
            Complete that application, then come back for the next one. Your
            progress is saved automatically.
          </p>
        </div>
      )}
    </div>
  )
}
