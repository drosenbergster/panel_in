import type { MDXComponents } from 'mdx/types'
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
  TableHTMLAttributes,
} from 'react'

import { ConfidenceBadge } from '@/components/ConfidenceBadge'
import { SourceCitation } from '@/components/SourceCitation'
import { ReportIssueLink } from '@/components/ReportIssueLink'
import { TimeEstimate } from '@/components/TimeEstimate'
import { StepHeading } from '@/components/StepHeading'

function HiddenH1() {
  return null
}

function StyledTable(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="not-prose my-4 overflow-x-auto rounded-lg border border-gray-200">
      <table
        className="min-w-full divide-y divide-gray-200 text-sm"
        {...props}
      />
    </div>
  )
}

function StyledThead(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-gray-50" {...props} />
}

function StyledTh(props: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
      {...props}
    />
  )
}

function StyledTd(props: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-4 py-2.5 text-gray-700" {...props} />
}

function StyledTr(props: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="border-t border-gray-100 even:bg-gray-50/50" {...props} />
}

function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, children, ...rest } = props
  const isExternal = href?.startsWith('http')

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-700"
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <a href={href} className="text-blue-700 underline underline-offset-2" {...rest}>
      {children}
    </a>
  )
}

export const mdxComponents: MDXComponents = {
  h1: HiddenH1,
  h2: StepHeading,
  table: StyledTable,
  thead: StyledThead,
  th: StyledTh,
  td: StyledTd,
  tr: StyledTr,
  a: ExternalLink,
  ConfidenceBadge,
  SourceCitation,
  ReportIssueLink,
  TimeEstimate,
}
