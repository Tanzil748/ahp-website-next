"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const products = [
  { name: "Product One",   image: "/images/index-page/collections/1.png" },
  { name: "Product Two",   image: "/images/index-page/collections/2.png" },
  { name: "Product Three", image: "/images/index-page/collections/3.png" },
  { name: "Product Four",  image: "/images/index-page/collections/4.png" },
  { name: "Product Five",  image: "/images/index-page/collections/5.png" },
  { name: "Product Six",   image: "/images/index-page/collections/6.png" },
];

export default function NewArrivals() {
  const trackRef    = useRef<HTMLUListElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track    = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    /* ── 1. Duplicate all items for seamless infinite wrap ── */
    const originals = Array.from(track.children) as HTMLElement[];
    originals.forEach((item) => track.appendChild(item.cloneNode(true)));

    /* ── 2. Measurements ── */
    const itemWidth = originals[0].offsetWidth;
    const setWidth  = originals.length * itemWidth; // width of ONE full set

    /* ── 3. State ── */
    let offset     = 0;
    const speed    = 0.7;          // px per frame — matches original
    let paused     = false;
    let pauseTimer: ReturnType<typeof setTimeout>;
    let rafId: number;

    /* ── 4. Animation loop — exact port of original JS ── */
    function loop() {
      if (!paused) {
        offset -= speed;
      }

      // seamless infinite wrap
      if (offset <= -setWidth) offset += setWidth;
      if (offset >= 0)         offset -= setWidth;

      track.style.transform = `translateX(${offset}px)`;
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    /* ── 5. Pause helper — resumes 500 ms after click ── */
    function pauseAfterClick() {
      paused = true;
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => { paused = false; }, 500);
    }

    /* ── 6. Hover pause ── */
    const onEnter = () => { paused = true;  };
    const onLeave = () => { paused = false; };
    viewport.addEventListener("mouseenter", onEnter);
    viewport.addEventListener("mouseleave", onLeave);

    /* ── 7. Button handlers — shift by one item width ── */
    const nextBtn = document.querySelector<HTMLButtonElement>("[data-carousel-next]");
    const prevBtn = document.querySelector<HTMLButtonElement>("[data-carousel-prev]");

    const onNext = () => { offset -= itemWidth; pauseAfterClick(); };
    const onPrev = () => { offset += itemWidth; pauseAfterClick(); };

    nextBtn?.addEventListener("click", onNext);
    prevBtn?.addEventListener("click", onPrev);

    /* ── 8. Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(pauseTimer);
      viewport.removeEventListener("mouseenter", onEnter);
      viewport.removeEventListener("mouseleave", onLeave);
      nextBtn?.removeEventListener("click", onNext);
      prevBtn?.removeEventListener("click", onPrev);
    };
  }, []);

  return (
    <>
      <style>{`
        /* .carousel-track — no CSS transition, JS drives the transform directly */
        .carousel-track {
          display: flex;
          will-change: transform;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        /* .carousel-item — 4 visible default, 2 at ≤1024px, 1 at ≤600px */
        .carousel-item {
          flex: 0 0 25%;
          padding: 15px;
          box-sizing: border-box;
        }
        @media (max-width: 1024px) { .carousel-item { flex: 0 0 50%;  } }
        @media (max-width: 600px)  { .carousel-item { flex: 0 0 100%; } }

        /* .carousel-arrow hover — gold colour */
        .carousel-arrow:hover { color: gold; }
      `}</style>

      {/* .section .about .text-center */}
      <div
        className="relative overflow-hidden z-[1] text-center py-[70px] lg:py-[100px]"
        style={{ backgroundColor: "hsla(210, 4%, 9%, 1)" }}
      >
        <div className="px-4 max-w-[1200px] mx-auto">

          {/* .section-subtitle */}
          <p
            className="font-bold uppercase mb-3 text-[1.2rem]"
            style={{
              color: "hsl(38, 61%, 73%)",
              fontFamily: '"DM Sans", sans-serif',
              letterSpacing: "0.4em",
            }}
          >
            New Arrivals
          </p>

          {/* Wavy SVG separator */}
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

          {/* .headline-1 .section-title */}
          <h2
            className="font-normal leading-[1.2] mb-10 text-white"
            style={{
              fontFamily: '"Forum", cursive',
              fontSize: "calc(2rem + 2.5vw)",
            }}
          >
            Our Latest Products
          </h2>

        </div>

        {/* .carousel-section */}
        <div className="relative w-full max-w-[1200px] mx-auto flex items-center px-4">

          {/* Prev button */}
          <button
            data-carousel-prev
            aria-label="Previous products"
            className="carousel-arrow shrink-0 bg-transparent border-none text-white text-[40px] cursor-pointer z-[2] px-[10px] transition-colors duration-200"
          >
            &#10094;
          </button>

          {/* .carousel-viewport — overflow hidden, hover pauses scroll */}
          <div ref={viewportRef} className="overflow-hidden w-full">
            <ul ref={trackRef} className="carousel-track">
              {products.map((product) => (
                <li key={product.name} className="carousel-item">
                  <div
                    className="text-center rounded-[12px] p-[20px]"
                    style={{ background: "#111" }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={285}
                      height={285}
                      loading="lazy"
                      className="w-full h-auto"
                    />
                    <h3
                      className="mt-[15px] text-white"
                      style={{
                        fontSize: "16px",
                        fontFamily: '"DM Sans", sans-serif',
                      }}
                    >
                      {product.name}
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Next button */}
          <button
            data-carousel-next
            aria-label="Next products"
            className="carousel-arrow shrink-0 bg-transparent border-none text-white text-[40px] cursor-pointer z-[2] px-[10px] transition-colors duration-200"
          >
            &#10095;
          </button>

        </div>
      </div>
    </>
  );
}