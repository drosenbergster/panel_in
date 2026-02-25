import Link from 'next/link'
import { serialize } from 'next-mdx-remote-client/serialize'
import { MDXClient } from 'next-mdx-remote-client/csr'

import { SEOHead } from '@/components/SEOHead'
import { ConfidenceBadge } from '@/components/ConfidenceBadge'
import { SourceCitation } from '@/components/SourceCitation'
import { UnderReviewBanner } from '@/components/UnderReviewBanner'
import { ReportIssueLink } from '@/components/ReportIssueLink'
import { CommunityLink } from '@/components/CommunityLink'
import { ContentErrorBoundary } from '@/components/ContentErrorBoundary'
import { mdxComponents } from '@/lib/mdx-components'
import { getContentBySlug, getAllContentSlugs } from '@/lib/content'

import type { GetStaticPaths, GetStaticProps } from 'next'
import type { ContentFrontmatter } from '@/types/content'

interface GuidePageProps {
  compiledSource: string
  frontmatter: ContentFrontmatter
}

export default function GuidePage({ compiledSource, frontmatter }: GuidePageProps) {
  return (
    <>
      <SEOHead
        title={frontmatter.title}
        description={`${frontmatter.title}. Step-by-step guidance for Oregon therapists.`}
        path={`/guides/${frontmatter.slug}`}
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
          {frontmatter.prerequisite && (
            <span className="rounded bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700">
              Pre-paneling prerequisite
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
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getAllContentSlugs('guides')
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<GuidePageProps> = async ({ params }) => {
  const slug = params!.slug as string
  const { source, frontmatter } = getContentBySlug('guides', slug)

  const mdxSource = await serialize({
    source,
    options: { parseFrontmatter: false },
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
