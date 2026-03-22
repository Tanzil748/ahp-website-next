"use client";

import BackToTop from "@/components/BackToTop";
import CompareHero from "./components/CompareHero";
import CompareGrid from "./components/CompareGrid";

export default function CompareListPage() {
  return (
    <main
      className="bg-[hsla(210,4%,9%,1)] min-h-screen"
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        backgroundImage: "url('/images/potential-pink-bg.png')",
        backgroundSize: "600px 600px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
    >
      <CompareHero />
      <CompareGrid />
      <BackToTop />
    </main>
  );
}
