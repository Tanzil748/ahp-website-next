import BlogHero from "./components/BlogHero";
import FeaturedPost from "./components/FeaturedPost";
import BlogGrid from "./components/BlogGrid";
import BackToTop from "@/components/BackToTop";
import SubscribeSection from "@/components/SubscribeSection";

export default function BlogPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      <BlogHero />
      <FeaturedPost />
      <BlogGrid />
      <SubscribeSection />
      <BackToTop />
    </div>
  );
}
