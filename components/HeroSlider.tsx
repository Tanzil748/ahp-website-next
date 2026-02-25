"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

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
    text: "Embrace a collection of fragrances crafted to delight every moment of the year, from fresh spring notes to warm winter aromas.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setVisible(false);

      setTimeout(() => {
        setCurrent((index + slides.length) % slides.length);
        setVisible(true);
        setAnimating(false);
      }, 400);
    },
    [animating],
  );

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <section
      id="home"
      aria-label="home"
      className="relative w-full h-screen min-h-[560px] overflow-hidden bg-black text-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.image}
          alt=""
          fill
          className="object-cover transition-opacity duration-700"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Slide Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-8 transition-all duration-400 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDuration: "400ms" }}
      >
        {/* Subtitle */}
        <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-amber-300 font-semibold mb-4 font-mono">
          {slide.subtitle}
        </p>

        {/* Title */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            letterSpacing: "-0.02em",
          }}
        >
          {slide.title[0]}
          <br />
          {slide.title[1]}
        </h1>

        {/* Body text */}
        <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-lg mx-auto mb-8 leading-relaxed">
          {slide.text}
        </p>

        {/* CTA Button */}
        <Link
          href="/products.html"
          className="group relative inline-block overflow-hidden border border-white/80 text-white px-8 py-3 text-sm uppercase tracking-widest font-medium transition-colors duration-300 hover:text-black"
        >
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <span className="relative z-10">View Our Products</span>
        </Link>
      </div>

      {/* Prev Button */}
      <button
        onClick={prev}
        aria-label="slide to previous"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-white/40 text-white/70 hover:text-white hover:border-white transition-all duration-200 bg-black/20 hover:bg-black/40 backdrop-blur-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={next}
        aria-label="slide to next"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-white/40 text-white/70 hover:text-white hover:border-white transition-all duration-200 bg-black/20 hover:bg-black/40 backdrop-blur-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2 bg-amber-300"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
