import { fetchTopBlog } from "@/actions/blog";
import { BlogDocument } from "@/lib/types/blog";
import AnimationWrapper from "@/components/animation/AnimationWrapper";
import { flipInConf } from "@/utils/animationConfig";
import NewsHeroBlog from "@/components/pages/blogs/NewsHeroBlog";
import BlogsSection from "@/components/pages/blogs/BlogsSection";

export default async function BlogsPage() {
  const topBlog: BlogDocument = await fetchTopBlog();
  
  return (
    <div className="min-h-screen light:bg-white">
      {topBlog && (
        // Changed padding for mobile
        <div className="light:bg-cGray-dark w-full px-4 sm:px-10 md:px-20 py-6 md:py-10">
          <AnimationWrapper animationConfig={flipInConf}>
            <NewsHeroBlog topBlog={topBlog} />
          </AnimationWrapper>
        </div>
      )}
      <BlogsSection />
    </div>
  );
}