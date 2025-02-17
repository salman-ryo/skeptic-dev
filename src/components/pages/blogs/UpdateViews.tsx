// components/blog/UpdateViews.tsx
"use client";

import { updateBlogViews } from "@/actions/updateBlogViews";
import { useEffect } from "react";

export default function UpdateViews({ blogId }: { blogId: string }) {
  useEffect(() => {
    updateBlogViews(blogId);
  }, [blogId]);

  return null;
}