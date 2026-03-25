"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui";

const products = [
  { name: "Spectre Collection", image: "/images/index-page/collections/1.png" },
  { name: "Sultan Collection", image: "/images/index-page/collections/2.png" },
  { name: "Trilogy Collection", image: "/images/index-page/collections/3.png" },
  { name: "Veneno Collection", image: "/images/index-page/collections/4.png" },
  {
    name: "Signature Collection",
    image: "/images/index-page/collections/5.png",
  },
  { name: "Vulcan Collection", image: "/images/index-page/collections/6.png" },
  {
    name: "Royal Blend Collection",
    image: "/images/index-page/collections/7.png",
  },
  {
    name: "Prive Series Collection",
    image: "/images/index-page/collections/8.png",
  },
  { name: "Nudo Collection", image: "/images/index-page/collections/9.png" },
  {
    name: "Pinnace Collection",
    image: "/images/index-page/collections/10.png",
  },
  { name: "Notes Collection", image: "/images/index-page/collections/11.png" },
  {
    name: "Moonstone Collection",
    image: "/images/index-page/collections/12.png",
  },
  { name: "Just Collection", image: "/images/index-page/collections/13.png" },
  { name: "Expose Collection", image: "/images/index-page/collections/14.png" },
  {
    name: "An Equestrian Series Collection",
    image: "/images/index-page/collections/15.png",
  },
  { name: "Enigma Collection", image: "/images/index-page/collections/16.png" },
  { name: "Coffee Collection", image: "/images/index-page/collections/17.png" },
  {
    name: "Champion Collection",
    image: "/images/index-page/collections/18.png",
  },
  {
    name: "Bavaria Collection",
    image: "/images/index-page/collections/19.png",
  },
  {
    name: "Artisan Collection",
    image: "/images/index-page/collections/20.png",
  },
  {
    name: "Riche & Royale Collection",
    image: "/images/index-page/collections/21.png",
  },
  {
    name: "After Hours Collection",
    image: "/images/index-page/collections/22.png",
  },
  {
    name: "Super Nova Collection",
    image: "/images/index-page/collections/23.png",
  },
  {
    name: "Elixir Collection",
    image: "/images/index-page/collections/24.png",
  },
  {
    name: "Zenith Collection",
    image: "/images/index-page/collections/25.png",
  },
  {
    name: "Aura Collection",
    image: "/images/index-page/collections/26.png",
  },
  {
    name: "Jade Collection",
    image: "/images/index-page/collections/27.png",
  },
  {
    name: "Zenith Collection",
    image: "/images/index-page/collections/28.png",
  },
  {
    name: "FA Paris Collection",
    image: "/images/index-page/collections/29.png",
  },
  {
    name: "Mochi Collection",
    image: "/images/index-page/collections/30.png",
  },
  {
    name: "Gourmand Trio Collection",
    image: "/images/index-page/collections/31.jpeg",
  },
  {
    name: "Day & Night Collection",
    image: "/images/index-page/collections/32.png",
  },
  {
    name: "Luxury Trio Collection",
    image: "/images/index-page/collections/33.png",
  },
  {
    name: "Power Collection",
    image: "/images/index-page/collections/34.png",
  },
  {
    name: "The Card Collection",
    image: "/images/index-page/collections/35.png",
  },
  {
    name: "Lumiere Collection",
    image: "/images/index-page/collections/36.png",
  },
  {
    name: "Minister of Oud Collection",
    image: "/images/index-page/collections/37.png",
  },
  {
    name: "Haya Collection",
    image: "/images/index-page/collections/39.png",
  },
  {
    name: "Hayaati Collection",
    image: "/images/index-page/collections/40.png",
  },
  {
    name: "Divin Collection",
    image: "/images/index-page/collections/41.png",
  },
  {
    name: "Aromatix Collection",
    image: "/images/index-page/collections/42.png",
  },
  {
    name: "Fame Collection",
    image: "/images/index-page/collections/43.png",
  },
  {
    name: "Asdaaf Collection",
    image: "/images/index-page/collections/44.png",
  },
  {
    name: "Unique Collection",
    image: "/images/index-page/collections/45.png",
  },
  {
    name: "Teriaq Collection",
    image: "/images/index-page/collections/46.png",
  },
  {
    name: "Gracious Collection",
    image: "/images/index-page/collections/47.png",
  },
  {
    name: "Hunters Collection",
    image: "/images/index-page/collections/48.png",
  },
  {
    name: "Barakkat Collection",
    image: "/images/index-page/collections/49.png",
  },
  {
    name: "Spooky Series",
    image: "/images/index-page/collections/50.png",
  },
  {
    name: "Genesis Collection",
    image: "/images/index-page/collections/51.png",
  },
  {
    name: "External Love Collection",
    image: "/images/index-page/collections/53.png",
  },
];

export default function LatestCollections() {
  const trackRef = useRef<HTMLUListElement>(null!);
  const viewportRef = useRef<HTMLDivElement>(null!);
  const nextBtnRef = useRef<HTMLButtonElement>(null!);
  const prevBtnRef = useRef<HTMLButtonElement>(null!);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const nextBtn = nextBtnRef.current;
    const prevBtn = prevBtnRef.current;

    const originalCount = products.length;
    while (track.children.length > originalCount) {
      track.removeChild(track.lastChild!);
    }

    const originals = Array.from(track.children) as HTMLElement[];
    originals.forEach((item) => track.appendChild(item.cloneNode(true)));

    let itemWidth = originals[0].offsetWidth;
    let setWidth = originals.length * itemWidth;
    const ro = new ResizeObserver(() => {
      itemWidth = originals[0].offsetWidth;
      setWidth = originals.length * itemWidth;
    });
    ro.observe(track);

    let offset = 0;
    const speed = 0.7;
    let paused = false;
    let pauseTimer: ReturnType<typeof setTimeout>;
    let rafId: number;

    function loop() {
      if (!paused) offset -= speed;
      if (offset <= -setWidth) offset += setWidth;
      if (offset >= 0) offset -= setWidth;
      track.style.transform = `translateX(${offset}px)`;
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    const pauseAfterClick = () => {
      paused = true;
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => {
        paused = false;
      }, 500);
    };
    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    viewport.addEventListener("mouseenter", onEnter);
    viewport.addEventListener("mouseleave", onLeave);

    const onNext = () => {
      offset -= itemWidth;
      pauseAfterClick();
    };
    const onPrev = () => {
      offset += itemWidth;
      pauseAfterClick();
    };
    nextBtn?.addEventListener("click", onNext);
    prevBtn?.addEventListener("click", onPrev);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(pauseTimer);
      ro.disconnect();
      track.style.transform = "";
      while (track.children.length > originalCount) {
        track.removeChild(track.lastChild!);
      }
      viewport.removeEventListener("mouseenter", onEnter);
      viewport.removeEventListener("mouseleave", onLeave);
      nextBtn?.removeEventListener("click", onNext);
      prevBtn?.removeEventListener("click", onPrev);
    };
  }, []);

  return (
    <div className="section-base bg-[var(--bg-section)]">
      <div className="section-container">
        <SectionHeader
          label="Collections"
          title="Our Latest Collections"
          titleClassName="mb-10"
        />
      </div>

      <div className="relative w-full max-w-container mx-auto flex items-center px-4">
        <button
          ref={prevBtnRef}
          aria-label="Previous products"
          className="carousel-arrow"
        >
          &#10094;
        </button>

        <div ref={viewportRef} className="overflow-hidden w-full">
          <ul ref={trackRef} className="carousel-track">
            {products.map((product, index) => (
              <li key={`${product.name}-${index}`} className="carousel-item">
                <div className="text-center rounded-[12px] p-[20px] bg-[#111]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={285}
                    height={285}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                  <h3 className="mt-[15px] text-white text-[1.6rem] [font-family:var(--font-primary)]">
                    {product.name}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          ref={nextBtnRef}
          aria-label="Next products"
          className="carousel-arrow"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
