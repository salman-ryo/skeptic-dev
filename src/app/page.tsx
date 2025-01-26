import { NewsletterSection } from "@/components/pages/landing/newsletter-section";
import { Hero } from "@/components/pages/landing/hero";
import { ResourceRecommendationSection } from "@/components/pages/landing/resource-recommendation-section";
import Footer from "@/components/layout/footer";
import MostViewedBlogs from "@/components/pages/landing/most-viewed-blogs";
import MustReadBlogs from "@/components/pages/landing/must-read-section";
import { ToolsRecommendationSection } from "@/components/pages/landing/tools-recommendation-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container py-16 space-y-16 2xl:space-y-28 mx-auto md:px-16">
        {/* Resources Section */}
        <ResourceRecommendationSection />

        {/* Spotlight Section */}
        <MostViewedBlogs />

        {/* Tools Section */}
        <ToolsRecommendationSection/>

        {/* Must-Read Section */}
        <MustReadBlogs/>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
