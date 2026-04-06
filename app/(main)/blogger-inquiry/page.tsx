import BloggerHero from "./components/BloggerHero";
import BloggerInfo from "./components/BloggerInfo";
import BloggerInquiryForm from "./components/BloggerInquiryForm";
import BackToTop from "@/components/BackToTop";

export default function BloggerPage() {
  return (
    <div
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        backgroundImage: "url('/images/potential-pink-bg.png')",
        backgroundSize: "600px 600px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
        color: "#fff",
        fontFamily: "var(--font-dm-sans)",
        minHeight: "100vh",
      }}
    >
      <BloggerHero />

      <section
        className="py-[80px] max-sm:py-[50px]"
        style={{ backgroundColor: "hsla(30,1%,9%,0.97)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[60px] max-lg:gap-[50px] items-start">
          <BloggerInfo />
          <BloggerInquiryForm />
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
