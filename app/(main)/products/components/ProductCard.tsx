"use client";

import Link from "next/link";
import {
  normalizeBrand,
  normalizeGender,
  parseNotes,
  type Product,
} from "../utils";

type Props = {
  product: Product;
  isSaved: boolean;
  isSignedIn: boolean;
  onToggleSave: (id: string, name: string) => void;
};

export default function ProductCard({
  product,
  isSaved,
  isSignedIn,
  onToggleSave,
}: Props) {
  const notes = parseNotes(product);
  const isAvailable = product.stockOnHand > 0;
  const slug = `/products/${product._id}`;

  return (
    <div
      className="group relative flex flex-col border border-white/10 hover:border-[hsl(38,61%,73%)] hover:-translate-y-1 transition-all duration-300"
      style={{ backgroundColor: "hsla(0,0%,11%,1)" }}
    >
      {/* Clickable image + name area */}
      <Link href={slug} className="flex flex-col flex-1 no-underline">
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
                className="text-white text-[1.9rem] font-normal leading-tight group-hover:text-[hsl(38,61%,73%)] transition-colors duration-300"
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
        </div>
      </Link>

      {/* Save button — outside the Link so it doesn't trigger navigation */}
      <div className="px-6 pb-6 flex flex-col gap-2">
        <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rotate-45 shrink-0 ${isAvailable ? "bg-emerald-400" : "bg-red-400"}`}
            />
            <span
              className={`text-[1rem] font-bold uppercase tracking-[2px] ${isAvailable ? "text-emerald-400" : "text-red-400"}`}
            >
              {isAvailable ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {isSignedIn ? (
            <button
              onClick={() => onToggleSave(product._id, product.itemName)}
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
}
