import { Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

export default function SocialsSection() {
  return (
    <div className="mt-8 flex flex-wrap justify-start items-center gap-6">
      {socialLinks.map(({ href, label, Icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex items-center gap-3 px-4 py-2 bg-white text-black hover:bg-white/80 transition-all duration-300 rounded-tr-3xl rounded-bl-3xl"
        >
          <Icon className="w-6 h-6 text-black" />
          <span className="font-medium">{label}</span>
        </Link>
      ))}
    </div>
  );
}

const socialLinks = [
  { href: "https://dev-salman.vercel.app", label: "My Portfolio", Icon: Globe },
  { href: "https://github.com/yourusername", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/in/yourusername", label: "LinkedIn", Icon: Linkedin },
];
