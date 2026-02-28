"use client";

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const images = [
  { src: "/images/about-page/team-gallery/gallery-4.jpg", area: "a" },
  { src: "/images/about-page/team-gallery/gallery-1.jpg", area: "b" },
  { src: "/images/about-page/team-gallery/gallery-7.jpg", area: "c" },
  { src: "/images/about-page/team-gallery/gallery-6.jpg", area: "d" },
  { src: "/images/about-page/team-gallery/gallery-3.jpg", area: "e" },
  { src: "/images/about-page/team-gallery/gallery-5.jpg", area: "f" },
  { src: "/images/about-page/team-gallery/gallery-8.jpg", area: "g" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function TeamGallery() {
  return (
    <>
      <style>{`
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
        .gallery-item {
          overflow: hidden; background: #111;
          display: flex; transition: box-shadow 300ms ease;
        }
        .gallery-item img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 300ms ease; display: block;
        }
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
      `}</style>

      <section
        style={{
          paddingTop: 5,
          paddingBottom: 80,
          paddingInline: 20,
          backgroundColor: "hsla(210,4%,9%,1)",
        }}
      >
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
            Our Team
          </span>
          <OrnamentalSep />
        </div>

        {/* Grid */}
        <div
          style={{
            maxWidth: 1200,
            width: "100%",
            height: 520,
            margin: "10px auto 0",
            padding: 24,
            backgroundColor: "hsla(210,4%,9%,1)",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div className="gallery-grid">
            {images.map(({ src, area }) => (
              <div key={area} className={`gallery-item g-${area}`}>
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
