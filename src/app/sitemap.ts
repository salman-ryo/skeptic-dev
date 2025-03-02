// app/sitemap.ts

import { getBaseUrl } from "@/utils/getBaseUrl";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // Static routes
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Add error handling for API call
  const blogPosts = await fetch(`${baseUrl}/api/public/posts`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    })
    .catch((error) => {
      console.error("Sitemap Error:", error);
      return [];
    });

  const dynamicRoutes = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
