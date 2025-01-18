import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface ArticleCardProps {
  image: string
  title: string
  description: string
  tags: string[]
  href: string
}

export function ArticleCard({ image, title, description, tags, href }: ArticleCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="space-y-3">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={300}
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </article>
    </Link>
  )
}

