"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", link: "/" },
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

  // Helper to set active class for desktop and mobile nav links
  const linkClass = (link: string) =>
    `text-sm font-bold transition-colors ${
      link === path
        ? "underline underline-offset-8 decoration-2 text-white dark:text-cyan-400"
        : "hover:underline hover:underline-offset-8 hover:decoration-2 hover:text-white hover:dark:text-cyan-400"
    }`;

  // For dropdown items, the active route should mimic the hover state.
  const dropdownLinkClass = "bg-slate-100 text-slate-900 dark:bg-cPeach dark:text-black"

  return (
    <header className="w-full flex items-center justify-between px-6 md:px-10 text-white h-16 select-none">
      {/* Logo */}
      <Link
        href="/"
        onClick={() => {
          setDropdownOpen(false);
          setMobileMenuOpen(false);
        }}
      >
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
            className={linkClass(item.link)}
            onClick={() => {
              setDropdownOpen(false);
              setMobileMenuOpen(false);
            }}
          >
            {item.name}
          </Link>
        ))}

        {/* Conditional Rendering for Authenticated Users */}
        {session?.user ? (
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
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

              {(role === "user" ||
                role === "admin" ||
                role === "author") &&
                userLinks.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    onClick={() => setDropdownOpen(false)}
                    className={item.link === path? dropdownLinkClass : ""}
                  >
                    <Link
                      href={item.link}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}

              {(role === "admin" || role === "author") &&
                adminLinks.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    onClick={() => setDropdownOpen(false)}
                    className={item.link === path? dropdownLinkClass : ""}


                  >
                    <Link
                      href={item.link}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}

              <DropdownMenuItem
                onClick={() => {
                  setDropdownOpen(false);
                  signOut();
                }}
                className="text-cPeach-dark font-semibold cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(path)}`}
            className={linkClass("/login")}
            onClick={() => {
              setDropdownOpen(false);
              setMobileMenuOpen(false);
            }}
          >
            Login
          </Link>
        )}
      </nav>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-cGray-dark text-white">
          {/* Logged-in User Info */}
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
                className={linkClass(item.link)}
                onClick={() => setMobileMenuOpen(false)}
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
                      className={linkClass(item.link)}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                {(role === "admin" || role === "author") &&
                  adminLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      className={linkClass(item.link)}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="text-cPeach-dark w-fit font-semibold cursor-pointer text-sm hover:text-gray-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(path)}`}
                className={linkClass("/login")}
                onClick={() => setMobileMenuOpen(false)}
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
