const benefits = [
  {
    title: "Industry Leadership",
    text: "Work with one of the leading names in luxury fragrances, where innovation meets tradition.",
    stat: "#1",
    statLabel: "in luxury",
    quote: "Setting the standard since day one.",
  },
  {
    title: "Career Growth",
    text: "We invest in our people with continuous training, mentorship, and clear advancement pathways.",
    stat: "100%",
    statLabel: "internal promotions",
    quote: "Every role is a stepping stone.",
  },
  {
    title: "Collaborative Culture",
    text: "Join a diverse team of passionate professionals who support and inspire each other daily.",
    stat: "50+",
    statLabel: "team members",
    quote: "Stronger together, always.",
  },
  {
    title: "Comprehensive Benefits",
    text: "Competitive compensation, full health coverage, retirement plans, and generous PTO.",
    stat: "Day 1",
    statLabel: "full benefits",
    quote: "We take care of our own.",
  },
  {
    title: "Creative Environment",
    text: "Work in an atmosphere that celebrates creativity, encourages bold ideas, and rewards innovation.",
    stat: "∞",
    statLabel: "possibilities",
    quote: "No idea is too ambitious.",
  },
  {
    title: "Global Impact",
    text: "Your work ships to customers across 30+ countries — a real mark left on the world.",
    stat: "30+",
    statLabel: "countries",
    quote: "Reach that spans the globe.",
  },
];

const spanMap: Record<number, string> = {
  0: "lg:col-span-2",
  1: "lg:col-span-1",
  2: "lg:col-span-1",
  3: "lg:col-span-2",
  4: "lg:col-span-2",
  5: "lg:col-span-1",
};

export default function WhyWorkWithUs() {
  return (
    <section
      className="py-24 px-5"
      style={{ backgroundColor: "hsla(30,1%,9%,0.88)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <span
              className="text-[hsl(38,61%,73%)] uppercase font-bold tracking-[0.4em] text-[1.2rem]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why Al Hussein Perfumes
            </span>
            <h2
              className="font-normal text-white mt-3 text-[clamp(3rem,4vw,4.5rem)] leading-[1.1]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why Work
              <br />
              With Us
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[hsla(0,0%,55%,1)] text-[1.6rem] leading-[1.7]">
              We don&apos;t just offer jobs — we offer a place where your talent
              is recognized, your voice is heard, and your career is shaped
              around you.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] gap-3">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={[
                "group relative overflow-hidden p-7 flex flex-col justify-between",
                "border border-white/8 hover:border-[hsl(38,61%,73%)]/60",
                "transition-all duration-500",
                spanMap[i],
              ].join(" ")}
              style={{ backgroundColor: "hsla(0,0%,8%,0.88)" }}
            >
              {/* Corner accents */}
              <span className="absolute top-0 right-0 w-[60px] h-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-t border-r border-[hsl(38,61%,73%)]" />
              <span className="absolute bottom-0 left-0 w-[60px] h-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-b border-l border-[hsl(38,61%,73%)]" />

              {/* Top */}
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex flex-col gap-1.5">
                  <div className="w-6 h-px bg-[hsl(38,61%,73%)]/50 group-hover:w-14 transition-all duration-500" />
                  <h3
                    className="text-white text-[2rem] font-normal leading-tight group-hover:text-[hsl(38,61%,73%)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {b.title}
                  </h3>
                </div>
                <div className="shrink-0 text-right border border-white/10 group-hover:border-[hsl(38,61%,73%)]/30 transition-colors duration-300 px-3 py-2">
                  <p
                    className="text-[hsl(38,61%,73%)] text-[2rem] font-normal leading-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {b.stat}
                  </p>
                  <p className="text-white/25 text-[0.95rem] uppercase tracking-[2px] font-bold mt-0.5">
                    {b.statLabel}
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="relative z-10 flex flex-col gap-3">
                <p className="text-[hsla(0,0%,52%,1)] text-[1.3rem] leading-[1.6] group-hover:text-[hsla(0,0%,68%,1)] transition-colors duration-300">
                  {b.text}
                </p>
                <p
                  className="text-[hsl(38,61%,73%)]/0 group-hover:text-[hsl(38,61%,73%)]/60 text-[1.2rem] italic transition-all duration-500 translate-y-2 group-hover:translate-y-0"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;{b.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
