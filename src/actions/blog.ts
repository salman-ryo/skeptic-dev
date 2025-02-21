"use server";
import { getBaseUrl } from "@/utils/getBaseUrl";

const BASE_URL = getBaseUrl();

export async function fetchTopBlog() {
  try {
    const response = await fetch(`${BASE_URL}/api/public/blogs/top`, {
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      console.error(`Failed to fetch the top blog: ${response.statusText}`);
      return null;
    }

    const blog = await response.json();
    return blog;
  } catch (error) {
    console.error("Error fetching top blog:", error);
    return null;
  }
}

export async function fetchMostViewedBlogs() {
  try {
    const response = await fetch(`${BASE_URL}/api/public/blogs/top/viewed`, {
      cache: "no-store", // Ensures the data is fresh
      credentials: "include",
    });

    if (!response.ok) {
      console.error(`Failed to fetch the top 5 blogs: ${response.statusText}`);
      return null;
    }

    const blogs = await response.json();
    return blogs;
  } catch (error) {
    console.error("Error fetching most viewed blogs:", error);
    return null;
  }
}

export async function fetchRandomBlogs() {
  try {
    const response = await fetch(`${BASE_URL}/api/public/blogs/random`, {
      cache: "no-store", // Ensures fresh data
      credentials: "include",
    });

    if (!response.ok) {
      console.error(`Failed to fetch random blogs: ${response.statusText}`);
      return null;
    }

    const blogs = await response.json();
    return blogs;
  } catch (error) {
    console.error("Error fetching random blogs:", error);
    return null;
  }
}

export async function getBlogData(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/public/blogs?id=${id}`, {
      next: { revalidate: 60 },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}
