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

  // Extract role for easier conditionals
  const role = (session?.user as TSessionUser)?.role;

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
            className="text-sm font-bold hover:text-gray-300 transition-colors"
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
            <DropdownMenuContent align="end" className="bg-cGray-dark text-white">
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

              {(role === "user" || role === "admin" || role === "author") &&
                userLinks.map((item) => (
                  <DropdownMenuItem key={item.name}>
                    <Link href={item.link} className="w-full font-medium">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}

              {(role === "admin" || role === "author") &&
                adminLinks.map((item) => (
                  <DropdownMenuItem key={item.name}>
                    <Link href={item.link} className="w-full">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}

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
            className="text-sm font-bold hover:text-gray-300 transition-colors"
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
          {/* If logged in, show user info header with avatar */}
          {session?.user && (
            <div className="p-4 border-b border-gray-700 flex items-center gap-4">
              <UserAvatar
                user={session.user as TSessionUser}
                className="h-10 w-10"
              />
              <div className="flex flex-col">
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
            </div>
          )}

          <nav className="flex flex-col gap-4 p-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-sm font-bold hover:text-gray-300 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {session?.user ? (
              <>
                {(role === "user" ||
                  role === "admin" ||
                  role === "author") &&
                  userLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      className="text-sm font-bold hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}

                {(role === "admin" || role === "author") &&
                  adminLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      className="text-sm font-bold hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}

                <button
                  onClick={() => signOut()}
                  className="text-cPeach-dark w-fit font-semibold cursor-pointer text-sm hover:text-gray-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(path)}`}
                className="text-sm font-bold hover:text-gray-300 transition-colors"
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
