"use client";

import { useState } from "react";
import {
  OrnamentalSep,
  LocationIcon,
  PhoneIcon,
  EmailIcon,
} from "./contactUtils";

// ─── Info card ────────────────────────────────────────────────────────────────
function InfoCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.FC<{ stroke?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-start gap-[18px] max-sm:gap-[14px] mb-9"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Diamond icon box */}
      <div
        className="flex-shrink-0 w-[52px] h-[52px] max-sm:w-[44px] max-sm:h-[44px] grid place-items-center transition-colors duration-300 border border-[var(--gold)]"
        style={{
          transform: "rotate(45deg)",
          backgroundColor: hovered ? "var(--gold)" : "transparent",
        }}
      >
        <div className="-rotate-45">
          <Icon stroke={hovered ? "var(--bg-dark)" : "var(--gold)"} />
        </div>
      </div>

      <div>
        <p className="uppercase font-bold mb-1 text-[1.4rem] tracking-[0.15em] text-[var(--gold)]">
          {label}
        </p>
        <div className="text-[1.5rem] leading-[1.6] text-[var(--text-muted)]">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ContactInfo() {
  return (
    <div className="fade-up delay-2">
      {/* Subtitle */}
      <div className="mb-3">
        <span className="uppercase font-bold text-[1.4rem] tracking-[0.4em] text-[var(--gold)]">
          Find Us
        </span>
        <OrnamentalSep align="left" />
      </div>

      <h2
        className="mb-5 font-normal leading-[1.4] text-white [font-family:var(--font-display)]"
        style={{ fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)" }}
      >
        Contact
        <br />
        Information
      </h2>

      <p className="mb-[50px] text-[1.65rem] leading-[1.5] text-[var(--text-muted)]">
        We are open five days a week and eager to accommodate your needs. Reach
        us through any of the channels below.
      </p>

      <InfoCard icon={LocationIcon} label="Our Location">
        <p>201 Christopher St</p>
        <p>Ronkonkoma, NY 11779</p>
      </InfoCard>

      <InfoCard icon={PhoneIcon} label="Phone">
        <p>+1 (516) 907-2340</p>
        <p>+1 (516) 907-7010</p>
      </InfoCard>

      <InfoCard icon={EmailIcon} label="Email">
        <p>sales@alhusseinperfumes.com</p>
      </InfoCard>

      {/* Gold divider */}
      <div className="my-[50px] w-full h-px opacity-40 bg-gradient-to-r from-[var(--gold)] to-transparent" />

      {/* Hours */}
      <h3 className="mb-4 font-normal text-[2.2rem] [font-family:var(--font-display)]">
        Opening Hours
      </h3>

      <ul className="flex flex-col gap-3">
        {[
          { day: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
          { day: "Saturday", time: "Closed" },
          { day: "Sunday", time: "Closed" },
        ].map(({ day, time }) => (
          <li
            key={day}
            className="flex justify-between items-center pb-3 text-[1.5rem] border-b border-[var(--white-10)]"
          >
            <span className="font-bold text-white">{day}</span>
            <span className="text-[var(--gold)]">{time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
