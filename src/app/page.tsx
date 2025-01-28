import { Hero } from "@/components/pages/landing/hero";
import { ResourceRecommendationSection } from "@/components/pages/landing/resource-recommendation-section";
import Footer from "@/components/layout/footer";
import MostViewedBlogs from "@/components/pages/landing/most-viewed-blogs";
import MustReadBlogs from "@/components/pages/landing/must-read-section";
import { ToolsRecommendationSection } from "@/components/pages/landing/tools-recommendation-section";
import { fetchMostViewedBlogs, fetchRandomBlogs, fetchTopBlog } from "@/actions/blog";

export default async function Home() {
  const topBlog = await fetchTopBlog()
  const mostViewedBlogs = await fetchMostViewedBlogs()
  const mustReadBlogs = await fetchRandomBlogs()
  console.log("🚀 ~ Home ~ mustReadBlogs:", mustReadBlogs.length)
  return (
    <div className="min-h-screen">
      <Hero blog={topBlog} />
      <div className="container py-16 space-y-16 2xl:space-y-28 mx-auto md:px-16">
        {/* Resources Section */}
        <ResourceRecommendationSection />

        {/* Spotlight Section */}
        
        <MostViewedBlogs blogsData={mostViewedBlogs}/>

        {/* Tools Section */}
        <ToolsRecommendationSection/>

        {/* Must-Read Section */}
        <MustReadBlogs blogsData={mustReadBlogs}/>
      </div>
    </div>
  );
}
