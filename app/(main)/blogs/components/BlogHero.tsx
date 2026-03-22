export default function BlogHero() {
  return (
    <div className="pt-[150px] px-5 sm:px-8 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <span className="gold-diamond" />
        <span className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[4px] text-[1.1rem]">
          Insights & Stories
        </span>
        <span className="gold-diamond" />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1
            className="text-[4rem] sm:text-[5.5rem] font-normal text-white leading-none tracking-tight mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Blog
          </h1>
          <p className="text-white/50 text-[1.4rem] max-w-xl">
            Discover the art of perfumery, fragrance trends, and our events.
          </p>
        </div>
      </div>
    </div>
  );
}
