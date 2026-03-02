"use client";
import Link from "next/link";
import Image from "next/image";
import { SectionHeader, Shimmer, GoldButton } from "@/components/ui";

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

export default function RecentEvents() {
  return (
    <section
      aria-label="event"
      className="section-base text-left bg-[var(--bg-dark)]"
    >
      <div className="section-container">
        <SectionHeader
          label="Recent Updates"
          title="Upcoming Events"
          titleClassName="mb-10"
        />

        <ul className="grid gap-10 list-none p-0 m-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={event.title}>
              <div className="group relative overflow-hidden">
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "350 / 450" }}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <Shimmer />
                  <time
                    dateTime={event.datetime}
                    className="absolute top-[30px] left-[25px] z-[1] font-bold text-[1.2rem] px-[10px] py-[5px] leading-[14px] text-[var(--gold)] bg-black [font-family:var(--font-primary)] tracking-[0.15em]"
                  >
                    {event.date}
                  </time>
                </div>

                <div className="event-card-gradient absolute bottom-0 w-full z-[1] px-[35px] pt-[35px] pb-[25px]">
                  <p className="text-center section-label mb-[5px]">
                    {event.location}
                  </p>
                  <h3 className="card-heading text-center text-[2.2rem]">
                    {event.title}
                  </h3>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <GoldButton href="/blog" className="mx-auto mt-[40px]">
          View Our Blog
        </GoldButton>
      </div>
    </section>
  );
}
