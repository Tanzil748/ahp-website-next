"use client";

import ProductCard from "./ProductCard";
import { PAGE_SIZE, type Product } from "../utils";

type Props = {
  loading: boolean;
  products: Product[];
  paginated: Product[];
  filteredCount: number;
  savedItems: string[];
  isSignedIn: boolean;
  currentPage: number;
  totalPages: number;
  safePage: number;
  pageStart: number;
  pageNumbers: (number | "…")[];
  onToggleSave: (id: string, name: string) => void;
  onGoToPage: (page: number) => void;
  onClearFilters: () => void;
};

export default function ProductGrid({
  loading,
  paginated,
  filteredCount,
  savedItems,
  isSignedIn,
  totalPages,
  safePage,
  pageStart,
  pageNumbers,
  onToggleSave,
  onGoToPage,
  onClearFilters,
}: Props) {
  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border border-white/10 animate-pulse"
            style={{ backgroundColor: "hsla(0,0%,11%,1)" }}
          >
            <div className="w-full aspect-[4/3] bg-white/5" />
            <div className="p-6 space-y-3">
              <div className="h-3 w-1/3 bg-white/10 rounded" />
              <div className="h-5 w-3/4 bg-white/10 rounded" />
              <div className="h-3 w-1/2 bg-white/10 rounded" />
              <div className="h-10 w-full bg-white/5 rounded mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (filteredCount === 0) {
    return (
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
          No products found
        </p>
        <p className="text-white/20 text-[1.4rem]">
          Try adjusting your search or filters
        </p>
        <button
          onClick={onClearFilters}
          className="group relative inline-flex items-center gap-2 px-6 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
          <span className="relative z-10">Clear filters →</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {paginated.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isSaved={savedItems.includes(product._id)}
            isSignedIn={isSignedIn}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <>
          <nav
            className="flex items-center justify-center gap-1.5 pt-6 flex-wrap"
            aria-label="Product pages"
          >
            <button
              onClick={() => onGoToPage(safePage - 1)}
              disabled={safePage === 1}
              className={[
                "w-10 h-10 flex items-center justify-center border font-bold transition-all duration-200",
                safePage === 1
                  ? "border-white/10 text-white/20 cursor-not-allowed"
                  : "border-white/20 text-white hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)]",
              ].join(" ")}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 512 512">
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
                  key={`ellipsis-${i}`}
                  className="w-10 h-10 flex items-center justify-center text-white/20 font-bold text-[1.3rem]"
                >
                  …
                </span>
              ) : (
                <button
                  key={n}
                  onClick={() => onGoToPage(n as number)}
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
              onClick={() => onGoToPage(safePage + 1)}
              disabled={safePage === totalPages}
              className={[
                "w-10 h-10 flex items-center justify-center border font-bold transition-all duration-200",
                safePage === totalPages
                  ? "border-white/10 text-white/20 cursor-not-allowed"
                  : "border-white/20 text-white hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)]",
              ].join(" ")}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 512 512">
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

          <p className="text-center text-[1.2rem] text-white/30 pb-4">
            Showing {pageStart + 1}–
            {Math.min(pageStart + PAGE_SIZE, filteredCount)} of {filteredCount}{" "}
            products
          </p>
        </>
      )}
    </>
  );
}
