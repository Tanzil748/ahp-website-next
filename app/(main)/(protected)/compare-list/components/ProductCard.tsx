import {
  IcRoundClose,
  MaterialSymbolsAddCircleOutline,
} from "@/components/Icons";

export interface Product {
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

// ── Attribute row ─────────────────────────────────────────────────────────────
function AttributeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="uppercase text-[1.4rem] text-[var(--text-muted)] tracking-[0.15em]">
        {label}
      </span>
      <span className="font-bold text-white text-[1.6rem]">{value}</span>
    </div>
  );
}

// ── Filled product card ───────────────────────────────────────────────────────
export function ProductCard({
  product,
  onRemove,
}: {
  product: Product;
  onRemove: () => void;
}) {
  return (
    <div className="compare-card group">
      {/* Remove button */}
      <button
        className="compare-card__remove"
        onClick={onRemove}
        aria-label="Remove product"
      >
        <IcRoundClose style={{ fontSize: 20, color: "var(--gold)" }} />
      </button>

      <div className="flex flex-col gap-5 flex-1">
        {/* Image */}
        <div className="w-full h-[250px] flex items-center justify-center rounded-lg overflow-hidden mb-[10px] bg-[var(--bg-image)]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Name & category */}
        <h3 className="text-center text-white mb-[5px] font-normal leading-[1.2] [font-family:var(--font-display)] text-[2.2rem]">
          {product.name}
        </h3>
        <p className="text-center uppercase mb-[15px] text-[1.2rem] font-bold tracking-[0.4em] text-[var(--gold)]">
          {product.category}
        </p>

        {/* Attributes */}
        <div className="py-5 border-t border-b border-[var(--white-10)]">
          <AttributeRow label="Volume" value={product.volume} />
          <AttributeRow label="Longevity" value={product.longevity} />
          <AttributeRow label="Sillage" value={product.sillage} />
          <AttributeRow label="Season" value={product.season} />
        </div>

        {/* Fragrance notes */}
        <div className="mt-[10px]">
          <h4 className="text-center mb-[15px] font-normal text-[var(--gold)] [font-family:var(--font-display)] text-[1.8rem]">
            Fragrance Notes
          </h4>
          {[
            { label: "Top Notes", value: product.notes.top },
            { label: "Heart Notes", value: product.notes.heart },
            { label: "Base Notes", value: product.notes.base },
          ].map(({ label, value }) => (
            <div key={label} className="mb-3">
              <p className="uppercase font-bold text-[1.2rem] mb-1 tracking-[0.4em] text-[var(--gold)]">
                {label}
              </p>
              <p className="text-[1.6rem] leading-[1.6] text-[var(--text-muted)]">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Empty slot placeholder ────────────────────────────────────────────────────
export function AddPlaceholder({ onClick }: { onClick: () => void }) {
  return (
    <div className="compare-placeholder" onClick={onClick}>
      <div className="group/inner flex flex-col items-center justify-center min-h-[400px] w-full rounded-lg border-2 border-dashed border-white/20 transition-all duration-[250ms] hover:bg-white/10">
        <MaterialSymbolsAddCircleOutline
          className="mb-4 text-[var(--gold)] transition-transform duration-[250ms] group-hover/inner:scale-110"
          style={{ fontSize: 60 }}
        />
        <p className="uppercase text-[1.4rem] tracking-[0.4em] text-[var(--text-muted)]">
          Add Product
        </p>
      </div>
    </div>
  );
}
