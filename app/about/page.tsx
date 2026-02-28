"use client";

import { useState } from "react";
import SubscribeSection from "@/components/SubscribeSection";
import FaqSection from "./components/FaqSection";
import LeadershipSection from "./components/LeadershipSection";

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
function OrnamentalSep({ align = "center" }: { align?: "center" | "left" }) {
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
function SectionSubtitle({
  children,
  center = true,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 12 }}>
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
        {children}
      </span>
      <OrnamentalSep align={center ? "center" : "left"} />
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background-color: hsl(38,61%,73%); }
        ::-webkit-scrollbar-track { background: transparent; }

        /* ── OUR STORY ── */
        .story-container { display: flex; align-items: center; gap: 70px; }
        .story-text      { flex: 1; min-width: 0; }
        .story-image     { flex: 1; min-width: 0; position: relative; overflow: hidden; }
        .story-image::after {
          content: ""; position: absolute; inset: 14px;
          border: 1px solid hsl(38,61%,73%);
          pointer-events: none; z-index: 1; opacity: 0.35;
          transition: opacity 500ms ease;
        }
        .story-image:hover::after { opacity: 0.6; }
        .story-image img { width: 100%; height: 540px; object-fit: cover; display: block; transition: transform 600ms ease; }
        .story-image:hover img { transform: scale(1.04); }
        .story-gold-rule { width: 60px; height: 2px; background-color: hsl(38,61%,73%); margin: 28px 0; opacity: 0.7; }
        @media (max-width: 900px) {
          .story-container { flex-direction: column; gap: 40px; }
          .story-image img { height: 320px; }
          .story-text { text-align: center; }
          .story-gold-rule { margin: 20px auto; }
        }

        /* ── Gallery ── */
        .gallery-grid {
          display: grid; height: 520px;
          grid-template-columns: 1.4fr 1fr 0.8fr;
          grid-template-rows: 1fr 1.5fr 1fr;
          grid-template-areas: "a b c" "a d e" "f g e";
          gap: 18px;
        }
        .g-a{grid-area:a} .g-b{grid-area:b} .g-c{grid-area:c}
        .g-d{grid-area:d} .g-e{grid-area:e} .g-f{grid-area:f} .g-g{grid-area:g}
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

        /* ── Back to top ── */
        .back-top-btn {
          position: fixed; bottom: 20px; right: 20px;
          background-color: hsl(38,61%,73%); color: hsla(40,12%,5%,1);
          font-size: 2.2rem; width: 50px; height: 50px;
          border-radius: 50%; display: grid; place-items: center;
          box-shadow: 0 0 25px rgba(0,0,0,0.25); transition: 250ms ease;
          z-index: 4; text-decoration: none;
        }
        .back-top-btn:hover { background-color: #fff; color: hsl(38,61%,73%); }
      `}</style>

      <div
        style={{
          fontFamily: "var(--font-dm-sans)",
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
              fontFamily: "var(--font-forum)",
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
            OUR STORY
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
                  you&apos;re looking to stock your store with iconic scents or
                  seeking exclusive, high-end perfumes, Al Hussein Perfumes is
                  your go-to source for premium wholesale fragrance solutions.
                </p>
                <div className="story-gold-rule" />
                <p
                  style={{
                    fontSize: "1.6rem",
                    color: theme.goldCrayola,
                    fontFamily: "var(--font-forum)",
                    fontStyle: "italic",
                    letterSpacing: "0.05em",
                  }}
                >
                  Join us in sharing the beauty and elegance of Arab perfumes
                  with the world.
                </p>
              </div>
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
            LEADERSHIP — extracted component
        ══════════════════════════════════════ */}
        <LeadershipSection />

        {/* ══════════════════════════════════════
            FAQ — extracted component
        ══════════════════════════════════════ */}
        <FaqSection />

        {/* ══════════════════════════════════════
            SUBSCRIBE — extracted component
        ══════════════════════════════════════ */}
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
