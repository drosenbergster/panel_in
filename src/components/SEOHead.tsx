import Head from 'next/head'

interface SEOHeadProps {
  title: string
  description: string
  path?: string
  ogType?: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://panelin.org'
const SITE_NAME = 'Panel In'

export function formatTitle(title: string): string {
  return title === SITE_NAME ? title : `${title} — ${SITE_NAME}`
}

export function SEOHead({
  title,
  description,
  path = '',
  ogType = 'website',
}: SEOHeadProps) {
  const fullTitle = formatTitle(title)
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}
