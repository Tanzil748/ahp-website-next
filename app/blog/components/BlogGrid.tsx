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

  return (
    <>
      {/* ── Category filter ── */}
      <section className="px-5 py-5 bg-[hsla(40,12%,5%,1)] border-y border-white/10">
        <div className="fade-up delay-3 max-w-[1200px] mx-auto flex flex-wrap justify-center gap-3 py-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-6 py-[10px] font-bold uppercase tracking-[3px] border cursor-pointer transition-all duration-[250ms]
          ${
            activeCategory === cat
              ? "bg-[hsl(38,61%,73%)] border-[hsl(38,61%,73%)] text-[hsla(40,12%,5%,1)]"
              : "bg-transparent border-white/10 text-[hsla(0,0%,65%,1)] hover:bg-[hsl(38,61%,73%)] hover:border-[hsl(38,61%,73%)] hover:text-[hsla(40,12%,5%,1)]"
          }`}
              style={{ fontSize: "1.2rem", fontFamily: "var(--font-dm-sans)" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Blog grid ── */}
      <section className="py-20 px-5">
        <div className="fade-up delay-3 max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((post) => (
              <article
                key={post.id}
                className="bg-[hsla(210,4%,11%,1)] border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[hsl(38,61%,73%)] hover:shadow-[0_10px_30px_hsla(38,61%,50%,0.15)] group"
              >
                {/* Banner */}
                <div className="relative bg-[hsla(0,0%,13%,1)] h-[240px] flex items-center justify-center overflow-hidden">
                  <span
                    className="text-white/10 text-lg font-bold uppercase tracking-[0.15em]"
                    style={{ fontFamily: "var(--font-forum)" }}
                  >
                    Blog Post
                  </span>
                  <span className="absolute bottom-4 left-4 bg-[hsl(38,61%,73%)] text-[hsla(40,12%,5%,1)] text-xs font-bold px-3 py-1">
                    {post.date}
                  </span>
                </div>

                {/* Content */}
                <div className="px-8 pt-7 pb-8">
                  <span className="block text-[hsl(38,61%,73%)] text-xs font-bold uppercase tracking-[0.15em] mb-3">
                    {post.category}
                  </span>

                  <h3
                    className="font-normal text-white mb-3.5 transition-colors duration-300 group-hover:text-[hsl(38,61%,73%)]"
                    style={{
                      fontFamily: "var(--font-forum)",
                      fontSize: "2rem",
                      lineHeight: 1.35,
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="text-[hsla(0,0%,65%,1)] mb-6"
                    style={{ fontSize: "1.5rem", lineHeight: 1.7 }}
                  >
                    {post.excerpt}
                  </p>

                  <div className="h-px mb-5 opacity-30 bg-gradient-to-r from-[hsl(38,61%,73%)] to-transparent" />

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-[hsl(38,61%,73%)] font-bold uppercase tracking-[3px] no-underline transition-[gap] duration-300 hover:gap-4"
                    style={{ fontSize: "1.2rem" }}
                  >
                    <span>Read Article</span>
                    <span>→</span>
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div
              className="col-span-full text-center py-20 text-[hsla(0,0%,65%,1)]"
              style={{ fontSize: "1.6rem", fontFamily: "var(--font-forum)" }}
            >
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
            className="flex items-center justify-center h-11 px-5 border border-white/10 text-[hsla(0,0%,65%,1)] font-bold uppercase tracking-[2px] bg-transparent cursor-pointer transition-all duration-[250ms] hover:bg-[hsl(38,61%,73%)] hover:border-[hsl(38,61%,73%)] hover:text-[hsla(40,12%,5%,1)] disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ fontSize: "1.4rem" }}
          >
            ← Prev
          </button>

          <div className="flex items-center gap-3">
            {visiblePages()[0] > 1 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="flex items-center justify-center min-w-[44px] h-11 px-3 border border-white/10 text-[hsla(0,0%,65%,1)] font-bold bg-transparent cursor-pointer transition-all duration-[250ms] hover:bg-[hsl(38,61%,73%)] hover:border-[hsl(38,61%,73%)] hover:text-[hsla(40,12%,5%,1)]"
                  style={{ fontSize: "1.4rem" }}
                >
                  1
                </button>
                {visiblePages()[0] > 2 && (
                  <span
                    className="text-[hsla(0,0%,65%,1)]"
                    style={{ fontSize: "1.4rem" }}
                  >
                    …
                  </span>
                )}
              </>
            )}

            {visiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex items-center justify-center min-w-[44px] h-11 px-3 border font-bold cursor-pointer transition-all duration-[250ms]
                  ${
                    currentPage === page
                      ? "bg-[hsl(38,61%,73%)] border-[hsl(38,61%,73%)] text-[hsla(40,12%,5%,1)]"
                      : "bg-transparent border-white/10 text-[hsla(0,0%,65%,1)] hover:bg-[hsl(38,61%,73%)] hover:border-[hsl(38,61%,73%)] hover:text-[hsla(40,12%,5%,1)]"
                  }`}
                style={{ fontSize: "1.4rem" }}
              >
                {page}
              </button>
            ))}

            {visiblePages()[2] < TOTAL_PAGES && (
              <>
                {visiblePages()[2] < TOTAL_PAGES - 1 && (
                  <span
                    className="text-[hsla(0,0%,65%,1)]"
                    style={{ fontSize: "1.4rem" }}
                  >
                    …
                  </span>
                )}
                <button
                  onClick={() => handlePageChange(TOTAL_PAGES)}
                  className="flex items-center justify-center min-w-[44px] h-11 px-3 border border-white/10 text-[hsla(0,0%,65%,1)] font-bold bg-transparent cursor-pointer transition-all duration-[250ms] hover:bg-[hsl(38,61%,73%)] hover:border-[hsl(38,61%,73%)] hover:text-[hsla(40,12%,5%,1)]"
                  style={{ fontSize: "1.4rem" }}
                >
                  {TOTAL_PAGES}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === TOTAL_PAGES}
            className="flex items-center justify-center h-11 px-5 border border-white/10 text-[hsla(0,0%,65%,1)] font-bold uppercase tracking-[2px] bg-transparent cursor-pointer transition-all duration-[250ms] hover:bg-[hsl(38,61%,73%)] hover:border-[hsl(38,61%,73%)] hover:text-[hsla(40,12%,5%,1)] disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ fontSize: "1.4rem" }}
          >
            Next →
          </button>
        </div>
      </section>
    </>
  );
}
