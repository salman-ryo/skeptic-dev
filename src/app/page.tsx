import { Header } from "@/components/layout/header";
import { NewsletterSection } from "@/components/newsletter-section";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArticleCard } from "@/components/ui/article-card";
import { ResourceRecommendationSection } from "@/components/resource-section";
import Footer from "@/components/layout/footer";
import MostViewedBlogs from "@/components/most-viewed-blogs";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container py-16 space-y-16 mx-auto md:px-16">
        {/* Podcast Section */}
        <ResourceRecommendationSection />

        {/* Spotlight Section */}
        <MostViewedBlogs />

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Must-See Moments Section */}
        <section>
          <SectionHeading className="mb-8">Must-See Moments</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            <ArticleCard
              href="#"
              image="/placeholder.svg?height=400&width=600"
              title="Unmissable Shows This Season: Our recommendations"
              description="Get ready for an unforgettable cultural experience with our handpicked selection of shows you can't miss."
              tags={["Theatre", "Events", "Culture"]}
            />
            <ArticleCard
              href="#"
              image="/placeholder.svg?height=400&width=600"
              title="Hidden Gems: Lesser-Known Exhibits Worth Exploring"
              description="Discover the beauty of art off the beaten path with our guide to hidden gems in the world of exhibits."
              tags={["Exhibition", "Culture", "Art"]}
            />
            <ArticleCard
              href="#"
              image="/placeholder.svg?height=400&width=600"
              title="Design Diaries: Where to Find Inspiration"
              description="From sculptural forms to urban spaces to architectural marvels and timeless art, discover where designers strike rich for ideas."
              tags={["Design", "Art", "Architecture"]}
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
