import { useChecklist } from './ChecklistContext'

import type { HTMLAttributes, ReactNode } from 'react'

function extractStepId(children: ReactNode): string | null {
  const text = typeof children === 'string' ? children : String(children)
  const match = text.match(/^(Step|Stage)\s+(\d+)/i)
  if (!match) return null
  const prefix = match[1].toLowerCase()
  const num = match[2]
  return `${prefix}-${num}`
}

export function StepHeading(props: HTMLAttributes<HTMLHeadingElement>) {
  const ctx = useChecklist()
  const stepId = extractStepId(props.children)

  if (!ctx || !stepId) {
    return <h2 {...props} />
  }

  const itemId = `${ctx.slug}:${stepId}`
  const complete = ctx.isComplete(itemId)

  return (
    <h2
      {...props}
      className="group flex items-center gap-3"
    >
      <button
        onClick={() => ctx.toggle(itemId)}
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          complete
            ? 'border-green-500 bg-green-500 text-white'
            : 'border-gray-300 bg-white text-transparent hover:border-gray-400'
        }`}
        aria-label={
          complete ? `Mark ${stepId} as incomplete` : `Mark ${stepId} as complete`
        }
        type="button"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
      <span className={complete ? 'text-gray-400 line-through decoration-gray-300' : ''}>
        {props.children}
      </span>
    </h2>
  )
}
