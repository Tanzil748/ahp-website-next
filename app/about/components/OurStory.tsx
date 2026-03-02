"use client";

function OrnamentalSep({ align = "center" }: { align?: "center" | "left" }) {
  return (
    <svg
      viewBox="0 0 100 12"
      width="100"
      height="12"
      className={`block mt-[5px] ${align === "center" ? "mx-auto" : "mx-0"}`}
    >
      <line x1="0" y1="6" x2="38" y2="6" stroke="var(--gold)" strokeWidth="1" />
      <rect
        x="44"
        y="2"
        width="8"
        height="8"
        transform="rotate(45 48 6)"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1"
      />
      <line
        x1="58"
        y1="6"
        x2="100"
        y2="6"
        stroke="var(--gold)"
        strokeWidth="1"
      />
    </svg>
  );
}

function SectionSubtitle({
  children,
  center = true,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`mb-3 ${center ? "text-center" : "text-left"}`}>
      <span className="page-section-title text-[1.6rem] sm:text-[1.9rem] md:text-[2.2rem]">
        {children}
      </span>
      <OrnamentalSep align={center ? "center" : "left"} />
    </div>
  );
}

export default function OurStory() {
  return (
    <section className="relative min-h-screen py-10 sm:py-14 md:py-[70px] overflow-hidden bg-[var(--bg-section)] flex items-center">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-[70px]">
          {/* Text side */}
          <div className="flex-1 min-w-0 w-full text-center md:text-left">
            <SectionSubtitle center={false}>Our Story</SectionSubtitle>

            <p className="body-muted text-[1.45rem] sm:text-[1.6rem] md:text-[1.7rem] mt-5 sm:mt-7">
              With years of experience and a passion for authentic, luxurious
              scents, we have built a reputation for providing the finest
              quality perfumes to retailers and businesses across the USA and
              beyond. We understand the unique needs of the fragrance industry
              and pride ourselves on being a reliable and efficient supplier.
            </p>

            <p className="body-muted text-[1.45rem] sm:text-[1.6rem] md:text-[1.7rem] mt-4 sm:mt-5">
              Our strong relationships with renowned perfume makers and our
              in-depth knowledge of the market ensure that our clients receive
              the best products at competitive prices. Whether you&apos;re
              looking to stock your store with iconic scents or seeking
              exclusive, high-end perfumes, Al Hussein Perfumes is your go-to
              source for premium wholesale fragrance solutions.
            </p>

            {/* Gold rule */}
            <div className="gold-rule w-[50px] sm:w-[60px] opacity-70 my-5 sm:my-7 mx-auto md:mx-0" />

            <p className="text-[1.45rem] sm:text-[1.55rem] md:text-[1.6rem] text-[var(--gold)] italic tracking-[0.05em] [font-family:var(--font-display)]">
              Join us in sharing the beauty and elegance of Arab perfumes with
              the world.
            </p>
          </div>

          {/* Image side */}
          <div className="group flex-1 min-w-0 w-full relative overflow-hidden">
            <div className="absolute inset-[10px] sm:inset-[14px] border border-[var(--gold)] pointer-events-none z-10 opacity-[0.35] transition-opacity duration-500 group-hover:opacity-60" />
            <img
              src="/images/about-page/booth_pic.jpg"
              alt="Fragrance Crafting"
              className="w-full h-[260px] sm:h-[360px] md:h-[540px] object-cover block transition-transform duration-[600ms] group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
