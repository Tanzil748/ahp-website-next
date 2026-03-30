"use client";
import Image from "next/image";
import { useState } from "react";
import { SectionHeader, Shimmer, GoldButton } from "@/components/ui";

const events = [
  {
    image: "/images/index-page/events/miami.png",
    date: "01/27/2026",
    datetime: "2026-01-27",
    location: "Miami, USA",
    title: "COSMOPROF 2026",
    brand: "Fragrance World",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin rhoncus ex, ut vehicula urna. Curabitur a orci sed est feugiat sodales. Nam ultricies dolor at aliquam pellentesque. Phasellus tempus interdum nulla nec feugiat. Aliquam id ipsum in dui tempor ullamcorper non ac neque. Aliquam nec lacus vitae dolor pellentesque vehicula non porttitor elit. Sed in molestie sem. Quisque gravida nisi nec dictum condimentum. Sed eleifend aliquet blandit. Aliquam posuere nisl a neque tristique, vitae finibus nulla mattis. Nam eu aliquet nunc, in tincidunt felis. Suspendisse tincidunt, nisl ut semper cursus, arcu leo mollis leo, sed lobortis lacus leo at dolor. Etiam tempus ac erat sed tempor. Duis est nisi, efficitur vehicula finibus bibendum, laoreet sed dolor. Etiam sagittis dapibus lectus interdum varius. Sed auctor, dui et accumsan consequat, metus orci posuere arcu, ac sodales augue augue in nisi. Fusce laoreet tincidunt nunc, ac faucibus est consectetur non. Fusce consectetur lorem vel massa malesuada, ac vestibulum mauris interdum. Donec faucibus ante purus, congue egestas velit eleifend vitae. Cras nec magna ut ipsum lacinia imperdiet sed ac ante. Suspendisse efficitur lacinia hendrerit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id orci nec mauris ultrices lacinia nec eu erat. Morbi malesuada sed lorem eget pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus mi justo, finibus quis consectetur nec, pretium sit amet ipsum. Nam sit amet turpis et neque finibus facilisis nec id mauris. Ut laoreet sagittis nisl, sed porta lorem iaculis consequat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse et nulla placerat, pulvinar ex et, consectetur quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis consequat tempus. In condimentum vel metus id egestas. Praesent a ipsum dui. Sed efficitur arcu sed massa blandit, egestas tempus purus luctus. Nulla ornare nisi id tellus euismod, ut rhoncus ipsum semper. Quisque posuere venenatis porta. Proin porttitor elit a vestibulum facilisis. Phasellus lobortis eleifend sagittis. Nunc ultricies magna non sapien gravida, vel blandit dolor rhoncus. Ut ac risus odio. Nullam libero eros, eleifend vestibulum vestibulum non, vehicula at lacus. Morbi nulla turpis, congue in ex a, facilisis viverra felis. Quisque venenatis, felis non porta convallis, leo eros luctus odio, et rhoncus nisi quam at nulla. Pellentesque velit nibh, ullamcorper eget sem non, volutpat pretium velit. Sed non mollis lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Morbi eu velit eros. Cras tincidunt nunc erat, eget convallis neque euismod id. Cras et lacinia lorem. Phasellus convallis tempor efficitur. Ut a tincidunt ligula, sit amet mattis neque. Aenean vitae ipsum mauris. Phasellus auctor auctor ex, ultrices efficitur est sollicitudin id. Curabitur eu augue molestie, sollicitudin sem id, blandit libero. Aliquam erat volutpat. Aenean id ultricies magna, non gravida metus. Ut blandit, sem eget lobortis efficitur, nibh metus eleifend elit, id laoreet nisi justo id lectus. Curabitur sed lorem ex.",
  },
  {
    image: "/images/index-page/events/las-vegas.png",
    date: "08/09/2026",
    datetime: "2026-08-09",
    location: "Las Vegas, USA",
    title: "ASD 2026",
    brand: "Lattafa",
    description:
      "ASD Market Week in Las Vegas is one of the largest wholesale trade shows in the US. Visit our booth to discover our newest Lattafa lines and connect with our distribution team. Exclusive trade pricing and show-only deals will be available for qualified buyers.",
  },
  {
    image: "/images/index-page/events/brazil.png",
    date: "11/19/2026",
    datetime: "2026-11-19",
    location: "São Paulo, Brazil",
    title: "FCE Cosmetique 2026",
    brand: "French Avenue",
    description:
      "FCE Cosmetique is Latin America's leading beauty and fragrance exhibition. We are proud to represent French Avenue on an international stage. Attend to explore new scents, meet our team, and discuss distribution opportunities across the South American market.",
  },
];

function EventCard({ event }: { event: (typeof events)[number] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <li className="[perspective:1000px]" style={{ aspectRatio: "350 / 450" }}>
      <div
        className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out cursor-pointer"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        onClick={() => !flipped && setFlipped(true)}
      >
        {/* ── Front ── */}
        <div className="group absolute inset-0 [backface-visibility:hidden] overflow-hidden">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              // Tells Next.js the image occupies ~285px on most screens,
              // so it serves the right optimised size instead of full-res.
              sizes="285px"
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

          {/* Tap hint */}
          <div className="absolute top-[30px] right-[25px] z-[1] flex items-center gap-1.5 px-[10px] py-[5px] bg-black opacity-70">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2.5"
            >
              <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span className="text-[1.1rem] font-bold tracking-[0.15em] uppercase text-[var(--gold)] [font-family:var(--font-primary)]">
              Details
            </span>
          </div>
        </div>

        {/* ── Back ── */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col"
          style={{
            backgroundColor: "var(--bg-dark)",
            border: "1px solid var(--gold-border)",
          }}
        >
          {/* Corner accents */}
          <span
            className="absolute top-0 right-0 w-[60px] h-[60px] pointer-events-none opacity-60 z-[1]"
            style={{
              borderTop: "1px solid var(--gold)",
              borderRight: "1px solid var(--gold)",
            }}
          />
          <span
            className="absolute bottom-0 left-0 w-[60px] h-[60px] pointer-events-none opacity-60 z-[1]"
            style={{
              borderBottom: "1px solid var(--gold)",
              borderLeft: "1px solid var(--gold)",
            }}
          />

          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
            className="absolute top-3 right-3 z-[2] w-8 h-8 grid place-items-center opacity-50 hover:opacity-100 transition-opacity duration-200"
            aria-label="Flip back"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Scrollable content — stopPropagation so scroll doesn't re-trigger flip */}
          <div
            className="overflow-y-auto flex-1 px-[30px] py-[35px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="font-normal text-white mb-4 leading-[1.3] text-[2.4rem]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {event.title}
            </h3>

            <div
              className="w-10 h-px mb-6 opacity-60"
              style={{ backgroundColor: "var(--gold)" }}
            />

            <ul className="flex flex-col gap-3 mb-6">
              {[
                { label: "Date", value: event.date },
                { label: "Location", value: event.location },
                { label: "Brand", value: event.brand },
              ].map(({ label, value }) => (
                <li
                  key={label}
                  className="flex items-start gap-2 text-[1.4rem]"
                >
                  <span
                    className="uppercase tracking-[0.15em] font-bold shrink-0"
                    style={{ color: "var(--gold)" }}
                  >
                    {label}
                  </span>
                  <span className="text-[var(--text-muted)]">— {value}</span>
                </li>
              ))}
            </ul>

            <p className="text-[1.4rem] leading-[1.7] text-[var(--text-muted)]">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

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
            <EventCard key={event.title} event={event} />
          ))}
        </ul>

        <GoldButton href="/blogs" className="mx-auto mt-[40px]">
          View Our Blog
        </GoldButton>
      </div>
    </section>
  );
}
