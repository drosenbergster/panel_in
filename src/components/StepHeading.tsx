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

function extractStepNumber(children: ReactNode): string | null {
  const text = typeof children === 'string' ? children : String(children)
  const match = text.match(/^(?:Step|Stage)\s+(\d+)/i)
  return match ? match[1] : null
}

function extractStepLabel(children: ReactNode): string {
  const text = typeof children === 'string' ? children : String(children)
  return text.replace(/^(?:Step|Stage)\s+\d+:\s*/i, '')
}

export function StepHeading(props: HTMLAttributes<HTMLHeadingElement>) {
  const ctx = useChecklist()
  const stepId = extractStepId(props.children)
  const [expanded, setExpanded] = useState(false)

  if (!ctx || !stepId) {
    const text = typeof props.children === 'string' ? props.children : String(props.children)
    const isCritical = /^critical/i.test(text) || /^important/i.test(text)
    const isBeforeYouStart = /^before you start/i.test(text)

    if (isCritical) {
      return (
        <div className="not-prose mt-8 mb-3 rounded-lg border-l-4 border-amber-400 bg-amber-50 px-4 py-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-amber-900">
            <svg className="h-5 w-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {props.children}
          </h2>
        </div>
      )
    }

    if (isBeforeYouStart) {
      return (
        <div className="not-prose mt-8 mb-3 rounded-lg border-l-4 border-blue-400 bg-blue-50 px-4 py-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-blue-900">
            <svg className="h-5 w-5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {props.children}
          </h2>
        </div>
      )
    }

    return (
      <div className="not-prose mt-8 mb-3 border-l-4 border-gray-200 pl-4">
        <h2 className="text-lg font-semibold text-gray-900">{props.children}</h2>
      </div>
    )
  }

  const itemId = `${ctx.slug}:${stepId}`
  const complete = ctx.isComplete(itemId)
  const note = ctx.getNote(itemId)
  const hasNote = note.length > 0
  const stepNum = extractStepNumber(props.children)
  const label = extractStepLabel(props.children)

  return (
    <div className={`not-prose mt-6 rounded-lg border transition-colors ${complete ? 'border-green-200 bg-green-50/40' : 'border-gray-200 bg-white'} p-4`}>
      <h2 className="flex items-center gap-3">
        <button
          onClick={() => ctx.toggle(itemId)}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors print:hidden ${
            complete
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-gray-300 bg-white text-gray-500 hover:border-gray-400'
          }`}
          aria-label={
            complete ? `Mark ${stepId} as incomplete` : `Mark ${stepId} as complete`
          }
          type="button"
        >
          {complete ? (
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
          ) : (
            stepNum
          )}
        </button>
        <span className={`flex-1 text-lg font-semibold ${complete ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-900'}`}>
          {label}
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          className={`shrink-0 rounded-md p-1.5 transition-colors print:hidden ${
            hasNote
              ? 'text-blue-600 hover:bg-blue-50'
              : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
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
        <div className="mt-3 ml-11">
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
