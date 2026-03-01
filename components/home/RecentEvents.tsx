"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const events = [
  {
    image: "/images/index-page/events/miami.png",
    date: "01/27/2026",
    datetime: "2026-01-27",
    location: "Miami, USA",
    title: "COSMOPROF 2026",
  },
  {
    image: "/images/index-page/events/las-vegas.png",
    date: "08/09/2026",
    datetime: "2026-08-09",
    location: "Las Vegas, USA",
    title: "ASD 2026",
  },
  {
    image: "/images/index-page/events/brazil.png",
    date: "11/19/2026",
    datetime: "2026-11-19",
    location: "São Paulo, Brazil",
    title: "FCE Cosmetique 2026",
  },
];

// No shimmer keyframe needed — shimmer is pure Tailwind translateX transition.
// Only the gradient overlay needs a style that Tailwind can't express as a utility,
// so we inject it once via useEffect.
function useEventStyles() {
  useEffect(() => {
    const id = "event-card-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      .event-card-gradient {
        background-image: linear-gradient(
          to top,
          hsla(0, 0%, 0%, 0.9),
          hsla(0, 0%, 0%, 0.7),
          transparent
        );
      }
      .event-view-btn:is(:hover,:focus-visible) .event-btn-before  { bottom: -50%; }
      .event-view-btn:is(:hover,:focus-visible) .event-btn-text1   { transform: translateY(-150%); }
      .event-view-btn:is(:hover,:focus-visible) .event-btn-text2   { top: 0; }
    `;
    document.head.appendChild(el);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);
}

export default function RecentEvents() {
  useEventStyles();

  return (
    <section
      aria-label="event"
      className="relative overflow-hidden z-[1] py-[70px] lg:py-[100px] bg-[hsla(30,8%,5%,1)]"
    >
      <div className="px-4 max-w-[1200px] mx-auto">
        {/* Subtitle */}
        <p className="font-bold uppercase text-center mb-3 text-[1.2rem] text-[hsl(38,61%,73%)] [font-family:'DM_Sans',sans-serif] tracking-[0.4em]">
          Recent Updates
        </p>

        {/* Wavy separator */}
        <div className="flex justify-center mb-3">
          <Image
            src="/images/patterns/separator.svg"
            width={100}
            height={10}
            alt=""
            aria-hidden="true"
          />
        </div>

        {/* Section title */}
        <h2 className="font-normal leading-[1.2] text-center text-white mb-10 [font-family:'Forum',cursive] text-[calc(2rem+2.5vw)]">
          Upcoming Events
        </h2>

        {/* Event cards grid */}
        <ul className="grid gap-10 list-none p-0 m-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={event.title}>
              {/* Card — shimmer sweep via group hover */}
              <div className="group relative overflow-hidden z-1">
                {/* Image container */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "350 / 450" }}
                >
                  {/* Image — zooms on group hover */}
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />

                  {/* Shimmer sweep — clipped to image bounds */}
                  <span
                    className="
                      absolute top-0 left-0 w-1/2 h-full pointer-events-none z-[2]
                      bg-gradient-to-r from-transparent to-white/40
                      -skew-x-[4.6deg] -translate-x-[180%]
                      group-hover:translate-x-[275%] group-hover:transition-transform group-hover:duration-1000 group-hover:ease-in-out
                    "
                    aria-hidden="true"
                  />

                  {/* Date badge */}
                  <time
                    dateTime={event.datetime}
                    className="absolute top-[30px] left-[25px] z-[1] font-bold text-[1.2rem] px-[10px] py-[5px] leading-[14px] text-[hsl(38,61%,73%)] bg-black [font-family:'DM_Sans',sans-serif] tracking-[0.15em]"
                  >
                    {event.date}
                  </time>
                </div>

                {/* Card content overlay — gradient fade from bottom */}
                <div className="event-card-gradient absolute bottom-0 w-full z-[1] px-[35px] pt-[35px] pb-[25px]">
                  {/* Location */}
                  <p className="text-center font-bold uppercase mb-[5px] text-[1.2rem] text-[hsl(38,61%,73%)] [font-family:'DM_Sans',sans-serif] tracking-[0.4em]">
                    {event.location}
                  </p>

                  {/* Event title */}
                  <h3 className="text-center font-normal text-white leading-[1.2] [font-family:'Forum',cursive] text-[2.2rem]">
                    {event.title}
                  </h3>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/blog"
          className="event-view-btn relative isolate block max-w-max mx-auto mt-[40px] overflow-hidden z-[1] no-underline border-2 border-[hsl(38,61%,73%)] px-[45px] py-[12px] text-[hsl(38,61%,73%)] font-bold uppercase text-[1.2rem] tracking-[3px] [font-family:'DM_Sans',sans-serif] transition-colors duration-[250ms]"
        >
          {/* Circle fill */}
          <span
            className="event-btn-before absolute bottom-full left-1/2 -translate-x-1/2 w-[200%] h-[200%] rounded-full bg-[hsl(38,61%,73%)] -z-[1] transition-[bottom] duration-500 ease-in-out pointer-events-none"
            aria-hidden="true"
          />
          {/* Invisible spacer to hold button width/height */}
          <span className="invisible block">View Our Blog</span>
          {/* text-1 — centered, slides up on hover */}
          <span className="event-btn-text1 absolute inset-0 flex items-center justify-center transition-transform duration-[250ms] ease-in-out">
            View Our Blog
          </span>
          {/* text-2 — starts below, slides to center on hover */}
          <span
            className="event-btn-text2 absolute inset-x-0 top-full flex items-center justify-center h-full text-[hsla(40,12%,5%,1)] transition-all duration-[250ms] ease-in-out"
            aria-hidden="true"
          >
            View Our Blog
          </span>
        </Link>
      </div>
    </section>
  );
}
