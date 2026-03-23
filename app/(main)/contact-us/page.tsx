import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
import ContactUsForm from "./components/ContactUsForm";
import BackToTop from "@/components/BackToTop";

export default function ContactPage() {
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
      <ContactHero />

      <section
        className="py-[80px] max-sm:py-[50px]"
        style={{ backgroundColor: "hsla(30,1%,9%,0.97)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-[60px] max-lg:gap-[50px] items-start">
          <ContactInfo />
          {/* TODO: swap to → sales@alhusseinperfumes.com once domain is verified */}
          <ContactUsForm to="tanzilhassan333@gmail.com" />
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
