import { DiamondSep } from "./contactUtils";

export default function ContactHero() {
  return (
    <section
      className="relative text-center overflow-hidden z-[1]"
      style={{
        paddingTop: "clamp(100px, 14vw, 160px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 -z-[1] pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(hsla(0,0%,100%,0.04) 1px, transparent 1px), linear-gradient(90deg, hsla(0,0%,100%,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Eyebrow */}
        <div className="fade-up delay-1 flex justify-center items-center gap-3 mb-3">
          <DiamondSep />
          <span className="uppercase font-bold text-[1.4rem] tracking-[0.4em] text-[var(--gold)]">
            Get in Touch
          </span>
          <DiamondSep />
        </div>

        {/* Heading */}
        <h1
          className="fade-up delay-2 mb-5 font-normal leading-[1.2] text-white [font-family:var(--font-display)]"
          style={{ fontSize: "clamp(3.2rem, 6vw, 6rem)" }}
        >
          We&apos;d Love to
          <br />
          Hear From You
        </h1>

        {/* Sub-copy */}
        <p className="fade-up delay-3 mx-auto text-[1.7rem] leading-[1.5] max-w-[520px] text-[var(--text-muted)]">
          Whether you have a question, a sales request, or simply want to say
          hello — our team is always happy to connect.
        </p>
      </div>
    </section>
  );
}
