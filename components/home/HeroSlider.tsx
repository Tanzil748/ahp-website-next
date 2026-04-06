"use client";
import {
  TablerChevronDownLeft,
  TablerChevronUpRight,
} from "@/components/Icons";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GoldButton, Separator } from "@/components/ui";

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
    image: "/images/index-page/hero-banners/4.jpeg",
    subtitle: "Scent Reverie",
    title: ["Flavors For", "All Seasons"],
    text: "Embrace a collection of fragrances crafted to delight every moment of the year.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

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
      className="relative min-h-screen overflow-hidden py-30"
    >
      {slides.map((slide, i) => {
        const isActive = i === current;
        return (
          <div
            key={i}
            className={`slider-item${isActive ? " active" : ""} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full grid place-content-center pt-25 text-center z-1 transition-[opacity,visibility] duration-1000`}
            style={{
              opacity: isActive ? 1 : 0,
              visibility: isActive ? "visible" : "hidden",
            }}
          >
            {/* Ken Burns background */}
            <div
              className="absolute inset-0 -z-1 pointer-events-none select-none brightness-[0.4]"
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

            {/* Subtitle + separator */}
            <p className="hero-subtitle slider-reveal relative section-label mb-3">
              {slide.subtitle}
            </p>
            <span className="hero-subtitle slider-reveal block mt-3.5 mb-5">
              <Separator />
            </span>

            {/* Title */}
            <h1 className="hero-title slider-reveal card-heading font-normal leading-[1em] text-[calc(1.3rem+6.7vw)] mb-0">
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h1>

            {/* Body */}
            <p className="hero-body slider-reveal section-body mt-2.5 mb-10 max-w-130 mx-auto sm:text-[2rem]">
              {slide.text}
            </p>

            {/* CTA */}
            <GoldButton
              href="/products"
              className="hero-cta slider-reveal mx-auto"
            >
              View Our Products
            </GoldButton>
          </div>
        );
      })}

      {/* Prev */}
      <button
        onClick={() => goTo(current - 1)}
        aria-label="Slide to previous"
        className="hero-nav-btn left-7.5"
        style={{
          transform: mounted
            ? "translateY(-50%) rotate(45deg)"
            : "translateY(-50%) translateX(-80px) rotate(45deg)",
          opacity: mounted ? 1 : 0,
          transitionDelay: "200ms",
        }}
      >
        <TablerChevronDownLeft className="text-[25px]" />
      </button>

      {/* Next */}
      <button
        onClick={() => goTo(current + 1)}
        aria-label="Slide to next"
        className="hero-nav-btn right-7.5"
        style={{
          transform: mounted
            ? "translateY(-50%) rotate(45deg)"
            : "translateY(-50%) translateX(80px) rotate(45deg)",
          opacity: mounted ? 1 : 0,
          transitionDelay: "200ms",
        }}
      >
        <TablerChevronUpRight className="text-[25px]" />
      </button>
    </section>
  );
}
