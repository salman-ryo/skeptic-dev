"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { requestAuthor } from "@/actions/contact"
import { Mail, Send, User } from "lucide-react"

export default function AuthorRequestForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const response = await requestAuthor(formData)

    setIsLoading(false)

    if (response.success) {
      toast({
        title: "Request submitted!",
        description: "Thank you for your interest. We'll review your request and get back to you soon.",
      })
      event.currentTarget.reset()
    } else {
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="border-b-2 border-gray-500 relative pl-8">
        <User className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500" />
        <Input name="name" className="noFocus" placeholder="Your Name" required />
      </div>
      <div className="border-b-2 border-gray-500 relative pl-8">
        <Mail className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500" />
        <Input name="email" className="noFocus" type="email" placeholder="Your Email" required />
      </div>
      <div className="border-2 border-gray-500 rounded-lg">
        <Textarea name="motivation" rows={6} placeholder="Tell us about yourself in brief..." required />
      </div>
      <Button type="submit" className="rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Request"} <Send />
      </Button>
    </form>
  )
}
