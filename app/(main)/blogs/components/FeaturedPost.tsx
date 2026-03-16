export default function FeaturedPost() {
  return (
    <section className="py-20 px-5">
      <div className="max-w-[1200px] mx-auto">
        {/* Section title */}
        <div className="fade-up delay-2 text-center mb-3">
          <span className="text-[hsl(38,61%,73%)] uppercase font-bold tracking-[0.4em] font-[var(--font-forum)] text-[2.2rem]">
            Featured Post
          </span>
          <svg
            viewBox="0 0 100 12"
            width="100"
            height="12"
            className="block mx-auto mt-[5px]"
          >
            <line
              x1="0"
              y1="6"
              x2="38"
              y2="6"
              stroke="hsl(38,61%,73%)"
              strokeWidth="1"
            />
            <rect
              x="44"
              y="2"
              width="8"
              height="8"
              transform="rotate(45 48 6)"
              fill="none"
              stroke="hsl(38,61%,73%)"
              strokeWidth="1"
            />
            <line
              x1="58"
              y1="6"
              x2="100"
              y2="6"
              stroke="hsl(38,61%,73%)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Card */}
        <div className="fade-up delay-2 mt-8 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(38,61%,73%)]">
          {/* Image placeholder */}
          <div className="relative bg-[hsla(0,0%,13%,1)] min-h-[280px] md:min-h-[360px] flex items-center justify-center overflow-hidden">
            <span className="absolute top-4 left-4 bg-[hsl(38,61%,73%)] text-[hsla(40,12%,5%,1)] text-xs font-bold uppercase tracking-[2px] px-3 py-1.5">
              Featured
            </span>
            <span className="text-white/10 text-2xl font-bold uppercase tracking-[0.2em] font-[var(--font-forum)]">
              Featured Post
            </span>
          </div>

          {/* Content */}
          <div className="bg-[hsla(210,4%,11%,1)] flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:px-[55px] md:py-[50px]">
            <div className="flex flex-wrap items-center gap-3 mb-5 text-[1.3rem]">
              <span className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.15em]">
                Fragrance Trends
              </span>
              <span className="inline-block w-2 h-2 border border-[hsl(38,61%,73%)] rotate-45 shrink-0" />
              <time className="text-[hsla(0,0%,65%,1)]">February 5, 2026</time>
            </div>

            <h2 className="font-normal text-white mb-5 font-[var(--font-forum)] text-[clamp(2.4rem,3vw,3.4rem)] leading-[1.3]">
              The Evolution of Luxury Fragrances: What&apos;s Trending in 2026
            </h2>

            <p className="text-[hsla(0,0%,65%,1)] mb-8 text-[1.6rem] leading-[1.85]">
              Explore the latest trends shaping the luxury perfume industry,
              from sustainable ingredients to personalized scent experiences.
              Discover how modern perfumery is blending tradition with
              innovation.
            </p>

            <div className="w-14 h-px bg-[hsl(38,61%,73%)] opacity-60 mb-7" />

            <a
              href="#"
              className="self-start inline-flex items-center gap-2 text-[hsl(38,61%,73%)] font-bold uppercase tracking-[3px] no-underline transition-[gap] duration-300 hover:gap-4 text-[1.2rem]"
            >
              <span>Read More</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
