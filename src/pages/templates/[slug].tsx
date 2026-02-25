import Link from 'next/link'
import { serialize } from 'next-mdx-remote-client/serialize'
import remarkGfm from 'remark-gfm'
import { MDXClient } from 'next-mdx-remote-client/csr'

import { SEOHead } from '@/components/SEOHead'
import { ReportIssueLink } from '@/components/ReportIssueLink'
import { CommunityLink } from '@/components/CommunityLink'
import { ContentErrorBoundary } from '@/components/ContentErrorBoundary'
import { mdxComponents } from '@/lib/mdx-components'
import { getContentBySlug, getAllContentSlugs } from '@/lib/content'

import type { GetStaticPaths, GetStaticProps } from 'next'
import type { ContentFrontmatter } from '@/types/content'

interface TemplatePageProps {
  compiledSource: string
  frontmatter: ContentFrontmatter
}

export default function TemplatePage({ compiledSource, frontmatter }: TemplatePageProps) {
  return (
    <>
      <SEOHead
        title={frontmatter.title}
        description={`${frontmatter.title}. Downloadable template for Oregon therapist credentialing.`}
        path={`/templates/${frontmatter.slug}`}
      />

      <div className="py-8">
        <nav className="mb-4 text-sm text-gray-500 print:hidden">
          <Link
            href="/start"
            className="underline decoration-gray-300 underline-offset-2 hover:text-gray-700"
          >
            ← Back to My Pathway
          </Link>
        </nav>

        <div className="mb-4 flex items-center justify-between print:hidden">
          <h1 className="text-2xl font-bold text-gray-900">
            {frontmatter.title}
          </h1>
          <button
            onClick={() => window.print()}
            className="inline-flex min-h-[44px] items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Print / Save as PDF
          </button>
        </div>

        <h1 className="hidden text-2xl font-bold text-gray-900 print:block">
          {frontmatter.title}
        </h1>

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

        <div className="mt-8 space-y-4 border-t border-gray-200 pt-4 print:hidden">
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
  const slugs = getAllContentSlugs('templates')
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<TemplatePageProps> = async ({ params }) => {
  const slug = params!.slug as string
  const { source, frontmatter } = getContentBySlug('templates', slug)

  const mdxSource = await serialize({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: { remarkPlugins: [remarkGfm] },
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
