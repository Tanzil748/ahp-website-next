"use client";

import Link from "next/link";
import Image from "next/image";

const events = [
  {
    image:    "/images/index-page/events/miami.png",
    date:     "01/27/2026",
    datetime: "2026-01-27",
    location: "Miami, USA",
    title:    "COSMOPROF 2026",
  },
  {
    image:    "/images/index-page/events/las-vegas.png",
    date:     "08/09/2026",
    datetime: "2026-08-09",
    location: "Las Vegas, USA",
    title:    "ASD 2026",
  },
  {
    image:    "/images/index-page/events/brazil.png",
    date:     "11/19/2026",
    datetime: "2026-11-19",
    location: "São Paulo, Brazil",
    title:    "FCE Cosmetique 2026",
  },
];

export default function RecentEvents() {
  return (
    <>
      <style>{`
        /* ── gradient-1 used on .card-content overlay ── */
        .event-card-content {
          background-image: linear-gradient(
            to top,
            hsla(0, 0%, 0%, 0.9),
            hsla(0, 0%, 0%, 0.7),
            transparent
          );
        }

        /* ── image zoom on hover ── */
        .event-card:is(:hover, :focus-within) .event-img {
          transform: scale(1.05);
        }

        /* ── hover:shine shimmer sweep ── */
        .event-card::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 50%;
          height: 100%;
          background-image: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 100%);
          transform: skewX(-0.08turn) translateX(-180%);
          pointer-events: none;
          z-index: 2;
        }
        .event-card:is(:hover, :focus-within)::after {
          transform: skewX(-0.08turn) translateX(275%);
          transition: 1000ms ease;
        }

        /* ── grid: 1 col → 3 col at 992px ── */
        .event-grid {
          display: grid;
          gap: 40px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        @media (min-width: 992px) {
          .event-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ── .btn circle-fill wipe on hover ── */
        .event-btn {
          position: relative;
          color: hsl(38, 61%, 73%);
          font-size: 1.2rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          border: 2px solid hsl(38, 61%, 73%);
          padding: 12px 45px;
          overflow: hidden;
          z-index: 1;
          display: block;
          max-width: max-content;
          margin-inline: auto;
          margin-block-start: 40px;
          text-decoration: none;
          font-family: "DM Sans", sans-serif;
        }
        .event-btn::before {
          content: "";
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 200%;
          height: 200%;
          border-radius: 50%;
          background-color: hsl(38, 61%, 73%);
          transition: 500ms ease;
          z-index: -1;
        }
        .event-btn .text { transition: 250ms ease; display: block; }
        .event-btn .text-2 {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          min-width: max-content;
          color: hsla(40, 12%, 5%, 1);
        }
        .event-btn:is(:hover, :focus-visible)::before { bottom: -50%; }
        .event-btn:is(:hover, :focus-visible) .text-1 { transform: translateY(-40px); }
        .event-btn:is(:hover, :focus-visible) .text-2 {
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>

      {/* .section .event .bg-black-10 */}
      <section
        aria-label="event"
        className="relative overflow-hidden z-[1] py-[70px] lg:py-[100px]"
        style={{ backgroundColor: "hsla(30, 8%, 5%, 1)" }}
      >
        <div className="px-4 max-w-[1200px] mx-auto">

          {/* .section-subtitle .label-2 .text-center */}
          <p
            className="font-bold uppercase text-center mb-3 text-[1.2rem]"
            style={{
              color: "hsl(38, 61%, 73%)",
              fontFamily: '"DM Sans", sans-serif',
              letterSpacing: "0.4em",
            }}
          >
            Recent Updates
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

          {/* .section-title .headline-1 .text-center */}
          <h2
            className="font-normal leading-[1.2] text-center text-white mb-10"
            style={{
              fontFamily: '"Forum", cursive',
              fontSize: "calc(2rem + 2.5vw)",
            }}
          >
            Upcoming Events
          </h2>

          {/* .grid-list */}
          <ul className="event-grid">
            {events.map((event) => (
              <li key={event.title}>

                {/*
                  .event-card .has-before .hover:shine
                  position:relative for absolute children + shimmer ::after
                */}
                <div className="event-card relative overflow-hidden z-[1]">

                  {/* .card-banner .img-holder — aspect ratio 350/450 */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "350 / 450" }}
                  >
                    {/* .img-cover — zooms on hover via CSS above */}
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      loading="lazy"
                      className="event-img object-cover transition-transform duration-500 ease-in-out"
                    />

                    {/* .publish-date .label-2 — gold date badge top-left */}
                    <time
                      dateTime={event.datetime}
                      className="absolute top-[30px] left-[25px] z-[1] font-bold text-[1.2rem] px-[10px] py-[5px] leading-[14px]"
                      style={{
                        color: "hsl(38, 61%, 73%)",
                        backgroundColor: "hsla(0, 0%, 0%, 1)",
                        fontFamily: '"DM Sans", sans-serif',
                        letterSpacing: "0.15em",
                      }}
                    >
                      {event.date}
                    </time>
                  </div>

                  {/*
                    .card-content — absolutely positioned over the bottom
                    of the image with gradient-1 fade overlay
                  */}
                  <div
                    className="event-card-content absolute bottom-0 w-full z-[1]"
                    style={{ padding: "35px 35px 25px" }}
                  >
                    {/* .card-subtitle .label-2 .text-center */}
                    <p
                      className="text-center font-bold uppercase mb-[5px] text-[1.2rem]"
                      style={{
                        color: "hsl(38, 61%, 73%)",
                        fontFamily: '"DM Sans", sans-serif',
                        letterSpacing: "0.4em",
                      }}
                    >
                      {event.location}
                    </p>

                    {/* .card-title .title-2 .text-center */}
                    <h3
                      className="text-center font-normal text-white leading-[1.2]"
                      style={{
                        fontFamily: '"Forum", cursive',
                        fontSize: "2.2rem",
                      }}
                    >
                      {event.title}
                    </h3>
                  </div>

                </div>
              </li>
            ))}
          </ul>

          {/* .btn .btn-primary — circle wipe hover effect */}
          <Link href="/blog" className="event-btn">
            <span className="text text-1">View Our Blog</span>
            <span className="text text-2" aria-hidden="true">View Our Blog</span>
          </Link>

        </div>
      </section>
    </>
  );
}