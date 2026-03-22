import BlogHero from "./components/BlogHero";
import FeaturedPost from "./components/FeaturedPost";
import BlogGrid from "./components/BlogGrid";
import BackToTop from "@/components/BackToTop";
import SubscribeSection from "@/components/SubscribeSection";

export default function BlogPage() {
  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        backgroundImage: "url('/images/potential-pink-bg.png')",
        backgroundSize: "600px 600px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Fixed background image — replace YOUR_IMAGE_URL below */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('YOUR_IMAGE_URL')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.18,
        }}
      />

      <BlogHero />
      <FeaturedPost />
      <BlogGrid />
      <SubscribeSection />
      <BackToTop />
    </div>
  );
}
