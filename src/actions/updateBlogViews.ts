// actions/blog-actions.ts
"use server";
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'; // Fallback to localhost for dev

export async function updateBlogViews(blogId: string) {
  if(!blogId)return
  console.log("Serf============================",blogId)
  try {
    const res = await fetch(`${BASE_URL}/api/public/blogs/views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId }),
    });

    const dat = await res.json()
    console.log("🚀 ~ updateBlogViews ~ dat:", dat)
  } catch (error) {
    console.error("Error updating blog views:", error);
  }
}