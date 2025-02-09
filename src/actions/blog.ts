const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Fallback to localhost for dev
export async function fetchTopBlog() {
    const response = await fetch(`${BASE_URL}/api/public/blogs/top`);
  
    if (!response.ok) {
      throw new Error(`Failed to fetch the top blog: ${response.statusText}`);
    }
  
    const blog = await response.json();
    return blog;
  }
  

  export async function fetchMostViewedBlogs() {
    const response = await fetch(`${BASE_URL}/api/public/blogs/top/viewed`
    //   , {
    //   method: 'GET',
    //   cache: 'no-store', // Ensures the data is fresh
    // }
  );
  
    if (!response.ok) {
      throw new Error(`Failed to fetch the top 5 blogs: ${response.statusText}`);
    }
  
    const blogs = await response.json();
    return blogs;
  }

  export async function fetchRandomBlogs() {
    const response = await fetch(`${BASE_URL}/api/public/blogs/random`
    //   , {
    //   method: 'GET',
    //   cache: 'no-store', // Ensures fresh data
    // }
  );
  
    if (!response.ok) {
      throw new Error(`Failed to fetch random blogs: ${response.statusText}`);
    }
  
    const blogs = await response.json();
    return blogs;
  }