import { SkillBadge } from "@/components/common/SkillBadge"
import { Code, Cloud, GitBranch, Smartphone, Database } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="mb-16">
        <h1 className="text-5xl font-bold mb-4">About Me</h1>
        <p className="text-lg text-gray-700">
          I'm a passionate software engineer with a focus on building scalable and user-friendly applications. I enjoy
          exploring new technologies and sharing my knowledge with others.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">My Expertise</h2>
        <div className="space-y-4">
          <p>
            With 5 years of experience in the tech industry, I've had the opportunity to work on a wide range of
            projects and technologies. My areas of expertise include:
          </p>
          <div className="flex flex-wrap gap-4">
            <SkillBadge icon={<Code className="w-5 h-5" />} label="Full-stack Development" />
            <SkillBadge icon={<Cloud className="w-5 h-5" />} label="Cloud Computing" />
            <SkillBadge icon={<GitBranch className="w-5 h-5" />} label="DevOps" />
            <SkillBadge icon={<Smartphone className="w-5 h-5" />} label="Mobile Development" />
            <SkillBadge icon={<Database className="w-5 h-5" />} label="Database Design" />
          </div>
          <p>
            Through this blog, I aim to share insights from my professional journey and help others navigate the
            ever-changing landscape of software development.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Contact Me</h2>
        <p>
          Feel free to reach out if you have any questions or would like to collaborate. You can find me on{" "}
          <a href="https://twitter.com" className="underline text-blue-500">
            Twitter
          </a>{" "}
          and{" "}
          <a href="https://github.com" className="underline text-blue-500">
            GitHub
          </a>
          .
        </p>
      </section>
    </main>
  )
}

