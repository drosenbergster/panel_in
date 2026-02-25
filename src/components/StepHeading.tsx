import { useState } from 'react'

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
  const [expanded, setExpanded] = useState(false)

  if (!ctx || !stepId) {
    return <h2 {...props} />
  }

  const itemId = `${ctx.slug}:${stepId}`
  const complete = ctx.isComplete(itemId)
  const note = ctx.getNote(itemId)
  const hasNote = note.length > 0

  const { children, ...restProps } = props

  return (
    <div className="not-prose -mx-1 rounded-lg px-1">
      <h2 className="group flex items-center gap-3" {...restProps}>
        <button
          onClick={() => ctx.toggle(itemId)}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition-colors print:hidden ${
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
        <span className={`flex-1 ${complete ? 'text-gray-400 line-through decoration-gray-300' : ''}`}>
          {children}
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          className={`shrink-0 rounded p-1 text-xs transition-colors print:hidden ${
            hasNote
              ? 'text-blue-600 hover:bg-blue-50'
              : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
          }`}
          aria-label={expanded ? 'Hide note' : 'Add note'}
          aria-expanded={expanded}
          type="button"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </h2>
      {expanded && (
        <div className="ml-10 mt-2 mb-2">
          <textarea
            value={note}
            onChange={(e) => ctx.setNote(itemId, e.target.value)}
            placeholder="Add a private note (e.g., &quot;Called Steve on Tuesday, said form takes 2 weeks&quot;)"
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
            rows={2}
          />
          <p className="mt-1 text-xs text-gray-400">
            Your notes are saved locally and never sent to any server.
          </p>
        </div>
      )}
    </div>
  )
}
