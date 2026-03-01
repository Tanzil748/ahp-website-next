"use client";

import React from "react";

interface Stat {
  value: string;
  label: string;
}

interface Leader {
  number: string;
  name: string[];
  role: string;
  image: string;
  imageAlt: string;
  bio: string[];
  quote: string;
  quoteAttr: string;
  stats: Stat[];
  reversed: boolean;
}

const leaders: Leader[] = [
  {
    number: "01",
    name: ["Mohammed", "Rahman"],
    role: "Chief Executive Officer",
    image: "/images/about-page/leadership_pics/ceo.jpg",
    imageAlt: "Mohammed Rahman – Chief Executive Officer",
    bio: [
      "With over a decade at the helm of Al Hussein Perfumes, Mohammed has transformed a regional distribution operation into an internationally recognized wholesale fragrance house. His deep-rooted passion for authentic Arabian oud and his relentless pursuit of excellence define the company's identity and direction.",
      "Under his leadership, the company forged partnerships with premier perfume houses across the Gulf, establishing distribution channels across North America, Europe, and the Middle East.",
    ],
    quote:
      "Every bottle carries a story — of craftsmanship, of culture, of the invisible thread that connects a person to a memory.",
    quoteAttr: "— Mohammed Rahman, CEO",
    stats: [
      { value: "10+", label: "Years Leading" },
      { value: "40+", label: "Brand Partners" },
      { value: "3", label: "Continents" },
    ],
    reversed: false,
  },
  {
    number: "02",
    name: ["Hussein", "Isse"],
    role: "President",
    image: "/images/about-page/leadership_pics/president.jpg",
    imageAlt: "Hussein Isse – President",
    bio: [
      "Hussein oversees the full operational landscape of Al Hussein Perfumes — from warehouse logistics and client onboarding to compliance and fulfillment. His background in supply chain management and his reputation for meticulous attention to quality assurance have earned the trust of retailers and distributors across the globe.",
      "Hussein's work ethic and approachability have created a company culture built on reliability, transparency, and long-term partnership — values that define every client relationship.",
    ],
    quote:
      "We don't just ship perfumes — we build trust, bottle by bottle, order by order, relationship by relationship.",
    quoteAttr: "— Hussein Isse, President",
    stats: [
      { value: "500+", label: "Clients Served" },
      { value: "99%", label: "Order Accuracy" },
      { value: "15+", label: "Markets Reached" },
    ],
    reversed: true,
  },
];

function OrnamentalSep() {
  return (
    <svg
      viewBox="0 0 100 12"
      width="100"
      height="12"
      className="block mx-auto mt-[5px]"
    >
      <line x1="0" y1="6" x2="38" y2="6" stroke="hsl(38,61%,73%)" strokeWidth="1" />
      <rect
        x="44" y="2" width="8" height="8"
        transform="rotate(45 48 6)"
        fill="none" stroke="hsl(38,61%,73%)" strokeWidth="1"
      />
      <line x1="58" y1="6" x2="100" y2="6" stroke="hsl(38,61%,73%)" strokeWidth="1" />
    </svg>
  );
}

export default function LeadershipSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 bg-[hsla(210,4%,9%,1)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Section title */}
        <div className="text-center mb-3">
          <span
            className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.4em] text-[1.6rem] sm:text-[1.9rem] md:text-[2.2rem] leading-[1.2em]"
            style={{ fontFamily: "var(--font-forum)" }}
          >
            Leadership
          </span>
          <OrnamentalSep />
        </div>

        {leaders.map((leader, idx) => (
          <div
            key={leader.number}
            className="group"
            style={{ marginTop: idx === 0 ? 50 : 70 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">

              {/* Image column */}
              <div
                className={`relative overflow-hidden min-h-[280px] sm:min-h-[360px] md:min-h-[560px] ${leader.reversed ? "md:order-last" : ""}`}
              >
                {/* Hover border overlay */}
                <div className="absolute inset-3 sm:inset-4 border border-[hsl(38,61%,73%)] pointer-events-none z-10 opacity-30 transition-opacity duration-500 group-hover:opacity-[0.55]" />

                <img
                  src={leader.image}
                  alt={leader.imageAlt}
                  className="w-full h-full object-cover object-top block transition-transform duration-700 brightness-[0.88] group-hover:scale-[1.04] group-hover:brightness-95"
                  style={{ minHeight: "inherit" }}
                />

                {/* Watermark number */}
                <span
                  className="absolute bottom-[-14px] left-[-6px] text-[hsl(38,61%,73%)] opacity-[0.06] leading-none pointer-events-none z-0 select-none text-[7rem] sm:text-[10rem] md:text-[14rem]"
                  style={{ fontFamily: "var(--font-forum)" }}
                >
                  {leader.number}
                </span>
              </div>

              {/* Text column */}
              <div
                className={`flex flex-col justify-center bg-[hsla(210,4%,11%,1)] relative px-5 py-8 sm:px-9 sm:py-10 md:px-[60px] md:py-[50px] ${leader.reversed ? "md:order-first" : ""}`}
              >
                {/* Side rule — hidden on mobile, shown md+ */}
                <div
                  className={`hidden md:block absolute top-10 bottom-10 w-[2px] opacity-50 ${leader.reversed ? "left-auto right-0" : "left-0"}`}
                  style={{ background: "linear-gradient(to bottom, transparent, hsl(38,61%,73%), transparent)" }}
                />

                {/* Role tag */}
                <span
                  className="inline-flex items-center gap-[8px] text-[1rem] sm:text-[1.1rem] font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[hsl(38,61%,73%)] mb-3"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <span className="inline-block w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] border border-[hsl(38,61%,73%)] rotate-45 flex-shrink-0" />
                  {leader.role}
                </span>

                {/* Name */}
                <h2
                  className="text-[2.8rem] sm:text-[3rem] md:text-[4rem] text-white leading-[1.1] mb-[6px] tracking-[0.02em]"
                  style={{ fontFamily: "var(--font-forum)" }}
                >
                  {leader.name[0]}
                  <br />
                  {leader.name[1]}
                </h2>

                {/* Gold rule */}
                <div className="w-[40px] sm:w-[50px] h-[2px] bg-[hsl(38,61%,73%)] opacity-65 my-4 sm:my-[22px]" />

                {/* Bio */}
                {leader.bio.map((para, i) => (
                  <p
                    key={i}
                    className="text-[1.4rem] sm:text-[1.5rem] md:text-[1.6rem] text-[hsla(0,0%,65%,1)] leading-[1.8] sm:leading-[1.9] mb-5 sm:mb-7"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      marginTop: i > 0 ? "-8px" : undefined,
                    }}
                  >
                    {para}
                  </p>
                ))}

                {/* Quote */}
                <div className="border-l-2 border-[hsla(38,61%,73%,0.4)] pl-4 sm:pl-5 mt-1">
                  <p
                    className="text-[1.55rem] sm:text-[1.7rem] md:text-[1.85rem] italic text-[hsl(38,61%,73%)] leading-[1.7]"
                    style={{ fontFamily: "var(--font-forum)" }}
                  >
                    &ldquo;{leader.quote}&rdquo;
                  </p>
                  <span
                    className="block text-[1.1rem] sm:text-[1.2rem] text-[hsla(0,0%,50%,1)] tracking-[0.12em] sm:tracking-[0.15em] uppercase mt-[8px] sm:mt-[10px]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {leader.quoteAttr}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex gap-4 sm:gap-5 mt-5 sm:mt-7 flex-wrap items-center">
                  {leader.stats.map((stat, i) => (
                    <React.Fragment key={stat.label}>
                      {i > 0 && (
                        <div className="w-px h-8 sm:h-9 bg-[hsla(38,61%,73%,0.2)] flex-shrink-0" />
                      )}
                      <div className="flex flex-col items-start gap-[2px]">
                        <span
                          className="text-[2.2rem] sm:text-[2.4rem] md:text-[2.6rem] text-[hsl(38,61%,73%)] leading-none"
                          style={{ fontFamily: "var(--font-forum)" }}
                        >
                          {stat.value}
                        </span>
                        <span
                          className="text-[1rem] sm:text-[1.1rem] text-[hsla(0,0%,50%,1)] uppercase tracking-[0.12em] sm:tracking-[0.15em]"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          {stat.label}
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}