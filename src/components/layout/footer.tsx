import Link from "next/link";
import { Facebook, FileUser, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-cGray-dark w-full p-16 pb-8 border-t border-cGray">
      <div className="container mx-auto">
        {/* Top section with logo and social icons */}
        <div className="flex flex-col md:flex-row justify-between items-center ">
        <div className="flex justify-start items-center">
          <h1 className="text-gray-300 text-[7rem] font-bold tracking-tight">
            SKEPTIC DEV
          </h1>
          <p className="text-gray-400 text-base font-bold ml-6">
            Eat
            <br />
            Sleep <br />
            Code <br />
            Repeat
          </p>
        </div>
          <div className="flex gap-4">
            <Link
              href={socialLinks.portfolio}
              className="bg-white hover:bg-white/80 transition-colors p-2 rounded-full"
            >
              <FileUser  className="w-6 h-6" />
              <span className="sr-only">Portfolio</span>
            </Link>
            <Link
              href={socialLinks.github}
              className="bg-white hover:bg-white/80 transition-colors p-2 rounded-full"
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">Github</span>
            </Link>
            <Link
              href={socialLinks.linkedin}
              className="bg-white hover:bg-white/80 transition-colors p-2 rounded-full"
            >
              <Linkedin className="w-6 h-6"/>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>

        {/* Bottom section with navigation and copyright */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <nav className="flex flex-wrap justify-center md:justify-between gap-4 mb-4 md:mb-0 text-sm text-gray-400 w-full">
              <div className="flex justify-center items-center gap-4">
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-gray-300 transition-colors"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/cookies-and-policy"
                  className="hover:text-gray-300 transition-colors"
                >
                  Cookie & Policy
                </Link>
              </div>
              <div className="flex justify-center items-center gap-4">
                <Link
                  href="/blogs"
                  className="hover:text-gray-300 transition-colors"
                >
                  Blogs
                </Link>
                <Link
                  href="/about"
                  className="hover:text-gray-300 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-gray-300 transition-colors"
                >
                  Contact
                </Link>
              </div>
              <p className="text-sm text-gray-400">
                All rights reserved. © {new Date().getFullYear()} The Skeptic Dev
              </p>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
