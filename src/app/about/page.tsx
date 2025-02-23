import { SkillBadge } from "@/components/common/SkillBadge";
import { H2 } from "@/components/text/heading";
import { socialLinks } from "@/lib/data";
import { Code, Cloud, GitBranch, Database } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-full light:bg-cGray-dark text-white dark:text-gray-200 max-md:pt-10 max-md:pb-20">
      <div className="flex min-h-screen container w-full md:w-[80%] mx-auto flex-col items-center justify-between p-6 md:p-24">
        <section className="mb-8 md:mb-16">
          <H2 className="mb-4 text-white">About</H2>
          <p className="text-base md:text-lg text-gray-200">
            Welcome to{" "}
            <span className="font-semibold text-gray-300">The Skeptic Dev</span>{" "}
            , a micro blogging site created by me (Ryo). I created this project
            to learn Blogging as well as create a platform for others who may be
            interested in doing the same. The focus of the blogs on this site is all about questioning "Why" and "How" (i.e. Skepticism). I'm a passionate software developer
            with a focus on building scalable and user-friendly applications. I
            enjoy exploring new technologies and sharing my knowledge with
            others.
          </p>
        </section>

        <section className="mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Areas of Interest</h2>
          <div className="space-y-4">
            <p className="text-base md:text-lg text-gray-200">
              I love to explore new technologies especially in the field of Web
              Development and Server Side Applications. Some of my favourite
              areas of interest include:
            </p>
            <div className="flex flex-wrap gap-4 max-md:py-4">
              <SkillBadge
                className="text-black rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2 text-sm dark:bg-slate-950 dark:border-blue-400 dark:text-gray-200"
                icon={<Code className="size-5 max-md:size-4 dark:text-cPeach-dark" />}
                label="Full-stack Development"
              />
              <SkillBadge
                className="text-black rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2 text-sm dark:bg-slate-950 dark:border-blue-400 dark:text-gray-200"
                icon={<Cloud className="size-5 max-md:size-4 dark:text-cPeach-dark" />}
                label="Cloud Computing"
              />
              <SkillBadge
                className="text-black rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2 text-sm dark:bg-slate-950 dark:border-blue-400 dark:text-gray-200"
                icon={<GitBranch className="size-5 max-md:size-4 dark:text-cPeach-dark" />}
                label="DevOps"
              />
              <SkillBadge
                className="text-black rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2 text-sm dark:bg-slate-950 dark:border-blue-400 dark:text-gray-200"
                icon={<Database className="size-5 max-md:size-4 dark:text-cPeach-dark" />}
                label="Database Design"
              />
            </div>
            <p className="text-base md:text-lg">
              Through this blog, I aim to share insights from my professional
              journey and help others navigate the ever-changing landscape of
              software development.
            </p>
          </div>
        </section>

        <section className="w-full">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Contact Me</h2>
          <p className="text-base md:text-lg">
            Feel free to reach out if you have any questions or would like to
            collaborate. You can find me on{" "}
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              referrerPolicy="no-referrer"
              className="underline text-blue-500"
            >
              LinkedIn
            </Link>{" "}
            and{" "}
            <Link
              href={socialLinks.github}
              className="underline text-blue-500"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              GitHub
            </Link>{" "}
            or through the{" "}
            <Link
              href={"/contact"}
              className="underline text-blue-500"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              Contact
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </main>
  );
}
