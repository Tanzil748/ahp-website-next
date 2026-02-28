import HeroVideo from "./components/HeroVideo";
import OurStory from "./components/OurStory";
import TeamGallery from "./components/TeamGallery";
import LeadershipSection from "./components/LeadershipSection";
import FaqSection from "./components/FaqSection";
import SubscribeSection from "@/components/SubscribeSection";
import BackToTop from "@/components/BackToTop";

export default function AboutPage() {
  return (
    <>
      <div
        style={{
          fontFamily: "var(--font-dm-sans)",
          backgroundColor: "hsla(210,4%,9%,1)",
          color: "#fff",
          fontSize: "1.6rem",
          lineHeight: "1.85em",
        }}
      >
        <HeroVideo />
        <OurStory />
        <TeamGallery />
        <LeadershipSection />
        <FaqSection />
        <SubscribeSection />
        <BackToTop />
      </div>
    </>
  );
}
