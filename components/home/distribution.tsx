"use client";
import Link from "next/link";
import Image from "next/image";
import { SectionHeader, Shimmer } from "@/components/ui";

const brands = [
  {
    name: "Fragrance World",
    image: "/images/index-page/brands/FW.png",
    href: "/products?brand=Fragrance+World&available=true",
    badge: "Exclusive Distributor",
  },
  {
    name: "French Avenue",
    image: "/images/index-page/brands/FA.png",
    href: "/products?brand=French+Avenue&available=true",
    badge: "Exclusive Distributor",
  },
  {
    name: "Maison de l'Avenir",
    image: "/images/index-page/brands/Maison.png",
    href: "/products?brand=Maison&available=true",
    badge: "Exclusive Distributor",
  },
  {
    name: "Lattafa",
    image: "/images/index-page/brands/Lattafa.png",
    href: "/products?brand=Lattafa&available=true",
    badge: "Largest Authorized Distributor",
  },
];

export default function Distribution() {
  return (
    <section aria-label="service" className="section-base bg-(--bg-dark)">
      {/* Floating decorative background shapes */}
      <Image
        src="/images/index-page/bg-images/bg-left-v1.png"
        width={350}
        height={412}
        loading="lazy"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute bottom-0 left-0 -z-1 pointer-events-none max-w-max"
        style={{ animation: "moveFloat 5s linear infinite" }}
      />
      <Image
        src="/images/index-page/bg-images/bg-right-v1.png"
        width={343}
        height={345}
        loading="lazy"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute top-0 right-0 -z-1 pointer-events-none max-w-max"
        style={{ animation: "moveFloat 5s linear infinite" }}
      />

      <div className="relative section-container">
        <SectionHeader
          label="Distribution"
          title="Our Brands"
          titleClassName="mb-4"
        />

        <p className="section-body mb-10 max-w-[560] mx-auto">
          We bring the world's most prestigious fragrances directly to you,
          ensuring authenticity, quality, and a luxurious experience with every
          scent.
        </p>

        {/* Brand cards */}
        <ul className="grid gap-10 list-none p-0 m-0 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand, index) => (
            <li
              key={brand.name}
              className={
                index === 0 || index === 3
                  ? "lg:-translate-y-7.5"
                  : "lg:translate-y-7.5"
              }
            >
              <div className="group overflow-hidden">
                <Link
                  href={brand.href}
                  className="relative z-1 block py-7.5 mb-6.5 no-underline overflow-hidden perspective-[600px]"
                >
                  {/* SVG pattern strip */}
                  <span
                    className="
                      absolute top-0 left-1/2 w-35 h-full -z-1
                      bg-[url('/images/patterns/img-pattern.svg')] bg-center bg-cover bg-repeat
                      transform-[translateX(-50%)]
                      [transition:transform_500ms_ease_0ms]
                      group-hover:transform-[rotateY(180deg)_translateX(50%)]
                      group-hover:delay-300
                    "
                    aria-hidden="true"
                  />

                  <figure
                    className="relative overflow-hidden transition-transform duration-500 ease-in-out m-0 group-hover:scale-105 bg-[hsla(0,0%,13%,1)]"
                    style={{ aspectRatio: "285 / 336" }}
                  >
                    <Shimmer />
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={285}
                      height={336}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />

                    {/* Hover badge */}
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-b from-transparent to-black flex items-center justify-center px-3 opacity-0 group-hover:opacity-90 transition-opacity duration-500">
                      <p className="text-center text-[1.1rem] tracking-[1.5px] uppercase font-semibold text-(--gold) line-clamp-2">
                        {brand.badge}
                      </p>
                    </div>
                  </figure>
                </Link>

                <div className="pt-1">
                  <h3 className="card-heading font-normal mb-3 text-[calc(1.6rem+1.2vw)]">
                    <Link
                      href={brand.href}
                      className="no-underline text-inherit"
                    >
                      {brand.name}
                    </Link>
                  </h3>

                  <Link href={brand.href} className="gold-link">
                    View Brand Products
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
