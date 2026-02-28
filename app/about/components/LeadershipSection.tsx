"use client";

import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────────────────
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

// ─── Ornamental separator ─────────────────────────────────────────────────────
function OrnamentalSep() {
  return (
    <svg
      viewBox="0 0 100 12"
      width="100"
      height="12"
      style={{ display: "block", margin: "5px auto 0" }}
    >
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
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function LeadershipSection() {
  return (
    <>
      <style>{`
        .leader-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          position: relative;
        }

        /* ── Image column ── */
        .leader-img-col {
          position: relative;
          overflow: hidden;
          height: 100%;
          min-height: 560px;
        }
        .leader-img-col img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 700ms ease, filter 700ms ease;
          filter: brightness(0.88);
        }
        .leader-block:hover .leader-img-col img {
          transform: scale(1.04);
          filter: brightness(0.95);
        }
        .leader-img-col::after {
          content: "";
          position: absolute;
          inset: 16px;
          border: 1px solid hsl(38,61%,73%);
          pointer-events: none;
          z-index: 1;
          opacity: 0.3;
          transition: opacity 500ms ease;
        }
        .leader-block:hover .leader-img-col::after { opacity: 0.55; }

        /* Watermark number */
        .leader-number {
          position: absolute;
          bottom: -18px;
          left: -10px;
          font-family: var(--font-forum);
          font-size: 14rem;
          color: hsl(38,61%,73%);
          opacity: 0.06;
          line-height: 1;
          pointer-events: none;
          z-index: 0;
          user-select: none;
        }

        /* ── Text column ── */
        .leader-text-col {
          padding: 50px 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: hsla(210,4%,11%,1);
          position: relative;
        }
        .leader-text-col::before {
          content: "";
          position: absolute;
          left: 0;
          top: 40px;
          bottom: 40px;
          width: 2px;
          background: linear-gradient(to bottom, transparent, hsl(38,61%,73%), transparent);
          opacity: 0.5;
        }
        .leader-text-col-reversed::before { left: auto; right: 0; }

        /* Reversed layout */
        .leader-block-reversed { direction: rtl; }
        .leader-block-reversed > * { direction: ltr; }
        .leader-block-reversed .leader-number { left: auto; right: -10px; }

        /* Typography */
        .leader-role-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: hsl(38,61%,73%);
          margin-bottom: 14px;
          font-family: var(--font-dm-sans);
        }
        .l-diamond {
          display: inline-block;
          width: 7px;
          height: 7px;
          border: 1px solid hsl(38,61%,73%);
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .leader-name {
          font-family: var(--font-forum);
          font-size: 4rem;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }
        .leader-gold-rule {
          width: 50px;
          height: 2px;
          background: hsl(38,61%,73%);
          opacity: 0.65;
          margin: 22px 0;
        }
        .leader-bio {
          font-size: 1.6rem;
          color: hsla(0,0%,65%,1);
          line-height: 1.9;
          margin-bottom: 28px;
          font-family: var(--font-dm-sans);
        }
        .leader-quote-block {
          border-left: 2px solid hsla(38,61%,73%,0.4);
          padding-left: 20px;
          margin-top: 4px;
        }
        .leader-quote-text {
          font-family: var(--font-forum);
          font-size: 1.85rem;
          font-style: italic;
          color: hsl(38,61%,73%);
          line-height: 1.7;
        }
        .leader-quote-attr {
          display: block;
          font-size: 1.2rem;
          color: hsla(0,0%,50%,1);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 10px;
          font-family: var(--font-dm-sans);
        }

        /* Stats */
        .leader-stats {
          display: flex;
          gap: 20px;
          margin-top: 28px;
          flex-wrap: wrap;
          align-items: center;
        }
        .stat-chip {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }
        .stat-value {
          font-family: var(--font-forum);
          font-size: 2.6rem;
          color: hsl(38,61%,73%);
          line-height: 1;
        }
        .stat-label {
          font-size: 1.1rem;
          color: hsla(0,0%,50%,1);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-family: var(--font-dm-sans);
        }
        .stat-divider {
          width: 1px;
          height: 36px;
          background: hsla(38,61%,73%,0.2);
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .leader-block,
          .leader-block-reversed {
            grid-template-columns: 1fr;
            direction: ltr;
          }
          .leader-block-reversed .leader-number { left: -10px; right: auto; }
          .leader-text-col-reversed::before     { left: 0; right: auto; }
          .leader-img-col    { min-height: 360px; }
          .leader-text-col   { padding: 36px 28px; }
          .leader-name       { font-size: 3rem; }
          .leader-number     { font-size: 10rem; bottom: auto; top: -30px; }
        }
      `}</style>

      <section
        style={{
          paddingBlock: 80,
          paddingInline: 40,
          backgroundColor: "hsla(210,4%,9%,1)",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Section title */}
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <span
              style={{
                color: "hsl(38,61%,73%)",
                fontFamily: "var(--font-forum)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                fontSize: "2.2rem",
                lineHeight: "1.2em",
              }}
            >
              Leadership
            </span>
            <OrnamentalSep />
          </div>

          {/* Leader blocks */}
          {leaders.map((leader, idx) => (
            <div
              key={leader.number}
              className={`leader-block${leader.reversed ? " leader-block-reversed" : ""}`}
              style={{ marginTop: idx === 0 ? 70 : 100 }}
            >
              {/* Image */}
              <div className="leader-img-col">
                <img src={leader.image} alt={leader.imageAlt} />
                <span className="leader-number">{leader.number}</span>
              </div>

              {/* Text */}
              <div
                className={`leader-text-col${leader.reversed ? " leader-text-col-reversed" : ""}`}
              >
                <span className="leader-role-tag">
                  <span className="l-diamond" />
                  {leader.role}
                </span>

                <h2 className="leader-name">
                  {leader.name[0]}
                  <br />
                  {leader.name[1]}
                </h2>

                <div className="leader-gold-rule" />

                {leader.bio.map((para, i) => (
                  <p
                    key={i}
                    className="leader-bio"
                    style={i > 0 ? { marginTop: -8 } : undefined}
                  >
                    {para}
                  </p>
                ))}

                <div className="leader-quote-block">
                  <p className="leader-quote-text">
                    &ldquo;{leader.quote}&rdquo;
                  </p>
                  <span className="leader-quote-attr">{leader.quoteAttr}</span>
                </div>

                <div className="leader-stats">
                  {leader.stats.map((stat, i) => (
                    <React.Fragment key={stat.label}>
                      {i > 0 && <div className="stat-divider" />}
                      <div className="stat-chip">
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
