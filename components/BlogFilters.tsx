'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface BlogFiltersProps {
  categories: string[]
}

export default function BlogFilters({ categories }: BlogFiltersProps) {
  const searchParams = useSearchParams()
  const active = searchParams.get('category')

  return (
    <div className="flex flex-wrap gap-2 mb-12">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
          !active
            ? 'bg-se-orange text-white shadow-sm'
            : 'bg-white text-se-navy/60 border border-gray-200 hover:border-se-orange/40 hover:text-se-navy'
        }`}
      >
        Tous les articles
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/blog?category=${encodeURIComponent(cat)}`}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            active === cat
              ? 'bg-se-orange text-white shadow-sm'
              : 'bg-white text-se-navy/60 border border-gray-200 hover:border-se-orange/40 hover:text-se-navy'
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  )
}
