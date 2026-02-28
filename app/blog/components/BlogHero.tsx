export default function BlogHero() {
  return (
    <section className="relative pt-40 pb-24 px-5 text-center overflow-hidden z-[1] bg-[hsla(210,4%,9%,1)]">
      {/* Radial gold glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsla(38,61%,50%,0.1)_0%,transparent_70%)]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-40"
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

      <div className="max-w-[1200px] mx-auto">
        {/* Eyebrow */}
        <div className="fade-up delay-1 flex justify-center items-center gap-3 mb-4">
          <span className="inline-block w-2 h-2 border border-[hsl(38,61%,73%)] rotate-45 shrink-0" />
          <span
            className="text-[hsl(38,61%,73%)] uppercase font-bold tracking-[0.4em]"
            style={{ fontFamily: "var(--font-forum)", fontSize: "1.4rem" }}
          >
            Insights &amp; Stories
          </span>
          <span className="inline-block w-2 h-2 border border-[hsl(38,61%,73%)] rotate-45 shrink-0" />
        </div>

        <h1
          className="fade-up delay-2 font-normal text-white mb-5"
          style={{
            fontFamily: "var(--font-forum)",
            fontSize: "clamp(4rem, 8vw, 8rem)",
            lineHeight: 1.1,
          }}
        >
          Our Blog
        </h1>

        <p
          className="fade-up delay-3 mx-auto text-[hsla(0,0%,65%,1)]"
          style={{ fontSize: "1.7rem", lineHeight: 1.5, maxWidth: 520 }}
        >
          Discover the art of perfumery, fragrance trends, and behind-the-scenes
          stories
        </p>
      </div>
    </section>
  );
}
