export default function CareersHero() {
  return (
    <section className="relative pt-40 pb-24 px-5 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsla(38,61%,50%,0.1)_0%,transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-40
          [background-image:linear-gradient(hsla(0,0%,100%,0.04)_1px,transparent_1px),linear-gradient(90deg,hsla(0,0%,100%,0.04)_1px,transparent_1px)]
          [background-size:60px_60px]
          [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]"
      />

      <div className="max-w-[900px] mx-auto relative z-10">
        <div className="fade-up delay-1 flex justify-center items-center gap-3 mb-4">
          <span className="gold-diamond" />
          <span
            className="text-[hsl(38,61%,73%)] uppercase font-bold tracking-[0.4em] text-[1.3rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join Our Team
          </span>
          <span className="gold-diamond" />
        </div>

        <h1
          className="fade-up delay-2 font-normal text-white mb-5 leading-[1.1] text-[clamp(3.8rem,7vw,7rem)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Build Your Career With Us
        </h1>

        <div className="fade-up delay-2 flex justify-center my-5">
          <svg viewBox="0 0 100 12" width="100" height="12">
            <line
              x1="0"
              y1="6"
              x2="38"
              y2="6"
              stroke="hsl(38,61%,73%)"
              strokeWidth="1"
            />
            <rect
              x="44"
              y="2"
              width="8"
              height="8"
              transform="rotate(45 48 6)"
              fill="none"
              stroke="hsl(38,61%,73%)"
              strokeWidth="1"
            />
            <line
              x1="58"
              y1="6"
              x2="100"
              y2="6"
              stroke="hsl(38,61%,73%)"
              strokeWidth="1"
            />
          </svg>
        </div>

        <p className="fade-up delay-3 mx-auto text-[hsla(0,0%,65%,1)] text-[1.7rem] leading-[1.6] max-w-[560px]">
          Be part of a team passionate about creating exceptional fragrances and
          delivering excellence across the globe.
        </p>

        <div className="fade-up delay-4 grid grid-cols-3 gap-4 max-w-[560px] mx-auto mt-12 pt-10 border-t border-white/10">
          {[
            { value: "50+", label: "Team Members" },
            { value: "12+", label: "Years in Business" },
            { value: "30+", label: "Countries Reached" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-[hsl(38,61%,73%)] text-[3rem] font-normal leading-none mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </p>
              <p className="text-white/40 text-[1.1rem] font-bold uppercase tracking-[2px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
