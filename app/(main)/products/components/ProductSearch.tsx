"use client";

type Props = {
  search: string;
  onSearch: (val: string) => void;
};

export default function ProductSearch({ search, onSearch }: Props) {
  return (
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
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by name, brand, or SKU..."
        className="bg-transparent border-none outline-none text-white text-[1.5rem] w-full placeholder:text-white/30"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      />
      {search && (
        <button
          onClick={() => onSearch("")}
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
  );
}
