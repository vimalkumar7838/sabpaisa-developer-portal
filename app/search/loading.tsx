import { SearchResultsSkeleton } from '@/components/ui/loading-skeletons'

export default function SearchLoading() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Documentation</h1>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-muted animate-pulse h-12 rounded-lg"></div>
          <div className="w-24 bg-muted animate-pulse h-12 rounded-lg"></div>
        </div>
      </div>
      <SearchResultsSkeleton />
    </div>
  )
}