import Link from "next/link"

export function Header() {
  const navItems = ["Blogs", "About", "Contact"]
  
  return (
      <header className="container flex items-center justify-between px-10 bg-cuBlack text-white py-4 border-b border-gray-400">
        <Link href="/" className="text-sm uppercase tracking-wider">
          The Canvas Blog.
        </Link>
        <div className="flex items-center gap-8">
          <nav>
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className="text-sm hover:text-gray-300 transition-colors font-bold"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-2">
            Login
          </div>
        </div>
      </header>
  )
}

