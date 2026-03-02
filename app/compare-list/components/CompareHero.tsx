import Image from "next/image";

export default function CompareHero() {
  return (
    <section className="relative text-center overflow-hidden pt-[120px] pb-[60px] bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-dark)]">
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' x='50' y='50' fill='%23c9ab81' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: "50px 50px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[1] px-4 max-w-[1200px] mx-auto">
        <p className="section-label mb-3 fade-up delay-1">
          Find Your Perfect Scent
        </p>

        <div className="flex justify-center mb-3 fade-up delay-2">
          <Image
            src="/images/patterns/separator.svg"
            width={100}
            height={10}
            alt=""
            aria-hidden="true"
          />
        </div>

        <h1 className="text-white font-normal [font-family:var(--font-display)] text-[calc(2rem+2.5vw)] leading-[1.2em] fade-up delay-3">
          Compare Fragrances
        </h1>

        <p className="mx-auto mt-5 text-[1.6rem] leading-[1.6] text-[var(--text-muted)] max-w-[600px] fade-up delay-4">
          Compare up to 3 fragrances side by side to find your ideal signature
          scent
        </p>
      </div>
    </section>
  );
}
