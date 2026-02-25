"use client";

import { useState } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

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

const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Compare List", href: "/compare-list" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

const FOOTER_COLS = [
  {
    heading: "Al Hussein Perfumes Corporate",
    links: ["About Us", "Events", "Blog", "Careers"],
  },
  {
    heading: "Account",
    links: ["My Account", "My Profile", "My Compare List"],
  },
  {
    heading: "For Business",
    links: ["Subscription Agreement", "Request Fragrance", "Personal Request"],
  },
  {
    heading: "Customer Care",
    links: [
      "Ways To Shop",
      "Terms and Conditions",
      "Privacy and Cookies Policy",
      "Return and Refund Policy",
      "Shipping Policy",
      "Contact Us",
    ],
  },
];

const SOCIAL_LINKS = [
  "Facebook",
  "Instagram",
  "TikTok",
  "YouTube",
  "LinkedIn",
  "Pinterest",
];

const TOTAL_PAGES = 10;

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filtered =
    activeCategory === "All Posts"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Visible page numbers logic
  const visiblePages = () => {
    if (currentPage <= 3) return [1, 2, 3];
    if (currentPage >= TOTAL_PAGES - 2)
      return [TOTAL_PAGES - 2, TOTAL_PAGES - 1, TOTAL_PAGES];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <div className="bg-[#0c0c0c] text-white min-h-screen font-sans">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Forum&display=swap');
        .font-forum { font-family: 'Forum', cursive; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c]">
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,12,12,0.5)_100%)]" />

        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
          <p className="text-[#d4af5f] text-[12px] font-bold uppercase tracking-[0.4em] mb-4">
            Insights &amp; Stories
          </p>
          <h1 className="font-forum text-6xl md:text-7xl font-normal text-white mb-5">
            Our Blog
          </h1>
          <p className="text-[#a8a8a8] text-base leading-relaxed max-w-xl mx-auto">
            Discover the art of perfumery, fragrance trends, and
            behind-the-scenes stories
          </p>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      <section className="py-20 px-5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 hover:border-[#d4af5f] transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
          {/* Image placeholder */}
          <div className="relative bg-[#1a1a1a] min-h-[350px] flex items-center justify-center overflow-hidden">
            <span className="absolute top-5 left-5 z-10 bg-[#d4af5f] text-black text-[11px] font-bold uppercase tracking-wider px-4 py-2">
              Featured
            </span>
            <span className="text-white/10 text-3xl font-bold uppercase tracking-widest">
              Featured Post
            </span>
          </div>

          {/* Content */}
          <div className="bg-[#161718] p-10 md:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5 text-[13px]">
              <span className="text-[#d4af5f] font-bold uppercase tracking-wide">
                Fragrance Trends
              </span>
              <span className="text-[#a8a8a8]">•</span>
              <time className="text-[#a8a8a8]">February 5, 2026</time>
            </div>
            <h2 className="font-forum text-3xl md:text-4xl text-white leading-snug mb-5">
              The Evolution of Luxury Fragrances: What's Trending in 2026
            </h2>
            <p className="text-[#a8a8a8] leading-relaxed mb-8">
              Explore the latest trends shaping the luxury perfume industry,
              from sustainable ingredients to personalized scent experiences.
              Discover how modern perfumery is blending tradition with
              innovation.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-[#d4af5f] font-bold text-[13px] uppercase tracking-wider hover:gap-5 transition-all duration-300"
            >
              <span>Read More</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ── */}
      <section className="py-8 px-5 bg-[#111] border-y border-white/10">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-6 py-3 text-[13px] font-bold uppercase tracking-wider border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#d4af5f] border-[#d4af5f] text-black"
                  : "bg-transparent border-white/10 text-[#a8a8a8] hover:bg-[#d4af5f] hover:border-[#d4af5f] hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section className="py-20 px-5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {filtered.length > 0 ? (
            filtered.map((post) => (
              <article
                key={post.id}
                className="bg-[#161718] border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#d4af5f] hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] group"
              >
                {/* Banner */}
                <div className="relative bg-[#1a1a1a] h-[240px] flex items-center justify-center overflow-hidden">
                  <span className="text-white/10 text-2xl font-bold">
                    Blog Post
                  </span>
                  <span className="absolute bottom-5 left-5 bg-[#d4af5f] text-black text-[12px] font-bold px-4 py-2">
                    {post.date}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8">
                  <span className="text-[#d4af5f] font-bold uppercase tracking-wider text-[12px] mb-3 inline-block">
                    {post.category}
                  </span>
                  <h3 className="font-forum text-[22px] text-white leading-snug mb-4 group-hover:text-[#d4af5f] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-[#a8a8a8] text-[15px] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-[#d4af5f] font-bold text-[13px] uppercase tracking-wider hover:gap-4 transition-all duration-300"
                  >
                    <span>Read Article</span>
                    <span>→</span>
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-[#a8a8a8]">
              No posts found in this category.
            </div>
          )}
        </div>
      </section>

      {/* ── PAGINATION ── */}
      <section className="pb-20 px-5">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Prev */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-4 px-5 py-4 border border-white/10 text-[#a8a8a8] text-[13px] font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#d4af5f] hover:border-[#d4af5f] hover:text-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#a8a8a8] disabled:hover:border-white/10"
          >
            ← Previous
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-4">
            {visiblePages()[0] > 1 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="w-17 h-17 flex items-center justify-center border border-white/10 text-[#a8a8a8] text-[14px] font-bold hover:bg-[#d4af5f] hover:border-[#d4af5f] hover:text-black transition-all duration-300"
                >
                  1
                </button>
                {visiblePages()[0] > 2 && (
                  <span className="text-[#a8a8a8] px-1">…</span>
                )}
              </>
            )}

            {visiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-17 h-17 flex items-center justify-center border text-[14px] font-bold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-[#d4af5f] border-[#d4af5f] text-black"
                    : "border-white/10 text-[#a8a8a8] hover:bg-[#d4af5f] hover:border-[#d4af5f] hover:text-black"
                }`}
              >
                {page}
              </button>
            ))}

            {visiblePages()[2] < TOTAL_PAGES && (
              <>
                {visiblePages()[2] < TOTAL_PAGES - 1 && (
                  <span className="text-[#a8a8a8] px-1">…</span>
                )}
                <button
                  onClick={() => handlePageChange(TOTAL_PAGES)}
                  className="w-17 h-17 flex items-center justify-center border border-white/10 text-[#a8a8a8] text-[14px] font-bold hover:bg-[#d4af5f] hover:border-[#d4af5f] hover:text-black transition-all duration-300"
                >
                  {TOTAL_PAGES}
                </button>
              </>
            )}
          </div>

          {/* Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === TOTAL_PAGES}
            className="flex items-center gap-4 px-5 py-4 border border-white/10 text-[#a8a8a8] text-[13px] font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#d4af5f] hover:border-[#d4af5f] hover:text-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#a8a8a8] disabled:hover:border-white/10"
          >
            Next →
          </button>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20 px-5 bg-gradient-to-br from-[#111] to-[#161718] border-t border-[#d4af5f]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#d4af5f] text-[12px] font-bold uppercase tracking-[0.4em] mb-4">
            Newsletter
          </p>
          <h2 className="font-forum text-4xl md:text-5xl text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-[#a8a8a8] leading-relaxed mb-10">
            Subscribe to our newsletter for the latest fragrance insights,
            exclusive offers, and event updates.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Subscribed: ${email}`);
              setEmail("");
            }}
            className="flex flex-col sm:flex-row max-w-xl mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 h-[52px] px-5 bg-[#0c0c0c] border border-[rgba(255,215,0,0.35)] sm:border-r-0 text-white placeholder-[#aaa] text-[15px] outline-none focus:border-[#d4af5f] transition-colors mb-2 sm:mb-0"
            />
            <button
              type="submit"
              className="h-[52px] px-8 bg-[#d4af5f] border border-[#d4af5f] text-black font-bold text-[13px] uppercase tracking-wider hover:bg-[#0c0c0c] hover:text-[#d4af5f] transition-all duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ── BACK TO TOP ── */}
      <a
        href="#top"
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#d4af5f] text-black flex items-center justify-center hover:bg-white transition-colors duration-300 z-50"
        aria-label="Back to top"
      >
        ↑
      </a>
    </div>
  );
}
