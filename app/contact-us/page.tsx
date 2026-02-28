import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import BackToTop from "@/components/BackToTop";

export default function ContactPage() {
  return (
    <div
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        color: "#fff",
        fontFamily: "var(--font-dm-sans)",
        minHeight: "100vh",
      }}
    >
      <ContactHero />

      <section style={{ paddingBlock: 80 }}>
        <div
          className="max-w-[1200px] mx-auto px-4"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: 60,
            alignItems: "start",
          }}
        >
          <ContactInfo />
          <ContactForm />
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
