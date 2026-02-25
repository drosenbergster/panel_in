import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

import type { ContentFrontmatter } from '@/types/content'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export function getContentBySlug(
  dir: string,
  slug: string
): { source: string; frontmatter: ContentFrontmatter } {
  const fullPath = path.join(CONTENT_DIR, dir, `${slug}.mdx`)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { content, data } = matter(raw)
  return { source: content, frontmatter: data as ContentFrontmatter }
}

export function getAllContentSlugs(dir: string): string[] {
  const dirPath = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(dirPath)) return []
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
