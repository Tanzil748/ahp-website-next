"use client";
import Link from "next/link";
import Image from "next/image";

const brands = [
  {
    name: "Fragrance World",
    image: "/images/index-page/brands/FW.png",
    href: "#",
  },
  {
    name: "French Avenue",
    image: "/images/index-page/brands/FA.png",
    href: "#",
  },
  {
    name: "Maison",
    image: "/images/index-page/brands/Maison.png",
    href: "#",
  },
  {
    name: "Lattafa",
    image: "/images/index-page/brands/Lattafa.jpeg",
    href: "#",
  },
];

export default function Distribution() {
  return (
    <>
      {/*
        CSS-only effects that Tailwind cannot express inline:
          1. .has-before::before  — the SVG pattern strip that flips on hover
          2. .hover-shine::after  — the diagonal shimmer sweep
          3. .btn-text::after     — the double-border underline scale
          4. @keyframes move      — floating shape animation
          5. staggered nth-child transforms on grid items
        Everything else is pure Tailwind below.
      */}
      <style>{`
        /* SVG pattern strip behind card image — flips away on hover */
        .dist-card-link::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 140px;
          height: 100%;
          /* NOTE: files in /public are served at / — never use "public/" */
          background-image: url("/images/patterns/img-pattern.svg");
          background-position: center;
          background-size: cover;
          background-repeat: repeat;
          transition: 500ms ease;
          transition-delay: 0ms;
          z-index: -1;
          will-change: transform;
        }
        .dist-card:is(:hover, :focus-within) .dist-card-link::before {
          transform: rotateY(0.5turn) translateX(50%);
          transition-delay: 300ms;
        }

        /* Diagonal shimmer sweep across card image on hover */
        .dist-card-link::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 50%;
          height: 100%;
          background-image: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 100%);
          transform: skewX(-0.08turn) translateX(-180%);
          pointer-events: none;
          z-index: 2;
        }
        .dist-card:is(:hover, :focus-within) .dist-card-link::after {
          transform: skewX(-0.08turn) translateX(275%);
          transition: 1000ms ease;
        }

        /* Card image zoom on hover */
        .dist-card:is(:hover, :focus-within) .dist-card-banner {
          transform: scale(1.05);
        }

        /* "View Brand Products" double-border underline that scales in */
        .dist-btn-text::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 5px;
          border-top: 1px solid hsl(38, 61%, 73%);
          border-bottom: 1px solid hsl(38, 61%, 73%);
          transform: scaleX(0.2);
          opacity: 0;
          transition: 500ms ease;
        }
        .dist-btn-text:is(:hover, :focus-visible)::after {
          transform: scaleX(1);
          opacity: 1;
        }

        /* Stagger — cards 1 & 4 shift up, 2 & 3 shift down at 992px+ */
        @media (min-width: 992px) {
          .dist-grid > li:nth-child(1),
          .dist-grid > li:nth-child(4) { transform: translateY(-30px); }
          .dist-grid > li:nth-child(2),
          .dist-grid > li:nth-child(3) { transform: translateY(30px);  }
        }

        /* Floating shape animation */
        @keyframes moveFloat {
          0%, 100% { transform: translateY(0);    }
          50%       { transform: translateY(30px); }
        }
        .move-anim { animation: moveFloat 5s linear infinite; }
      `}</style>

      {/* ── Section — .section .service .bg-black-10 .text-center ── */}
      <section
        aria-label="service"
        className="relative overflow-hidden z-[1] text-center py-[70px] lg:py-[100px]"
        style={{ backgroundColor: "hsla(30, 8%, 5%, 1)" }}
      >
        {/* ── Decorative floating shapes — OUTSIDE container so they reach page edges ── */}
          <Image
            src="/images/index-page/bg-images/bg-left-v1.png"
            width={350}
            height={412}
            loading="lazy"
            alt=""
            aria-hidden="true"
            className="move-anim hidden lg:block absolute bottom-0 left-0 -z-[1] pointer-events-none max-w-max"
          />
          <Image
            src="/images/index-page/bg-images/bg-right-v1.png"
            width={343}
            height={345}
            loading="lazy"
            alt=""
            aria-hidden="true"
            className="move-anim hidden lg:block absolute top-0 right-0 -z-[1] pointer-events-none max-w-max"
          />

        <div className="relative px-4 max-w-[1200px] mx-auto">

          {/* ── Section subtitle ── */}
          {/*
            Gold uppercase label with wide letter-spacing.
            The wavy SVG line underneath is rendered via an inline SVG
            since Tailwind can't do ::after content with background-image.
          */}
          <p
            className="font-bold uppercase text-[1.2rem] mb-3"
            style={{
              color: "hsl(38, 61%, 73%)",
              fontFamily: '"DM Sans", sans-serif',
              letterSpacing: "0.4em",
            }}
          >
            Distribution
          </p>
          {/* Decorative wavy separator line under subtitle */}
          <div className="flex justify-center mb-3">
            <svg width="100" height="10" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 5 Q12.5 0 25 5 Q37.5 10 50 5 Q62.5 0 75 5 Q87.5 10 100 5"
                stroke="hsl(38, 61%, 73%)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          {/* ── Section title — .headline-1 Forum font ── */}
          <h2
            className="font-normal leading-[1.2] mb-4 text-white"
            style={{
              fontFamily: '"Forum", cursive',
              fontSize: "calc(2rem + 2.5vw)",
            }}
          >
            Authorized Largest Distributor
          </h2>

          {/* ── Section description ── */}
          <p
            className="text-white leading-[1.6] mb-10 max-w-[560px] mx-auto text-[1.6rem]"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            We bring the world&apos;s most prestigious fragrances directly to you,
            ensuring authenticity, quality, and a luxurious experience with every scent.
          </p>

          {/* ── Brand cards grid ── */}
          {/*
            1 col mobile → 2 col 768px → 4 col 992px
            nth-child stagger applied via .dist-grid CSS above
          */}
          <ul className="dist-grid grid gap-10 list-none p-0 m-0 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand) => (
              <li key={brand.name}>
                <div className="dist-card overflow-hidden">

                  {/*
                    .has-before — the pattern strip + shimmer wrapper.
                    position:relative + z-[1] creates the stacking context
                    that ::before/-after pseudo-elements are placed inside.
                  */}
                  <Link
                    href={brand.href}
                    className="dist-card-link relative z-[1] block py-[30px] mb-[26px] no-underline"
                  >
                    {/* Card image — .card-banner .img-holder */}
                    <figure
                      className="dist-card-banner overflow-hidden transition-transform duration-500 ease-in-out m-0"
                      style={{
                        aspectRatio: "285 / 336",
                        backgroundColor: "hsla(0, 0%, 13%, 1)",
                      }}
                    >
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={285}
                        height={336}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </figure>
                  </Link>

                  {/* Card text content */}
                  <div className="pt-1">

                    {/* Brand name — .title-4 Forum font */}
                    <h3
                      className="font-normal leading-[1.2] mb-3 text-white"
                      style={{
                        fontFamily: '"Forum", cursive',
                        fontSize: "calc(1.6rem + 1.2vw)",
                      }}
                    >
                      <Link
                        href={brand.href}
                        className="no-underline"
                        style={{ color: "inherit" }}
                      >
                        {brand.name}
                      </Link>
                    </h3>

                    {/*
                      "View Brand Products" — .btn-text + .hover-underline
                      The double-border scale effect is in the <style> block above
                      because Tailwind can't animate ::after pseudo-elements.
                    */}
                    <Link
                      href={brand.href}
                      className="dist-btn-text relative inline-block pb-1 uppercase font-bold text-[1.2rem] no-underline transition-colors duration-[250ms]"
                      style={{
                        color: "hsl(38, 61%, 73%)",
                        fontFamily: '"DM Sans", sans-serif',
                        letterSpacing: "0.2em",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "hsla(0, 0%, 100%, 1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "hsl(38, 61%, 73%)")
                      }
                    >
                      View Brand Products
                    </Link>

                  </div>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </section>
    </>
  );
}