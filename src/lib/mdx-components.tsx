import type { MDXComponents } from 'mdx/types'
import type { AnchorHTMLAttributes, TableHTMLAttributes } from 'react'

import { ConfidenceBadge } from '@/components/ConfidenceBadge'
import { SourceCitation } from '@/components/SourceCitation'
import { ReportIssueLink } from '@/components/ReportIssueLink'
import { TimeEstimate } from '@/components/TimeEstimate'

function StyledTable(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full border-collapse text-sm"
        {...props}
      />
    </div>
  )
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
  table: StyledTable,
  a: ExternalLink,
  ConfidenceBadge,
  SourceCitation,
  ReportIssueLink,
  TimeEstimate,
}
