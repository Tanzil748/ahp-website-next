import { gold, eerieBlack1, quickSilver, DiamondSep } from "./contactUtils";

export default function ContactHero() {
  return (
    <>
      <style>{`
        .contact-hero {
          position: relative;
          padding: 160px 0 100px;
          text-align: center;
          overflow: hidden;
          z-index: 1;
        }
        .contact-hero::before {
          content: "";
          position: absolute; inset: 0; z-index: -1;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, hsla(38,61%,50%,0.12) 0%, transparent 70%),
            ${eerieBlack1};
        }
        .contact-hero::after {
          content: "";
          position: absolute; inset: 0; z-index: -1;
          background-image:
            linear-gradient(hsla(0,0%,100%,0.04) 1px, transparent 1px),
            linear-gradient(90deg, hsla(0,0%,100%,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up  { animation: fadeUp 0.8s ease forwards; }
        .delay-1  { animation-delay: 0.1s; opacity: 0; }
        .delay-2  { animation-delay: 0.3s; opacity: 0; }
        .delay-3  { animation-delay: 0.5s; opacity: 0; }
      `}</style>

      <section className="contact-hero">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="fade-up delay-1 flex justify-center items-center gap-3 mb-3">
            <DiamondSep />
            <span
              className="uppercase font-bold"
              style={{
                color: gold,
                fontSize: "1.4rem",
                letterSpacing: "0.4em",
              }}
            >
              Get in Touch
            </span>
            <DiamondSep />
          </div>

          <h1
            className="fade-up delay-2 mb-5"
            style={{
              fontFamily: "var(--font-forum)",
              fontSize: "clamp(3.2rem, 6vw, 6rem)",
              lineHeight: 1.2,
              fontWeight: 400,
            }}
          >
            We&apos;d Love to
            <br />
            Hear From You
          </h1>

          <p
            className="fade-up delay-3 mx-auto"
            style={{
              color: quickSilver,
              fontSize: "1.7rem",
              lineHeight: 1.5,
              maxWidth: 520,
            }}
          >
            Whether you have a question, a reservation request, or simply want
            to say hello — our team is always happy to connect.
          </p>
        </div>
      </section>
    </>
  );
}
