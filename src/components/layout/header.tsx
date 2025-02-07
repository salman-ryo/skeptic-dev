"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { limitChars } from "@/utils/text";

interface TSessionUser {
  name: string;
  email: string;
  image?: string | null;
  role: "user" | "admin";
}

export function Header() {
  const { data: session } = useSession();

  const navLinks = [
    { name: "Blogs", link: "/blogs" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const adminLinks = [
    { name: "Create Blog", link: "/admin/new-blog" },
    { name: "Blog Dashboard", link: "/admin/blogs" },
  ];

  return (
    <header className="w-full flex items-center justify-between px-6 md:px-10 bg-cGray-dark text-white py-4 select-none">
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
              <Avatar>
                <AvatarImage
                  src={session.user?.image || ""}
                  alt="User Avatar"
                />
                <AvatarFallback>
                  {session.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-cGray-dark text-white">
              <div  className="flex flex-col items-start justify-start gap-0 cursor-default p-2">
                <span className="font-medium capitalize">{session.user?.name}</span>
                {session.user?.email && (
                  <span className="text-xs">
                    {limitChars(session.user?.email, 25)}
                  </span>
                )}
              </div>
              <DropdownMenuItem>
                <Link href="/saved-blogs" className="w-full">
                  Saved Blogs
                </Link>
              </DropdownMenuItem>

              {(session.user as TSessionUser)?.role === "admin" && (
                <>
                  {adminLinks.map((item) => (
                    <DropdownMenuItem key={item.name}>
                      <Link href={item.link} className="w-full">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </>
              )}

              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-red-500 cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
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
                <Link
                  href="/saved-blogs"
                  className="hover:text-gray-300 transition-colors"
                >
                  Saved Blogs
                </Link>

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
                href="/login"
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
