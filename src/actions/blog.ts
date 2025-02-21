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
      const errorBody = await response.text();
      console.error(
        `Error fetching top blog. Status: ${response.status} ${response.statusText}. Response: ${errorBody}`
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Network or server error when fetching top blog:", error);
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
      const errorBody = await response.text();
      console.error(
        `Error fetching most viewed blogs. Status: ${response.status} ${response.statusText}. Response: ${errorBody}`
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Network or server error when fetching most viewed blogs:", error);
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
      const errorBody = await response.text();
      console.error(
        `Error fetching random blogs. Status: ${response.status} ${response.statusText}. Response: ${errorBody}`
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Network or server error when fetching random blogs:", error);
    return null;
  }
}

export async function getBlogData(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/public/blogs?id=${id}`, {
      next: { revalidate: 60 },
      credentials: "include",
    });
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Error fetching blog data for id ${id}. Status: ${response.status} ${response.statusText}. Response: ${errorBody}`
      );
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Network or server error when fetching blog data for id ${id}:`, error);
    return null;
  }
}
