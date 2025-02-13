import { SkillBadge } from "@/components/common/SkillBadge";
import { H2 } from "@/components/text/heading";
import { socialLinks } from "@/lib/data";
import { Code, Cloud, GitBranch, Smartphone, Database } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-full bg-cGray-dark text-white">
      <div className="flex min-h-screen container w-full md:w-[80%] mx-auto flex-col items-center justify-between p-24">
        <section className="mb-16">
          <H2 className="mb-4 text-white">About</H2>
          <p className="text-lg text-gray-200">
            Welcome to{" "}
            <span className="font-semibold text-gray-300">
              The Skeptic Dev
            </span>{" "}
            , a micro blogging site created by me (Ryo). I created this project
            to learn Blogging as well as create a platform for others who may be
            interested in doing the same. I'm a passionate software developer
            with a focus on building scalable and user-friendly applications. I
            enjoy exploring new technologies and sharing my knowledge with
            others.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Areas of Interest</h2>
          <div className="space-y-4">
            <p className="text-gray-200">
              I love to explore new technologies especially in the field of Web
              Development and Server Side Applications. Some of my favourite
              areas of interest include:
            </p>
            <div className="flex flex-wrap gap-4">
              <SkillBadge
                className="text-black rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2 text-sm"
                icon={<Code className="w-5 h-5" />}
                label="Full-stack Development"
              />
              <SkillBadge
                className="text-black rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2 text-sm"
                icon={<Cloud className="w-5 h-5" />}
                label="Cloud Computing"
              />
              <SkillBadge
                className="text-black rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2 text-sm"
                icon={<GitBranch className="w-5 h-5" />}
                label="DevOps"
              />
              <SkillBadge
                className="text-black rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2 text-sm"
                icon={<Smartphone className="w-5 h-5" />}
                label="Mobile Development"
              />
              <SkillBadge
                className="text-black rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2 text-sm"
                icon={<Database className="w-5 h-5" />}
                label="Database Design"
              />
            </div>
            <p>
              Through this blog, I aim to share insights from my professional
              journey and help others navigate the ever-changing landscape of
              software development.
            </p>
          </div>
        </section>

        <section className="w-full">
          <h2 className="text-3xl font-semibold mb-6">Contact Me</h2>
          <p>
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
            or through the
            {" "}
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
