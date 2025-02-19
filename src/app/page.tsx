import { Hero } from "@/components/pages/landing/hero";
import { ResourceRecommendationSection } from "@/components/pages/landing/resource-recommendation-section";
import MostViewedBlogs from "@/components/pages/landing/most-viewed-blogs";
import MustReadBlogs from "@/components/pages/landing/must-read-section";
import { ToolsRecommendationSection } from "@/components/pages/landing/tools-recommendation-section";
import {
  fetchMostViewedBlogs,
  fetchRandomBlogs,
  fetchTopBlog,
} from "@/actions/blog";

export default async function Home() {
  const topBlog = await fetchTopBlog();
  const mostViewedBlogs = await fetchMostViewedBlogs();
  const mustReadBlogs = await fetchRandomBlogs();
  return (
    <div className="min-h-screen">
      <Hero blog={topBlog} />
      <div className="container py-16 mx-auto">
        {/* Resources Section */}
        <ResourceRecommendationSection />

        {/* Spotlight Section */}

        <MostViewedBlogs blogsData={mostViewedBlogs} />

        {/* Tools Section */}
        <ToolsRecommendationSection />

        {/* Must-Read Section */}
        <MustReadBlogs blogsData={mustReadBlogs} />
      </div>
    </div>
  );
}
