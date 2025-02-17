import { Resend } from "resend";
import React from "react";
import { getErrorMessage } from "@/utils/getError";
import OtpEmail from "@/templates/email/OTP";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (email: string, otp: string) => {
  if (!email || typeof email !== "string" || email.length > 100) {
    return { error: "Invalid email address" };
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing or invalid.");
    }

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "The Skeptic Dev",
      react: React.createElement(OtpEmail, { otp }),
    });

    return { data };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
};
