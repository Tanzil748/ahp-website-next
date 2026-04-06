"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";

const PAGE_SIZE = 12;

export default function FragrancesPage() {
  const products = useQuery(api.products.getProducts);
  const savedIds = useQuery(api.users.getSavedPerfumeIds) ?? [];
  const toggleSaved = useMutation(api.users.toggleSavedPerfume);
  const [notification, setNotification] = useState<{ msg: string } | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleRemove = async (id: string, name: string) => {
    try {
      await toggleSaved({ productId: id as Id<"products"> });
      setNotification({ msg: `Removed "${name}"` });
      setTimeout(() => setNotification(null), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const savedProducts = useMemo(
    () =>
      (products ?? []).filter((p) =>
        savedIds.includes(p._id as Id<"products">),
      ),
    [products, savedIds],
  );

  const totalPages = Math.max(1, Math.ceil(savedProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const paginated = savedProducts.slice(pageStart, pageStart + PAGE_SIZE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [];
    pages.push(1);
    if (safePage > 4) pages.push("…");
    for (
      let i = Math.max(2, safePage - 2);
      i <= Math.min(totalPages - 1, safePage + 2);
      i++
    )
      pages.push(i);
    if (safePage < totalPages - 3) pages.push("…");
    pages.push(totalPages);
    return pages;
  }, [totalPages, safePage]);

  const parseNotes = (p: (typeof savedProducts)[0]) =>
    [p.topNotes, p.middleNotes, p.baseNotes]
      .join(",")
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean)
      .slice(0, 4);

  return (
    <main
      className="min-h-screen pt-30 pb-20"
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        backgroundImage: "url('/images/potential-pink-bg.png')",
        backgroundSize: "600px 600px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* ── Toast ── */}
      <div
        className={[
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-200",
          "px-6 py-3 border border-[hsl(38,61%,73%)]/40",
          "bg-[hsla(0,0%,8%,0.97)] backdrop-blur-md",
          "text-[hsl(38,61%,73%)] font-bold text-[1.2rem] uppercase tracking-widest",
          "transition-all duration-500 whitespace-nowrap",
          notification
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none",
        ].join(" ")}
      >
        {notification?.msg}
      </div>

      <div className="max-w-[1400] mx-auto px-5 sm:px-8">
        {/* ── Header ── */}
        <div className="mb-14 mt-[50]">
          <div className="flex items-center gap-3 mb-4">
            <span className="gold-diamond" />
            <span className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[4px] text-[1.1rem]">
              My Collection
            </span>
            <span className="gold-diamond" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1
                className="text-[4rem] sm:text-[5.5rem] font-normal text-white leading-none tracking-tight mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Saved Fragrances
              </h1>
              <p className="text-white/50 text-[1.4rem] max-w-xl">
                {savedProducts.length > 0
                  ? `Your personal collection of ${savedProducts.length} saved ${savedProducts.length === 1 ? "fragrance" : "fragrances"}.`
                  : "You haven't saved any fragrances yet."}
              </p>
            </div>

            <Link
              href="/products"
              className="group relative inline-flex items-center gap-3 px-6 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)] whitespace-nowrap shrink-0"
            >
              <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
              <span className="relative z-10">← Browse All</span>
            </Link>
          </div>
        </div>

        {/* Loading */}
        {(products === undefined || savedIds === undefined) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border border-white/10 animate-pulse"
                style={{ backgroundColor: "hsla(0,0%,11%,1)" }}
              >
                <div className="w-full aspect-4/3 bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-1/3 bg-white/10 rounded" />
                  <div className="h-5 w-3/4 bg-white/10 rounded" />
                  <div className="h-10 w-full bg-white/5 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {products !== undefined && savedProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <svg viewBox="0 0 100 12" width="80" height="10">
              <line
                x1="0"
                y1="6"
                x2="38"
                y2="6"
                stroke="hsl(38,61%,73%)"
                strokeWidth="1"
                opacity="0.3"
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
                opacity="0.3"
              />
              <line
                x1="58"
                y1="6"
                x2="100"
                y2="6"
                stroke="hsl(38,61%,73%)"
                strokeWidth="1"
                opacity="0.3"
              />
            </svg>
            <p
              className="text-white/30 text-[2rem] font-normal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              No fragrances saved yet
            </p>
            <p className="text-white/20 text-[1.4rem]">
              Browse the collection and save your favourites.
            </p>
            <Link
              href="/products"
              className="group relative inline-flex items-center gap-2 px-6 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
              <span className="relative z-10">Browse Collection →</span>
            </Link>
          </div>
        )}

        {/* Grid */}
        {products !== undefined && savedProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginated.map((product) => {
                const notes = parseNotes(product);
                const isAvailable = product.stockOnHand > 0;

                return (
                  <div
                    key={product._id}
                    className="group relative flex flex-col border border-white/10 hover:border-[hsl(38,61%,73%)] hover:-translate-y-1 transition-all duration-300"
                    style={{ backgroundColor: "hsla(0,0%,11%,1)" }}
                  >
                    {/* Image */}
                    <div
                      className="relative w-full aspect-4/3 overflow-hidden border-b border-white/5"
                      style={{ backgroundColor: "hsla(0,0%,7%,1)" }}
                    >
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.itemName}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/10">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="1" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                          <span className="text-[1rem] font-bold uppercase tracking-[3px]">
                            No Image
                          </span>
                        </div>
                      )}
                      {product.imageUrl && (
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                      )}
                      <span
                        className={`absolute top-3 left-3 px-3 py-1 text-[1rem] font-bold uppercase tracking-[0.06em] backdrop-blur-sm ${
                          isAvailable
                            ? "bg-[hsl(38,61%,73%)]/18 text-[hsl(38,61%,73%)] border border-[hsl(38,61%,73%)]/40"
                            : "bg-white/10 text-white/50 border border-white/20"
                        }`}
                      >
                        {isAvailable ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col gap-4 flex-1">
                      <div className="w-8 h-px bg-[hsl(38,61%,73%)] group-hover:w-16 transition-all duration-500" />

                      <div className="flex-1 flex flex-col gap-2">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="text-[hsl(38,61%,73%)]/60 text-[1rem] font-bold uppercase tracking-[3px]">
                              {product.brand}
                            </p>
                            <span className="text-white/25 text-[0.95rem] font-bold uppercase tracking-[2px]">
                              {product.gender}
                            </span>
                          </div>
                          <h2
                            className="text-white text-[1.9rem] font-normal leading-tight"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {product.itemName}
                          </h2>
                          <p className="text-white/20 text-[1rem] font-bold uppercase tracking-[2px] mt-0.5">
                            SKU: {product.sku}
                          </p>
                        </div>
                        <p className="text-white/45 text-[1.2rem] leading-relaxed line-clamp-2">
                          {product.salesDescription}
                        </p>
                      </div>

                      {notes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {notes.map((note) => (
                            <span
                              key={note}
                              className="px-2 py-1 border border-white/10 text-white/35 text-[0.95rem] uppercase tracking-wider font-bold"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rotate-45 shrink-0 ${isAvailable ? "bg-emerald-400" : "bg-red-400"}`}
                          />
                          <span
                            className={`text-[1rem] font-bold uppercase tracking-[2px] ${isAvailable ? "text-emerald-400" : "text-red-400"}`}
                          >
                            {isAvailable
                              ? `In Stock · ${product.stockOnHand} units`
                              : "Out of Stock"}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            handleRemove(product._id, product.itemName)
                          }
                          className="w-full flex items-center justify-center gap-2 py-2.5 border bg-[hsl(38,61%,73%)] border-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)] font-bold uppercase tracking-[2px] text-[1.1rem] transition-all duration-300 hover:bg-transparent hover:text-[hsl(38,61%,73%)]"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <nav
                  className="flex items-center justify-center gap-1.5 flex-wrap"
                  aria-label="Fragrance pages"
                >
                  <button
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    className={[
                      "w-10 h-10 flex items-center justify-center border font-bold transition-all duration-200",
                      safePage === 1
                        ? "border-white/10 text-white/20 cursor-not-allowed"
                        : "border-white/20 text-white hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)]",
                    ].join(" ")}
                  >
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M328 112L184 256l144 144"
                        stroke="currentColor"
                        strokeWidth="48"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {pageNumbers.map((n, i) =>
                    n === "…" ? (
                      <span
                        key={`e-${i}`}
                        className="w-10 h-10 flex items-center justify-center text-white/20 font-bold text-[1.3rem]"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={n}
                        onClick={() => goToPage(n as number)}
                        className={[
                          "w-10 h-10 flex items-center justify-center border font-bold text-[1.2rem] transition-all duration-200",
                          safePage === n
                            ? "bg-[hsl(38,61%,73%)] border-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)]"
                            : "border-white/20 text-white/50 hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)]",
                        ].join(" ")}
                      >
                        {n}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    className={[
                      "w-10 h-10 flex items-center justify-center border font-bold transition-all duration-200",
                      safePage === totalPages
                        ? "border-white/10 text-white/20 cursor-not-allowed"
                        : "border-white/20 text-white hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)]",
                    ].join(" ")}
                  >
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M184 112l144 144-144 144"
                        stroke="currentColor"
                        strokeWidth="48"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </nav>

                <p className="text-center text-[1.2rem] text-white/30 mt-4">
                  Showing {pageStart + 1}–
                  {Math.min(pageStart + PAGE_SIZE, savedProducts.length)} of{" "}
                  {savedProducts.length} fragrances
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <BackToTop />
    </main>
  );
}
