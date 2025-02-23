import { socialLinks } from "@/lib/data";
import { Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

export default function SocialsSection() {
  return (
    <div className="mt-8 flex flex-wrap justify-start items-center gap-6 test">
      {links.map(({ href, label, Icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          referrerPolicy="no-referrer"
          className="group flex items-center border gap-3 px-4 py-2 bg-white text-black hover:bg-white/80 transition-all duration-300 rounded-tr-3xl rounded-bl-3xl
              dark:bg-cPeach-dark dark:text-black dark:hover:bg-black dark:border-cPeach-dark dark:hover:text-white dark:hover:border-cPeach-dark
          "
        >
          <Icon className="size-6 max-md:size-4 text-black
          dark:group-hover:text-white transition-all duration-300
          " />
          <span className="font-medium max-md:text-xs">{label}</span>
        </Link>
      ))}
    </div>
  );
}

const links = [
  { href: socialLinks.portfolio, label: "My Portfolio", Icon: Globe },
  { href: socialLinks.github, label: "GitHub", Icon: Github },
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: Linkedin },
];
