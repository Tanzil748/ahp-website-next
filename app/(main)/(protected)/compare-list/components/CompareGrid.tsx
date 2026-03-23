"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { ProductCard, AddPlaceholder } from "./ProductCard";
import type { Product } from "./ProductCard";
import {
  IcRoundClose,
  MaterialSymbolsAddBoxOutlineRounded,
} from "@/components/Icons";

// ── Map Convex product → compare Product type ─────────────────────────────────
function mapToProduct(p: any): Product {
  const parseNotes = (str: string) =>
    str
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean)
      .join(", ");

  return {
    id: p._id,
    name: p.itemName,
    category: p.brand,
    image:
      p.imageUrl ??
      `https://placehold.co/200x300/1a1a1a/c9ab81?text=${encodeURIComponent(p.itemName)}`,
    volume: `${p.packageWeight ?? "—"}${p.weightUnit ?? ""}`,
    longevity: "—",
    sillage: p.stockOnHand > 0 ? "In Stock" : "Out of Stock",
    season: p.gender ?? "—",
    notes: {
      top: parseNotes(p.topNotes ?? ""),
      heart: parseNotes(p.middleNotes ?? ""),
      base: parseNotes(p.baseNotes ?? ""),
    },
  };
}

// ── Gold button ───────────────────────────────────────────────────────────────
function GoldButton({
  onClick,
  children,
  secondary = false,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`gold-btn ${secondary ? "gold-btn--secondary" : ""}`}
    >
      <span className="gold-btn__fill" />
      <span className="gold-btn__label">{children}</span>
      <span className="gold-btn__label-dup" aria-hidden="true">
        {children}
      </span>
    </button>
  );
}

// ── Product selection modal ───────────────────────────────────────────────────
function ProductModal({
  isOpen,
  onClose,
  onSelect,
  alreadyAdded,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (p: Product) => void;
  alreadyAdded: string[];
}) {
  const [tab, setTab] = useState<"all" | "saved">("all");
  const [search, setSearch] = useState("");

  const convexProducts = useQuery(api.products.getProducts);
  const savedIds = useQuery(api.users.getSavedPerfumeIds) ?? [];

  const allMapped = useMemo(
    () => (convexProducts ?? []).map(mapToProduct),
    [convexProducts],
  );

  const savedMapped = useMemo(
    () => allMapped.filter((p) => savedIds.includes(p.id as Id<"products">)),
    [allMapped, savedIds],
  );

  const source = tab === "all" ? allMapped : savedMapped;

  const available = useMemo(
    () =>
      source
        .filter((p) => !alreadyAdded.includes(p.id))
        .filter(
          (p) =>
            !search ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()),
        ),
    [source, alreadyAdded, search],
  );

  if (!isOpen) return null;

  return (
    <div className="compare-modal-overlay" onClick={onClose}>
      <div className="compare-modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center px-[30px] py-[25px] border-b border-[var(--white-10)]">
          <h2 className="text-white font-normal [font-family:var(--font-display)] text-[calc(1.3rem+2.4vw)]">
            Select a Fragrance
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-1 bg-transparent border-none cursor-pointer"
            aria-label="Close modal"
          >
            <IcRoundClose style={{ fontSize: 30, color: "var(--gold)" }} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--white-10)]">
          {(["all", "saved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative flex-1 py-4 uppercase font-bold tracking-[0.2em] text-[1.1rem] transition-colors duration-200"
              style={{
                color: tab === t ? "var(--gold)" : "var(--text-muted)",
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              {t === "all" ? "All Products" : "My Saved"}
              {tab === t && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: "var(--gold)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="px-[30px] pt-5">
          <input
            type="text"
            placeholder="Search by name or brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 text-white text-[1.3rem] outline-none border border-[var(--white-10)] focus:border-[var(--gold)] transition-colors duration-200"
            style={{
              backgroundColor: "hsla(210,4%,7%,1)",
              fontFamily: "var(--font-dm-sans)",
            }}
          />
        </div>

        {/* Product list */}
        <div className="overflow-y-auto px-[30px] py-5 flex flex-col gap-4">
          {/* Loading */}
          {convexProducts === undefined && (
            <div className="space-y-3 py-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded"
                  style={{ backgroundColor: "hsla(210,4%,11%,1)" }}
                />
              ))}
            </div>
          )}

          {/* Saved tab — not signed in */}
          {tab === "saved" &&
            savedIds.length === 0 &&
            convexProducts !== undefined && (
              <p className="text-center py-10 text-[var(--text-muted)] text-[1.4rem]">
                You have no saved fragrances yet.{" "}
                <a
                  href="/products"
                  className="underline"
                  style={{ color: "var(--gold)" }}
                >
                  Browse the collection
                </a>{" "}
                and save your favourites.
              </p>
            )}

          {/* Empty results */}
          {convexProducts !== undefined &&
            available.length === 0 &&
            !(tab === "saved" && savedIds.length === 0) && (
              <p className="text-center py-10 text-[var(--text-muted)] text-[1.4rem]">
                {search
                  ? "No products match your search."
                  : "All products are already added to the compare list."}
              </p>
            )}

          {/* Product rows */}
          {available.map((product) => (
            <div
              key={product.id}
              className="compare-modal-row"
              onClick={() => {
                onSelect(product);
                onClose();
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-[80px] h-[80px] object-contain rounded-md p-[10px] bg-[var(--bg-image)]"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white mb-1 font-normal [font-family:var(--font-display)] text-[1.6rem] truncate">
                  {product.name}
                </p>
                <p className="uppercase text-[1.2rem] tracking-[0.15em] text-[var(--gold)]">
                  {product.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main compare grid ─────────────────────────────────────────────────────────
export default function CompareGrid() {
  const [compareItems, setCompareItems] = useState<(Product | null)[]>([
    null,
    null,
    null,
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<number | null>(null);

  const filledCount = compareItems.filter(Boolean).length;
  const alreadyAdded = compareItems
    .filter(Boolean)
    .map((p) => (p as Product).id);

  const openModal = (slot: number) => {
    setTargetSlot(slot);
    setModalOpen(true);
  };

  const handleSelect = (product: Product) => {
    if (targetSlot === null) return;
    setCompareItems((prev) => {
      const n = [...prev];
      n[targetSlot] = product;
      return n;
    });
  };

  const handleRemove = (index: number) => {
    setCompareItems((prev) => {
      const n = [...prev];
      n[index] = null;
      return n;
    });
  };

  return (
    <>
      <section className="py-[80px] min-h-[600px]">
        <div className="px-4 max-w-[1200px] mx-auto">
          {/* Empty state */}
          {filledCount === 0 && (
            <div className="text-center py-[80px] px-5 max-w-[600px] mx-auto">
              <MaterialSymbolsAddBoxOutlineRounded
                className="mx-auto mb-[30px] text-[var(--gold)] opacity-60"
                style={{ fontSize: 80 }}
              />
              <h2 className="text-white mb-[15px] font-normal leading-[1.4] [font-family:var(--font-display)] text-[calc(1.3rem+2.4vw)]">
                No Products to Compare
              </h2>
              <p className="mb-[30px] text-[1.6rem] leading-[1.6] text-[var(--text-muted)]">
                Add up to 3 fragrances to compare them side by side
              </p>
              <GoldButton onClick={() => openModal(0)}>
                Add Fragrance
              </GoldButton>
            </div>
          )}

          {/* Compare grid */}
          {filledCount > 0 && (
            <>
              <div className="grid gap-[30px] mb-[40px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {compareItems.map((product, i) =>
                  product ? (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onRemove={() => handleRemove(i)}
                    />
                  ) : (
                    <AddPlaceholder
                      key={`slot-${i}`}
                      onClick={() => openModal(i)}
                    />
                  ),
                )}
              </div>
              <div className="text-center pt-5">
                <GoldButton
                  secondary
                  onClick={() => setCompareItems([null, null, null])}
                >
                  Clear All
                </GoldButton>
              </div>
            </>
          )}
        </div>
      </section>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelect}
        alreadyAdded={alreadyAdded}
      />
    </>
  );
}
