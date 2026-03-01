"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { DM_Sans, Forum } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const forum = Forum({ subsets: ["latin"], weight: "400" });

const slides = [
  {
    image: "/images/index-page/hero-banners/1.png",
    subtitle: "Timeless Elegance",
    title: ["Discover Your", "Signature Scent"],
    text: "Timeless fragrances crafted to match every mood and moment.",
  },
  {
    image: "/images/index-page/hero-banners/2.png",
    subtitle: "Lasting Impressions",
    title: ["More Than", "a Fragrance"],
    text: "Each scent is designed to leave a lasting impression wherever you go.",
  },
  {
    image: "/images/index-page/hero-banners/3.png",
    subtitle: "Bold Identity",
    title: ["Unforgettable", "Starts Here"],
    text: "Bold, refined perfumes made for those who stand out.",
  },
  {
    image: "/images/index-page/hero-banners/4.png",
    subtitle: "Scent Reverie",
    title: ["Flavors For", "All Seasons"],
    text: "Embrace a collection of fragrances crafted to delight every moment of the year.",
  },
];

// Injects only the keyframes + slider reveal classes needed for text animations —
// identical to the original CSS logic, just injected via useEffect instead of a style tag.
function useHeroKeyframes() {
  useEffect(() => {
    const id = "hero-keyframes";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      @keyframes smoothScale {
        0%   { transform: scale(1);    }
        100% { transform: scale(1.15); }
      }
      @keyframes sliderReveal {
        0%   { transform: translateY(30px); opacity: 0; }
        100% { transform: translateY(0);    opacity: 1; }
      }
      .slider-reveal {
        transform: translateY(30px);
        opacity: 0;
      }
      .slider-item.active .slider-reveal {
        animation: sliderReveal 1s ease forwards;
      }
      .slider-item.active .hero-subtitle  { animation-delay: 500ms;  }
      .slider-item.active .hero-title     { animation-delay: 1000ms; }
      .slider-item.active .hero-body      { animation-delay: 1500ms; }
      .slider-item.active .hero-cta       { animation-delay: 2000ms; }
    `;
    document.head.appendChild(el);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);
}

export default function HeroSlider() {
  useHeroKeyframes();

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // mounted drives nav button slide-in only
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(((index % slides.length) + slides.length) % slides.length);
        setAnimating(false);
      }, 100);
    },
    [animating],
  );

  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(t);
  }, [current, goTo]);

  return (
    <section
      id="home"
      aria-label="home"
      className="relative min-h-screen overflow-hidden py-[120px]"
    >
      {/* ── Slides ── */}
      {slides.map((slide, i) => {
        const isActive = i === current;

        return (
          <div
            key={i}
            className={`slider-item${isActive ? " active" : ""} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full grid place-content-center pt-[100px] text-center z-[1] transition-[opacity,visibility] duration-1000`}
            style={{
              opacity: isActive ? 1 : 0,
              visibility: isActive ? "visible" : "hidden",
            }}
          >
            {/* Background image — Ken Burns zoom on active */}
            <div
              className="absolute inset-0 -z-[1] pointer-events-none select-none brightness-[0.4]"
              style={{
                animation: isActive ? "smoothScale 7s linear forwards" : "none",
                transform: isActive ? undefined : "scale(1.15)",
              }}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>

            {/* Subtitle — .slider-reveal + staggered delay via .hero-subtitle */}
            <p
              className={`hero-subtitle slider-reveal relative ${dmSans.className} font-bold uppercase text-[1.2rem] tracking-[0.4em] text-[hsl(38,61%,73%)] mb-3`}
            >
              {slide.subtitle}
              <span className="block mx-auto mt-[14px] mb-[20px] w-[100px] h-[10px]">
                <Image
                  src="/images/patterns/separator.svg"
                  width={100}
                  height={10}
                  alt=""
                  aria-hidden="true"
                />
              </span>
            </p>

            {/* Title */}
            <h1
              className={`hero-title slider-reveal ${forum.className} font-normal text-white leading-[1em] text-[calc(1.3rem+6.7vw)] mb-0`}
            >
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h1>

            {/* Body text */}
            <p
              className={`hero-body slider-reveal ${dmSans.className} text-white leading-[1.6em] mt-[10px] mb-[40px] max-w-[520px] mx-auto text-[1.6rem] sm:text-[2rem]`}
            >
              {slide.text}
            </p>

            {/* CTA Button */}
            <Link
              href="/products"
              className={`hero-cta slider-reveal group relative isolate mx-auto block max-w-max overflow-hidden border-2 border-[hsl(38,61%,73%)] px-[45px] py-[12px] text-[hsl(38,61%,73%)] ${dmSans.className} font-bold uppercase text-[1.2rem] tracking-[3px] no-underline`}
            >
              {/* Circle fill that wipes up from bottom on hover */}
              <span
                className="absolute bottom-full left-1/2 -translate-x-1/2 w-[200%] h-[200%] rounded-full bg-[hsl(38,61%,73%)] -z-[1] transition-[bottom] duration-500 ease-in-out pointer-events-none group-hover:bottom-[-50%]"
                aria-hidden="true"
              />
              {/* Invisible spacer — prevents button from resizing on hover */}
              <span className="invisible block">View Our Products</span>
              {/* text-1 — slides up on hover */}
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-[250ms] ease-in-out group-hover:-translate-y-full">
                View Our Products
              </span>
              {/* text-2 — slides in from below on hover */}
              <span
                className="absolute inset-x-0 top-full flex items-center justify-center h-full text-[hsla(40,12%,5%,1)] transition-all duration-[250ms] ease-in-out group-hover:top-0"
                aria-hidden="true"
              >
                View Our Products
              </span>
            </Link>
          </div>
        );
      })}

      {/* ── Prev button — diamond shape, slides in from left on mount ── */}
      <button
        onClick={() => goTo(current - 1)}
        aria-label="Slide to previous"
        className="hidden md:grid absolute z-[2] top-1/2 left-[30px] w-[45px] h-[45px] place-items-center border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] bg-transparent cursor-pointer hover:bg-[hsl(38,61%,73%)] hover:text-black transition-[transform,opacity,background-color,color] duration-500"
        style={{
          transform: mounted
            ? "translateY(-50%) rotate(45deg)"
            : "translateY(-50%) translateX(-80px) rotate(45deg)",
          opacity: mounted ? 1 : 0,
          transitionDelay: "200ms",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          style={{ transform: "rotate(-45deg)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* ── Next button — diamond shape, slides in from right on mount ── */}
      <button
        onClick={() => goTo(current + 1)}
        aria-label="Slide to next"
        className="hidden md:grid absolute z-[2] top-1/2 right-[30px] w-[45px] h-[45px] place-items-center border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] bg-transparent cursor-pointer hover:bg-[hsl(38,61%,73%)] hover:text-black transition-[transform,opacity,background-color,color] duration-500"
        style={{
          transform: mounted
            ? "translateY(-50%) rotate(45deg)"
            : "translateY(-50%) translateX(80px) rotate(45deg)",
          opacity: mounted ? 1 : 0,
          transitionDelay: "200ms",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          style={{ transform: "rotate(-45deg)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </section>
  );
}
