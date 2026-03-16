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
      <line x1="0" y1="6" x2="38" y2="6" stroke="var(--gold)" strokeWidth="1" />
      <rect
        x="44"
        y="2"
        width="8"
        height="8"
        transform="rotate(45 48 6)"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1"
      />
      <line
        x1="58"
        y1="6"
        x2="100"
        y2="6"
        stroke="var(--gold)"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function LeadershipSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 bg-[var(--bg-section)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Section title */}
        <div className="page-section-header">
          <span className="page-section-title text-[1.6rem] sm:text-[1.9rem] md:text-[2.2rem]">
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
                <div className="absolute inset-3 sm:inset-4 border border-[var(--gold)] pointer-events-none z-10 opacity-30 transition-opacity duration-500 group-hover:opacity-[0.55]" />

                <img
                  src={leader.image}
                  alt={leader.imageAlt}
                  className="w-full h-full object-cover object-top block transition-transform duration-700 brightness-[0.88] group-hover:scale-[1.04] group-hover:brightness-95"
                  style={{ minHeight: "inherit" }}
                />

                {/* Watermark number */}
                <span className="absolute bottom-[-14px] left-[-6px] text-[var(--gold)] opacity-[0.06] leading-none pointer-events-none z-0 select-none text-[7rem] sm:text-[10rem] md:text-[14rem] [font-family:var(--font-display)]">
                  {leader.number}
                </span>
              </div>

              {/* Text column */}
              <div
                className={`flex flex-col justify-center bg-[var(--bg-card)] relative px-5 py-8 sm:px-9 sm:py-10 md:px-[60px] md:py-[50px] ${leader.reversed ? "md:order-first" : ""}`}
              >
                {/* Side rule */}
                <div
                  className={`hidden md:block absolute top-10 bottom-10 w-[2px] opacity-50 ${leader.reversed ? "left-auto right-0" : "left-0"}`}
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, var(--gold), transparent)",
                  }}
                />

                {/* Role tag */}
                <span className="inline-flex items-center gap-[8px] text-[1rem] sm:text-[1.1rem] font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[var(--gold)] mb-3 [font-family:var(--font-primary)]">
                  <span className="inline-block w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] border border-[var(--gold)] rotate-45 flex-shrink-0" />
                  {leader.role}
                </span>

                {/* Name */}
                <h2 className="text-[2.8rem] sm:text-[3rem] md:text-[4rem] text-white leading-[1.1] mb-[6px] tracking-[0.02em] [font-family:var(--font-display)]">
                  {leader.name[0]}
                  <br />
                  {leader.name[1]}
                </h2>

                {/* Gold rule */}
                <div className="gold-rule w-[40px] sm:w-[50px] my-4 sm:my-[22px]" />

                {/* Bio */}
                {leader.bio.map((para, i) => (
                  <p
                    key={i}
                    className="body-muted text-[1.4rem] sm:text-[1.5rem] md:text-[1.6rem] leading-[1.8] sm:leading-[1.9] mb-5 sm:mb-7"
                    style={{ marginTop: i > 0 ? "-8px" : undefined }}
                  >
                    {para}
                  </p>
                ))}

                {/* Quote */}
                <div className="border-l-2 border-[var(--gold-border-mid)] pl-4 sm:pl-5 mt-1">
                  <p className="text-[1.55rem] sm:text-[1.7rem] md:text-[1.85rem] italic text-[var(--gold)] leading-[1.7] [font-family:var(--font-display)]">
                    &ldquo;{leader.quote}&rdquo;
                  </p>
                  <span className="block text-[1.1rem] sm:text-[1.2rem] text-[var(--text-faint)] tracking-[0.12em] sm:tracking-[0.15em] uppercase mt-[8px] sm:mt-[10px] [font-family:var(--font-primary)]">
                    {leader.quoteAttr}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex gap-4 sm:gap-5 mt-5 sm:mt-7 flex-wrap items-center">
                  {leader.stats.map((stat, i) => (
                    <React.Fragment key={stat.label}>
                      {i > 0 && (
                        <div className="w-px h-8 sm:h-9 bg-[var(--gold-border-faint)] flex-shrink-0" />
                      )}
                      <div className="flex flex-col items-start gap-[2px]">
                        <span className="text-[2.2rem] sm:text-[2.4rem] md:text-[2.6rem] text-[var(--gold)] leading-none [font-family:var(--font-display)]">
                          {stat.value}
                        </span>
                        <span className="text-[1rem] sm:text-[1.1rem] text-[var(--text-faint)] uppercase tracking-[0.12em] sm:tracking-[0.15em] [font-family:var(--font-primary)]">
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
