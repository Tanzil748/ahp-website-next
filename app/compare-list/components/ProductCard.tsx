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

export const CATALOGUE: Product[] = [
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

// ── Attribute row ─────────────────────────────────────────────────────────────
function AttributeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="uppercase text-[1.4rem] text-[hsla(0,0%,65%,1)] tracking-[0.15em] font-[DM_Sans,sans-serif]">
        {label}
      </span>
      <span className="font-bold text-white text-[1.6rem] font-[DM_Sans,sans-serif]">
        {value}
      </span>
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
    <div className="group relative flex flex-col rounded-xl p-[30px_20px] min-h-[600px] bg-[hsla(210,4%,11%,1)] border border-white/10 transition-all duration-500 hover:border-[hsl(38,61%,73%)] hover:shadow-[0_0_30px_rgba(201,171,129,0.15)]">
      {/* Remove button */}
      <button
        className="absolute top-[15px] right-[15px] rounded-full w-[35px] h-[35px] flex items-center justify-center z-10 bg-[hsla(40,12%,5%,1)] border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-[250ms] hover:!bg-[hsl(38,61%,73%)] hover:!border-[hsl(38,61%,73%)] hover:[&>svg]:text-[hsla(40,12%,5%,1)]"
        onClick={onRemove}
        aria-label="Remove product"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 512 512"
          className="text-[hsl(38,61%,73%)] transition-colors duration-[250ms]"
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
        <div className="w-full h-[250px] flex items-center justify-center rounded-lg overflow-hidden mb-[10px] bg-[hsla(0,3%,7%,1)]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Name & category */}
        <h3 className="text-center text-white mb-[5px] font-normal leading-[1.2] font-[Forum,cursive] text-[2.2rem]">
          {product.name}
        </h3>
        <p className="text-center uppercase mb-[15px] text-[1.2rem] font-bold tracking-[0.4em] text-[hsl(38,61%,73%)] font-[DM_Sans,sans-serif]">
          {product.category}
        </p>

        {/* Attributes */}
        <div className="py-5 border-t border-b border-white/10">
          <AttributeRow label="Volume" value={product.volume} />
          <AttributeRow label="Longevity" value={product.longevity} />
          <AttributeRow label="Sillage" value={product.sillage} />
          <AttributeRow label="Season" value={product.season} />
        </div>

        {/* Fragrance notes */}
        <div className="mt-[10px]">
          <h4 className="text-center mb-[15px] font-normal text-[hsl(38,61%,73%)] font-[Forum,cursive] text-[1.8rem]">
            Fragrance Notes
          </h4>
          {[
            { label: "Top Notes", value: product.notes.top },
            { label: "Heart Notes", value: product.notes.heart },
            { label: "Base Notes", value: product.notes.base },
          ].map(({ label, value }) => (
            <div key={label} className="mb-3">
              <p className="uppercase font-bold text-[1.2rem] mb-1 tracking-[0.4em] text-[hsl(38,61%,73%)] font-[DM_Sans,sans-serif]">
                {label}
              </p>
              <p className="text-[1.6rem] leading-[1.6] text-[hsla(0,0%,65%,1)] font-[DM_Sans,sans-serif]">
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
    <div
      className="relative flex flex-col rounded-xl p-[30px_20px] min-h-[600px] items-center justify-center cursor-pointer bg-[hsla(210,4%,11%,1)] border border-white/10 transition-all duration-[250ms] hover:border-[hsl(38,61%,73%)]"
      onClick={onClick}
    >
      <div className="group/inner flex flex-col items-center justify-center min-h-[400px] w-full rounded-lg border-2 border-dashed border-white/20 transition-all duration-[250ms] hover:bg-white/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          fill="none"
          viewBox="0 0 512 512"
          className="mb-4 text-[hsl(38,61%,73%)] transition-transform duration-[250ms] group-hover/inner:scale-110"
        >
          <path
            d="M256 112v288M112 256h288"
            stroke="currentColor"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <circle cx="256" cy="256" r="208" stroke="currentColor" strokeWidth="32" />
        </svg>
        <p className="uppercase text-[1.4rem] tracking-[0.4em] text-[hsla(0,0%,65%,1)] font-[DM_Sans,sans-serif]">
          Add Product
        </p>
      </div>
    </div>
  );
}