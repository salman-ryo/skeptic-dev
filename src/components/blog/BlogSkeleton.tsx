export default function BlogSkeleton() {
    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Title skeleton */}
        <div className="space-y-4 mb-8">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4 
      dark:bg-slate-700
          
          "></div>
        </div>
  
        {/* Meta information skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-32"></div>
        </div>
  
        {/* Social buttons skeleton */}
        <div className="flex gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
          ))}
        </div>
  
        {/* Featured image skeleton */}
        <div className="aspect-[16/9] w-full bg-gray-200 rounded animate-pulse mb-4
        dark:bg-black
        "></div>
  
        {/* Image caption skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-48 mx-auto mb-12"></div>
  
        {/* Section heading skeleton */}
        <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-1/3 mb-6"></div>
  
        {/* Content paragraphs skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-4/5"></div>
        </div>
      </article>
    )
  }
  
  