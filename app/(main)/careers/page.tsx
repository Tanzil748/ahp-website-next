import CareersHero from "./components/CareersHero";
import WhyWorkWithUs from "./components/WhyWorkWithUs";
import OpenPositions from "./components/OpenPositions";
import ApplicationProcess from "./components/ApplicationProcess";
import CareersCTA from "./components/CareersCTA";
import BackToTop from "@/components/BackToTop";

export default function CareersPage() {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        backgroundImage: "url('/images/potential-bg.jpeg')",
        backgroundSize: "600px 600px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
    >
      <CareersHero />
      <WhyWorkWithUs />
      <OpenPositions />
      <ApplicationProcess />
      <CareersCTA />
      <BackToTop />
    </main>
  );
}
