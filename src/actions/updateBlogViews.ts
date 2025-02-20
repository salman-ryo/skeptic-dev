// actions/blog-actions.ts
"use server";

import { getBaseUrl } from "@/utils/getBaseUrl";

// const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'; // Fallback to localhost for dev
const BASE_URL = getBaseUrl()

export async function updateBlogViews(blogId: string) {
  if(!blogId)return null
  try {
    const res = await fetch(`${BASE_URL}/api/public/blogs/views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId }),
    });

    const dat = await res.json()
  } catch (error) {
    console.error("Error updating blog views:", error);
  }
}