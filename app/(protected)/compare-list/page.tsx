"use client";

import BackToTop from "@/components/BackToTop";
import CompareHero from "./components/CompareHero";
import CompareGrid from "./components/CompareGrid";

export default function CompareListPage() {
  return (
    <main className="bg-[hsla(210,4%,9%,1)] min-h-screen">
      <CompareHero />
      <CompareGrid />
      <BackToTop />
    </main>
  );
}
