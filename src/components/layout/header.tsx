"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { limitChars } from "@/utils/text";
import { TSessionUser } from "@/lib/types/user";
import UserAvatar from "../common/UserAvatar";
import { usePathname } from "next/navigation";
import SimpleTooltip from "../common/SimpleTooltip";

export function Header() {
  const { data: session } = useSession();
  const path = usePathname();
  const navLinks = [
    { name: "Blogs", link: "/blogs" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const adminLinks = [
    { name: "Create Blog", link: "/admin/new-blog" },
    { name: "Blog Dashboard", link: "/admin/blogs" },
  ];

  const userLinks = [{ name: "Saved Blogs", link: "/blogs/saved" }];
  return (
    <header className="w-full flex items-center justify-between px-6 md:px-10 text-white h-16 select-none">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/logo/skepticgrd.png"
          alt="Skeptic Dev Logo"
          width={300}
          height={100}
          className="h-8 w-auto object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="text-sm hover:text-gray-300 transition-colors font-bold"
          >
            {item.name}
          </Link>
        ))}

        {/* Conditional Rendering for Authenticated Users */}
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none border-none shadow-none ring-0">
              <UserAvatar user={session.user as TSessionUser} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-cGray-dark text-white"
            >
              <div className="flex flex-col items-start justify-start gap-0 cursor-default p-2">
                <span className="font-medium capitalize dark:text-cyan-400">
                  {session.user?.name}
                </span>
                {session.user?.email && (
                  <SimpleTooltip content={session.user.email}>
                    <span className="text-xs text-blue-400">
                      {limitChars(session.user.email, 25)}
                    </span>
                  </SimpleTooltip>
                )}
              </div>

              {(session.user as TSessionUser)?.role === "user" ||
              (session.user as TSessionUser)?.role === "admin" ||
              (session.user as TSessionUser)?.role === "author" ? (
                <>
                  {userLinks.map((item) => (
                    <DropdownMenuItem key={item.name}>
                      <Link href={item.link} className="w-full font-medium">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </>
              ) : null}

              {(session.user as TSessionUser)?.role === "admin" ||
              (session.user as TSessionUser)?.role === "author" ? (
                <>
                  {adminLinks.map((item) => (
                    <DropdownMenuItem key={item.name}>
                      <Link href={item.link} className="w-full">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </>
              ) : null}

              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-cPeach-dark font-semibold cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(path)}`}
            className="text-sm hover:text-gray-300 transition-colors font-bold"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-cGray-dark text-white">
          <nav className="flex flex-col gap-4 text-lg">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="hover:text-gray-300 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {session ? (
              <>
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <p className="font-bold">{session.user?.name}</p>
                  <p className="text-sm text-gray-400">{session.user?.email}</p>
                </div>

                {(session.user as TSessionUser)?.role === "user" ||
                  ((session.user as TSessionUser)?.role === "admin" && (
                    <>
                      {userLinks.map((item) => (
                        <DropdownMenuItem key={item.name}>
                          <Link href={item.link} className="w-full">
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  ))}

                {(session.user as TSessionUser)?.role === "admin" &&
                  adminLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}

                <button
                  onClick={() => signOut()}
                  className="text-red-500 hover:text-red-400 mt-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(path)}`}
                className="hover:text-gray-300 transition-colors"
              >
                Login
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
