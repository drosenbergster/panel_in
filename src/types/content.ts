export type ConfidenceLevel = 'verified' | 'partial' | 'gap'
export type ContentType = 'cco_checklist' | 'guide' | 'reference' | 'template'
export type ContentStatus = 'active' | 'under_review' | 'draft'
export type SourceType = 'primary' | 'secondary' | 'community_verified'

export interface ContentFrontmatter {
  title: string
  content_type: ContentType
  slug: string
  cco?: string
  license_types: string[]
  counties?: string[]
  prerequisite?: boolean
  confidence: ConfidenceLevel
  status: ContentStatus
  last_verified: string
  last_updated: string
  review_interval_days: number
  source_url: string
  source_type: SourceType
  depends_on?: string[]
  credentialing_parent?: string
  total_steps?: number
}

export interface WizardState {
  licenseType: string
  counties: string[]
  payers: string[]
}

export interface ChecklistProgress {
  [checklistItemId: string]: boolean
}

export interface CcoData {
  slug: string
  title: string
  counties: string[]
  credentialing_parent?: string
  confidence: ConfidenceLevel
  total_steps?: number
}
