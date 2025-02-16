
export default function BlogCardSkeleton() {
    return (
      <div className="w-[400px] min-h-[520px] flex-shrink-0 border-2 h-full rounded-md border-gray-100 snap-center bg-white p-4 shadow-sm animate-pulse
      dark:bg-slate-950
      ">
        {/* Image skeleton */}
        <div className="aspect-[16/9] w-full bg-gray-200 rounded-sm animate-pulse mb-4
        dark:bg-black
        "></div>
  
        {/* Tags skeleton */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-7 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          ))}
        </div>
  
        {/* Date skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32 mb-2"></div>
  
        {/* Title skeleton */}
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full mb-2"></div>
  
        {/* Read time skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20 mb-3"></div>
  
        {/* Description skeleton - two lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
        </div>
      </div>
    )
  }
  
  