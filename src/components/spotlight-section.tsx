import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ArticleProps {
  date: string
  title: string
  description: string
  readTime: string
  image: string
  tags: string[]
}

export function SpotlightSection() {
  const articles: ArticleProps[] = [
    {
      date: "September 15, 2024",
      title: "Soundscapes of the City: An Interview with Leo Hart",
      description: "Explore the world of sound artist Leo Hart, who transforms urban noise into captivating musical compositions.",
      readTime: "8 min read",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Music", "City", "Personality"]
    },
    {
      date: "September 7, 2024",
      title: "Eva Martinez: The Visionary Behind the Canvas",
      description: "Discover the creative journey of Eva Martinez, a self-taught painter whose bold use of color and texture redefines modern art.",
      readTime: "6 min read",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Personality", "Art", "Artist"]
    }
  ]

  return (
    <div className="grid md:grid-cols-[300px,1fr] gap-8">
      <div>
        <h2 className="text-5xl font-bold leading-tight">
          Spotlight<br />on<br />Artists
        </h2>
        <div className="flex gap-2 mt-8">
          <button 
            className="p-2 rounded-full border hover:bg-gray-100"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            className="p-2 rounded-full border hover:bg-gray-100"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <article 
            key={article.title} 
            className="bg-white rounded-lg border border-gray-100 overflow-hidden group cursor-pointer"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-2">
                {article.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-black text-white text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                <time className="text-sm text-gray-500">{article.date}</time>
                <h3 className="text-xl font-bold">{article.title}</h3>
                <p className="text-gray-600 text-sm">{article.description}</p>
                <span className="text-sm text-gray-500">{article.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

