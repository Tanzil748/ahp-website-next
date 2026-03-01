"use client";

import { useState } from "react";
import { ProductCard, AddPlaceholder } from "./ProductCard";

// ── Gold button (used only in this file) ──────────────────────────────────────
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
      className={`group relative overflow-hidden z-[1] inline-block cursor-pointer
        text-[1.2rem] font-bold uppercase tracking-[3px]
        border-2 border-[hsl(38,61%,73%)] px-[45px] py-[12px]
        transition-colors duration-[250ms]
        ${secondary ? "bg-[hsl(38,61%,73%)] text-black" : "bg-transparent text-[hsl(38,61%,73%)]"}`}
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      {/* Circle fill */}
      <span
        className={`absolute bottom-full left-1/2 -translate-x-1/2 w-[200%] h-[200%] rounded-full -z-[1] transition-all duration-500 group-hover:bottom-[-50%] ${secondary ? "bg-[hsla(40,12%,5%,1)]" : "bg-[hsl(38,61%,73%)]"}`}
      />
      <span className="block transition-transform duration-[250ms] group-hover:-translate-y-[40px]">
        {children}
      </span>
      <span
        className={`absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-[250ms] group-hover:top-1/2 group-hover:-translate-y-1/2 group-hover:-translate-x-1/2 ${secondary ? "text-white" : "text-[hsla(40,12%,5%,1)]"}`}
        aria-hidden="true"
      >
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
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-5"
      style={{ background: "hsla(0,0%,0%,0.8)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[700px] max-h-[80vh] flex flex-col rounded-xl overflow-hidden"
        style={{
          background: "hsla(210,4%,9%,1)",
          border: "1px solid hsl(38,61%,73%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center px-[30px] py-[25px]"
          style={{ borderBottom: "1px solid hsla(0,0%,100%,0.1)" }}
        >
          <h2
            className="text-white font-normal"
            style={{
              fontFamily: "var(--font-forum)",
              fontSize: "calc(1.3rem + 2.4vw)",
            }}
          >
            Select a Fragrance
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-1 bg-transparent border-none cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 512 512"
              className="text-[hsl(38,61%,73%)]"
            >
              <path
                d="M368 368L144 144M368 144L144 368"
                stroke="currentColor"
                strokeWidth="48"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Product list */}
        <div className="overflow-y-auto px-[30px] py-5 flex flex-col gap-4">
          {available.length === 0 ? (
            <p
              className="text-center py-10 text-[hsla(0,0%,65%,1)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              All products are already added to the compare list.
            </p>
          ) : (
            available.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-5 p-[15px] rounded-lg cursor-pointer
                  border border-white/10 transition-all duration-[250ms]
                  hover:border-[hsl(38,61%,73%)] hover:translate-x-[5px]"
                style={{ background: "hsla(210,4%,11%,1)" }}
                onClick={() => {
                  onSelect(product);
                  onClose();
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[80px] h-[80px] object-contain rounded-md p-[10px]"
                  style={{ background: "hsla(0,3%,7%,1)" }}
                />
                <div className="flex-1">
                  <p
                    className="text-white mb-1 font-normal"
                    style={{
                      fontFamily: "var(--font-forum)",
                      fontSize: "1.6rem",
                    }}
                  >
                    {product.name}
                  </p>
                  <p
                    className="uppercase text-[1.2rem] tracking-[0.15em] text-[hsl(38,61%,73%)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
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
      <section className="py-[80px]" style={{ minHeight: "600px" }}>
        <div className="px-4 max-w-[1200px] mx-auto">
          {/* Empty state */}
          {filledCount === 0 && (
            <div className="text-center py-[80px] px-5 max-w-[600px] mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="none"
                viewBox="0 0 512 512"
                className="mx-auto mb-[30px] text-[hsl(38,61%,73%)] opacity-60"
              >
                <path
                  d="M432 64H80a16 16 0 00-16 16v352a16 16 0 0016 16h352a16 16 0 0016-16V80a16 16 0 00-16-16z"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinejoin="round"
                />
                <path
                  d="M256 176v160M176 256h160"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                />
              </svg>
              <h2
                className="text-white mb-[15px] font-normal leading-[1.4]"
                style={{
                  fontFamily: "var(--font-forum)",
                  fontSize: "calc(1.3rem + 2.4vw)",
                }}
              >
                No Products to Compare
              </h2>
              <p
                className="mb-[30px] text-[1.6rem] leading-[1.6] text-[hsla(0,0%,65%,1)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
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
