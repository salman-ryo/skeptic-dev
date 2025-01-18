import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-start">
      <div className="grid gap-4 p-6 bg-gray-100 rounded-lg">
        <div>
          <h3 className="font-semibold">Weekly Highlights</h3>
          <p className="text-sm text-muted-foreground">Every Saturday</p>
        </div>
        <p className="text-sm">Stay updated with a curated roundup of the week's most talked-about content.</p>
        <Button variant="outline" className="w-full">Subscribe</Button>
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Sign Up for Our Newsletter</h2>
        <form className="space-y-4">
          <Input type="email" placeholder="Enter your email here" />
          <Button className="w-full bg-coral-500 hover:bg-coral-600">Sign Up</Button>
        </form>
      </div>
    </section>
  )
}

