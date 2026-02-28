"use client";

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

// ─── Component ────────────────────────────────────────────────────────────────
export default function OurStory() {
  return (
    <>
      <style>{`
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
        .story-image img {
          width: 100%; height: 540px; object-fit: cover;
          display: block; transition: transform 600ms ease;
        }
        .story-image:hover img { transform: scale(1.04); }
        .story-gold-rule {
          width: 60px; height: 2px;
          background-color: hsl(38,61%,73%);
          margin: 28px 0; opacity: 0.7;
        }
        @media (max-width: 900px) {
          .story-container   { flex-direction: column; gap: 40px; }
          .story-image img   { height: 320px; }
          .story-text        { text-align: center; }
          .story-gold-rule   { margin: 20px auto; }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          paddingBlock: 70,
          overflow: "hidden",
          backgroundColor: "hsla(210,4%,9%,1)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <div className="story-container">
            {/* Text side */}
            <div className="story-text">
              <SectionSubtitle center={false}>Our Story</SectionSubtitle>
              <p
                style={{
                  fontSize: "1.7rem",
                  color: "hsla(0,0%,65%,1)",
                  marginTop: 28,
                  lineHeight: "1.85em",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                With years of experience and a passion for authentic, luxurious
                scents, we have built a reputation for providing the finest
                quality perfumes to retailers and businesses across the USA and
                beyond. We understand the unique needs of the fragrance industry
                and pride ourselves on being a reliable and efficient supplier.
              </p>
              <p
                style={{
                  fontSize: "1.7rem",
                  color: "hsla(0,0%,65%,1)",
                  marginTop: 20,
                  lineHeight: "1.85em",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                Our strong relationships with renowned perfume makers and our
                in-depth knowledge of the market ensure that our clients receive
                the best products at competitive prices. Whether you&apos;re
                looking to stock your store with iconic scents or seeking
                exclusive, high-end perfumes, Al Hussein Perfumes is your go-to
                source for premium wholesale fragrance solutions.
              </p>
              <div className="story-gold-rule" />
              <p
                style={{
                  fontSize: "1.6rem",
                  color: "hsl(38,61%,73%)",
                  fontFamily: "var(--font-forum)",
                  fontStyle: "italic",
                  letterSpacing: "0.05em",
                }}
              >
                Join us in sharing the beauty and elegance of Arab perfumes with
                the world.
              </p>
            </div>

            {/* Image side */}
            <div className="story-image">
              <img
                src="/images/about-page/booth_pic.jpg"
                alt="Fragrance Crafting"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
