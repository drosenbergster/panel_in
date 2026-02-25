import { useState } from 'react'
import Link from 'next/link'
import { serialize } from 'next-mdx-remote-client/serialize'
import { MDXClient } from 'next-mdx-remote-client/csr'

import { SEOHead } from '@/components/SEOHead'
import { ConfidenceBadge } from '@/components/ConfidenceBadge'
import { SourceCitation } from '@/components/SourceCitation'
import { UnderReviewBanner } from '@/components/UnderReviewBanner'
import { ReportIssueLink } from '@/components/ReportIssueLink'
import { ContentErrorBoundary } from '@/components/ContentErrorBoundary'
import { ChecklistProvider, useChecklist } from '@/components/ChecklistContext'
import { CommunityLink } from '@/components/CommunityLink'
import { mdxComponents } from '@/lib/mdx-components'
import { getContentBySlug, getAllContentSlugs } from '@/lib/content'

import type { GetStaticPaths, GetStaticProps } from 'next'
import type { ContentFrontmatter } from '@/types/content'

interface CcoPageProps {
  compiledSource: string
  frontmatter: ContentFrontmatter
  totalSteps: number
}

function isRecentlyUpdated(dateStr: string): boolean {
  const updated = new Date(dateStr)
  if (isNaN(updated.getTime())) return false
  const diffMs = Date.now() - updated.getTime()
  return diffMs < 30 * 24 * 60 * 60 * 1000
}

function ChecklistProgressBar({ slug, totalSteps }: { slug: string; totalSteps: number }) {
  const ctx = useChecklist()
  const [showConfirm, setShowConfirm] = useState(false)

  if (!ctx || totalSteps === 0) return null

  const completed = ctx.completedCount(`${slug}:`)
  const pct = Math.round((completed / totalSteps) * 100)

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 print:hidden">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">
          {completed} of {totalSteps} steps complete
        </span>
        <span className="text-gray-500">{pct}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      {completed > 0 && (
        <div className="mt-2">
          {showConfirm ? (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Reset all progress for this checklist?</span>
              <button
                onClick={() => {
                  ctx.resetAll()
                  setShowConfirm(false)
                }}
                className="font-medium text-red-600 underline underline-offset-2 hover:text-red-800"
                type="button"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-gray-500 underline underline-offset-2 hover:text-gray-700"
                type="button"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-xs text-gray-400 underline underline-offset-2 hover:text-gray-600"
              type="button"
            >
              Reset progress
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function CcoPage({ compiledSource, frontmatter, totalSteps }: CcoPageProps) {
  const recentlyUpdated = isRecentlyUpdated(frontmatter.last_updated)

  return (
    <>
      <SEOHead
        title={frontmatter.title}
        description={`Credentialing checklist for ${frontmatter.title}. Step-by-step guidance for Oregon therapists.`}
        path={`/pathway/${frontmatter.slug}`}
      />

      <ChecklistProvider slug={frontmatter.slug}>
        <div className="py-8">
          <nav className="mb-4 text-sm text-gray-500 print:hidden">
            <Link
              href="/start"
              className="underline decoration-gray-300 underline-offset-2 hover:text-gray-700"
            >
              ← Back to My Pathway
            </Link>
          </nav>

          {frontmatter.status === 'under_review' && <UnderReviewBanner />}

          <div className="flex flex-wrap items-start gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {frontmatter.title}
            </h1>
            <ConfidenceBadge level={frontmatter.confidence} />
            {recentlyUpdated && (
              <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                Recently Updated
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
            <span>
              Last verified:{' '}
              <time dateTime={frontmatter.last_verified}>
                {frontmatter.last_verified}
              </time>
            </span>
            <SourceCitation
              url={frontmatter.source_url}
              type={frontmatter.source_type}
            />
          </div>

          {frontmatter.credentialing_parent && (
            <p className="mt-3 rounded bg-blue-50 px-3 py-2 text-sm text-blue-800">
              This CCO uses{' '}
              <strong>{frontmatter.credentialing_parent}</strong>{' '}
              credentialing. One credential packet may cover multiple CCOs.
            </p>
          )}

          <ChecklistProgressBar slug={frontmatter.slug} totalSteps={totalSteps} />

          <ContentErrorBoundary
            pageTitle={frontmatter.title}
            pageSlug={frontmatter.slug}
          >
            <article className="prose mt-6 max-w-none">
              <MDXClient
                compiledSource={compiledSource}
                components={mdxComponents}
              />
            </article>
          </ContentErrorBoundary>

          <div className="mt-8 space-y-4 border-t border-gray-200 pt-4">
            <ReportIssueLink
              pageTitle={frontmatter.title}
              pageSlug={frontmatter.slug}
            />
            <CommunityLink />
          </div>
        </div>
      </ChecklistProvider>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getAllContentSlugs('cco')
  return {
    paths: slugs.map((slug) => ({ params: { cco: slug } })),
    fallback: false,
  }
}

function countStepHeadings(content: string): number {
  const matches = content.match(/^##\s+(Step|Stage)\s+\d+/gim)
  return matches ? matches.length : 0
}

export const getStaticProps: GetStaticProps<CcoPageProps> = async ({ params }) => {
  const slug = params!.cco as string
  const { source, frontmatter } = getContentBySlug('cco', slug)

  const totalSteps = frontmatter.total_steps ?? countStepHeadings(source)

  const mdxSource = await serialize({
    source,
    options: {
      parseFrontmatter: false,
    },
  })

  if ('error' in mdxSource) {
    throw mdxSource.error
  }

  return {
    props: {
      compiledSource: mdxSource.compiledSource,
      frontmatter,
      totalSteps,
    },
  }
}
