"use client";

import { useState } from "react";

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

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(1);

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

  const filterBtn = (cat: string, extra = "") =>
    `blog-filter-btn ${activeCategory === cat ? "active" : ""} ${extra}`.trim();

  return (
    <>
      {/* ── Category filter ── */}
      <section className="px-5 py-5 bg-[var(--bg-dark)] border-y border-[var(--white-10)]">
        <div className="fade-up delay-3 max-w-[1200px] mx-auto py-3">
          {/* Mobile layout */}
          <div className="flex flex-col items-center gap-2 sm:hidden">
            <div className="flex justify-center gap-2 w-full">
              {CATEGORIES.slice(0, 3).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={filterBtn(
                    cat,
                    "flex-1 px-2 py-2 text-[0.75rem] tracking-[1.5px]",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-2 w-full">
              {CATEGORIES.slice(3).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={filterBtn(
                    cat,
                    "flex-1 px-2 py-2 text-[0.75rem] tracking-[1.5px]",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tablet+ layout */}
          <div className="hidden sm:flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={filterBtn(
                  cat,
                  "px-6 py-[10px] text-[1.2rem] tracking-[3px]",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog grid ── */}
      <section className="py-20 px-5">
        <div className="fade-up delay-3 max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((post) => (
              <article key={post.id} className="blog-card group">
                {/* Banner */}
                <div className="blog-card-banner">
                  <span className="text-white/10 text-lg font-bold uppercase tracking-[0.15em] [font-family:var(--font-display)]">
                    Blog Post
                  </span>
                  <span className="absolute bottom-4 left-4 blog-badge">
                    {post.date}
                  </span>
                </div>

                {/* Content */}
                <div className="px-8 pt-7 pb-8">
                  <span className="block text-[var(--gold)] text-xs font-bold uppercase tracking-[0.15em] mb-3">
                    {post.category}
                  </span>

                  <h3 className="[font-family:var(--font-display)] text-[2rem] leading-[1.35] font-normal text-white mb-3.5 transition-colors duration-300 group-hover:text-[var(--gold)]">
                    {post.title}
                  </h3>

                  <p className="text-[var(--text-muted)] mb-6 text-[1.5rem] leading-[1.7]">
                    {post.excerpt}
                  </p>

                  <div className="blog-card-rule" />

                  <a href="#" className="blog-read-link">
                    <span>Read Article</span>
                    <span>→</span>
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-[var(--text-muted)] text-[1.6rem] [font-family:var(--font-display)]">
              No posts found in this category.
            </div>
          )}
        </div>
      </section>

      {/* ── Pagination ── */}
      <section className="pb-20 px-5">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn pagination-btn-nav"
          >
            ← Prev
          </button>

          <div className="flex items-center gap-3">
            {visiblePages()[0] > 1 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="pagination-btn"
                >
                  1
                </button>
                {visiblePages()[0] > 2 && (
                  <span className="text-[var(--text-muted)] text-[1.4rem]">
                    …
                  </span>
                )}
              </>
            )}

            {visiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-btn ${currentPage === page ? "active" : ""}`}
              >
                {page}
              </button>
            ))}

            {visiblePages()[2] < TOTAL_PAGES && (
              <>
                {visiblePages()[2] < TOTAL_PAGES - 1 && (
                  <span className="text-[var(--text-muted)] text-[1.4rem]">
                    …
                  </span>
                )}
                <button
                  onClick={() => handlePageChange(TOTAL_PAGES)}
                  className="pagination-btn"
                >
                  {TOTAL_PAGES}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === TOTAL_PAGES}
            className="pagination-btn pagination-btn-nav"
          >
            Next →
          </button>
        </div>
      </section>
    </>
  );
}
