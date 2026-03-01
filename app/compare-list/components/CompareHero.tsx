export default function CompareHero() {
  return (
    <section
      className="relative text-center overflow-hidden"
      style={{
        paddingBlock: "120px 60px",
        background:
          "linear-gradient(180deg, hsla(210,4%,11%,1) 0%, hsla(30,8%,5%,1) 100%)",
      }}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" x="50" y="50" fill="%23c9ab81" opacity="0.1"/></svg>')`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-[1] px-4 max-w-[1200px] mx-auto">
        <p
          className="fade-up delay-1 font-bold uppercase mb-3 text-[hsl(38,61%,73%)] text-[1.2rem] tracking-[0.4em]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Find Your Perfect Scent
        </p>

        <div className="fade-up delay-2 flex justify-center mb-4">
          <img
            src="/images/patterns/seperator.svg"
            alt=""
            width={100}
            height={10}
          />
        </div>

        <h1
          className="fade-up delay-3 text-white font-normal"
          style={{
            fontFamily: "var(--font-forum)",
            fontSize: "calc(2rem + 2.5vw)",
            lineHeight: "1.2em",
          }}
        >
          Compare Fragrances
        </h1>

        <p
          className="fade-up delay-4 mx-auto mt-5 text-[1.6rem] leading-[1.6] text-[hsla(0,0%,65%,1)] max-w-[600px]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Compare up to 3 fragrances side by side to find your ideal signature
          scent
        </p>
      </div>
    </section>
  );
}
