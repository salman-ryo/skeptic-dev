"use server"
import { Resend } from 'resend';
import React from 'react';
import Feedback from '@/templates/email/feedback';
import { getErrorMessage } from '@/utils/getError';
import AuthorRequest from '@/templates/email/request';

const resend = new Resend(process.env.RESEND_API_KEY);
type TEmail = "feedback" | "request";
export const sendFeedbackRequestEmail = async (formData: FormData, type: TEmail) => {
    const name = formData.get('name');
  const senderEmail = formData.get('email');
  const message = formData.get('message');

  if (!name || typeof name !== 'string' || name.length > 100) {
    return { error: 'Invalid email' };
  }
  if (!senderEmail || typeof senderEmail !== 'string' || senderEmail.length > 100) {
    return { error: 'Invalid email' };
  }

  if (!message || typeof message !== 'string' || message.length > 5000) {
    return { error: 'Invalid message' };
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is missing or invalid.');
    }
    const isFeedback = type === "feedback";
    const data = await resend.emails.send({
      // from: 'dev.salman1508@gmail.com',
      from: 'onboarding@resend.dev',
      to: 'dev.salman1508@gmail.com',
      subject: 'The Skeptic Dev',
      replyTo: senderEmail,
    //   reply_to: senderEmail,
      react: React.createElement(isFeedback? Feedback : AuthorRequest, {
        name:name,
        email: senderEmail,
        message: message,
      }),
    });

    return { data };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
};
