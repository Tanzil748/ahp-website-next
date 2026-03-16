"use client";

import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import BackToTop from "@/components/BackToTop";
import Link from "next/link";

const PAGE_SIZE = 12;
const DISPLAY_BRANDS = [
  "Fragrance World",
  "French Avenue",
  "Lattafa",
  "Maison",
];

const normalizeGender = (g: string | undefined) => {
  if (!g) return "";
  const t = g.trim();
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
};

const normalizeBrand = (brand: string): string => {
  const b = brand.toLowerCase().trim();
  if (b.includes("lattafa") || b.includes("maison alhambra")) return "Lattafa";
  if (b.includes("french avenue")) return "French Avenue";
  if (b.includes("fragrance world")) return "Fragrance World";
  if (b.includes("maison")) return "Maison";
  return brand;
};

// ── Collapsible sidebar section ───────────────────────────────────────────────
function SidebarSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-white/10 pb-6 mb-6 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between mb-3 group"
      >
        <span className="flex items-center gap-2 text-[hsl(38,61%,73%)] font-bold uppercase tracking-[3px] text-[1.1rem]">
          {icon}
          {title}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`text-white/30 group-hover:text-[hsl(38,61%,73%)] transition-all duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>
      {open && <div className="flex flex-col gap-0.5">{children}</div>}
    </div>
  );
}

// ── Filter checkbox row ───────────────────────────────────────────────────────
function FilterOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 px-2 py-2 cursor-pointer rounded transition-colors duration-150 hover:bg-[hsl(38,61%,73%)]/10 group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 shrink-0 accent-[hsl(38,61%,73%)] cursor-pointer"
      />
      <span
        className={`text-[1.4rem] font-bold uppercase tracking-[1.5px] transition-colors duration-150 ${
          checked
            ? "text-[hsl(38,61%,73%)]"
            : "text-white/60 group-hover:text-[hsl(38,61%,73%)]"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

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

  const parseNotes = (p: (typeof allProducts)[0]) =>
    [
      ...new Set(
        [p.topNotes, p.middleNotes, p.baseNotes]
          .join(",")
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean),
      ),
    ].slice(0, 4);

  const FilterPanel = () => (
    <aside
      className="border border-white/10 p-6 h-fit"
      style={{ backgroundColor: "hsla(0,0%,6%,1)" }}
    >
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-5 h-px bg-[hsl(38,61%,73%)]" />
          <h3
            className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[4px] text-[1.2rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Filter Perfumes
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetAll}
            className="text-white/30 hover:text-[hsl(38,61%,73%)] text-[1.1rem] font-bold uppercase tracking-[2px] transition-colors duration-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* View All */}
      <SidebarSection
        title="All Perfumes"
        icon={
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
        }
      >
        <FilterOption label="View All" checked={viewAll} onChange={resetAll} />
      </SidebarSection>

      {/* Gender */}
      <SidebarSection
        title="Gender"
        icon={
          <svg width="16" height="16" fill="none" viewBox="0 0 512 512">
            <path
              d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M147 280c-21.36 0-42.78 5.9-60.32 17.66C67.82 310.5 56 330.23 56 352v8h139"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        {genders.map((g) => (
          <FilterOption
            key={g}
            label={g}
            checked={selectedGenders.includes(g)}
            onChange={() => toggleGender(g)}
          />
        ))}
      </SidebarSection>

      {/* Brand */}
      <SidebarSection
        title="Brand"
        icon={
          <svg width="16" height="16" fill="none" viewBox="0 0 512 512">
            <path
              d="M243.42 72.59L48 268l196 196 196-196-81.9-191.52A32 32 0 00328.74 56H272a32 32 0 00-28.58 16.59z"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="352"
              cy="160"
              r="32"
              stroke="currentColor"
              strokeWidth="32"
            />
          </svg>
        }
      >
        {DISPLAY_BRANDS.map((b) => (
          <FilterOption
            key={b}
            label={b}
            checked={selectedBrands.includes(b)}
            onChange={() => toggleBrand(b)}
          />
        ))}
      </SidebarSection>

      {/* Availability */}
      <SidebarSection
        title="Availability"
        icon={
          <svg width="16" height="16" fill="none" viewBox="0 0 512 512">
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              stroke="currentColor"
              strokeWidth="32"
            />
            <path
              d="M352 176L217.6 336 160 272"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        <FilterOption
          label="Available"
          checked={showAvailable}
          onChange={() => {
            setShowAvailable((p) => !p);
            setViewAll(false);
            setCurrentPage(1);
          }}
        />
        <FilterOption
          label="Unavailable"
          checked={showUnavailable}
          onChange={() => {
            setShowUnavailable((p) => !p);
            setViewAll(false);
            setCurrentPage(1);
          }}
        />
      </SidebarSection>
    </aside>
  );

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
            <FilterPanel />
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
              <FilterPanel />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Search bar */}
            <div className="flex items-center gap-3 bg-[hsla(210,4%,11%,1)] border border-white/10 px-5 py-4 focus-within:border-[hsl(38,61%,73%)] transition-colors duration-300">
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 512 512"
                className="text-[hsl(38,61%,73%)] shrink-0"
              >
                <path
                  d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                  stroke="currentColor"
                  strokeWidth="32"
                />
                <path
                  d="M338.29 338.29L448 448"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name, brand, or SKU..."
                className="bg-transparent border-none outline-none text-white text-[1.5rem] w-full placeholder:text-white/30"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              />
              {search && (
                <button
                  onClick={() => handleSearch("")}
                  className="text-white/30 hover:text-[hsl(38,61%,73%)] transition-colors duration-200 shrink-0"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 1l10 10M11 1L1 11" />
                  </svg>
                </button>
              )}
            </div>

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

            {/* Loading skeleton */}
            {products === undefined && (
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
            )}

            {/* Empty state */}
            {products !== undefined && filtered.length === 0 && (
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
                  onClick={() => {
                    resetAll();
                    handleSearch("");
                  }}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
                  <span className="relative z-10">Clear filters →</span>
                </button>
              </div>
            )}

            {/* Grid */}
            {products !== undefined && paginated.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginated.map((product) => {
                  const isSaved = savedItems.includes(product._id);
                  const notes = parseNotes(product);
                  const isAvailable = product.stockOnHand > 0;

                  return (
                    <div
                      key={product._id}
                      className="group relative flex flex-col border border-white/10 hover:border-[hsl(38,61%,73%)] hover:-translate-y-1 transition-all duration-300"
                      style={{ backgroundColor: "hsla(0,0%,11%,1)" }}
                    >
                      {/* Image area */}
                      <div
                        className="relative w-full aspect-[4/3] overflow-hidden border-b border-white/5"
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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

                        {isAvailable && product.stockOnHand <= 5 && (
                          <span className="absolute top-3 right-3 px-2 py-1 text-[0.9rem] font-black uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/40">
                            Low Stock
                          </span>
                        )}
                      </div>

                      {/* Card body */}
                      <div className="p-6 flex flex-col gap-4 flex-1">
                        <div className="w-8 h-px bg-[hsl(38,61%,73%)] group-hover:w-16 transition-all duration-500" />

                        <div className="flex-1 flex flex-col gap-2">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="text-[hsl(38,61%,73%)]/60 text-[1rem] font-bold uppercase tracking-[3px]">
                                {normalizeBrand(product.brand)}
                              </p>
                              <span className="text-white/25 text-[0.95rem] font-bold uppercase tracking-[2px]">
                                {normalizeGender(product.gender)}
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

                          {isSignedIn ? (
                            <button
                              onClick={() =>
                                toggleSave(product._id, product.itemName)
                              }
                              className={[
                                "w-full flex items-center justify-center gap-2 py-2.5 border font-bold uppercase tracking-[2px] text-[1.1rem] transition-all duration-300",
                                isSaved
                                  ? "bg-[hsl(38,61%,73%)] border-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)] hover:bg-transparent hover:text-[hsl(38,61%,73%)]"
                                  : "bg-transparent border-white/15 text-white/40 hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)]",
                              ].join(" ")}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill={isSaved ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                              {isSaved ? "Saved" : "Save"}
                            </button>
                          ) : (
                            <Link
                              href="/sign-in"
                              className="w-full flex items-center justify-center gap-2 py-2.5 border border-white/10 text-white/25 font-bold uppercase tracking-[2px] text-[1.1rem] hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)] transition-all duration-300"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                              Sign in to save
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <>
                <nav
                  className="flex items-center justify-center gap-1.5 pt-6 flex-wrap"
                  aria-label="Product pages"
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
                        key={`ellipsis-${i}`}
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

                <p className="text-center text-[1.2rem] text-white/30 pb-4">
                  Showing {pageStart + 1}–
                  {Math.min(pageStart + PAGE_SIZE, filtered.length)} of{" "}
                  {filtered.length} products
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <BackToTop />
    </main>
  );
}
