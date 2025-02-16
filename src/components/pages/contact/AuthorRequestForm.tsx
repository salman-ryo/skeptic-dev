"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, User } from "lucide-react";
import { useFormStatus } from "react-dom";
import { sendFeedbackRequestEmail } from "@/actions/sendFeedbackRequest";
import { useCustomToast } from "@/hooks/useCustomToast";

function SubmitButton() {
  const { pending } = useFormStatus(); // Detects form submission status

  return (
    <Button
      type="submit"
      className="rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2
      dark:bg-black dark:border-blue-400 dark:text-white dark:border-t dark:border-r dark:hover:bg-black dark:hover:text-blue-400 transition-all duration-300
      "
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit Request"} <Send />
    </Button>
  );
}

export default function AuthorRequestForm() {
  const formRef = useRef<HTMLFormElement>(null); // Reference to reset form
  const { errorToast, successToast } = useCustomToast();

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        const { error } = await sendFeedbackRequestEmail(formData, "request");
        if (error) {
          errorToast(
            error + "\nIf error persists, please contact me via email."
          );
          return;
        }
        successToast(
          "Email sent successfully!",
          "Email has been sent. Please allow us 24 hours to reply."
        );
        formRef.current?.reset(); // Reset the form after successful submission
      }}
      className="space-y-6"
    >
      <div className="border-b-2 border-gray-500 relative pl-8
      dark:border-blue-400
      ">
        <User className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500
        dark:text-cyan-400
        " />
        <Input
          name="name"
          className="noFocus"
          placeholder="Your Name"
          required
        />
      </div>
      <div className="border-b-2 border-gray-500 relative pl-8
      dark:border-blue-400 dark:text-cyan-400
      ">
        <Mail className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500
        dark:text-cyan-400
        " />
        <Input
          name="email"
          className="noFocus"
          type="email"
          placeholder="Your Email"
          required
        />
      </div>
      <div className="border-2 border-gray-500 rounded-lg
      dark:border-blue-400
      ">
        <Textarea
          name="message"
          rows={6}
          placeholder="Tell us about yourself in brief..."
          required
        />
      </div>

      {/* Submit button with loading state */}
      <SubmitButton />
    </form>
  );
}
