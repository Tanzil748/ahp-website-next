"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui";

const products = [
  { name: "Product One", image: "/images/index-page/collections/1.png" },
  { name: "Product Two", image: "/images/index-page/collections/2.png" },
  { name: "Product Three", image: "/images/index-page/collections/3.png" },
  { name: "Product Four", image: "/images/index-page/collections/4.png" },
  { name: "Product Five", image: "/images/index-page/collections/5.png" },
  { name: "Product Six", image: "/images/index-page/collections/6.png" },
];

export default function NewArrivals() {
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
          label="New Arrivals"
          title="Our Latest Products"
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
            {products.map((product) => (
              <li key={product.name} className="carousel-item">
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
