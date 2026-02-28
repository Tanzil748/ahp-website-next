"use client";

import BackToTop from "@/components/BackToTop";
import { useState } from "react";

// ─── EXACT THEME TOKENS ──────────────────────────────────────────────────────
const gold = "hsl(38, 61%, 73%)";
const goldDim = "hsla(38, 61%, 73%, 0.35)";
const eerieBlack1 = "hsla(210, 4%, 9%, 1)";
const eerieBlack2 = "hsla(210, 4%, 11%, 1)";
const eerieBlack4 = "hsla(0, 0%, 13%, 1)";
const smokyBlack1 = "hsla(40, 12%, 5%, 1)";
const smokyBlack2 = "hsla(30, 8%, 5%, 1)";
const quickSilver = "hsla(0, 0%, 65%, 1)";
const whiteAlpha10 = "hsla(0, 0%, 100%, 0.1)";

// ─── DATA ────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All Posts",
  "Fragrance Trends",
  "Guides & Tips",
  "Behind the Scenes",
  "Events",
];

const BLOG_POSTS = [
  {
    id: 1,
    date: "02/03/2026",
    category: "Guides & Tips",
    title: "How to Choose Your Signature Scent",
    excerpt:
      "Finding the perfect fragrance that represents your personality is an art. Learn the essential steps to discover your signature scent.",
  },
  {
    id: 2,
    date: "01/28/2026",
    category: "Behind the Scenes",
    title: "The Art of Perfume Making: A Master Class",
    excerpt:
      "Take an exclusive look into our perfume creation process, from sourcing rare ingredients to crafting the final blend.",
  },
  {
    id: 3,
    date: "01/25/2026",
    category: "Fragrance Trends",
    title: "Sustainable Perfumery: The Future is Green",
    excerpt:
      "How the fragrance industry is embracing sustainability — from eco-friendly packaging to ethically sourced botanical ingredients.",
  },
  {
    id: 4,
    date: "01/22/2026",
    category: "Events",
    title: "Al Hussein Perfumes at the NY Fragrance Expo 2026",
    excerpt:
      "We attended the most anticipated fragrance event of the year. Here's everything that happened and what we brought home.",
  },
  {
    id: 5,
    date: "01/18/2026",
    category: "Guides & Tips",
    title: "Layering Fragrances: The Advanced Guide",
    excerpt:
      "Master the art of fragrance layering to create a completely unique scent profile that's entirely your own.",
  },
  {
    id: 6,
    date: "01/15/2026",
    category: "Fragrance Trends",
    title: "Breaking Boundaries: Gender-Neutral Fragrances",
    excerpt:
      "Discover why unisex perfumes are dominating the market and how they're redefining traditional fragrance categories.",
  },
];

const TOTAL_PAGES = 10;

// ─── ORNAMENTAL SEPARATOR ────────────────────────────────────────────────────
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
      <line x1="0" y1="6" x2="38" y2="6" stroke={gold} strokeWidth="1" />
      <rect
        x="44"
        y="2"
        width="8"
        height="8"
        transform="rotate(45 48 6)"
        fill="none"
        stroke={gold}
        strokeWidth="1"
      />
      <line x1="58" y1="6" x2="100" y2="6" stroke={gold} strokeWidth="1" />
    </svg>
  );
}

// ─── SECTION SUBTITLE ────────────────────────────────────────────────────────
function SectionSubtitle({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div style={{ textAlign: align, marginBottom: 12 }}>
      <span
        style={{
          color: gold,
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
      <OrnamentalSep align={align} />
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
        border: `1px solid ${gold}`,
        transform: "rotate(45deg)",
        flexShrink: 0,
      }}
    />
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");

  const filtered =
    activeCategory === "All Posts"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visiblePages = (): number[] => {
    if (currentPage <= 3) return [1, 2, 3];
    if (currentPage >= TOTAL_PAGES - 2)
      return [TOTAL_PAGES - 2, TOTAL_PAGES - 1, TOTAL_PAGES];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Forum&display=swap');

        /* ── Fade-up animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.3s; opacity: 0; }
        .delay-3 { animation-delay: 0.5s; opacity: 0; }

        /* ── Hero ── */
        .blog-hero {
          position: relative;
          padding: 160px 20px 100px;
          text-align: center;
          overflow: hidden;
          z-index: 1;
        }
        .blog-hero::before {
          content: "";
          position: absolute; inset: 0; z-index: -1;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, hsla(38,61%,50%,0.1) 0%, transparent 70%),
            ${eerieBlack1};
        }
        .blog-hero::after {
          content: "";
          position: absolute; inset: 0; z-index: -1;
          background-image:
            linear-gradient(${whiteAlpha10} 1px, transparent 1px),
            linear-gradient(90deg, ${whiteAlpha10} 1px, transparent 1px);
          background-size: 60px 60px;
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* ── Category filter buttons ── */
        .cat-btn {
          padding: 10px 24px;
          font-size: 1.2rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          border: 1px solid ${whiteAlpha10};
          color: ${quickSilver};
          background: transparent;
          cursor: pointer;
          transition: all 250ms ease;
          font-family: 'DM Sans', sans-serif;
        }
        .cat-btn:hover, .cat-btn.active {
          background-color: ${gold};
          border-color: ${gold};
          color: ${smokyBlack1};
        }

        /* ── Blog card hover ── */
        .blog-card {
          background-color: ${eerieBlack2};
          border: 1px solid ${whiteAlpha10};
          overflow: hidden;
          transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
        }
        .blog-card:hover {
          transform: translateY(-6px);
          border-color: ${gold};
          box-shadow: 0 10px 30px hsla(38,61%,50%,0.15);
        }
        .blog-card:hover .card-title { color: ${gold}; }
        .card-title { transition: color 300ms ease; }

        /* ── Featured card ── */
        .featured-card {
          border: 1px solid ${whiteAlpha10};
          overflow: hidden;
          transition: transform 300ms ease, border-color 300ms ease;
        }
        .featured-card:hover {
          transform: translateY(-4px);
          border-color: ${gold};
        }

        /* ── Read more link ── */
        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: ${gold};
          font-size: 1.2rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          text-decoration: none;
          transition: gap 300ms ease;
        }
        .read-more:hover { gap: 16px; }

        /* ── Pagination ── */
        .page-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          height: 44px;
          padding: 0 14px;
          border: 1px solid ${whiteAlpha10};
          color: ${quickSilver};
          font-size: 1.4rem;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          background: transparent;
          cursor: pointer;
          transition: all 250ms ease;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .page-btn:hover:not(:disabled) {
          background-color: ${gold};
          border-color: ${gold};
          color: ${smokyBlack1};
        }
        .page-btn.active-page {
          background-color: ${gold};
          border-color: ${gold};
          color: ${smokyBlack1};
        }
        .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        /* ── Subscribe input ── */
        .sub-input {
          flex: 1;
          height: 52px;
          padding: 0 18px;
          background-color: ${eerieBlack1};
          border: 1px solid ${goldDim};
          border-right: none;
          color: #fff;
          font-size: 1.6rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 500ms ease;
        }
        .sub-input:focus { border-color: ${gold}; }
        .sub-input::placeholder { color: ${quickSilver}; }

        /* ── Subscribe button (site's btn-secondary circular fill) ── */
        .sub-btn {
          position: relative;
          height: 52px;
          padding: 0 34px;
          background-color: ${gold};
          border: 1px solid ${gold};
          color: ${smokyBlack1};
          font-size: 1.2rem;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          text-transform: uppercase;
          letter-spacing: 3px;
          cursor: pointer;
          overflow: hidden;
          z-index: 1;
          white-space: nowrap;
          transition: color 250ms ease;
        }
        .sub-btn::before {
          content: "";
          position: absolute;
          bottom: 100%; left: 50%;
          transform: translateX(-50%);
          width: 200%; height: 200%;
          border-radius: 50%;
          background-color: ${smokyBlack1};
          transition: 500ms ease;
          z-index: -1;
        }
        .sub-btn:hover::before { bottom: -50%; }
        .sub-btn:hover { color: #fff; }


        /* ── Card badges ── */
        .date-badge {
          position: absolute;
          bottom: 16px; left: 16px;
          background-color: ${gold};
          color: ${smokyBlack1};
          font-size: 1.2rem;
          font-weight: 700;
          padding: 4px 12px;
          font-family: 'DM Sans', sans-serif;
        }
        .featured-badge {
          position: absolute;
          top: 16px; left: 16px;
          background-color: ${gold};
          color: ${smokyBlack1};
          font-size: 1.1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 5px 14px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Featured grid responsive ── */
        .featured-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
        }
        @media (max-width: 768px) {
          .featured-grid { grid-template-columns: 1fr; }
        }

        /* ── Subscribe responsive ── */
        .subscribe-row { display: flex; max-width: 640px; margin: 0 auto; }
        @media (max-width: 600px) {
          .subscribe-row { flex-direction: column; }
          .sub-input {
            border-right: 1px solid ${goldDim};
            border-bottom: none;
          }
        }
      `}</style>

      <div
        style={{
          backgroundColor: eerieBlack1,
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          minHeight: "100vh",
        }}
      >
        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="blog-hero">
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Ornament row */}
            <div className="fade-up delay-1 flex justify-center items-center gap-3 mb-4">
              <DiamondSep />
              <span
                style={{
                  color: gold,
                  fontFamily: "'Forum', cursive",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                  fontSize: "1.4rem",
                }}
              >
                Insights &amp; Stories
              </span>
              <DiamondSep />
            </div>

            <h1
              className="fade-up delay-2"
              style={{
                fontFamily: "'Forum', cursive",
                fontSize: "clamp(4rem, 8vw, 8rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Our Blog
            </h1>

            <p
              className="fade-up delay-3"
              style={{
                color: quickSilver,
                fontSize: "1.7rem",
                lineHeight: 1.5,
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              Discover the art of perfumery, fragrance trends, and
              behind-the-scenes stories
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FEATURED POST
        ══════════════════════════════════════ */}
        <section style={{ padding: "80px 20px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <SectionSubtitle>Featured Post</SectionSubtitle>
            <div
              className="featured-card featured-grid"
              style={{ marginTop: 32 }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  position: "relative",
                  backgroundColor: eerieBlack4,
                  minHeight: 360,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <span className="featured-badge">Featured</span>
                <span
                  style={{
                    color: whiteAlpha10,
                    fontSize: "2rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontFamily: "'Forum', cursive",
                  }}
                >
                  Featured Post
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  backgroundColor: eerieBlack2,
                  padding: "50px 55px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  className="flex items-center gap-3 mb-5"
                  style={{ fontSize: "1.3rem" }}
                >
                  <span
                    style={{
                      color: gold,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                    }}
                  >
                    Fragrance Trends
                  </span>
                  <DiamondSep />
                  <time style={{ color: quickSilver }}>February 5, 2026</time>
                </div>

                <h2
                  style={{
                    fontFamily: "'Forum', cursive",
                    fontSize: "clamp(2.4rem, 3vw, 3.4rem)",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    marginBottom: 20,
                  }}
                >
                  The Evolution of Luxury Fragrances: What&apos;s Trending in
                  2026
                </h2>

                <p
                  style={{
                    color: quickSilver,
                    fontSize: "1.6rem",
                    lineHeight: 1.85,
                    marginBottom: 32,
                  }}
                >
                  Explore the latest trends shaping the luxury perfume industry,
                  from sustainable ingredients to personalized scent
                  experiences. Discover how modern perfumery is blending
                  tradition with innovation.
                </p>

                <div
                  style={{
                    width: 60,
                    height: 2,
                    backgroundColor: gold,
                    opacity: 0.6,
                    marginBottom: 28,
                  }}
                />

                <a
                  href="#"
                  className="read-more"
                  style={{ alignSelf: "flex-start" }}
                >
                  <span>Read More</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CATEGORY FILTER
        ══════════════════════════════════════ */}
        <section
          style={{
            padding: "20px",
            backgroundColor: smokyBlack1,
            borderTop: `1px solid ${whiteAlpha10}`,
            borderBottom: `1px solid ${whiteAlpha10}`,
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              padding: "12px 0",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            BLOG GRID
        ══════════════════════════════════════ */}
        <section style={{ padding: "80px 20px" }}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 32,
            }}
          >
            {filtered.length > 0 ? (
              filtered.map((post) => (
                <article key={post.id} className="blog-card">
                  {/* Banner */}
                  <div
                    style={{
                      position: "relative",
                      backgroundColor: eerieBlack4,
                      height: 240,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={{
                        color: whiteAlpha10,
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        fontFamily: "'Forum', cursive",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Blog Post
                    </span>
                    <span className="date-badge">{post.date}</span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "28px 32px 32px" }}>
                    <span
                      style={{
                        color: gold,
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        display: "block",
                        marginBottom: 12,
                      }}
                    >
                      {post.category}
                    </span>

                    <h3
                      className="card-title"
                      style={{
                        fontFamily: "'Forum', cursive",
                        fontSize: "2rem",
                        fontWeight: 400,
                        lineHeight: 1.35,
                        marginBottom: 14,
                      }}
                    >
                      {post.title}
                    </h3>

                    <p
                      style={{
                        color: quickSilver,
                        fontSize: "1.5rem",
                        lineHeight: 1.7,
                        marginBottom: 24,
                      }}
                    >
                      {post.excerpt}
                    </p>

                    <div
                      style={{
                        height: 1,
                        background: `linear-gradient(to right, ${gold}, transparent)`,
                        opacity: 0.3,
                        marginBottom: 20,
                      }}
                    />

                    <a href="#" className="read-more">
                      <span>Read Article</span>
                      <span>→</span>
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "80px 0",
                  color: quickSilver,
                  fontSize: "1.6rem",
                  fontFamily: "'Forum', cursive",
                }}
              >
                No posts found in this category.
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════
            PAGINATION
        ══════════════════════════════════════ */}
        <section style={{ paddingBottom: 80, paddingInline: 20 }}>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-btn"
              style={{ padding: "0 20px" }}
            >
              ← Prev
            </button>

            <div className="flex items-center gap-3">
              {visiblePages()[0] > 1 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    className="page-btn"
                  >
                    1
                  </button>
                  {visiblePages()[0] > 2 && (
                    <span style={{ color: quickSilver, fontSize: "1.4rem" }}>
                      …
                    </span>
                  )}
                </>
              )}

              {visiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`page-btn ${
                    currentPage === page ? "active-page" : ""
                  }`}
                >
                  {page}
                </button>
              ))}

              {visiblePages()[2] < TOTAL_PAGES && (
                <>
                  {visiblePages()[2] < TOTAL_PAGES - 1 && (
                    <span style={{ color: quickSilver, fontSize: "1.4rem" }}>
                      …
                    </span>
                  )}
                  <button
                    onClick={() => handlePageChange(TOTAL_PAGES)}
                    className="page-btn"
                  >
                    {TOTAL_PAGES}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === TOTAL_PAGES}
              className="page-btn"
              style={{ padding: "0 20px" }}
            >
              Next →
            </button>
          </div>
        </section>

        {/* ══════════════════════════════════════
            NEWSLETTER
        ══════════════════════════════════════ */}
        <section
          style={{
            padding: "80px 20px",
            backgroundColor: smokyBlack2,
            borderTop: `1px solid ${gold}`,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <SectionSubtitle>Newsletter</SectionSubtitle>

            <h2
              style={{
                fontFamily: "'Forum', cursive",
                fontSize: "clamp(3rem, 5vw, 5rem)",
                fontWeight: 400,
                marginTop: 16,
                marginBottom: 16,
              }}
            >
              Stay Updated
            </h2>

            <p
              style={{
                color: quickSilver,
                fontSize: "1.6rem",
                lineHeight: 1.85,
                marginBottom: 40,
              }}
            >
              Subscribe to our newsletter for the latest fragrance insights,
              exclusive offers, and event updates.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="subscribe-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="sub-input"
              />
              <button type="submit" className="sub-btn">
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BACK TO TOP
        ══════════════════════════════════════ */}
        <BackToTop />
      </div>
    </>
  );
}
