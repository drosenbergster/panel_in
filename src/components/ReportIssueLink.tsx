interface ReportIssueLinkProps {
  pageTitle: string
  pageSlug: string
}

export function ReportIssueLink({ pageTitle, pageSlug }: ReportIssueLinkProps) {
  const subject = encodeURIComponent(`Issue with: ${pageTitle}`)
  const body = encodeURIComponent(
    `Page: ${pageTitle}\nSlug: ${pageSlug}\n\nDescribe the issue:\n\n`
  )
  const href = `mailto:feedback@panelin.org?subject=${subject}&body=${body}`

  return (
    <a
      href={href}
      className="inline-flex min-h-[44px] items-center text-sm text-gray-500 underline decoration-gray-300 underline-offset-2 hover:text-gray-700"
    >
      Report an issue with this page
    </a>
  )
}
