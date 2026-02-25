import { useState, useMemo } from 'react'

import { SEOHead } from '@/components/SEOHead'

import type { GetStaticProps } from 'next'

interface ContentItem {
  title: string
  slug: string
  contentType: string
  lastVerified: string
  reviewIntervalDays: number
  confidence: string
  status: string
  daysUntilReview: number
}

type SortKey = keyof ContentItem
type SortDir = 'asc' | 'desc'

function freshnessColor(days: number): string {
  if (days > 14) return 'text-green-700 bg-green-50'
  if (days > 0) return 'text-amber-700 bg-amber-50'
  return 'text-red-700 bg-red-50'
}

interface AdminPageProps {
  items: ContentItem[]
  generatedAt: string
}

export default function AdminPage({ items, generatedAt }: AdminPageProps) {
  const [sortKey, setSortKey] = useState<SortKey>('daysUntilReview')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal
      }
      const aStr = String(aVal)
      const bStr = String(bVal)
      return sortDir === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr)
    })
  }, [items, sortKey, sortDir])

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return ''
    return sortDir === 'asc' ? ' ↑' : ' ↓'
  }

  const overdue = items.filter((i) => i.daysUntilReview < 0).length
  const approaching = items.filter((i) => i.daysUntilReview >= 0 && i.daysUntilReview <= 14).length

  return (
    <>
      <SEOHead
        title="Content Admin"
        description="Content freshness dashboard."
        path="/admin"
      />

      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900">Content Admin</h1>
        <p className="mt-1 text-sm text-gray-500">
          Generated {generatedAt}. {items.length} content items.
          {overdue > 0 && (
            <span className="ml-2 font-medium text-red-600">
              {overdue} overdue
            </span>
          )}
          {approaching > 0 && (
            <span className="ml-2 font-medium text-amber-600">
              {approaching} approaching review
            </span>
          )}
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {([
                  ['title', 'Title'],
                  ['contentType', 'Type'],
                  ['lastVerified', 'Last Verified'],
                  ['daysUntilReview', 'Days Until Review'],
                  ['confidence', 'Confidence'],
                  ['status', 'Status'],
                ] as [SortKey, string][]).map(([key, label]) => (
                  <th key={key} className="px-3 py-2">
                    <button
                      onClick={() => handleSort(key)}
                      className="hover:text-gray-900"
                      type="button"
                    >
                      {label}{sortIndicator(key)}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sorted.map((item) => (
                <tr key={item.slug} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-3 py-2 text-gray-600">{item.contentType}</td>
                  <td className="px-3 py-2 text-gray-600">{item.lastVerified}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${freshnessColor(item.daysUntilReview)}`}>
                      {item.daysUntilReview > 0
                        ? `${item.daysUntilReview}d remaining`
                        : `${Math.abs(item.daysUntilReview)}d overdue`}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{item.confidence}</td>
                  <td className="px-3 py-2 text-gray-600">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<AdminPageProps> = async () => {
  const fs = await import('fs')
  const path = await import('path')
  const matter = (await import('gray-matter')).default

  const contentDir = path.join(process.cwd(), 'content')
  const items: ContentItem[] = []
  const now = Date.now()

  function walkDir(dir: string) {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walkDir(fullPath)
      } else if (entry.name.endsWith('.mdx')) {
        const raw = fs.readFileSync(fullPath, 'utf-8')
        const { data } = matter(raw)

        const lastVerified = new Date(data.last_verified)
        const reviewDays = data.review_interval_days ?? 90
        const deadline = lastVerified.getTime() + reviewDays * 24 * 60 * 60 * 1000
        const daysUntilReview = Math.round((deadline - now) / (24 * 60 * 60 * 1000))

        items.push({
          title: data.title ?? entry.name,
          slug: data.slug ?? entry.name.replace('.mdx', ''),
          contentType: data.content_type ?? 'unknown',
          lastVerified: data.last_verified ?? 'unknown',
          reviewIntervalDays: reviewDays,
          confidence: data.confidence ?? 'unknown',
          status: data.status ?? 'unknown',
          daysUntilReview,
        })
      }
    }
  }

  walkDir(contentDir)

  return {
    props: {
      items,
      generatedAt: new Date().toISOString().split('T')[0],
    },
  }
}
