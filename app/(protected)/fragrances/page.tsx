"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import BackToTop from "@/components/BackToTop";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────
interface Fragrance {
  id: string;
  name: string;
  brand: string;
  gender: "Men" | "Women" | "Unisex";
  notes: string[];
  family: string;
  concentration: string;
  price: number;
  description: string;
  available: boolean;
  badge?: string;
  image?: string; // add image path here when ready
}

// ── Mock Data ──────────────────────────────────────────
const ALL_FRAGRANCES: Fragrance[] = [
  {
    id: "1",
    name: "Oud Royale",
    brand: "Al Hussein",
    gender: "Unisex",
    notes: ["Oud", "Rose", "Amber"],
    family: "Oriental",
    concentration: "EDP",
    price: 185,
    available: true,
    description:
      "A majestic blend of aged oud and Damascene rose, crowned with warm amber.",
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Desert Musk",
    brand: "Al Hussein",
    gender: "Men",
    notes: ["Musk", "Sandalwood", "Vanilla"],
    family: "Woody",
    concentration: "EDP",
    price: 145,
    available: true,
    description:
      "Soft sands and warm skin, a sensuous musk anchored by creamy sandalwood.",
  },
  {
    id: "3",
    name: "Saffron Noir",
    brand: "Al Hussein",
    gender: "Men",
    notes: ["Saffron", "Leather", "Patchouli"],
    family: "Oriental",
    concentration: "Parfum",
    price: 225,
    available: true,
    description:
      "Precious saffron threads woven through dark leather and earthy patchouli.",
    badge: "New",
  },
  {
    id: "4",
    name: "White Blossom",
    brand: "Al Hussein",
    gender: "Women",
    notes: ["Jasmine", "Tuberose", "Musk"],
    family: "Floral",
    concentration: "EDP",
    price: 130,
    available: true,
    description:
      "A luminous garden of jasmine and tuberose, shimmering in moonlight.",
  },
  {
    id: "5",
    name: "Amber Velvet",
    brand: "Al Hussein",
    gender: "Women",
    notes: ["Amber", "Benzoin", "Tonka Bean"],
    family: "Gourmand",
    concentration: "EDP",
    price: 160,
    available: false,
    description:
      "Rich amber wrapped in velvety benzoin with a sweet tonka heart.",
  },
  {
    id: "6",
    name: "Cedar & Smoke",
    brand: "Al Hussein",
    gender: "Men",
    notes: ["Cedar", "Birch Tar", "Vetiver"],
    family: "Woody",
    concentration: "EDT",
    price: 120,
    available: true,
    description:
      "Cold cedarwood meets smoky birch tar — raw, elemental, unforgettable.",
  },
  {
    id: "7",
    name: "Oud Majlis",
    brand: "Al Hussein",
    gender: "Unisex",
    notes: ["Oud", "Incense", "Myrrh"],
    family: "Oriental",
    concentration: "Parfum",
    price: 265,
    available: true,
    description: "Sacred incense and ancient myrrh around a profound oud core.",
    badge: "Limited",
  },
  {
    id: "8",
    name: "Rose Taif",
    brand: "Al Hussein",
    gender: "Women",
    notes: ["Taif Rose", "Oud", "Musk"],
    family: "Floral Oriental",
    concentration: "EDP",
    price: 195,
    available: true,
    description:
      "The legendary rose of Taif, elevated by a whisper of precious oud.",
  },
  {
    id: "9",
    name: "Noir Intense",
    brand: "Al Hussein",
    gender: "Men",
    notes: ["Black Pepper", "Leather", "Vetiver"],
    family: "Woody Aromatic",
    concentration: "EDP",
    price: 150,
    available: false,
    description:
      "Fierce black pepper over a core of smoked leather and green vetiver.",
  },
  {
    id: "10",
    name: "Golden Oud",
    brand: "Al Hussein",
    gender: "Unisex",
    notes: ["Oud", "Saffron", "Rose", "Sandalwood"],
    family: "Oriental",
    concentration: "Parfum",
    price: 310,
    available: true,
    description:
      "The pinnacle of Arabian perfumery — a triumphant ode to golden oud.",
    badge: "Signature",
  },
  {
    id: "11",
    name: "Aqua Sands",
    brand: "Al Hussein",
    gender: "Men",
    notes: ["Sea Breeze", "Ambergris", "Driftwood"],
    family: "Aquatic",
    concentration: "EDT",
    price: 110,
    available: true,
    description:
      "Ocean mist over warm sands, with the elusive depth of ambergris.",
  },
  {
    id: "12",
    name: "Iris Sublime",
    brand: "Al Hussein",
    gender: "Women",
    notes: ["Iris", "Violet", "Cashmeran"],
    family: "Powdery",
    concentration: "EDP",
    price: 175,
    available: true,
    description:
      "Refined iris blossoms over soft cashmere — quiet luxury in every drop.",
  },
  {
    id: "13",
    name: "Bakhoor Dreams",
    brand: "Al Hussein",
    gender: "Unisex",
    notes: ["Bakhoor", "Oud", "Amber", "Sandalwood"],
    family: "Oriental",
    concentration: "Parfum",
    price: 245,
    available: false,
    description:
      "The warm embrace of bakhoor smoke curling through amber and sandalwood.",
    badge: "New",
  },
  {
    id: "14",
    name: "Citrus & Pepper",
    brand: "Al Hussein",
    gender: "Men",
    notes: ["Bergamot", "Pink Pepper", "Vetiver"],
    family: "Citrus Aromatic",
    concentration: "EDT",
    price: 95,
    available: true,
    description:
      "Bright bergamot sparks over pink pepper, grounded in mineral vetiver.",
  },
  {
    id: "15",
    name: "Velvet Oud",
    brand: "Al Hussein",
    gender: "Unisex",
    notes: ["Oud", "Rose", "Patchouli", "Musk"],
    family: "Oriental Woody",
    concentration: "EDP",
    price: 210,
    available: true,
    description:
      "Oud softened to velvet by rose petals and dark, earthy patchouli.",
  },
  {
    id: "16",
    name: "Frankincense & Myrrh",
    brand: "Al Hussein",
    gender: "Unisex",
    notes: ["Frankincense", "Myrrh", "Labdanum"],
    family: "Resinous",
    concentration: "Parfum",
    price: 190,
    available: true,
    description:
      "Ancient resins — frankincense and myrrh — in a timeless sacred accord.",
  },
  {
    id: "17",
    name: "Jasmine Royale",
    brand: "Al Hussein",
    gender: "Women",
    notes: ["Jasmine", "Neroli", "Musk", "Cedar"],
    family: "Floral",
    concentration: "EDP",
    price: 155,
    available: true,
    description:
      "Sun-drenched jasmine blooms lifted by neroli and settled by cedar.",
  },
  {
    id: "18",
    name: "Black Amber",
    brand: "Al Hussein",
    gender: "Men",
    notes: ["Black Amber", "Oud", "Tonka", "Leather"],
    family: "Oriental",
    concentration: "Parfum",
    price: 280,
    available: false,
    description:
      "Deep black amber fused with smoky oud and the warmth of tonka bean.",
    badge: "Limited",
  },
  {
    id: "19",
    name: "Patchouli Earth",
    brand: "Al Hussein",
    gender: "Men",
    notes: ["Patchouli", "Vetiver", "Cedarwood"],
    family: "Earthy",
    concentration: "EDP",
    price: 135,
    available: true,
    description:
      "Raw patchouli roots and green vetiver grounded in weathered cedarwood.",
  },
  {
    id: "20",
    name: "Spice Route",
    brand: "Al Hussein",
    gender: "Unisex",
    notes: ["Cardamom", "Cinnamon", "Oud", "Musk"],
    family: "Spicy Oriental",
    concentration: "EDP",
    price: 170,
    available: true,
    description:
      "The ancient spice trade in a bottle — cardamom and cinnamon over oud.",
    badge: "Bestseller",
  },
  {
    id: "21",
    name: "Neroli Blanche",
    brand: "Al Hussein",
    gender: "Women",
    notes: ["Neroli", "White Musk", "Ambrette"],
    family: "Floral",
    concentration: "EDT",
    price: 125,
    available: true,
    description:
      "Pristine neroli blossom on a cloud of white musk and ambrette seed.",
  },
  {
    id: "22",
    name: "Smoky Oud",
    brand: "Al Hussein",
    gender: "Men",
    notes: ["Smoked Oud", "Birch", "Leather", "Amber"],
    family: "Woody Oriental",
    concentration: "Parfum",
    price: 295,
    available: false,
    description:
      "Oud taken through fire — a dramatic smoked accord unlike any other.",
  },
  {
    id: "23",
    name: "Melon & Musk",
    brand: "Al Hussein",
    gender: "Unisex",
    notes: ["Melon", "Cucumber", "White Musk"],
    family: "Fresh",
    concentration: "EDT",
    price: 90,
    available: true,
    description:
      "Crisp melon and cool cucumber dissolving into weightless white musk.",
  },
  {
    id: "24",
    name: "Oud Mysterieux",
    brand: "Al Hussein",
    gender: "Unisex",
    notes: ["Oud", "Incense", "Dark Rose", "Amber"],
    family: "Oriental",
    concentration: "Parfum",
    price: 320,
    available: true,
    description:
      "The most mysterious oud in our collection — brooding, complex, unforgettable.",
    badge: "Signature",
  },
];

const ITEMS_PER_PAGE = 12;
const FAMILIES = [
  "All",
  "Oriental",
  "Woody",
  "Floral",
  "Gourmand",
  "Aquatic",
  "Spicy Oriental",
  "Fresh",
  "Resinous",
  "Earthy",
  "Powdery",
];
const BADGE_COLORS: Record<string, string> = {
  Bestseller: "bg-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)]",
  New: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
  Limited: "bg-red-500/20 text-red-400 border border-red-500/40",
  Signature: "bg-purple-500/20 text-purple-300 border border-purple-500/40",
};

export default function FragrancesPage() {
  const { isSignedIn, user } = useUser();
  const [myFragrances, setMyFragrances] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showMyList, setShowMyList] = useState(false);
  const [notification, setNotification] = useState<{
    id: string;
    msg: string;
  } | null>(null);

  useEffect(() => {
    if (isSignedIn && user) {
      const key = `myFragrances_${user.id}`;
      const saved = localStorage.getItem(key);
      if (saved) setMyFragrances(JSON.parse(saved));
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    if (isSignedIn && user) {
      const key = `myFragrances_${user.id}`;
      localStorage.setItem(key, JSON.stringify(myFragrances));
    }
  }, [myFragrances, isSignedIn, user]);

  const toggleFragrance = (id: string, name: string) => {
    if (!isSignedIn) return;
    const isAdded = myFragrances.includes(id);
    setMyFragrances((prev) =>
      isAdded ? prev.filter((f) => f !== id) : [...prev, id],
    );
    setNotification({
      id,
      msg: isAdded ? `Removed "${name}"` : `Added "${name}"`,
    });
    setTimeout(() => setNotification(null), 2500);
  };

  const filtered = ALL_FRAGRANCES.filter((f) => {
    if (showMyList) return myFragrances.includes(f.id);
    if (activeFilter === "All") return true;
    return f.family.includes(activeFilter);
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setShowMyList(false);
    setCurrentPage(1);
  };

  const handleShowMyList = () => {
    setShowMyList((prev) => !prev);
    setActiveFilter("All");
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-[hsl(40,12%,5%)] pt-32 pb-20">
      {/* ── Toast ── */}
      <div
        className={[
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]",
          "px-6 py-3 border border-[hsl(38,61%,73%)]/40",
          "bg-[hsla(0,0%,16%,0.95)] backdrop-blur-md",
          "text-[hsl(38,61%,73%)] font-bold text-[1.2rem] uppercase tracking-widest",
          "transition-all duration-500 whitespace-nowrap",
          notification
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none",
        ].join(" ")}
      >
        {notification?.msg}
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* ── Page Header ── */}
        <div className="mb-14 mt-[50px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[hsl(38,61%,73%)]" />
            <span className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[4px] text-[1.1rem]">
              Collection
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-[4rem] sm:text-[5.5rem] font-normal text-white leading-none tracking-tight mb-3">
                Fragrances
              </h1>
              <p className="text-white/50 text-[1.4rem] max-w-xl">
                Rare essences and timeless accords, curated from the finest
                Arabian perfumery traditions.
              </p>
            </div>

            {isSignedIn ? (
              <button
                onClick={handleShowMyList}
                className={[
                  "flex items-center gap-3 px-6 py-3 border font-bold uppercase tracking-[2px] text-[1.1rem]",
                  "transition-all duration-300 whitespace-nowrap shrink-0",
                  showMyList
                    ? "bg-[hsl(38,61%,73%)] border-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)]"
                    : "bg-transparent border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] hover:bg-[hsl(38,61%,73%)] hover:text-[hsl(40,12%,5%)]",
                ].join(" ")}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                My Fragrances
                {myFragrances.length > 0 && (
                  <span
                    className={[
                      "w-6 h-6 rounded-full flex items-center justify-center text-[1rem] font-black",
                      showMyList
                        ? "bg-[hsl(40,12%,5%)] text-[hsl(38,61%,73%)]"
                        : "bg-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)]",
                    ].join(" ")}
                  >
                    {myFragrances.length}
                  </span>
                )}
              </button>
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

        {/* ── Filter Bar ── */}
        {!showMyList && (
          <div className="flex items-center gap-2 flex-wrap mb-10">
            {FAMILIES.map((family) => (
              <button
                key={family}
                onClick={() => handleFilterChange(family)}
                className={[
                  "px-4 py-2 text-[1.1rem] font-bold uppercase tracking-[2px] border transition-all duration-200",
                  activeFilter === family
                    ? "bg-[hsl(38,61%,73%)] border-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)]"
                    : "bg-transparent border-white/15 text-white/50 hover:border-white/40 hover:text-white",
                ].join(" ")}
              >
                {family}
              </button>
            ))}
          </div>
        )}

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-white/30 text-[1.2rem] font-bold uppercase tracking-widest">
            {showMyList
              ? `My Collection · ${filtered.length} fragrances`
              : `${filtered.length} fragrances`}
          </p>
          {totalPages > 1 && (
            <p className="text-white/30 text-[1.1rem]">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* ── Empty State ── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-white/20"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <p className="text-white/30 text-[1.4rem] font-bold uppercase tracking-widest">
              {showMyList ? "No fragrances saved yet" : "No results found"}
            </p>
            {showMyList && (
              <button
                onClick={handleShowMyList}
                className="mt-2 text-[hsl(38,61%,73%)] font-bold uppercase tracking-widest text-[1.1rem] hover:text-white transition-colors duration-200"
              >
                Browse collection →
              </button>
            )}
          </div>
        )}

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginated.map((fragrance) => {
            const isSaved = myFragrances.includes(fragrance.id);
            return (
              <div
                key={fragrance.id}
                className="group relative bg-[hsla(0,0%,13%,1)] flex flex-col border border-white/10 hover:border-[hsl(38,61%,73%)] hover:bg-[hsla(0,0%,17%,1)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* ── Image area ── */}
                <div className="relative w-full aspect-[4/3] bg-[hsla(0,0%,8%,1)] overflow-hidden border-b border-white/5">
                  {fragrance.image ? (
                    <Image
                      src={fragrance.image}
                      alt={fragrance.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                        Image
                      </span>
                    </div>
                  )}

                  {/* Badge overlaid on image */}
                  {fragrance.badge && (
                    <span
                      className={`absolute top-3 left-3 px-2 py-1 text-[0.9rem] font-black uppercase tracking-widest ${BADGE_COLORS[fragrance.badge] ?? ""}`}
                    >
                      {fragrance.badge}
                    </span>
                  )}
                </div>

                {/* ── Card body ── */}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  {/* Decorative accent line */}
                  <div className="w-8 h-px bg-[hsl(38,61%,73%)] group-hover:w-16 transition-all duration-500" />

                  {/* Content */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div>
                      {/* Brand + Gender row */}
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-white/30 text-[1rem] font-bold uppercase tracking-[3px]">
                          {fragrance.brand}
                        </p>
                        <span className="text-white/25 text-[0.95rem] font-bold uppercase tracking-[2px]">
                          {fragrance.gender}
                        </span>
                      </div>
                      <h2 className="text-white text-[1.8rem] font-bold leading-tight">
                        {fragrance.name}
                      </h2>
                      {/* Family · Concentration */}
                      <p className="text-white/25 text-[1rem] font-bold uppercase tracking-[2px] mt-0.5">
                        {fragrance.family} · {fragrance.concentration}
                      </p>
                    </div>
                    <p className="text-white/50 text-[1.2rem] leading-relaxed line-clamp-2">
                      {fragrance.description}
                    </p>
                  </div>

                  {/* Notes */}
                  <div className="flex flex-wrap gap-1.5">
                    {fragrance.notes.map((note) => (
                      <span
                        key={note}
                        className="px-2 py-1 border border-white/10 text-white/40 text-[1rem] uppercase tracking-wider font-bold"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Availability badge + Save button */}
                  <div className="pt-3 border-t border-white/8 flex flex-col gap-2">
                    {/* Availability */}
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          fragrance.available ? "bg-emerald-400" : "bg-red-400",
                        ].join(" ")}
                      />
                      <span
                        className={[
                          "text-[1rem] font-bold uppercase tracking-[2px]",
                          fragrance.available
                            ? "text-emerald-400"
                            : "text-red-400",
                        ].join(" ")}
                      >
                        {fragrance.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    {/* Save button */}
                    {isSignedIn ? (
                      <button
                        onClick={() =>
                          toggleFragrance(fragrance.id, fragrance.name)
                        }
                        className={[
                          "w-full flex items-center justify-center gap-2 py-2.5 border font-bold uppercase tracking-[2px] text-[1.1rem] transition-all duration-300",
                          isSaved
                            ? "bg-[hsl(38,61%,73%)] border-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)] hover:bg-transparent hover:text-[hsl(38,61%,73%)]"
                            : "bg-transparent border-white/15 text-white/40 hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)]",
                        ].join(" ")}
                        aria-label={
                          isSaved
                            ? "Remove from my fragrances"
                            : "Add to my fragrances"
                        }
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

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={[
                "w-10 h-10 flex items-center justify-center border font-bold transition-all duration-200",
                currentPage === 1
                  ? "border-white/10 text-white/20 cursor-not-allowed"
                  : "border-white/20 text-white hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)]",
              ].join(" ")}
              aria-label="Previous page"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isActive = page === currentPage;
              const isNear =
                Math.abs(page - currentPage) <= 1 ||
                page === 1 ||
                page === totalPages;
              const isEllipsis =
                !isNear && (page === 2 || page === totalPages - 1);
              if (!isNear && !isEllipsis) return null;
              if (isEllipsis)
                return (
                  <span
                    key={page}
                    className="w-10 h-10 flex items-center justify-center text-white/20 font-bold text-[1.2rem]"
                  >
                    ·
                  </span>
                );
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={[
                    "w-10 h-10 flex items-center justify-center border font-bold text-[1.2rem] transition-all duration-200",
                    isActive
                      ? "bg-[hsl(38,61%,73%)] border-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)]"
                      : "border-white/20 text-white/50 hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)]",
                  ].join(" ")}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={[
                "w-10 h-10 flex items-center justify-center border font-bold transition-all duration-200",
                currentPage === totalPages
                  ? "border-white/10 text-white/20 cursor-not-allowed"
                  : "border-white/20 text-white hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)]",
              ].join(" ")}
              aria-label="Next page"
            >
              →
            </button>
          </div>
        )}
      </div>
      <BackToTop />
    </main>
  );
}
