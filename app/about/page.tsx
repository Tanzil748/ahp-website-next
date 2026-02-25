"use client";

import { useState, useEffect } from "react";

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
    q: "What's the best way to study JavaScript?",
    a: "Start with an online course. If you're serious about learning fast, efficiently, and without missing any important information, consider enrolling in a structured online program.",
  },
  {
    q: "What should I learn after JavaScript?",
    a: "We suggest taking a look at TypeScript and learning a popular frontend framework such as Angular, React, or Vue. If you are interested in backend, take a look at Node.js.",
  },
  {
    q: "Can I get a job after learning JavaScript?",
    a: "Absolutely. JavaScript is one of the most in-demand languages. With a strong portfolio and foundational knowledge, you can pursue roles in frontend, backend, or full-stack development.",
  },
  {
    q: "How long will it take to learn JavaScript?",
    a: "With consistent daily practice, you can gain working proficiency in 3–6 months. Mastery, of course, is a lifelong journey.",
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

        /* ── Leadership ── */
        .leader-row {
          display: flex;
          gap: 60px;
          margin-bottom: 80px;
          align-items: stretch;
        }
        .leader-profile {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .leader-image {
          width: 500px;
          max-width: 100%;
          height: 400px;
          object-fit: cover;
          border: 1px solid hsl(38,61%,73%);
          margin-bottom: 18px;
          display: block;
        }
        .leader-name {
          font-size: 2rem;
          font-family: 'Forum', cursive;
          color: #fff;
          margin-bottom: 4px;
        }
        .leader-role {
          display: block;
          font-size: 1.2rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: hsl(38,61%,73%);
          margin-bottom: 12px;
          font-weight: 700;
        }
        .leader-info {
          font-size: 1.4rem;
          line-height: 1.6;
          color: hsla(0,0%,65%,1);
          max-width: 320px;
          margin: 0 auto;
        }
        .leader-quote {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-style: italic;
          line-height: 1.8;
          color: hsla(0,0%,65%,1);
          padding-left: 30px;
          position: relative;
          text-align: center;
        }
        .leader-quote h2 {
          font-family: 'Forum', cursive;
          color: hsl(38,61%,73%);
          font-size: 2.1rem;
          margin-bottom: 20px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-weight: 400;
          font-style: normal;
        }
        .leader-quote p {
          font-size: 2rem;
          line-height: 1.8;
          color: hsla(0,0%,65%,1);
          font-style: italic;
        }
        @media (max-width: 768px) {
          .leader-row { flex-direction: column; text-align: center; gap: 40px; }
          .leader-quote { padding-left: 0; order: 2; }
          .leader-image { width: 80%; height: auto; }
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

        /* ── Subscribe mobile stack ── */
        @media (max-width: 600px) {
          .subscribe-form { flex-direction: column !important; }
          .subscribe-input {
            border-radius: 12px 12px 0 0 !important;
            border-right: 1px solid hsla(38,61%,73%,0.35) !important;
            border-bottom: none !important;
            height: 52px;
          }
          .subscribe-btn { border-radius: 0 0 12px 12px !important; width: 100% !important; }
        }
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
            paddingBlock: 70,
            paddingInline: 20,
            backgroundColor: theme.eerieBlack1,
            overflow: "hidden",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
            <SectionSubtitle>Leadership</SectionSubtitle>

            {/* CEO */}
            <div className="leader-row" style={{ marginTop: 60 }}>
              <div className="leader-profile">
                <img
                  src="/images/about-page/leadership_pics/ceo.jpg"
                  alt="Chief Executive Officer"
                  className="leader-image"
                />
                <h3 className="leader-name">Mohammed Rahman</h3>
                <span className="leader-role">Chief Executive Officer</span>
                <p className="leader-info">
                  Oversees company vision, brand direction, and long-term
                  strategy while maintaining the highest standards of
                  excellence.
                </p>
              </div>
              <div className="leader-quote">
                <h2>Message from Our CEO</h2>
                <p>
                  "Our mission is to create fragrances that resonate with
                  elegance and individuality. Every perfume tells a story, and
                  we are proud to share our passion with the world."
                </p>
              </div>
            </div>

            {/* President */}
            <div className="leader-row">
              <div
                className="leader-quote"
                style={{ paddingLeft: 0, paddingRight: 30 }}
              >
                <h2>Message from Our President</h2>
                <p>
                  "We strive to maintain the quality and authenticity of every
                  fragrance we craft, ensuring that our clients experience
                  luxury in every bottle."
                </p>
              </div>
              <div className="leader-profile">
                <img
                  src="/images/about-page/leadership_pics/president.jpg"
                  alt="President"
                  className="leader-image"
                />
                <h3 className="leader-name">Hussein Isse</h3>
                <span className="leader-role">President</span>
                <p className="leader-info">
                  Responsible for day-to-day operations, client relations, and
                  ensuring the highest standard of service across all branches.
                </p>
              </div>
            </div>
          </div>
        </section>

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

        {/* ══════════════════════════════════════
            SUBSCRIBE
        ══════════════════════════════════════ */}
        <section
          style={{
            paddingBlock: 70,
            backgroundColor: theme.smokyBlack2,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
            <SectionSubtitle>Stay Updated</SectionSubtitle>
            <p
              style={{
                fontSize: "1.8rem",
                color: "#fff",
                marginTop: 12,
                marginBottom: 20,
                lineHeight: "1.85em",
              }}
            >
              Subscribe to our newsletter to receive exclusive offers and news.
            </p>

            <div
              className="subscribe-form"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch",
                marginTop: 20,
                maxWidth: 720,
                width: "100%",
                marginInline: "auto",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="subscribe-input"
                style={{
                  flex: 1,
                  height: 52,
                  padding: "0 18px",
                  borderRadius: "12px 0 0 12px",
                  border: "1px solid hsla(38,61%,73%,0.35)",
                  borderRight: "none",
                  backgroundColor: theme.eerieBlack1,
                  color: "#fff",
                  outline: "none",
                  fontSize: "1.6rem",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = theme.goldCrayola)
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "hsla(38,61%,73%,0.35)")
                }
              />
              <button
                className="subscribe-btn"
                style={{
                  height: 52,
                  padding: "0 34px",
                  borderRadius: "0 12px 12px 0",
                  border: `1px solid ${theme.goldCrayola}`,
                  backgroundColor: theme.goldCrayola,
                  color: "#000",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "250ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.smokyBlack1;
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.goldCrayola;
                  e.currentTarget.style.color = "#000";
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>

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
