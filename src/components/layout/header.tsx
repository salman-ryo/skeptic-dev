import Image from "next/image"
import Link from "next/link"

export function Header() {
  const navLinks = [
    {
      name:"Blogs",
      link:"/blogs"
    },
    {
      name:"About",
      link:"/about"
    },
    {
      name:"Contact",
      link:"/contact"
    },
    {
      name:"Add",
      link:"/admin/new-blog"
    },
  ]
  
  return (
      <header className="w-full flex items-center justify-between px-10 bg-cGray-dark text-white py-4">
        <Link href={"/"}>
        <Image src={"/logo/skepticgrd.png"} alt="Skeptic Dev Logo" width={300} height={100} className="h-8 w-auto object-contain"/>
        </Link>
        <div className="flex items-center gap-8">
          <nav>
            <ul className="flex items-center gap-6">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.link}
                    className="text-sm hover:text-gray-300 transition-colors font-bold"
                  >
                    {item.name}
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

