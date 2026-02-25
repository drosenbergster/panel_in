import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

import type { ContentFrontmatter } from '@/types/content'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

export function getContentBySlug(
  dir: string,
  slug: string
): { source: string; frontmatter: ContentFrontmatter } {
  const fullPath = path.join(CONTENT_ROOT, dir, `${slug}.mdx`)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { content, data } = matter(raw)
  return { source: content, frontmatter: data as ContentFrontmatter }
}

export function getAllContentSlugs(dir: string): string[] {
  const fullDir = path.join(CONTENT_ROOT, dir)
  if (!fs.existsSync(fullDir)) return []

  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
