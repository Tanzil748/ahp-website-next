"use client";

export default function HeroVideo() {
  return (
    <section className="relative min-h-[35vh] sm:min-h-[45vh] md:min-h-[55vh] overflow-hidden">
      <style>{`
        .hero-text {
          white-space: nowrap;
          overflow: hidden;
          width: 0;
          animation: handwriting 3s steps(40) forwards;
          letter-spacing: 2px;
        }

        @keyframes handwriting {
          0%   { width: 0; }
          100% { width: 100%; }
        }

        @media (max-width: 768px) {
          .hero-text {
            white-space: normal;
            width: 100%;
            animation: none;
          }
        }
      `}</style>

      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover brightness-[0.55] block"
      >
        <source src="/images/about-page/promo-vid.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div
          className="hero-text [font-family:var(--font-display)] text-center leading-tight w-[95%] sm:w-[85%] md:w-auto"
          style={{
            fontSize: "clamp(1.2rem, 7vw, 5.5rem)",
            backgroundImage:
              "linear-gradient(135deg, #c9a84c 0%, #f5e07a 40%, #b8860b 70%, #d4af37 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 8px rgba(180, 140, 20, 0.45))",
          }}
        >
          Learn Who We Are, Built on Trust
        </div>
      </div>
    </section>
  );
}
