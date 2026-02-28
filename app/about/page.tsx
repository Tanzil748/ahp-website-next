"use client";

import { useState, useEffect } from "react";
import SubscribeSection from "@/components/SubscribeSection";

// ─── EXACT THEME TOKENS from style.css ────────────────────────────────────────
const theme = {
  goldCrayola: "hsl(38, 61%, 73%)",
  smokyBlack1: "hsla(40, 12%, 5%, 1)",
  smokyBlack2: "hsla(30, 8%, 5%, 1)",
  eerieBlack1: "hsla(210, 4%, 9%, 1)",
  eerieBlack2: "hsla(210, 4%, 11%, 1)",
  eerieBlack4: "hsla(0, 0%, 13%, 1)",
  quickSilver: "hsla(0, 0%, 65%, 1)",
  whiteAlpha20: "hsla(0, 0%, 100%, 0.2)",
  whiteAlpha10: "hsla(0, 0%, 100%, 0.1)",
};

const faqs = [
  {
    q: "Who do you sell to?",
    a: "We exclusively serve wholesale clients, distributors, retailers, and e-commerce businesses. We do not sell directly to consumers. If you are interested in becoming a partner, please contact our sales team to begin the onboarding process.",
  },
  {
    q: "Do you have a minimum order quantity (MOQ)?",
    a: "Yes, we maintain minimum order quantities based on product category and brand. MOQs ensure efficient production and logistics. Please contact us for a customized quote based on your needs.",
  },
  {
    q: "Are your products authentic?",
    a: "All products supplied are 100% authentic and sourced directly from authorized manufacturers or brand partners. We maintain strict quality control procedures to ensure product integrity.",
  },
  {
    q: "Which markets do you ship to?",
    a: "We ship globally and work with distributors across North America, Europe, the Middle East, and other international markets. Shipping terms and lead times vary depending on destination.",
  },
  {
    q: "What payment terms do you offer?",
    a: "We only accept ACH deposits, zelle or wire transfers. No cash or credit card payments allowed. We do not offer any payment plans.",
  },
  {
    q: "How long does order fulfillment take?",
    a: "Lead times depend on product availability and order volume. In-stock wholesale orders are typically processed within a few business days. Larger or custom orders may require additional production time.",
  },
  {
    q: "Do you support Amazon or other marketplace sellers?",
    a: "Yes, we work with qualified e-commerce sellers and marketplace distributors. Compliance with brand policies and marketplace regulations is required.",
  },
  {
    q: "Can you provide compliance documentation?",
    a: "We can provide required documentation such as MSDS, IFRA certificates, ingredient disclosures, and other regulatory documents upon request.",
  },
  {
    q: "What is your return or damage policy?",
    a: "Any damaged or defective products must be reported within a specified timeframe after delivery. Claims are reviewed promptly, and resolutions may include replacement or credit.",
  },
];

const galleryImages = [
  { src: "/images/about-page/team-gallery/gallery-4.jpg", area: "a" },
  { src: "/images/about-page/team-gallery/gallery-1.jpg", area: "b" },
  { src: "/images/about-page/team-gallery/gallery-7.jpg", area: "c" },
  { src: "/images/about-page/team-gallery/gallery-6.jpg", area: "d" },
  { src: "/images/about-page/team-gallery/gallery-3.jpg", area: "e" },
  { src: "/images/about-page/team-gallery/gallery-5.jpg", area: "f" },
  { src: "/images/about-page/team-gallery/gallery-8.jpg", area: "g" },
];

// ─── ORNAMENTAL SEPARATOR ─────────────────────────────────────────────────────
function OrnamentalSep({ align = "center" }) {
  return (
    <svg
      viewBox="0 0 100 12"
      width="100"
      height="12"
      style={{
        display: "block",
        margin: align === "center" ? "5px auto 0" : "5px 0 0",
      }}
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

// ─── SECTION SUBTITLE ─────────────────────────────────────────────────────────
function SectionSubtitle({ children, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 12 }}>
      <span
        style={{
          color: "hsl(38,61%,73%)",
          fontFamily: "'Forum', cursive",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.4em",
          fontSize: "2.2rem",
          lineHeight: "1.2em",
        }}
      >
        {children}
      </span>
      <OrnamentalSep align={center ? "center" : "left"} />
    </div>
  );
}

// ─── DIAMOND SEPARATOR ───────────────────────────────────────────────────────
function DiamondSep() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        border: "1px solid hsl(38,61%,73%)",
        transform: "rotate(45deg)",
        flexShrink: 0,
      }}
    />
  );
}

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Forum&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background-color: hsl(38,61%,73%); }
        ::-webkit-scrollbar-track { background: transparent; }

        /* ── OUR STORY side-by-side ── */
        .story-container {
          display: flex;
          align-items: center;
          gap: 70px;
        }
        .story-text {
          flex: 1;
          min-width: 0;
        }
        .story-image {
          flex: 1;
          min-width: 0;
          position: relative;
          overflow: hidden;
        }
        /* Inset gold frame accent */
        .story-image::after {
          content: "";
          position: absolute;
          inset: 14px;
          border: 1px solid hsl(38,61%,73%);
          pointer-events: none;
          z-index: 1;
          opacity: 0.35;
          transition: opacity 500ms ease;
        }
        .story-image:hover::after { opacity: 0.6; }
        .story-image img {
          width: 100%;
          height: 540px;
          object-fit: cover;
          display: block;
          transition: transform 600ms ease;
        }
        .story-image:hover img { transform: scale(1.04); }
        .story-gold-rule {
          width: 60px;
          height: 2px;
          background-color: hsl(38,61%,73%);
          margin: 28px 0;
          opacity: 0.7;
        }
        @media (max-width: 900px) {
          .story-container { flex-direction: column; gap: 40px; }
          .story-image img { height: 320px; }
          .story-text { text-align: center; }
          .story-gold-rule { margin: 20px auto; }
        }

        /* ── Gallery grid ── */
        .gallery-grid {
          display: grid;
          height: 520px;
          grid-template-columns: 1.4fr 1fr 0.8fr;
          grid-template-rows: 1fr 1.5fr 1fr;
          grid-template-areas: "a b c" "a d e" "f g e";
          gap: 18px;
        }
        .g-a { grid-area: a; } .g-b { grid-area: b; } .g-c { grid-area: c; }
        .g-d { grid-area: d; } .g-e { grid-area: e; } .g-f { grid-area: f; } .g-g { grid-area: g; }
        .gallery-item { overflow: hidden; background: #111; display: flex; transition: box-shadow 300ms ease; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 300ms ease; display: block; }
        .gallery-item:hover { box-shadow: 0 10px 25px rgba(255,215,0,0.12); }
        .gallery-item:hover img { transform: scale(1.02); }
        @media (max-width: 900px) {
          .gallery-grid {
            height: 420px;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(4, 1fr);
            grid-template-areas: "a b" "c d" "e f" "g g";
          }
        }
        @media (max-width: 480px) {
          .gallery-grid {
            height: auto;
            grid-template-columns: 1fr;
            grid-template-rows: repeat(7, 180px);
            grid-template-areas: "a" "b" "c" "d" "e" "f" "g";
          }
        }

        /* ── FAQ ── */
        .faq-wrapper {
          max-width: 1200px;
          width: 100%;
          margin: 40px auto 0;
          padding: 0 40px;
        }
        .faq-answer {
          font-size: 1.8rem;
          max-height: 0;
          opacity: 0;
          line-height: 1.5;
          overflow: hidden;
          transition: all 0.6s ease;
          color: hsla(0,0%,65%,1);
          font-family: 'DM Sans', sans-serif;
          padding: 0 15px;
        }
        .faq-answer.open { max-height: 200px; opacity: 1; padding: 0 15px 30px; }
        .d-arrow { transition: transform 0.5s ease-in; color: hsl(38,61%,73%); flex-shrink: 0; }
        .d-arrow.rotate { transform: rotate(180deg); }
        @media (max-width: 1240px) {
          .faq-wrapper { padding: 0 24px; }
        }
        @media (max-width: 600px) {
          .faq-wrapper { padding: 0 16px; }
        }

        /* ══════════════════════════════
           LEADERSHIP
        ══════════════════════════════ */

        /* Each leader block: 50/50 grid */
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
        /* Gold inset frame — mirrors story section */
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

        /* Large watermark number */
        .leader-number {
          position: absolute;
          bottom: -18px;
          left: -10px;
          font-family: 'Forum', cursive;
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
        /* Thin gradient gold accent on left edge */
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
        /* Reversed variant: accent moves to right edge */
        .leader-text-col-reversed::before {
          left: auto;
          right: 0;
        }

        /* Reversed block: image on right, text on left */
        .leader-block-reversed {
          direction: rtl;
        }
        .leader-block-reversed > * {
          direction: ltr;
        }
        .leader-block-reversed .leader-number {
          left: auto;
          right: -10px;
        }

        /* Role tag */
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
          font-family: 'DM Sans', sans-serif;
        }
        .l-diamond {
          display: inline-block;
          width: 7px;
          height: 7px;
          border: 1px solid hsl(38,61%,73%);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* Name */
        .leader-name {
          font-family: 'Forum', cursive;
          font-size: 4rem;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }

        /* Gold rule */
        .leader-gold-rule {
          width: 50px;
          height: 2px;
          background: hsl(38,61%,73%);
          opacity: 0.65;
          margin: 22px 0;
        }

        /* Bio paragraphs */
        .leader-bio {
          font-size: 1.6rem;
          color: hsla(0,0%,65%,1);
          line-height: 1.9;
          margin-bottom: 28px;
          font-family: 'DM Sans', sans-serif;
        }

        /* Pull quote */
        .leader-quote-block {
          border-left: 2px solid hsla(38,61%,73%,0.4);
          padding-left: 20px;
          margin-top: 4px;
        }
        .leader-quote-text {
          font-family: 'Forum', cursive;
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
          font-family: 'DM Sans', sans-serif;
        }

        /* Stat chips */
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
          font-family: 'Forum', cursive;
          font-size: 2.6rem;
          color: hsl(38,61%,73%);
          line-height: 1;
        }
        .stat-label {
          font-size: 1.1rem;
          color: hsla(0,0%,50%,1);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-family: 'DM Sans', sans-serif;
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
          .leader-text-col-reversed::before { left: 0; right: auto; }
          .leader-img-col img { height: 360px; }
          .leader-text-col { padding: 36px 28px; }
          .leader-name { font-size: 3rem; }
          .leader-number { font-size: 10rem; bottom: auto; top: -30px; }
        }

        /* ── Back to top ── */
        .back-top-btn {
          position: fixed; bottom: 20px; right: 20px;
          background-color: hsl(38,61%,73%);
          color: hsla(40,12%,5%,1);
          font-size: 2.2rem;
          width: 50px; height: 50px;
          border-radius: 50%;
          display: grid; place-items: center;
          box-shadow: 0 0 25px rgba(0,0,0,0.25);
          transition: 250ms ease;
          z-index: 4;
          text-decoration: none;
        }
        .back-top-btn:hover { background-color: #fff; color: hsl(38,61%,73%); }
      `}</style>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          backgroundColor: theme.eerieBlack1,
          color: "#fff",
          fontSize: "1.6rem",
          lineHeight: "1.85em",
        }}
      >
        {/* ══════════════════════════════════════
            HERO VIDEO
        ══════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            minHeight: "55vh",
            overflow: "hidden",
            marginTop: 160,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.8)",
              display: "block",
            }}
          >
            <source src="/images/about-page/promo-vid.mp4" type="video/mp4" />
          </video>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: theme.eerieBlack1,
              color: "#fff",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
              fontFamily: "'Forum', cursive",
              padding: "0 30px",
              textAlign: "center",
              lineHeight: 1,
              mixBlendMode: "multiply",
              maxWidth: "90%",
              whiteSpace: "nowrap",
            }}
          >
            Who We Are
          </div>
        </section>
        {/* ══════════════════════════════════════
            OUR STORY — elegant side-by-side flex
        ══════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            paddingBlock: 70,
            overflow: "hidden",
            backgroundColor: theme.eerieBlack1,
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
            <div className="story-container">
              {/* ── Text side ── */}
              <div className="story-text">
                <SectionSubtitle>Our Story</SectionSubtitle>
                <p
                  style={{
                    fontSize: "1.7rem",
                    color: theme.quickSilver,
                    marginTop: 28,
                    lineHeight: "1.85em",
                  }}
                >
                  With years of experience and a passion for authentic,
                  luxurious scents, we have built a reputation for providing the
                  finest quality perfumes to retailers and businesses across the
                  USA and beyond. We understand the unique needs of the
                  fragrance industry and pride ourselves on being a reliable and
                  efficient supplier.
                </p>
                <p
                  style={{
                    fontSize: "1.7rem",
                    color: theme.quickSilver,
                    marginTop: 20,
                    lineHeight: "1.85em",
                  }}
                >
                  Our strong relationships with renowned perfume makers and our
                  in-depth knowledge of the market ensure that our clients
                  receive the best products at competitive prices. Whether
                  you're looking to stock your store with iconic scents or
                  seeking exclusive, high-end perfumes, Al Hussein Perfumes is
                  your go-to source for premium wholesale fragrance solutions.
                </p>
                <div className="story-gold-rule" />
                <p
                  style={{
                    fontSize: "1.6rem",
                    color: theme.goldCrayola,
                    fontFamily: "'Forum', cursive",
                    fontStyle: "italic",
                    letterSpacing: "0.05em",
                  }}
                >
                  Join us in sharing the beauty and elegance of Arab perfumes
                  with the world.
                </p>
              </div>

              {/* ── Image side ── */}
              <div className="story-image">
                <img
                  src="/images/about-page/booth_pic.jpg"
                  alt="Fragrance Crafting"
                />
              </div>
            </div>
          </div>
        </section>
        {/* ══════════════════════════════════════
            IMAGE GALLERY
        ══════════════════════════════════════ */}
        <section
          style={{
            paddingTop: 5,
            paddingBottom: 80,
            paddingInline: 20,
            backgroundColor: theme.eerieBlack1,
          }}
        >
          <SectionSubtitle>Our Team</SectionSubtitle>
          <div
            style={{
              maxWidth: 1200,
              width: "100%",
              height: 520,
              margin: "10px auto 0",
              padding: 24,
              backgroundColor: theme.eerieBlack1,
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <div className="gallery-grid">
              {galleryImages.map(({ src, area }) => (
                <div key={area} className={`gallery-item g-${area}`}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ══════════════════════════════════════
            LEADERSHIP
        ══════════════════════════════════════ */}
        <section
          style={{
            paddingBlock: 80,
            paddingInline: 40,
            backgroundColor: theme.eerieBlack1,
            overflow: "hidden",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <SectionSubtitle>Leadership</SectionSubtitle>

            {/* ── CEO ── */}
            <div className="leader-block" style={{ marginTop: 70 }}>
              {/* Image */}
              <div className="leader-img-col">
                <img
                  src="/images/about-page/leadership_pics/ceo.jpg"
                  alt="Mohammed Rahman – Chief Executive Officer"
                />
                <span className="leader-number">01</span>
              </div>

              {/* Text */}
              <div className="leader-text-col">
                <span className="leader-role-tag">
                  <span className="l-diamond" />
                  Chief Executive Officer
                </span>
                <h2 className="leader-name">
                  Mohammed
                  <br />
                  Rahman
                </h2>
                <div className="leader-gold-rule" />
                <p className="leader-bio">
                  With over a decade at the helm of Al Hussein Perfumes,
                  Mohammed has transformed a regional distribution operation
                  into an internationally recognized wholesale fragrance house.
                  His deep-rooted passion for authentic Arabian oud and his
                  relentless pursuit of excellence define the company&apos;s
                  identity and direction.
                </p>
                <p className="leader-bio" style={{ marginTop: -8 }}>
                  Under his leadership, the company forged partnerships with
                  premier perfume houses across the Gulf, establishing
                  distribution channels across North America, Europe, and the
                  Middle East.
                </p>
                <div className="leader-quote-block">
                  <p className="leader-quote-text">
                    &ldquo;Every bottle carries a story — of craftsmanship, of
                    culture, of the invisible thread that connects a person to a
                    memory.&rdquo;
                  </p>
                  <span className="leader-quote-attr">
                    — Mohammed Rahman, CEO
                  </span>
                </div>
                <div className="leader-stats">
                  <div className="stat-chip">
                    <span className="stat-value">10+</span>
                    <span className="stat-label">Years Leading</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-chip">
                    <span className="stat-value">40+</span>
                    <span className="stat-label">Brand Partners</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-chip">
                    <span className="stat-value">3</span>
                    <span className="stat-label">Continents</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── President ── */}
            <div
              className="leader-block leader-block-reversed"
              style={{ marginTop: 100 }}
            >
              {/* Image */}
              <div className="leader-img-col">
                <img
                  src="/images/about-page/leadership_pics/president.jpg"
                  alt="Hussein Isse – President"
                />
                <span className="leader-number">02</span>
              </div>

              {/* Text */}
              <div className="leader-text-col leader-text-col-reversed">
                <span className="leader-role-tag">
                  <span className="l-diamond" />
                  President
                </span>
                <h2 className="leader-name">
                  Hussein
                  <br />
                  Isse
                </h2>
                <div className="leader-gold-rule" />
                <p className="leader-bio">
                  Hussein oversees the full operational landscape of Al Hussein
                  Perfumes — from warehouse logistics and client onboarding to
                  compliance and fulfillment. His background in supply chain
                  management and his reputation for meticulous attention to
                  quality assurance have earned the trust of retailers and
                  distributors across the globe.
                </p>
                <p className="leader-bio" style={{ marginTop: -8 }}>
                  Hussein&apos;s work ethic and approachability have created a
                  company culture built on reliability, transparency, and
                  long-term partnership — values that define every client
                  relationship.
                </p>
                <div className="leader-quote-block">
                  <p className="leader-quote-text">
                    &ldquo;We don&apos;t just ship perfumes — we build trust,
                    bottle by bottle, order by order, relationship by
                    relationship.&rdquo;
                  </p>
                  <span className="leader-quote-attr">
                    — Hussein Isse, President
                  </span>
                </div>
                <div className="leader-stats">
                  <div className="stat-chip">
                    <span className="stat-value">500+</span>
                    <span className="stat-label">Clients Served</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-chip">
                    <span className="stat-value">99%</span>
                    <span className="stat-label">Order Accuracy</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-chip">
                    <span className="stat-value">15+</span>
                    <span className="stat-label">Markets Reached</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        ;
        {/* ══════════════════════════════════════
            FAQ — stretched to 1200px max-width
        ══════════════════════════════════════ */}
        <section
          style={{ paddingBlock: 70, backgroundColor: theme.eerieBlack1 }}
        >
          <SectionSubtitle>FAQs</SectionSubtitle>

          <div className="faq-wrapper">
            {faqs.map((item, i) => (
              <div
                key={i}
                style={{ borderBottom: "1px solid hsla(38,61%,73%,0.35)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    backgroundColor:
                      openFaq === i ? theme.eerieBlack1 : "#181818",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 15px",
                    border: "none",
                    outline: "none",
                    fontSize: "2.2rem",
                    color: theme.goldCrayola,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "background 0.25s ease",
                    fontFamily: "'Forum', cursive",
                    letterSpacing: 1,
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = theme.eerieBlack1)
                  }
                  onMouseLeave={(e) => {
                    if (openFaq !== i)
                      e.currentTarget.style.backgroundColor = "#181818";
                  }}
                >
                  <span>{item.q}</span>
                  <svg
                    className={`d-arrow ${openFaq === i ? "rotate" : ""}`}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ marginLeft: 16 }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <p className={`faq-answer ${openFaq === i ? "open" : ""}`}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
        <SubscribeSection />
        {/* ══════════════════════════════════════
            BACK TO TOP
        ══════════════════════════════════════ */}
        <a href="#" className="back-top-btn" aria-label="Back to top">
          ↑
        </a>
      </div>
    </>
  );
}
