"use server"
import { getBaseUrl } from "@/utils/getBaseUrl";

// const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'; // Fallback to localhost for dev
const BASE_URL = getBaseUrl()
export async function fetchTopBlog() {
    const response = await fetch(`${BASE_URL}/api/public/blogs/top`,
      {
        cache: 'no-store',
        credentials:"include"
      }
    );
  
    if (!response.ok) {
      console.error(`Failed to fetch the top blog: ${response.statusText}`);
      return null;
    }
  
    const blog = await response.json();
    return blog;
  }
  

  export async function fetchMostViewedBlogs() {
    const response = await fetch(`${BASE_URL}/api/public/blogs/top/viewed`
      , {
      cache: 'no-store', // Ensures the data is fresh
      credentials:"include"
    }
  );
  
    if (!response.ok) {
      console.error(`Failed to fetch the top 5 blogs: ${response.statusText}`);
      return null;
    }
  
    const blogs = await response.json();
    return blogs;
  }

  export async function fetchRandomBlogs() {
    const response = await fetch(`${BASE_URL}/api/public/blogs/random`
      , {
      cache: 'no-store', // Ensures fresh data
      credentials:"include"
    }
  );
  
    if (!response.ok) {
      console.error(`Failed to fetch random blogs: ${response.statusText}`);
      return null;
    }
  
    const blogs = await response.json();
    return blogs;
  }

  export async function getBlogData(id: string) {
    try {
      const response = await fetch(
        `${BASE_URL}/api/public/blogs?id=${id}`,
        {
          next: { revalidate: 60 },
          credentials:"include"
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching blog:", error);
      return null;
    }
  }