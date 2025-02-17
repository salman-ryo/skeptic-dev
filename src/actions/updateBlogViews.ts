// actions/blog-actions.ts
"use server";

export async function updateBlogViews(blogId: string) {
  try {
    await fetch(`/api/public/blogs/views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId }),
    });
  } catch (error) {
    console.error("Error updating blog views:", error);
  }
}