"use client";

import BackToTop from "@/components/BackToTop";
import { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  brand: string;
  gender: "Men" | "Women" | "Unisex";
  available: boolean;
  url?: string;
  image?: string;
}

// ─── Product data — swap with real fetch("/sample_products.json") ─────────────
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Liquid Brun",
    brand: "French Avenue",
    gender: "Unisex",
    available: true,
  },
  {
    id: "2",
    name: "Oud Noir",
    brand: "Lattafa",
    gender: "Men",
    available: true,
  },
  {
    id: "3",
    name: "Rose Élite",
    brand: "French Avenue",
    gender: "Women",
    available: true,
  },
  {
    id: "4",
    name: "Santal Royale",
    brand: "Maison",
    gender: "Unisex",
    available: true,
  },
  { id: "5", name: "Velvet Oud", brand: "FW", gender: "Men", available: false },
  {
    id: "6",
    name: "Ambre Nocturne",
    brand: "Maison",
    gender: "Women",
    available: true,
  },
  {
    id: "7",
    name: "Cedar Black",
    brand: "Lattafa",
    gender: "Men",
    available: true,
  },
  {
    id: "8",
    name: "Magnolia Blanche",
    brand: "French Avenue",
    gender: "Women",
    available: false,
  },
  {
    id: "9",
    name: "Aqua Intense",
    brand: "FW",
    gender: "Unisex",
    available: true,
  },
  {
    id: "10",
    name: "Safran Imperial",
    brand: "Maison",
    gender: "Men",
    available: true,
  },
  {
    id: "11",
    name: "Musk Tahara",
    brand: "Lattafa",
    gender: "Unisex",
    available: true,
  },
  {
    id: "12",
    name: "Iris Sublime",
    brand: "FW",
    gender: "Women",
    available: false,
  },
  {
    id: "13",
    name: "Bakhoor Al Oud",
    brand: "Lattafa",
    gender: "Men",
    available: true,
  },
  {
    id: "14",
    name: "Citrus Évasion",
    brand: "French Avenue",
    gender: "Unisex",
    available: true,
  },
  {
    id: "15",
    name: "Jasmin Poudré",
    brand: "Maison",
    gender: "Women",
    available: true,
  },
  {
    id: "16",
    name: "Tobacco & Leather",
    brand: "FW",
    gender: "Men",
    available: true,
  },
];

const BRANDS = ["FW", "French Avenue", "Maison", "Lattafa"];
const GENDERS = ["Men", "Women", "Unisex"];
const PAGE_SIZE = 12;

// ─── Placeholder SVG ──────────────────────────────────────────────────────────
const PLACEHOLDER =
  "data:image/svg+xml;base64," +
  btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" fill="none">
    <rect width="160" height="200" fill="#1a1a1a"/>
    <rect x="45" y="90" width="70" height="90" rx="14" fill="#2a2822" stroke="#d4af37" stroke-width="1.5"/>
    <rect x="62" y="60" width="36" height="34" rx="6"  fill="#2a2822" stroke="#d4af37" stroke-width="1.5"/>
    <rect x="58" y="44" width="44" height="20" rx="6"  fill="#d4af37"/>
    <rect x="55" y="115" width="50" height="1.5" fill="#d4af3740"/>
    <rect x="55" y="125" width="50" height="1.5" fill="#d4af3740"/>
    <rect x="97" y="95"  width="5"  height="70" rx="3" fill="#ffffff08"/>
  </svg>`);

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [viewAll, setViewAll] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // ── Toggle helpers ────────────────────────────────────────────────────────
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

  // ── Filter logic ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const q = search.toLowerCase();
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.brand.toLowerCase().includes(q)
      )
        return false;
      if (viewAll) return true;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand))
        return false;
      if (selectedGenders.length > 0 && !selectedGenders.includes(p.gender))
        return false;
      const filteringAvail = showAvailable || showUnavailable;
      if (filteringAvail) {
        if (showAvailable && !showUnavailable && !p.available) return false;
        if (showUnavailable && !showAvailable && p.available) return false;
      }
      return true;
    });
  }, [
    search,
    viewAll,
    selectedBrands,
    selectedGenders,
    showAvailable,
    showUnavailable,
  ]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 whenever search changes
  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  // Build page number array with ellipsis: e.g. [1, '…', 4, 5, 6, '…', 12]
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

  // ── Shared filter panel markup ────────────────────────────────────────────
  const FilterPanel = () => (
    <aside
      style={{
        background: "hsla(180,2%,8%,1)",
        border: "1px solid hsla(0,0%,100%,0.1)",
        borderRadius: "18px",
        padding: "22px 20px",
        height: "fit-content",
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      <h3
        style={{
          fontFamily: '"Forum", cursive',
          fontSize: "2rem",
          marginBottom: "22px",
          color: "hsl(38,61%,73%)",
        }}
      >
        FILTER PERFUMES
      </h3>

      {/* ── All Perfumes ── */}
      <div style={{ marginBottom: "26px" }}>
        <p className="filter-header">
          <svg width="18" height="18" fill="none" viewBox="0 0 512 512">
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
          All Perfumes
        </p>
        <label className="filter-option">
          <input
            type="checkbox"
            checked={viewAll}
            onChange={resetAll}
            style={{
              width: 16,
              height: 16,
              accentColor: "hsl(38,61%,73%)",
              flexShrink: 0,
            }}
          />
          View All
        </label>
      </div>

      {/* ── Gender ── */}
      <div style={{ marginBottom: "26px" }}>
        <p className="filter-header">
          <svg width="18" height="18" fill="none" viewBox="0 0 512 512">
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
          Gender
        </p>
        {GENDERS.map((g) => (
          <label key={g} className="filter-option">
            <input
              type="checkbox"
              checked={selectedGenders.includes(g)}
              onChange={() => toggleGender(g)}
              style={{
                width: 16,
                height: 16,
                accentColor: "hsl(38,61%,73%)",
                flexShrink: 0,
              }}
            />
            {g}
          </label>
        ))}
      </div>

      {/* ── Brand ── */}
      <div style={{ marginBottom: "26px" }}>
        <p className="filter-header">
          <svg width="18" height="18" fill="none" viewBox="0 0 512 512">
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
          Brand
        </p>
        {BRANDS.map((b) => (
          <label key={b} className="filter-option">
            <input
              type="checkbox"
              checked={selectedBrands.includes(b)}
              onChange={() => toggleBrand(b)}
              style={{
                width: 16,
                height: 16,
                accentColor: "hsl(38,61%,73%)",
                flexShrink: 0,
              }}
            />
            {b}
          </label>
        ))}
      </div>

      {/* ── Availability ── */}
      <div style={{ marginBottom: "26px" }}>
        <p className="filter-header">
          <svg width="18" height="18" fill="none" viewBox="0 0 512 512">
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
          Availability
        </p>
        <label className="filter-option">
          <input
            type="checkbox"
            checked={showAvailable}
            onChange={() => {
              setShowAvailable((p) => !p);
              setViewAll(false);
              setCurrentPage(1);
            }}
            style={{
              width: 16,
              height: 16,
              accentColor: "hsl(38,61%,73%)",
              flexShrink: 0,
            }}
          />
          Available
        </label>
        <label className="filter-option">
          <input
            type="checkbox"
            checked={showUnavailable}
            onChange={() => {
              setShowUnavailable((p) => !p);
              setViewAll(false);
              setCurrentPage(1);
            }}
            style={{
              width: 16,
              height: 16,
              accentColor: "hsl(38,61%,73%)",
              flexShrink: 0,
            }}
          />
          Unavailable
        </label>
      </div>
    </aside>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Forum&display=swap');

        html { font-size: 10px; }
        ::-webkit-scrollbar       { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: hsl(38,61%,73%); }

        /* ── layout ── */
        .perfume-search-page {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 30px;
          padding: 60px 30px;
        }
        @media (max-width: 900px) {
          .perfume-search-page { grid-template-columns: 1fr; }
          .desktop-sidebar { display: none; }
          .mobile-filter-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-filter-btn { display: none !important; }
        }

        /* ── filter panel ── */
        .filter-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 1.2rem;
          letter-spacing: 0.4em;
          color: hsl(38,61%,73%);
          margin-bottom: 12px;
          font-family: "DM Sans", sans-serif;
        }
        .filter-option {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.4rem;
          padding: 8px 6px;
          margin-bottom: 8px;
          cursor: pointer;
          border-radius: 8px;
          color: white;
          transition: background 0.15s ease;
          font-family: "DM Sans", sans-serif;
          user-select: none;
        }
        .filter-option:hover {
          background: rgba(212,175,55,0.12);
          color: hsl(38,61%,73%);
        }

        /* ── search ── */
        .search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: hsla(210,4%,11%,1);
          border: 1px solid hsla(0,0%,100%,0.1);
          padding: 14px 18px;
          border-radius: 14px;
        }
        .search-box input {
          background: none;
          border: none;
          outline: none;
          color: white;
          font-size: 1.5rem;
          font-family: "DM Sans", sans-serif;
          width: 100%;
        }
        .search-box input::placeholder { color: hsla(0,0%,65%,1); }

        /* ── grid ── */
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        /* ── card ── */
        .perfume-card {
          background: hsla(180,2%,8%,1);
          border: 1px solid hsla(0,0%,100%,0.1);
          border-radius: 18px;
          overflow: hidden;
          transition: border-color 0.2s ease, transform 0.2s ease;
          position: relative;
        }
        .perfume-card:hover {
          border-color: hsl(38,61%,73%);
          transform: translateY(-4px);
        }

        .card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.1;
          background: #111110;
          overflow: hidden;
        }
        .card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }
        .perfume-card:hover .card-img-wrap img {
          transform: scale(1.05);
        }

        .avail-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 1rem;
          font-weight: 700;
          font-family: "DM Sans", sans-serif;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .avail-badge.in-stock {
          background: hsla(38,61%,73%,0.18);
          color: hsl(38,61%,73%);
          border: 1px solid hsla(38,61%,73%,0.4);
        }
        .avail-badge.out-of-stock {
          background: hsla(0,0%,25%,0.45);
          color: hsla(0,0%,55%,1);
          border: 1px solid hsla(0,0%,40%,0.3);
        }

        .card-body {
          padding: 14px 15px 16px;
        }
        .card-brand {
          font-size: 1.05rem;
          font-family: "DM Sans", sans-serif;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: hsl(38,61%,73%);
          margin-bottom: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-title {
          font-family: "Forum", cursive;
          font-size: 1.65rem;
          color: white;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-title a {
          color: inherit;
          text-decoration: none;
        }
        .card-title a:hover { color: hsl(38,61%,73%); }

        /* ── pagination ── */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 0 40px;
          font-family: "DM Sans", sans-serif;
          flex-wrap: wrap;
        }
        .page-btn {
          min-width: 38px;
          height: 38px;
          padding: 0 10px;
          border-radius: 10px;
          border: 1px solid hsla(0,0%,100%,0.1);
          background: hsla(180,2%,8%,1);
          color: hsla(0,0%,70%,1);
          font-size: 1.3rem;
          font-family: "DM Sans", sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .page-btn:hover:not(:disabled) {
          border-color: hsl(38,61%,73%);
          color: hsl(38,61%,73%);
          background: hsla(38,61%,73%,0.08);
        }
        .page-btn.active {
          border-color: hsl(38,61%,73%);
          background: hsla(38,61%,73%,0.15);
          color: hsl(38,61%,73%);
        }
        .page-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .page-ellipsis {
          min-width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsla(0,0%,45%,1);
          font-size: 1.3rem;
          font-family: "DM Sans", sans-serif;
          user-select: none;
        }
        .page-info {
          font-size: 1.2rem;
          color: hsla(0,0%,50%,1);
          font-family: "DM Sans", sans-serif;
          text-align: center;
          padding-bottom: 30px;
        }
      `}</style>

      <div
        style={{
          backgroundColor: "hsla(210,4%,9%,1)",
          minHeight: "100vh",
          paddingTop: "120px",
        }}
      >
        {/* ── Mobile filter button ── */}
        <div style={{ padding: "20px 30px 0", display: "flex" }}>
          <button
            className="mobile-filter-btn"
            onClick={() => setDrawerOpen(true)}
            style={{
              display: "none",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              border: "1px solid hsl(38,61%,73%)",
              borderRadius: "10px",
              background: "transparent",
              color: "hsl(38,61%,73%)",
              fontSize: "1.3rem",
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              cursor: "pointer",
            }}
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
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        {drawerOpen && (
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "hsla(0,0%,0%,0.75)",
              backdropFilter: "blur(4px)",
              display: "flex",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "300px",
                height: "100%",
                overflowY: "auto",
                background: "hsla(210,4%,9%,1)",
                padding: "20px",
                position: "relative",
              }}
            >
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "hsl(38,61%,73%)",
                }}
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

        <div className="perfume-search-page">
          {/* LEFT: sidebar */}
          <div className="desktop-sidebar">
            <FilterPanel />
          </div>

          {/* RIGHT: search + grid */}
          <main
            style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          >
            {/* Search bar */}
            <div className="search-box">
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 512 512"
                style={{ color: "hsl(38,61%,73%)", flexShrink: 0 }}
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
                placeholder="Search by name, brand, or barcode..."
              />
            </div>

            {/* Results count */}
            <p
              style={{
                fontSize: "1.3rem",
                color: "hsla(0,0%,65%,1)",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              {filtered.length} {filtered.length === 1 ? "product" : "products"}{" "}
              found
            </p>

            {/* Results grid */}
            {paginated.length > 0 ? (
              <div className="results-grid">
                {paginated.map((p) => (
                  <div key={p.id} className="perfume-card">
                    {/* ── Image + badge ── */}
                    <div className="card-img-wrap">
                      <span
                        className={`avail-badge ${p.available ? "in-stock" : "out-of-stock"}`}
                      >
                        {p.available ? "In Stock" : "Out of Stock"}
                      </span>
                      <img
                        src={p.image ?? PLACEHOLDER}
                        alt={p.name}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            PLACEHOLDER;
                        }}
                      />
                    </div>

                    {/* ── Text ── */}
                    <div className="card-body">
                      <p className="card-brand">{p.brand}</p>
                      <h4 className="card-title">
                        {p.url ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {p.name}
                          </a>
                        ) : (
                          p.name
                        )}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <p
                  style={{
                    fontFamily: '"Forum", cursive',
                    fontSize: "2.2rem",
                    color: "hsl(38,61%,73%)",
                    marginBottom: "12px",
                  }}
                >
                  No products found
                </p>
                <p
                  style={{
                    fontSize: "1.4rem",
                    color: "hsla(0,0%,65%,1)",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  Try adjusting your search or filters
                </p>
              </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <>
                <nav className="pagination" aria-label="Product pages">
                  {/* Prev */}
                  <button
                    className="page-btn"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    aria-label="Previous page"
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

                  {/* Page numbers */}
                  {pageNumbers.map((n, i) =>
                    n === "…" ? (
                      <span key={`ellipsis-${i}`} className="page-ellipsis">
                        …
                      </span>
                    ) : (
                      <button
                        key={n}
                        className={`page-btn${safePage === n ? " active" : ""}`}
                        onClick={() => goToPage(n as number)}
                        aria-label={`Page ${n}`}
                        aria-current={safePage === n ? "page" : undefined}
                      >
                        {n}
                      </button>
                    ),
                  )}

                  {/* Next */}
                  <button
                    className="page-btn"
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    aria-label="Next page"
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

                <p className="page-info">
                  Showing {pageStart + 1}–
                  {Math.min(pageStart + PAGE_SIZE, filtered.length)} of{" "}
                  {filtered.length} products
                </p>
              </>
            )}
          </main>
          <BackToTop />
        </div>
      </div>
    </>
  );
}
