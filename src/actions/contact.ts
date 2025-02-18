"use server"

import { z } from "zod"

const emailSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})

const authorRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  expertise: z.string().min(1),
  motivation: z.string().min(1),
})

export async function sendEmail(formData: FormData) {
  const validatedFields = emailSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  if (!validatedFields.success) {
    return { success: false }
  }

  // Here you would typically send an email using your preferred method
  // For example, using a service like SendGrid or AWS SES

  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true }
}

export async function requestAuthor(formData: FormData) {
  const validatedFields = authorRequestSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    expertise: formData.get("expertise"),
    motivation: formData.get("motivation"),
  })

  if (!validatedFields.success) {
    return { success: false }
  }

  // Here you would typically store the author request in your database
  // and potentially send a notification email to the admin

  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true }
}

