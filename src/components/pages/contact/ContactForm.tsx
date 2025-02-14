"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, User } from "lucide-react";
import { useCustomToast } from "@/hooks/useCustomToast";
import { useFormStatus } from "react-dom";
import { sendFeedbackRequestEmail } from "@/actions/sendFeedbackRequest";

function SubmitButton() {
  const { pending } = useFormStatus(); // Detects form submission status

  return (
    <Button
      type="submit"
      className="rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2"
      disabled={pending}
    >
      {pending ? "Sending..." : "Share Feedback"} <Send />
    </Button>
  );
}

export default function ContactForm() {
  const { errorToast, successToast } = useCustomToast();
  const formRef = useRef<HTMLFormElement>(null); // Reference to the form

  return (
    <form
      ref={formRef} // Attach ref to the form
      action={async (formData) => {
        const { error } = await sendFeedbackRequestEmail(formData,"feedback");

        if (error) {
          errorToast(error + "\nIf error persists, please contact me via email.");
          return;
        }

        successToast("Email sent successfully!","Email has been sent. Please allow us 24 hours to reply.");
        formRef.current?.reset(); // Reset the form after successful submission
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

      {/* Use SubmitButton with proper loading state */}
      <SubmitButton />
    </form>
  );
}
