import Link from 'next/link'
import { serialize } from 'next-mdx-remote-client/serialize'
import { MDXClient } from 'next-mdx-remote-client/csr'

import { SEOHead } from '@/components/SEOHead'
import { ConfidenceBadge } from '@/components/ConfidenceBadge'
import { SourceCitation } from '@/components/SourceCitation'
import { UnderReviewBanner } from '@/components/UnderReviewBanner'
import { ReportIssueLink } from '@/components/ReportIssueLink'
import { ContentErrorBoundary } from '@/components/ContentErrorBoundary'
import { mdxComponents } from '@/lib/mdx-components'
import { getContentBySlug, getAllContentSlugs } from '@/lib/content'

import type { GetStaticPaths, GetStaticProps } from 'next'
import type { ContentFrontmatter } from '@/types/content'

interface CcoPageProps {
  compiledSource: string
  frontmatter: ContentFrontmatter
}

function isRecentlyUpdated(dateStr: string): boolean {
  const updated = new Date(dateStr)
  if (isNaN(updated.getTime())) return false
  const diffMs = Date.now() - updated.getTime()
  return diffMs < 30 * 24 * 60 * 60 * 1000
}

export default function CcoPage({ compiledSource, frontmatter }: CcoPageProps) {
  const recentlyUpdated = isRecentlyUpdated(frontmatter.last_updated)

  return (
    <>
      <SEOHead
        title={frontmatter.title}
        description={`Credentialing checklist for ${frontmatter.title}. Step-by-step guidance for Oregon therapists.`}
        path={`/pathway/${frontmatter.slug}`}
      />

      <div className="py-8">
        <nav className="mb-4 text-sm text-gray-500">
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

        <div className="mt-8 border-t border-gray-200 pt-4">
          <ReportIssueLink
            pageTitle={frontmatter.title}
            pageSlug={frontmatter.slug}
          />
        </div>
      </div>
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

export const getStaticProps: GetStaticProps<CcoPageProps> = async ({ params }) => {
  const slug = params!.cco as string
  const { source, frontmatter } = getContentBySlug('cco', slug)

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
    },
  }
}
