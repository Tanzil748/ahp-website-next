"use client";

import { useState } from "react";
import {
  gold,
  smokyBlack1,
  quickSilver,
  whiteAlpha10,
  OrnamentalSep,
} from "./fragranceUtils";

// ─── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon,
  label,
  description,
}: {
  icon: string;
  label: string;
  description: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-start gap-[18px] max-sm:gap-[14px] mb-8"
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
        <span
          className="-rotate-45 text-[1.8rem] leading-none"
          style={{ color: hovered ? smokyBlack1 : gold }}
        >
          {icon}
        </span>
      </div>

      <div>
        <p
          className="uppercase font-bold mb-1 text-[1.4rem] tracking-[0.15em]"
          style={{ color: gold }}
        >
          {label}
        </p>
        <p
          className="text-[1.5rem] leading-[1.6]"
          style={{ color: quickSilver }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function RequestFragrance() {
  return (
    <div className="fade-up delay-2">
      {/* Subtitle */}
      <div className="mb-3">
        <span
          className="uppercase font-bold text-[1.4rem] tracking-[0.4em]"
          style={{ color: gold }}
        >
          Custom Fragrance
        </span>
        <OrnamentalSep align="left" />
      </div>

      <h2
        className="mb-5 font-normal leading-[1.3]"
        style={{
          fontFamily: "var(--font-forum)",
          fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)",
        }}
      >
        Request Your
        <br />
        Signature Scent
      </h2>

      <p
        className="mb-[50px] text-[1.65rem] leading-[1.6]"
        style={{ color: quickSilver }}
      >
        Have a scent in mind? Tell us your vision and our master perfumers will
        craft a bespoke fragrance tailored to your exact preferences.
      </p>

      {/* Feature cards */}
      <FeatureCard
        icon="✦"
        label="Bespoke Creation"
        description="Every fragrance request is individually reviewed and crafted to reflect your personality and preferences."
      />
      <FeatureCard
        icon="◈"
        label="Rare Ingredients"
        description="Access to premium oud, saffron, rose absolutes and other rare materials sourced from around the world."
      />
      <FeatureCard
        icon="◎"
        label="Collaborative Process"
        description="Work directly with our perfumers through consultations to refine and perfect your scent."
      />

      {/* Gold divider */}
      <div
        className="my-[50px] w-full h-px opacity-40"
        style={{
          background: `linear-gradient(to right, ${gold}, transparent)`,
        }}
      />

      {/* What to include */}
      <h3
        className="mb-4 font-normal text-[2.2rem]"
        style={{ fontFamily: "var(--font-forum)" }}
      >
        What to Include in Your Request
      </h3>

      <ul className="flex flex-col gap-3">
        {[
          {
            item: "Preferred scent family",
            hint: "Oriental, Floral, Woody, Fresh…",
          },
          { item: "Occasion or mood", hint: "Evening, daily, gifting…" },
          { item: "Preferred notes", hint: "Oud, rose, citrus, musk…" },
          { item: "Desired longevity", hint: "Light, moderate, long-lasting" },
          { item: "Quantity or bottle size", hint: "50ml, 75ml, 100ml…" },
        ].map(({ item, hint }) => (
          <li
            key={item}
            className="flex justify-between items-center pb-3 text-[1.5rem] gap-4"
            style={{ borderBottom: `1px solid ${whiteAlpha10}` }}
          >
            <span className="font-bold text-white">{item}</span>
            <span
              className="text-right shrink-0"
              style={{ color: gold, fontSize: "1.3rem", opacity: 0.8 }}
            >
              {hint}
            </span>
          </li>
        ))}
      </ul>

      {/* Gold divider */}
      <div
        className="my-[50px] w-full h-px opacity-40"
        style={{
          background: `linear-gradient(to right, ${gold}, transparent)`,
        }}
      />

      {/* Response time note */}
      <div
        className="flex items-center gap-4 px-6 py-5"
        style={{
          border: `1px solid ${whiteAlpha10}`,
          background: "hsla(210,4%,11%,1)",
        }}
      >
        <span className="text-[2.4rem] shrink-0" style={{ color: gold }}>
          ◷
        </span>
        <div>
          <p
            className="font-bold uppercase tracking-[0.15em] text-[1.3rem] mb-1"
            style={{ color: gold }}
          >
            Response Time
          </p>
          <p
            className="text-[1.45rem] leading-[1.5]"
            style={{ color: quickSilver }}
          >
            Our team typically responds to fragrance requests within{" "}
            <span className="text-white font-bold">2–3 business days</span>.
            Complex bespoke requests may require an initial consultation call.
          </p>
        </div>
      </div>
    </div>
  );
}
