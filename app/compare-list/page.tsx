import BackToTop from "@/components/BackToTop";
import CompareHero from "./components/CompareHero";
import CompareGrid from "./components/CompareGrid";

export default function ComparePage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "hsla(210,4%,9%,1)" }}
    >
      <CompareHero />
      <CompareGrid />
      <BackToTop />
    </main>
  );
}
