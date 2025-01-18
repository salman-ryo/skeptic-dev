import { Header } from "@/components/header";
import { PodcastSection } from "@/components/podcast-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { SpotlightSection } from "@/components/spotlight-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArticleCard } from "@/components/ui/article-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-cyan-300">
      <Hero />
      <div className="container py-16 space-y-16">
        {/* Podcast Section */}
        <PodcastSection />

        {/* Spotlight Section */}
        <SpotlightSection />

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
      <footer className="bg-black text-white mt-16 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold tracking-tighter">
                THE CANVAS
              </h2>
              <p className="text-sm text-gray-400">
                Blog about art
                <br />
                music
                <br />
                design.
              </p>
            </div>
            <nav>
              <ul className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Latest
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Trending
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Art
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Music
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Podcast
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>All rights reserved. © 2024 The Canvas</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
