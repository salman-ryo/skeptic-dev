import Link from "next/link"

export function Navigation() {
  const links = ["Latest", "Trending", "Art", "Design", "Music", "Podcast"]
  
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-6">
        {links.map((link) => (
          <li key={link}>
            <Link 
              href={`/${link.toLowerCase()}`}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

