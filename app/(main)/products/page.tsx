"use client";

import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import ProductFilters from "./components/ProductFilters";
import ProductGrid from "./components/ProductGrid";
import ProductSearch from "./components/ProductSearch";
import { PAGE_SIZE, normalizeGender, normalizeBrand } from "./utils";

export default function ProductsPage() {
  const { isSignedIn, user } = useUser();
  const products = useQuery(api.products.getProducts);

  const [search, setSearch] = useState("");
  const [viewAll, setViewAll] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [notification, setNotification] = useState<{
    id: string;
    msg: string;
  } | null>(null);

  const allProducts = useMemo(() => products ?? [], [products]);

  const genders = useMemo(
    () =>
      [
        ...new Set(
          allProducts.map((p) => normalizeGender(p.gender)).filter(Boolean),
        ),
      ].sort(),
    [allProducts],
  );

  useEffect(() => {
    if (isSignedIn && user) {
      const saved = localStorage.getItem(`savedProducts_${user.id}`);
      if (saved) setSavedItems(JSON.parse(saved));
    }
  }, [isSignedIn, user]);

  const toggleSave = (id: string, name: string) => {
    if (!isSignedIn) return;
    const isAdded = savedItems.includes(id);
    const next = isAdded
      ? savedItems.filter((f) => f !== id)
      : [...savedItems, id];
    setSavedItems(next);
    if (isSignedIn && user)
      localStorage.setItem(`savedProducts_${user.id}`, JSON.stringify(next));
    setNotification({
      id,
      msg: isAdded ? `Removed "${name}"` : `Added "${name}"`,
    });
    setTimeout(() => setNotification(null), 2500);
  };

  const toggleBrand = (b: string) => {
    setViewAll(false);
    setCurrentPage(1);
    setSelectedBrands((p) =>
      p.includes(b) ? p.filter((x) => x !== b) : [...p, b],
    );
  };

  const toggleGender = (g: string) => {
    setViewAll(false);
    setCurrentPage(1);
    setSelectedGenders((p) =>
      p.includes(g) ? p.filter((x) => x !== g) : [...p, g],
    );
  };

  const resetAll = () => {
    setViewAll(true);
    setSelectedBrands([]);
    setSelectedGenders([]);
    setShowAvailable(false);
    setShowUnavailable(false);
    setCurrentPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    !viewAll ||
    selectedBrands.length > 0 ||
    selectedGenders.length > 0 ||
    showAvailable ||
    showUnavailable;

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const q = search.toLowerCase();
      if (
        q &&
        !p.itemName.toLowerCase().includes(q) &&
        !p.brand.toLowerCase().includes(q) &&
        !p.sku.toLowerCase().includes(q)
      )
        return false;
      if (viewAll) return true;
      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(normalizeBrand(p.brand))
      )
        return false;
      if (
        selectedGenders.length > 0 &&
        !selectedGenders.includes(normalizeGender(p.gender))
      )
        return false;
      const filteringAvail = showAvailable || showUnavailable;
      if (filteringAvail) {
        const isAvailable = p.stockOnHand > 0;
        if (showAvailable && !showUnavailable && !isAvailable) return false;
        if (showUnavailable && !showAvailable && isAvailable) return false;
      }
      return true;
    });
  }, [
    allProducts,
    search,
    viewAll,
    selectedBrands,
    selectedGenders,
    showAvailable,
    showUnavailable,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [];
    const addRange = (from: number, to: number) => {
      for (let i = from; i <= to; i++) pages.push(i);
    };
    pages.push(1);
    if (safePage > 4) pages.push("…");
    addRange(Math.max(2, safePage - 2), Math.min(totalPages - 1, safePage + 2));
    if (safePage < totalPages - 3) pages.push("…");
    pages.push(totalPages);
    return pages;
  }, [totalPages, safePage]);

  const filterProps = {
    viewAll,
    selectedBrands,
    selectedGenders,
    showAvailable,
    showUnavailable,
    hasActiveFilters,
    genders,
    onToggleBrand: toggleBrand,
    onToggleGender: toggleGender,
    onToggleAvailable: () => {
      setShowAvailable((p) => !p);
      setViewAll(false);
      setCurrentPage(1);
    },
    onToggleUnavailable: () => {
      setShowUnavailable((p) => !p);
      setViewAll(false);
      setCurrentPage(1);
    },
    onResetAll: resetAll,
  };

  return (
    <main
      className="min-h-screen pt-[120px] pb-20"
      style={{ backgroundColor: "hsla(210,4%,9%,1)" }}
    >
      {/* ── Toast ── */}
      <div
        className={[
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]",
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

      {/* ── Mobile drawer ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[100] lg:hidden"
          onClick={() => setDrawerOpen(false)}
          style={{
            background: "hsla(0,0%,0%,0.75)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="absolute left-0 top-0 h-full w-[300px] overflow-y-auto p-6 border-r border-white/10"
            style={{ backgroundColor: "hsla(210,4%,9%,1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute top-4 right-4 text-[hsl(38,61%,73%)] hover:text-white transition-colors duration-200"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 512 512">
                <path
                  d="M368 368L144 144M368 144L144 368"
                  stroke="currentColor"
                  strokeWidth="48"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <ProductFilters {...filterProps} />
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* ── Page Header ── */}
        <div className="mb-14 mt-[50px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[hsl(38,61%,73%)]" />
            <span className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[4px] text-[1.1rem]">
              Collection
            </span>
          </div>
          <svg viewBox="0 0 100 12" width="80" height="10" className="mb-5">
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1
                className="text-[4rem] sm:text-[5.5rem] font-normal text-white leading-none tracking-tight mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Fragrances
              </h1>
              <p className="text-white/50 text-[1.4rem] max-w-xl">
                Rare essences and timeless accords, curated from the finest
                Arabian perfumery traditions.
              </p>
            </div>

            {isSignedIn ? (
              <Link
                href="/fragrances"
                className="group relative inline-flex items-center gap-3 px-6 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)] whitespace-nowrap shrink-0"
              >
                <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="relative z-10">My Fragrances</span>
                {savedItems.length > 0 && (
                  <span className="relative z-10 w-6 h-6 flex items-center justify-center text-[1rem] font-black border border-[hsl(38,61%,73%)] group-hover:border-[hsl(40,12%,5%)]">
                    {savedItems.length}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="flex items-center gap-2 text-white/40 hover:text-[hsl(38,61%,73%)] transition-colors duration-200 text-[1.2rem] font-bold uppercase tracking-widest shrink-0"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Sign in to save
              </Link>
            )}
          </div>
        </div>

        {/* ── Mobile filter button ── */}
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] hover:bg-[hsl(38,61%,73%)]/10 transition-all duration-200"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 512 512">
              <rect
                x="48"
                y="48"
                width="176"
                height="176"
                rx="20"
                stroke="currentColor"
                strokeWidth="32"
              />
              <rect
                x="288"
                y="48"
                width="176"
                height="176"
                rx="20"
                stroke="currentColor"
                strokeWidth="32"
              />
              <rect
                x="48"
                y="288"
                width="176"
                height="176"
                rx="20"
                stroke="currentColor"
                strokeWidth="32"
              />
              <rect
                x="288"
                y="288"
                width="176"
                height="176"
                rx="20"
                stroke="currentColor"
                strokeWidth="32"
              />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-[hsl(38,61%,73%)] rotate-45" />
            )}
          </button>
          <p className="text-white/30 text-[1.1rem] font-bold uppercase tracking-widest">
            {products === undefined ? "Loading…" : `${filtered.length} results`}
          </p>
        </div>

        {/* ── Main layout ── */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-32">
              <ProductFilters {...filterProps} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <ProductSearch search={search} onSearch={handleSearch} />

            {/* Results bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <p className="text-white/30 text-[1.2rem] font-bold uppercase tracking-widest">
                {products === undefined
                  ? "Loading…"
                  : `${filtered.length} ${filtered.length === 1 ? "product" : "products"} found`}
              </p>
              {totalPages > 1 && (
                <p className="text-white/30 text-[1.1rem]">
                  Page {safePage} of {totalPages}
                </p>
              )}
            </div>

            <ProductGrid
              loading={products === undefined}
              products={allProducts}
              paginated={paginated}
              filteredCount={filtered.length}
              savedItems={savedItems}
              isSignedIn={!!isSignedIn}
              currentPage={currentPage}
              totalPages={totalPages}
              safePage={safePage}
              pageStart={pageStart}
              pageNumbers={pageNumbers}
              onToggleSave={toggleSave}
              onGoToPage={goToPage}
              onClearFilters={() => {
                resetAll();
                handleSearch("");
              }}
            />
          </div>
        </div>
      </div>
      <BackToTop />
    </main>
  );
}
