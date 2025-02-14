"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendFeedbackEmail } from "@/actions/email/sendFeedback";
import { Mail, Send, User } from "lucide-react";
import { useCustomToast } from "@/hooks/useCustomToast";

export default function ContactForm() {
  const { errorToast, successToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      action={async (formData) => {
        setIsLoading(true); // Start loading
        const { error } = await sendFeedbackEmail(formData);
        setIsLoading(false); // Stop loading

        if (error) {
          errorToast(error + "\nIf error persists, please contact me via email.");
          return;
        }

        successToast("Email sent successfully!");
      }}
      className="space-y-6"
    >
      <div className="border-b-2 border-gray-500 relative pl-8">
        <User className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500" />
        <Input name="name" className="noFocus" placeholder="Your Name" required />
      </div>
      <div className="border-b-2 border-gray-500 relative pl-8">
        <Mail className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500" />
        <Input name="email" className="noFocus" type="email" placeholder="Your Email" required />
      </div>
      <div className="border-2 border-gray-500 rounded-lg">
        <Textarea name="message" placeholder="Your Message" rows={6} required />
      </div>
      <Button
        type="submit"
        className="rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Share Feedback"} <Send />
      </Button>
    </form>
  );
}
