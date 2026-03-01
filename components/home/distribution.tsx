"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

const brands = [
  { name: "Fragrance World", image: "/images/index-page/brands/FW.png",      href: "#" },
  { name: "French Avenue",   image: "/images/index-page/brands/FA.png",       href: "#" },
  { name: "Maison",          image: "/images/index-page/brands/Maison.png",   href: "#" },
  { name: "Lattafa",         image: "/images/index-page/brands/Lattafa.jpeg", href: "#" },
];

// Injects the @keyframes once into <head> — no style tags in JSX, no global CSS, no tailwind.config change
function useFloatKeyframe() {
  useEffect(() => {
    const id = "dist-float-keyframe";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      @keyframes moveFloat {
        0%, 100% { transform: translateY(0px);  }
        50%       { transform: translateY(30px); }
      }
    `;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);
}

export default function Distribution() {
  useFloatKeyframe();

  return (
    <section
      aria-label="service"
      className="relative overflow-hidden z-[1] text-center py-[70px] lg:py-[100px] bg-[hsla(30,8%,5%,1)]"
    >
      {/* ── Floating decorative background shapes ── */}
      <Image
        src="/images/index-page/bg-images/bg-left-v1.png"
        width={350}
        height={412}
        loading="lazy"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute bottom-0 left-0 -z-[1] pointer-events-none max-w-max"
        style={{ animation: "moveFloat 5s linear infinite" }}
      />
      <Image
        src="/images/index-page/bg-images/bg-right-v1.png"
        width={343}
        height={345}
        loading="lazy"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute top-0 right-0 -z-[1] pointer-events-none max-w-max"
        style={{ animation: "moveFloat 5s linear infinite" }}
      />

      <div className="relative px-4 max-w-[1200px] mx-auto">

        {/* ── Subtitle ── */}
        <p className="font-bold uppercase text-[1.2rem] mb-3 text-[hsl(38,61%,73%)] [font-family:'DM_Sans',sans-serif] tracking-[0.4em]">
          Distribution
        </p>

        {/* ── Wavy separator ── */}
        <div className="flex justify-center mb-3">
          <Image
            src="/images/patterns/separator.svg"
            width={100}
            height={10}
            alt=""
            aria-hidden="true"
          />
        </div>

        {/* ── Title ── */}
        <h2 className="font-normal leading-[1.2] mb-4 text-white [font-family:'Forum',cursive] text-[calc(2rem+2.5vw)]">
          Authorized Largest Distributor
        </h2>

        {/* ── Description ── */}
        <p className="text-white leading-[1.6] mb-10 max-w-[560px] mx-auto text-[1.6rem] [font-family:'DM_Sans',sans-serif]">
          We bring the world&apos;s most prestigious fragrances directly to you,
          ensuring authenticity, quality, and a luxurious experience with every scent.
        </p>

        {/* ── Brand cards grid ── */}
        <ul className="grid gap-10 list-none p-0 m-0 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand, index) => {
            const staggerClass =
              index === 0 || index === 3
                ? "lg:-translate-y-[30px]"
                : "lg:translate-y-[30px]";

            return (
              <li key={brand.name} className={staggerClass}>
                <div className="group overflow-hidden">

                  {/* Card image link */}
                  <Link
                    href={brand.href}
                    className="relative z-[1] block py-[30px] mb-[26px] no-underline overflow-hidden [perspective:600px]"
                  >
                    {/* SVG pattern strip — rotateY flips away on hover */}
                    <span
                      className="
                        absolute top-0 left-1/2 w-[140px] h-full -z-[1]
                        bg-[url('/images/patterns/img-pattern.svg')] bg-center bg-cover bg-repeat
                        [transform:translateX(-50%)]
                        [transition:transform_500ms_ease_0ms]
                        group-hover:[transform:rotateY(180deg)_translateX(50%)]
                        group-hover:[transition-delay:300ms]
                      "
                      aria-hidden="true"
                    />

                    {/* Card image — zooms on hover */}
                    <figure
                      className="relative overflow-hidden transition-transform duration-500 ease-in-out m-0 group-hover:scale-105 bg-[hsla(0,0%,13%,1)]"
                      style={{ aspectRatio: "285 / 336" }}
                    >
                      {/* Diagonal shimmer sweep — clipped to image bounds */}
                      <span
                        className="
                          absolute top-0 left-0 w-1/2 h-full pointer-events-none z-[2]
                          bg-gradient-to-r from-transparent to-white/40
                          -skew-x-[4.6deg] -translate-x-[180%]
                          group-hover:translate-x-[275%] group-hover:transition-transform group-hover:duration-1000 group-hover:ease-in-out
                        "
                        aria-hidden="true"
                      />
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

                  {/* Card text */}
                  <div className="pt-1">
                    <h3 className="font-normal leading-[1.2] mb-3 text-white [font-family:'Forum',cursive] text-[calc(1.6rem+1.2vw)]">
                      <Link href={brand.href} className="no-underline text-inherit">
                        {brand.name}
                      </Link>
                    </h3>

                    {/* "View Brand Products" — double-border underline scales in */}
                    <Link
                      href={brand.href}
                      className="
                        relative inline-block pb-1 uppercase font-bold text-[1.2rem] no-underline
                        text-[hsl(38,61%,73%)] hover:text-white transition-colors duration-[250ms]
                        [font-family:'DM_Sans',sans-serif] tracking-[0.2em]
                        after:content-[''] after:absolute after:left-0 after:bottom-0
                        after:w-full after:h-[5px]
                        after:border-t after:border-b after:border-[hsl(38,61%,73%)]
                        after:scale-x-[0.2] after:opacity-0
                        after:transition-all after:duration-500
                        hover:after:scale-x-100 hover:after:opacity-100
                      "
                    >
                      View Brand Products
                    </Link>
                  </div>

                </div>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}