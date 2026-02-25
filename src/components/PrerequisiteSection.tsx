import prerequisites from '@/data/prerequisites.json'

interface PrerequisiteItem {
  slug: string
  title: string
}

export function PrerequisiteSection() {
  const items = prerequisites as PrerequisiteItem[]
  if (items.length === 0) return null

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900">
        Pre-Paneling Setup
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Complete these before starting your CCO applications.
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item.slug}
            className="rounded-lg border border-gray-200 p-3 text-sm font-medium text-gray-900"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </section>
  )
}
