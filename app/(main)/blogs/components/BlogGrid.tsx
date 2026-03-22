"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

const CATEGORIES = [
  "All Posts",
  "Fragrance Trends",
  "Guides & Tips",
  "Behind the Scenes",
  "Events",
];

const POSTS_PER_PAGE = 6;

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(1);

  const posts = useQuery(api.posts.getPosts);

  const filtered =
    activeCategory === "All Posts"
      ? (posts ?? [])
      : (posts ?? []).filter((p) => p.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));

  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visiblePages = (): number[] => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage >= totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const filterBtn = (cat: string, extra = "") =>
    `blog-filter-btn ${activeCategory === cat ? "active" : ""} ${extra}`.trim();

  const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div id="blog-grid">
      {/* ── Category filter ── */}
      <section className="fade-up delay-2 px-5 py-5 bg-[var(--bg-dark)] border-y border-[var(--white-10)] max-w-[1400px] mx-auto">
        <div className="mx-auto py-3">
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
      <section className="fade-up delay-3 py-20 px-5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Loading state */}
          {posts === undefined &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="blog-card animate-pulse">
                <div className="blog-card-banner bg-white/5" />
                <div className="px-8 pt-7 pb-8 space-y-3">
                  <div className="h-3 w-1/3 bg-white/10 rounded" />
                  <div className="h-5 w-full bg-white/10 rounded" />
                  <div className="h-5 w-2/3 bg-white/10 rounded" />
                </div>
              </div>
            ))}

          {/* Empty state */}
          {posts !== undefined && filtered.length === 0 && (
            <div className="col-span-full text-center py-20 text-[var(--text-muted)] text-[1.6rem] [font-family:var(--font-display)]">
              No posts found in this category.
            </div>
          )}

          {/* Posts */}
          {paginated.map((post) => (
            <article key={post._id} className="blog-card group">
              {/* Banner */}
              <div className="blog-card-banner relative">
                {post.coverImageUrl ? (
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                ) : (
                  <span className="text-white/10 text-lg font-bold uppercase tracking-[0.15em] [font-family:var(--font-display)]">
                    Blog Post
                  </span>
                )}
                <span className="absolute bottom-4 left-4 blog-badge">
                  {formatDate(post.createdAt)}
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

                {post.excerpt && (
                  <p className="text-[var(--text-muted)] mb-6 text-[1.5rem] leading-[1.7] line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                <div className="blog-card-rule" />

                <Link href={`/blogs/${post._id}`} className="blog-read-link">
                  <span>Read Article</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
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

            {visiblePages()[visiblePages().length - 1] < totalPages && (
              <>
                {visiblePages()[visiblePages().length - 1] < totalPages - 1 && (
                  <span className="text-[var(--text-muted)] text-[1.4rem]">
                    …
                  </span>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="pagination-btn"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn pagination-btn-nav"
          >
            Next →
          </button>
        </div>
      </section>
    </div>
  );
}
