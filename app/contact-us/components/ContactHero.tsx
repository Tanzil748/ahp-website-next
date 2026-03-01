import { gold, eerieBlack1, quickSilver, DiamondSep } from "./contactUtils";

export default function ContactHero() {
  return (
    <>
      {/*
        Keyframe animations are defined once here as a <style> block scoped to this component.
        We use a single <style> tag only for @keyframes and animation-delay utilities
        that cannot be expressed in Tailwind without a custom config.
      */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up  { animation: fadeUp 0.8s ease forwards; }
        .delay-1  { animation-delay: 0.1s; opacity: 0; }
        .delay-2  { animation-delay: 0.3s; opacity: 0; }
        .delay-3  { animation-delay: 0.5s; opacity: 0; }
      `}</style>

      <section
        className="relative py-[160px_0_100px] text-center overflow-hidden z-[1]"
        style={{
          paddingTop: "clamp(100px, 14vw, 160px)",
          paddingBottom: "clamp(60px, 8vw, 100px)",
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, hsla(38,61%,50%,0.12) 0%, transparent 70%), ${eerieBlack1}`,
        }}
      >
        {/* Grid overlay using a pseudo-element equivalent via absolute div */}
        <div
          className="absolute inset-0 -z-[1] pointer-events-none"
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
            <span
              className="uppercase font-bold text-[1.4rem] tracking-[0.4em]"
              style={{ color: gold }}
            >
              Get in Touch
            </span>
            <DiamondSep />
          </div>

          {/* Heading */}
          <h1
            className="fade-up delay-2 mb-5 font-normal leading-[1.2]"
            style={{
              fontFamily: "var(--font-forum)",
              fontSize: "clamp(3.2rem, 6vw, 6rem)",
              fontWeight: 400,
            }}
          >
            We&apos;d Love to
            <br />
            Hear From You
          </h1>

          {/* Sub-copy */}
          <p
            className="fade-up delay-3 mx-auto text-[1.7rem] leading-[1.5] max-w-[520px]"
            style={{ color: quickSilver }}
          >
            Whether you have a question, a sales request, or simply want to say
            hello — our team is always happy to connect.
          </p>
        </div>
      </section>
    </>
  );
}