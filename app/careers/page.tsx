import CareersHero from "./components/CareersHero";
import WhyWorkWithUs from "./components/WhyWorkWithUs";
import OpenPositions from "./components/OpenPositions";
import ApplicationProcess from "./components/ApplicationProcess";
import CareersCTA from "./components/CareersCTA";
import BackToTop from "@/components/BackToTop";

export default function CareersPage() {
  return (
    <div className="bg-[#0c0c0c] text-white font-sans min-h-screen">
      <CareersHero />
      <WhyWorkWithUs />
      <OpenPositions />
      <ApplicationProcess />
      <CareersCTA />
      <BackToTop />
    </div>
  );
}
