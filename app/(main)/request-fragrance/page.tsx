import FragranceHero from "./components/FragranceHero";
import FragranceInfo from "./components/FragranceInfo";
import RequestFragranceForm from "./components/RequestFragranceForm";
import BackToTop from "@/components/BackToTop";

export default function RequestFragrancePage() {
  return (
    <div
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        color: "#fff",
        fontFamily: "var(--font-dm-sans)",
        minHeight: "100vh",
      }}
    >
      <FragranceHero />
      <section className="py-[80px] max-sm:py-[50px]">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-[60px] max-lg:gap-[50px] items-start">
          <FragranceInfo />
          {/* TODO: swap to → sales@alhusseinperfumes.com once domain is verified */}
          <RequestFragranceForm to="tanzilhassan333@gmail.com" />
        </div>
      </section>
      <BackToTop />
    </div>
  );
}
