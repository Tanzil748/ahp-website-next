export default function CareersCTA() {
  return (
    <section
      className="py-24 px-5 relative overflow-hidden"
      style={{ backgroundColor: "hsla(0,0%,6%,0.97)" }}
    >
      {/* Corner accents */}
      <span className="absolute top-0 right-0 w-[140px] h-[140px] opacity-30 pointer-events-none border-t-2 border-r-2 border-[hsl(38,61%,73%)]" />
      <span className="absolute bottom-0 left-0 w-[140px] h-[140px] opacity-30 pointer-events-none border-b-2 border-l-2 border-[hsl(38,61%,73%)]" />

      <div className="max-w-[700px] mx-auto text-center relative z-10">
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 100 12" width="100" height="12">
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

        <h2
          className="font-normal text-white text-[clamp(3rem,4vw,4.5rem)] leading-[1.1] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Don&apos;t See The Right Position?
        </h2>

        <p className="text-[hsla(0,0%,60%,1)] text-[1.6rem] leading-[1.7] mb-12 max-w-[500px] mx-auto">
          We&apos;re always looking for talented individuals. Send us your
          resume and we&apos;ll keep you in mind for future opportunities.
        </p>

        <a
          href="mailto:careers@alhusseinperfumes.com"
          className="group relative inline-flex items-center gap-3 px-10 py-4 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.3em] text-[1.2rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
          <span className="relative z-10">Send Your Resume</span>
          <span className="relative z-10">→</span>
        </a>
      </div>
    </section>
  );
}
