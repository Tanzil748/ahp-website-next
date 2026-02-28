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
      className="flex items-start gap-[18px] mb-9"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Diamond icon box */}
      <div
        className="flex-shrink-0 w-[52px] h-[52px] grid place-items-center transition-colors duration-300"
        style={{
          border: `1px solid ${gold}`,
          transform: "rotate(45deg)",
          backgroundColor: hovered ? gold : "transparent",
        }}
      >
        <div style={{ transform: "rotate(-45deg)" }}>
          <Icon stroke={hovered ? smokyBlack1 : gold} />
        </div>
      </div>

      <div>
        <p
          className="uppercase font-bold mb-1"
          style={{ fontSize: "1.4rem", letterSpacing: "0.15em", color: gold }}
        >
          {label}
        </p>
        <div
          style={{ fontSize: "1.5rem", color: quickSilver, lineHeight: 1.6 }}
        >
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
      <div style={{ marginBottom: 12 }}>
        <span
          className="uppercase font-bold"
          style={{ color: gold, fontSize: "1.4rem", letterSpacing: "0.4em" }}
        >
          Find Us
        </span>
        <OrnamentalSep align="left" />
      </div>

      <h2
        className="mb-5"
        style={{
          fontFamily: "var(--font-forum)",
          fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)",
          lineHeight: 1.4,
          fontWeight: 400,
        }}
      >
        Contact
        <br />
        Information
      </h2>

      <p
        className="mb-[50px]"
        style={{ color: quickSilver, fontSize: "1.65rem", lineHeight: 1.5 }}
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
        className="my-[50px]"
        style={{
          width: "100%",
          height: 1,
          background: `linear-gradient(to right, ${gold}, transparent)`,
          opacity: 0.4,
        }}
      />

      {/* Hours */}
      <h3
        className="mb-4"
        style={{
          fontFamily: "var(--font-forum)",
          fontSize: "2.2rem",
          fontWeight: 400,
        }}
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
            className="flex justify-between items-center pb-3"
            style={{
              fontSize: "1.5rem",
              borderBottom: `1px solid ${whiteAlpha10}`,
            }}
          >
            <span className="font-bold text-white">{day}</span>
            <span style={{ color: gold }}>{time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
