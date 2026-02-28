"use client";

import { useState } from "react";
import BackToTop from "@/components/BackToTop";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  volume: string;
  longevity: string;
  sillage: string;
  season: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
}

// ─── Product catalogue (replace with real API / DB data) ─────────────────────
const CATALOGUE: Product[] = [
  {
    id: "oud-royale",
    name: "Oud Royale",
    category: "Oriental",
    image: "https://placehold.co/200x300/1a1a1a/c9ab81?text=Oud+Royale",
    volume: "100ml",
    longevity: "8-12 hours",
    sillage: "Strong",
    season: "Fall/Winter",
    notes: {
      top: "Bergamot, Saffron",
      heart: "Rose, Oud",
      base: "Amber, Musk",
    },
  },
  {
    id: "velvet-rose",
    name: "Velvet Rose",
    category: "Floral",
    image: "https://placehold.co/200x300/1a1a1a/c9ab81?text=Velvet+Rose",
    volume: "75ml",
    longevity: "6-8 hours",
    sillage: "Moderate",
    season: "All Seasons",
    notes: {
      top: "Pink Pepper, Mandarin",
      heart: "Bulgarian Rose, Peony",
      base: "Patchouli, White Musk",
    },
  },
  {
    id: "cedar-noir",
    name: "Cedar Noir",
    category: "Woody",
    image: "https://placehold.co/200x300/1a1a1a/c9ab81?text=Cedar+Noir",
    volume: "100ml",
    longevity: "10-14 hours",
    sillage: "Very Strong",
    season: "Winter",
    notes: {
      top: "Black Pepper, Cardamom",
      heart: "Cedarwood, Vetiver",
      base: "Leather, Incense",
    },
  },
  {
    id: "aqua-lumiere",
    name: "Aqua Lumière",
    category: "Fresh",
    image: "https://placehold.co/200x300/1a1a1a/c9ab81?text=Aqua+Lumiere",
    volume: "50ml",
    longevity: "4-6 hours",
    sillage: "Light",
    season: "Spring/Summer",
    notes: {
      top: "Citrus, Sea Breeze",
      heart: "Jasmine, Lily",
      base: "White Musk, Sandalwood",
    },
  },
  {
    id: "amber-elixir",
    name: "Amber Elixir",
    category: "Oriental",
    image: "https://placehold.co/200x300/1a1a1a/c9ab81?text=Amber+Elixir",
    volume: "100ml",
    longevity: "12-16 hours",
    sillage: "Strong",
    season: "Fall/Winter",
    notes: {
      top: "Cinnamon, Nutmeg",
      heart: "Amber, Labdanum",
      base: "Vanilla, Tonka Bean",
    },
  },
  {
    id: "rose-de-nuit",
    name: "Rose de Nuit",
    category: "Floral",
    image: "https://placehold.co/200x300/1a1a1a/c9ab81?text=Rose+de+Nuit",
    volume: "75ml",
    longevity: "6-10 hours",
    sillage: "Moderate",
    season: "All Seasons",
    notes: {
      top: "Lychee, Raspberry",
      heart: "Damask Rose, Iris",
      base: "Sandalwood, Musk",
    },
  },
];

const MAX_COMPARE = 3;

// ─── Sub-components ──────────────────────────────────────────────────────────

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
    <>
      <style>{`
        .gold-btn {
          position: relative;
          font-size: 1.2rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          border: 2px solid hsl(38,61%,73%);
          padding: 12px 45px;
          overflow: hidden;
          z-index: 1;
          cursor: pointer;
          display: inline-block;
          font-family: "DM Sans", sans-serif;
          transition: 250ms ease;
          color: ${secondary ? "hsla(0,0%,0%,1)" : "hsl(38,61%,73%)"};
          background: ${secondary ? "hsl(38,61%,73%)" : "none"};
        }
        .gold-btn::before {
          content: "";
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 200%;
          height: 200%;
          border-radius: 50%;
          background-color: ${secondary ? "hsla(40,12%,5%,1)" : "hsl(38,61%,73%)"};
          transition: 500ms ease;
          z-index: -1;
        }
        .gold-btn .btn-t1 { transition: 250ms ease; display: block; }
        .gold-btn .btn-t2 {
          position: absolute;
          top: 100%; left: 50%;
          transform: translateX(-50%);
          min-width: max-content;
          color: ${secondary ? "hsla(0,0%,100%,1)" : "hsla(40,12%,5%,1)"};
        }
        .gold-btn:hover::before { bottom: -50%; }
        .gold-btn:hover .btn-t1 { transform: translateY(-40px); }
        .gold-btn:hover .btn-t2 { top: 50%; transform: translate(-50%,-50%); }
      `}</style>
      <button className="gold-btn" onClick={onClick}>
        <span className="btn-t1">{children}</span>
        <span className="btn-t2" aria-hidden="true">
          {children}
        </span>
      </button>
    </>
  );
}

function AttributeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span
        className="uppercase text-[1.4rem]"
        style={{
          color: "hsla(0,0%,65%,1)",
          letterSpacing: "0.15em",
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        {label}
      </span>
      <span
        className="font-bold text-white text-[1.6rem]"
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      >
        {value}
      </span>
    </div>
  );
}

function ProductCard({
  product,
  onRemove,
}: {
  product: Product;
  onRemove: () => void;
}) {
  return (
    <>
      <style>{`
        .compare-card { transition: 500ms ease; }
        .compare-card:hover { border-color: hsl(38,61%,73%) !important; box-shadow: 0 0 30px rgba(201,171,129,0.15); }
        .remove-btn { opacity: 0; transition: 250ms ease; }
        .compare-card:hover .remove-btn { opacity: 1; }
        .remove-btn:hover { background: hsl(38,61%,73%) !important; border-color: hsl(38,61%,73%) !important; }
        .remove-btn:hover svg { color: hsla(40,12%,5%,1) !important; }
        .product-img-inner { transition: 500ms ease; }
      `}</style>
      <div
        className="compare-card relative flex flex-col rounded-xl p-[30px_20px] min-h-[600px]"
        style={{
          background: "hsla(210,4%,11%,1)",
          border: "1px solid hsla(0,0%,100%,0.1)",
        }}
      >
        {/* Remove button */}
        <button
          className="remove-btn absolute top-[15px] right-[15px] rounded-full w-[35px] h-[35px] flex items-center justify-center z-10"
          style={{
            background: "hsla(40,12%,5%,1)",
            border: "1px solid hsla(0,0%,100%,0.1)",
          }}
          onClick={onRemove}
          aria-label="Remove product"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 512 512"
            style={{ color: "hsl(38,61%,73%)" }}
          >
            <path
              d="M368 368L144 144M368 144L144 368"
              stroke="currentColor"
              strokeWidth="48"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex flex-col gap-5 flex-1">
          {/* Image */}
          <div
            className="w-full h-[250px] flex items-center justify-center rounded-lg overflow-hidden mb-[10px]"
            style={{ background: "hsla(0,3%,7%,1)" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-img-inner w-full h-full object-contain p-5"
            />
          </div>

          {/* Name & Category */}
          <h3
            className="text-center text-white mb-[5px]"
            style={{
              fontFamily: '"Forum", cursive',
              fontSize: "2.2rem",
              fontWeight: 400,
              lineHeight: "1.2em",
            }}
          >
            {product.name}
          </h3>
          <p
            className="text-center uppercase mb-[15px] text-[1.2rem] font-bold"
            style={{
              color: "hsl(38,61%,73%)",
              letterSpacing: "0.4em",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            {product.category}
          </p>

          {/* Attributes */}
          <div
            className="py-5"
            style={{
              borderTop: "1px solid hsla(0,0%,100%,0.1)",
              borderBottom: "1px solid hsla(0,0%,100%,0.1)",
            }}
          >
            <AttributeRow label="Volume" value={product.volume} />
            <AttributeRow label="Longevity" value={product.longevity} />
            <AttributeRow label="Sillage" value={product.sillage} />
            <AttributeRow label="Season" value={product.season} />
          </div>

          {/* Fragrance Notes */}
          <div className="mt-[10px]">
            <h4
              className="text-center mb-[15px]"
              style={{
                color: "hsl(38,61%,73%)",
                fontFamily: '"Forum", cursive',
                fontSize: "1.8rem",
                fontWeight: 400,
              }}
            >
              Fragrance Notes
            </h4>
            {[
              { label: "Top Notes", value: product.notes.top },
              { label: "Heart Notes", value: product.notes.heart },
              { label: "Base Notes", value: product.notes.base },
            ].map(({ label, value }) => (
              <div key={label} className="mb-3">
                <p
                  className="uppercase font-bold text-[1.2rem] mb-1"
                  style={{
                    color: "hsl(38,61%,73%)",
                    letterSpacing: "0.4em",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {label}
                </p>
                <p
                  className="text-[1.6rem] leading-[1.6]"
                  style={{
                    color: "hsla(0,0%,65%,1)",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function AddPlaceholder({ onClick }: { onClick: () => void }) {
  return (
    <>
      <style>{`
        .add-placeholder { transition: 250ms ease; }
        .add-placeholder:hover { border-color: hsl(38,61%,73%) !important; background: hsla(0,0%,100%,0.1) !important; }
        .add-placeholder:hover .add-icon { transform: scale(1.1); }
        .add-icon { transition: 250ms ease; }
      `}</style>
      <div
        className="compare-card relative flex flex-col rounded-xl p-[30px_20px] min-h-[600px] items-center justify-center cursor-pointer"
        style={{
          background: "hsla(210,4%,11%,1)",
          border: "1px solid hsla(0,0%,100%,0.1)",
        }}
        onClick={onClick}
      >
        <div
          className="add-placeholder flex flex-col items-center justify-center min-h-[400px] w-full rounded-lg"
          style={{
            border: "2px dashed hsla(0,0%,100%,0.2)",
            background: "transparent",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="none"
            viewBox="0 0 512 512"
            className="add-icon mb-4"
            style={{ color: "hsl(38,61%,73%)" }}
          >
            <path
              d="M256 112v288M112 256h288"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
            />
            <circle
              cx="256"
              cy="256"
              r="208"
              stroke="currentColor"
              strokeWidth="32"
            />
          </svg>
          <p
            className="uppercase text-[1.4rem]"
            style={{
              color: "hsla(0,0%,65%,1)",
              letterSpacing: "0.4em",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Add Product
          </p>
        </div>
      </div>
    </>
  );
}

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
    <>
      <style>{`
        .product-item-row { transition: 250ms ease; }
        .product-item-row:hover {
          border-color: hsl(38,61%,73%) !important;
          background: hsla(180,2%,8%,1) !important;
          transform: translateX(5px);
        }
      `}</style>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-5"
        style={{ background: "hsla(0,0%,0%,0.8)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        {/* Modal */}
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
              className="text-white"
              style={{
                fontFamily: '"Forum", cursive',
                fontSize: "calc(1.3rem + 2.4vw)",
                fontWeight: 400,
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
                style={{ color: "hsl(38,61%,73%)" }}
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

          {/* Body */}
          <div className="overflow-y-auto px-[30px] py-5 flex flex-col gap-4">
            {available.length === 0 ? (
              <p
                className="text-center py-10"
                style={{
                  color: "hsla(0,0%,65%,1)",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                All products are already added to the compare list.
              </p>
            ) : (
              available.map((product) => (
                <div
                  key={product.id}
                  className="product-item-row flex items-center gap-5 p-[15px] rounded-lg cursor-pointer"
                  style={{
                    background: "hsla(210,4%,11%,1)",
                    border: "1px solid hsla(0,0%,100%,0.1)",
                  }}
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
                      className="text-white mb-1"
                      style={{
                        fontFamily: '"Forum", cursive',
                        fontSize: "1.6rem",
                        fontWeight: 400,
                      }}
                    >
                      {product.name}
                    </p>
                    <p
                      className="uppercase text-[1.2rem]"
                      style={{
                        color: "hsl(38,61%,73%)",
                        letterSpacing: "0.15em",
                        fontFamily: '"DM Sans", sans-serif',
                      }}
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
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CompareListPage() {
  const [compareItems, setCompareItems] = useState<(Product | null)[]>([
    CATALOGUE[0],
    CATALOGUE[1],
    null,
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<number | null>(null);

  const filledCount = compareItems.filter(Boolean).length;

  const openModal = (slotIndex: number) => {
    setTargetSlot(slotIndex);
    setModalOpen(true);
  };

  const handleSelect = (product: Product) => {
    if (targetSlot === null) return;
    setCompareItems((prev) => {
      const next = [...prev];
      next[targetSlot] = product;
      return next;
    });
  };

  const handleRemove = (index: number) => {
    setCompareItems((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleClearAll = () => {
    setCompareItems([null, null, null]);
  };

  const alreadyAdded = compareItems
    .filter(Boolean)
    .map((p) => (p as Product).id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Forum&display=swap');
        html { font-size: 10px; }

        /* Hero dot pattern */
        .compare-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" x="50" y="50" fill="%23c9ab81" opacity="0.1"/></svg>');
          background-size: 50px 50px;
          opacity: 0.3;
          pointer-events: none;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: hsl(38,61%,73%); }
      `}</style>

      <main
        style={{ backgroundColor: "hsla(210,4%,9%,1)", minHeight: "100vh" }}
      >
        {/* ── Hero ── */}
        <section
          className="compare-hero relative text-center overflow-hidden"
          style={{
            paddingBlock: "120px 60px",
            background:
              "linear-gradient(180deg, hsla(210,4%,11%,1) 0%, hsla(30,8%,5%,1) 100%)",
          }}
        >
          <div className="relative z-[1] px-4 max-w-[1200px] mx-auto">
            <p
              className="font-bold uppercase mb-3 text-[1.2rem]"
              style={{
                color: "hsl(38,61%,73%)",
                letterSpacing: "0.4em",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Find Your Perfect Scent
            </p>

            {/* Wavy separator */}
            <div className="flex justify-center mb-4">
              <svg width="100" height="10" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 5 Q12.5 0 25 5 Q37.5 10 50 5 Q62.5 0 75 5 Q87.5 10 100 5"
                  stroke="hsl(38,61%,73%)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>

            <h1
              className="text-white font-normal"
              style={{
                fontFamily: '"Forum", cursive',
                fontSize: "calc(2rem + 2.5vw)",
                lineHeight: "1.2em",
              }}
            >
              Compare Fragrances
            </h1>
            <p
              className="mx-auto mt-5 text-[1.6rem] leading-[1.6]"
              style={{
                color: "hsla(0,0%,65%,1)",
                maxWidth: "600px",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Compare up to 3 fragrances side by side to find your ideal
              signature scent
            </p>
          </div>
        </section>

        {/* ── Compare Section ── */}
        <section className="py-[80px]" style={{ minHeight: "600px" }}>
          <div className="px-4 max-w-[1200px] mx-auto">
            {/* Empty state — shown when nothing is added */}
            {filledCount === 0 && (
              <div className="text-center py-[80px] px-5 max-w-[600px] mx-auto">
                <div
                  className="text-[80px] mb-[30px]"
                  style={{ color: "hsl(38,61%,73%)", opacity: 0.6 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    fill="none"
                    viewBox="0 0 512 512"
                    className="mx-auto"
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
                </div>
                <h2
                  className="text-white mb-[15px]"
                  style={{
                    fontFamily: '"Forum", cursive',
                    fontSize: "calc(1.3rem + 2.4vw)",
                    fontWeight: 400,
                    lineHeight: "1.4em",
                  }}
                >
                  No Products to Compare
                </h2>
                <p
                  className="mb-[30px] text-[1.6rem] leading-[1.6]"
                  style={{
                    color: "hsla(0,0%,65%,1)",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  Add up to 3 fragrances to compare them side by side
                </p>
                <GoldButton onClick={() => openModal(0)}>
                  Add Fragrance
                </GoldButton>
              </div>
            )}

            {/* Compare grid — always shown, cards or placeholders */}
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

                {/* Actions */}
                <div className="text-center pt-5">
                  <GoldButton secondary onClick={handleClearAll}>
                    Clear All
                  </GoldButton>
                </div>
              </>
            )}
          </div>
        </section>
        <BackToTop />
      </main>

      {/* ── Product Selection Modal ── */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelect}
        alreadyAdded={alreadyAdded}
      />
    </>
  );
}
