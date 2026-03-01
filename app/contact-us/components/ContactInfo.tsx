"use client";

import { useState } from "react";
import {
  gold,
  smokyBlack1,
  quickSilver,
  whiteAlpha10,
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
        className="flex-shrink-0 w-[52px] h-[52px] max-sm:w-[44px] max-sm:h-[44px] grid place-items-center transition-colors duration-300"
        style={{
          border: `1px solid ${gold}`,
          transform: "rotate(45deg)",
          backgroundColor: hovered ? gold : "transparent",
        }}
      >
        <div className="-rotate-45">
          <Icon stroke={hovered ? smokyBlack1 : gold} />
        </div>
      </div>

      <div>
        <p
          className="uppercase font-bold mb-1 text-[1.4rem] tracking-[0.15em]"
          style={{ color: gold }}
        >
          {label}
        </p>
        <div className="text-[1.5rem] leading-[1.6]" style={{ color: quickSilver }}>
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
        <span
          className="uppercase font-bold text-[1.4rem] tracking-[0.4em]"
          style={{ color: gold }}
        >
          Find Us
        </span>
        <OrnamentalSep align="left" />
      </div>

      <h2
        className="mb-5 font-normal leading-[1.4]"
        style={{
          fontFamily: "var(--font-forum)",
          fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)",
          fontWeight: 400,
        }}
      >
        Contact
        <br />
        Information
      </h2>

      <p
        className="mb-[50px] text-[1.65rem] leading-[1.5]"
        style={{ color: quickSilver }}
      >
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
      <div
        className="my-[50px] w-full h-px opacity-40"
        style={{
          background: `linear-gradient(to right, ${gold}, transparent)`,
        }}
      />

      {/* Hours */}
      <h3
        className="mb-4 font-normal text-[2.2rem]"
        style={{ fontFamily: "var(--font-forum)", fontWeight: 400 }}
      >
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
            className="flex justify-between items-center pb-3 text-[1.5rem]"
            style={{ borderBottom: `1px solid ${whiteAlpha10}` }}
          >
            <span className="font-bold text-white">{day}</span>
            <span style={{ color: gold }}>{time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}