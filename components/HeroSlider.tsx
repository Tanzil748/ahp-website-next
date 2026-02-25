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
    text: "Embrace a collection of fragrances crafted to delight every moment of the year.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(((index % slides.length) + slides.length) % slides.length);
        setAnimating(false);
      }, 1000); // matches --transition-3: 1000ms
    },
    [animating],
  );

  // Auto-advance every 5 s
  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(t);
  }, [current, goTo]);

  return (
    <>
      <style>{`
        /* ── Hero section — mirrors index.css #HERO exactly ── */

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Forum&display=swap');

        /* CSS variables needed by hero */
        :root {
          --gold-crayola:      hsl(38, 61%, 73%);
          --smoky-black-1:     hsla(40, 12%, 5%, 1);
          --black:             hsla(0, 0%, 0%, 1);
          --white:             hsla(0, 0%, 100%, 1);
          --transition-1:      250ms ease;
          --transition-2:      500ms ease;
          --transition-3:      1000ms ease;
          --fontSize-label-2:  1.2rem;
          --fontSize-display-1: calc(1.3rem + 6.7vw);
          --fontSize-body-2:   1.6rem;
          --weight-bold:       700;
          --letterSpacing-2:   0.4em;
          --letterSpacing-5:   3px;
          --radius-circle:     50%;
          --fontFamily-forum:  "Forum", cursive;
          --fontFamily-dm_sans:"DM Sans", sans-serif;
        }
        @media (min-width: 575px) {
          :root { --fontSize-body-2: 2rem; }
        }

        /* .hero */
        .hero {
          position: relative;
          padding-block: 120px;
          min-height: 100vh;
          overflow: hidden;
          /* z-index: 1 — INTENTIONALLY NOT SET HERE so the header (z-index:4)
             and overlay (z-index:1) sit above the hero without conflict.
             The original z-index:1 on .hero only creates a stacking context
             but the header is fixed so it always layers on top anyway. */
        }

        /* Each slide item */
        .slider-item {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          display: grid;
          place-content: center;
          padding-block-start: 100px;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition-3);
          z-index: 1;
          text-align: center;
        }

        .slider-item.active {
          opacity: 1;
          visibility: visible;
        }

        /* Background image per slide */
        .slider-bg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          transform: scale(1.15);
          pointer-events: none;
          user-select: none;
          z-index: -1;
          filter: brightness(40%);
        }

        /* Ken-Burns zoom-in when slide becomes active */
        .slider-item.active .slider-bg {
          animation: smoothScale 7s linear forwards;
        }
        @keyframes smoothScale {
          0%   { transform: scale(1);    }
          100% { transform: scale(1.15); }
        }

        /* .slider-reveal — content enters from below */
        .slider-reveal {
          transform: translateY(30px);
          opacity: 0;
        }
        .slider-item.active .slider-reveal {
          animation: sliderReveal 1s ease forwards;
        }
        @keyframes sliderReveal {
          0%   { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0);    opacity: 1; }
        }

        /* Staggered animation delays matching original */
        .slider-item.active .section-subtitle { animation-delay: 500ms;  }
        .slider-item.active .hero-title        { animation-delay: 1000ms; }
        .slider-item.active .hero-text         { animation-delay: 1500ms; }
        .slider-item.active .hero-btn-cta      { animation-delay: 2000ms; }

        /* .section-subtitle */
        .section-subtitle {
          position: relative;
          color: var(--gold-crayola);
          font-weight: var(--weight-bold);
          font-family: var(--fontFamily-dm_sans);
          text-transform: uppercase;
          letter-spacing: var(--letterSpacing-2);
          margin-block-end: 12px;
          font-size: var(--fontSize-label-2);
        }
        /* The decorative SVG line under subtitle */
        .section-subtitle::after {
          content: "";
          display: block;
          width: 100px;
          height: 2px;
          /* Inline SVG recreating the original separator.svg wave line */
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='10'%3E%3Cpath d='M0 5 Q12.5 0 25 5 Q37.5 10 50 5 Q62.5 0 75 5 Q87.5 10 100 5' stroke='%23d4a85a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          height: 10px;
          margin-inline: auto;
          margin-block-start: 5px;
          /* hero-specific override */
          margin-block: 14px 20px;
        }

        /* .display-1 / hero-title */
        .hero-title {
          font-family: var(--fontFamily-forum);
          font-size: var(--fontSize-display-1);
          color: var(--white);
          font-weight: 400;
          line-height: 1em;
          margin-block-end: 0;
        }

        /* .hero-text */
        .hero-text {
          font-family: var(--fontFamily-dm_sans);
          font-size: var(--fontSize-body-2);
          color: var(--white);
          line-height: 1.6em;
          margin-block: 10px 40px;
          max-width: 520px;
          margin-inline: auto;
        }

        /* .btn — gold outlined button with circle fill on hover */
        .hero .btn {
          position: relative;
          color: var(--gold-crayola);
          font-family: var(--fontFamily-dm_sans);
          font-size: var(--fontSize-label-2);
          font-weight: var(--weight-bold);
          text-transform: uppercase;
          letter-spacing: var(--letterSpacing-5);
          max-width: max-content;
          border: 2px solid var(--gold-crayola);
          padding: 12px 45px;
          overflow: hidden;
          z-index: 1;
          margin-inline: auto;
          display: block;
          text-decoration: none;
          transition: var(--transition-1);
        }
        .hero .btn::before {
          content: "";
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 200%;
          height: 200%;
          border-radius: var(--radius-circle);
          background-color: var(--gold-crayola);
          transition: var(--transition-2);
          z-index: -1;
        }
        .hero .btn .text {
          transition: var(--transition-1);
          display: block;
        }
        .hero .btn .text-2 {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          min-width: max-content;
          color: var(--smoky-black-1);
        }
        .hero .btn:is(:hover, :focus-visible)::before { bottom: -50%; }
        .hero .btn:is(:hover, :focus-visible) .text-1 { transform: translateY(-40px); }
        .hero .btn:is(:hover, :focus-visible) .text-2 {
          top: 50%;
          transform: translate(-50%, -50%);
        }

        /* ── Slider nav buttons — hidden mobile, shown at 768px+ ── */
        .slider-btn {
          display: none;
        }
        @media (min-width: 768px) {
          .slider-btn {
            display: grid;
            position: absolute;
            z-index: 2;
            color: var(--gold-crayola);
            font-size: 2.4rem;
            border: 1px solid var(--gold-crayola);
            width: 45px;
            height: 45px;
            place-items: center;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
            transition: var(--transition-1);
            background: none;
            cursor: pointer;
          }
          .slider-btn svg {
            transform: rotate(-45deg);
          }
          .slider-btn.prev { left: 30px; }
          .slider-btn.next { right: 30px; }
          .slider-btn:is(:hover, :focus-visible) {
            background-color: var(--gold-crayola);
            color: var(--black);
          }
        }
      `}</style>

      {/*
        .hero
        z-index is NOT applied here — the original z-index:1 on .hero creates
        a stacking context but the header is position:fixed with z-index:4 so
        it always sits on top. Removing z-index from the hero element prevents
        the navbar/overlay from being buried under the hero.
      */}
      <section
        id="home"
        aria-label="home"
        className="hero"
        style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
      >
        {/* ── Slide items ── */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`slider-item${i === current ? " active" : ""}`}
          >
            {/* .slider-bg — full-bleed background image, dims to 40% brightness */}
            <div className="slider-bg">
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>

            {/* .section-subtitle  +  .slider-reveal */}
            <p className="section-subtitle slider-reveal">
              {slide.subtitle}
            </p>

            {/* .display-1 .hero-title  +  .slider-reveal */}
            <h1 className="hero-title slider-reveal">
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h1>

            {/* .body-2 .hero-text  +  .slider-reveal */}
            <p className="hero-text slider-reveal">
              {slide.text}
            </p>

            {/* .btn .btn-primary  +  .slider-reveal */}
            <Link href="/products" className="btn btn-primary hero-btn-cta slider-reveal">
              <span className="text text-1">View Our Products</span>
              <span className="text text-2" aria-hidden="true">View Our Products</span>
            </Link>
          </div>
        ))}

        {/* ── Prev button (.slider-btn.prev) — hidden on mobile ── */}
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Slide to previous"
          className="slider-btn prev"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20" height="20"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* ── Next button (.slider-btn.next) — hidden on mobile ── */}
        <button
          onClick={() => goTo(current + 1)}
          aria-label="Slide to next"
          className="slider-btn next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20" height="20"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </section>
    </>
  );
}