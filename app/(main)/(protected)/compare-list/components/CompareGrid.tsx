"use client";

import { useState } from "react";
import { ProductCard, AddPlaceholder, CATALOGUE } from "./ProductCard";
import type { Product } from "./ProductCard";
import {
  IcRoundClose,
  MaterialSymbolsAddBoxOutlineRounded,
} from "@/components/Icons";

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
  if (!isOpen) return null;
  const available = CATALOGUE.filter((p) => !alreadyAdded.includes(p.id));

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

        {/* Product list */}
        <div className="overflow-y-auto px-[30px] py-5 flex flex-col gap-4">
          {available.length === 0 ? (
            <p className="text-center py-10 text-[var(--text-muted)]">
              All products are already added to the compare list.
            </p>
          ) : (
            available.map((product) => (
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
                <div className="flex-1">
                  <p className="text-white mb-1 font-normal [font-family:var(--font-display)] text-[1.6rem]">
                    {product.name}
                  </p>
                  <p className="uppercase text-[1.2rem] tracking-[0.15em] text-[var(--gold)]">
                    {product.category}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main compare grid ─────────────────────────────────────────────────────────
export default function CompareGrid() {
  const [compareItems, setCompareItems] = useState<(Product | null)[]>([
    CATALOGUE[0],
    CATALOGUE[1],
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
