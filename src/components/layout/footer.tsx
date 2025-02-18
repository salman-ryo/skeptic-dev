import Link from "next/link";
import {
  FileUser,
  Github,
  Linkedin,
} from "lucide-react";
import { socialLinks } from "@/lib/data";
import SimpleTooltip from "../common/SimpleTooltip";

export default function Footer() {
  return (
    <footer className="light:bg-cGray-dark w-full p-8 md:p-16 pb-6 border-t border-cGray">
      <div className="container mx-auto">
        {/* Top section with logo and social icons */}
        <div className="flex flex-col md:flex-row justify-between items-center max-md:mb-8">
          {/* Logo and tagline */}
          <div className="flex flex-row justify-start items-center text-left mb-8 md:mb-0">
            <h1
              className="text-gray-300 text-5xl md:text-[7rem] font-bold tracking-tight dark:text-gray-200"
            >
              SKEPTIC DEV
            </h1>
            <p
              className="text-gray-400 text-[0.4rem] md:text-base font-bold max-md:ml-3 md:ml-6 dark:text-gray-300"
            >
              Eat
              <br />
              Sleep <br />
              Code <br />
              Repeat
            </p>
          </div>

          {/* Social icons */}
          <div className="flex gap-4">
            <SimpleTooltip content="Visit Portfolio">
              <Link
                href={socialLinks.portfolio}
                className="bg-white hover:bg-white/80 transition-colors p-2 rounded-full border-2 duration-300 dark:bg-cPeach-dark dark:text-black dark:hover:bg-black dark:border-cPeach-dark dark:hover:text-white"
              >
                <FileUser className="w-6 h-6" />
                <span className="sr-only">Portfolio</span>
              </Link>
            </SimpleTooltip>
            <SimpleTooltip content="Visit Github Profile">
              <Link
                href={socialLinks.github}
                className="bg-white hover:bg-white/80 transition-colors p-2 rounded-full border-2 duration-300 dark:bg-cPeach-dark dark:text-black dark:hover:bg-black dark:border-cPeach-dark dark:hover:text-white"
              >
                <Github className="w-6 h-6" />
                <span className="sr-only">Github</span>
              </Link>
            </SimpleTooltip>
            <SimpleTooltip content="Visit LinkedIn Profile">
              <Link
                href={socialLinks.linkedin}
                className="bg-white hover:bg-white/80 transition-colors p-2 rounded-full border-2 duration-300 dark:bg-cPeach-dark dark:text-black dark:hover:bg-black dark:border-cPeach-dark dark:hover:text-white"
              >
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </SimpleTooltip>
          </div>
        </div>

        {/* Bottom section with navigation and copyright */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <nav className="flex flex-col md:flex-row flex-wrap justify-center md:justify-between gap-4 mb-4 md:mb-0 text-sm text-gray-400 dark:text-gray-200">
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
              <p className="text-sm text-gray-400 dark:text-gray-200">
                All rights reserved. © {new Date().getFullYear()} The Skeptic Dev
              </p>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
