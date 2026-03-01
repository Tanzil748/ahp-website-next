"use client";

import { useState } from "react";
import {
  gold,
  smokyBlack1,
  quickSilver,
  whiteAlpha10,
  OrnamentalSep,
} from "./wholesaleUtils";

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
export default function WholesaleInfo() {
  return (
    <div className="fade-up delay-2">
      {/* Subtitle */}
      <div className="mb-3">
        <span
          className="uppercase font-bold text-[1.4rem] tracking-[0.4em]"
          style={{ color: gold }}
        >
          Wholesale & Retail
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
        Bring Luxury
        <br />
        Scents to Your Shelves
      </h2>

      <p
        className="mb-[50px] text-[1.65rem] leading-[1.6]"
        style={{ color: quickSilver }}
      >
        Whether you run a fragrance boutique, a beauty counter or a distribution
        network, we supply authentic oriental and western perfumes in bulk —
        from concentrated attars to EDP and EDTs.
      </p>

      {/* Feature cards */}
      <FeatureCard
        icon="✦"
        label="Attar & Oud Wholesale"
        description="Source pure non-alcoholic attars, oud oils and concentrated perfume oils — ideal for retailers targeting the Middle Eastern and luxury fragrance market."
      />
      <FeatureCard
        icon="◈"
        label="EDP & EDT Catalogue"
        description="Stock our full range of Eau de Parfum and Eau de Toilette bottles, available in 50ml, 75ml and 100ml with retail-ready branded packaging and display boxes."
      />
      <FeatureCard
        icon="◎"
        label="Private Label Options"
        description="We offer white-label and private label fragrance programs — supply your own branding on our formulations for exclusive in-store or online collections."
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
        What to Include in Your Inquiry
      </h3>

      <ul className="flex flex-col gap-3">
        {[
          {
            item: "Fragrance type preference",
            hint: "Attar, EDP, EDT, oil-based…",
          },
          {
            item: "Scent families of interest",
            hint: "Oriental, oud, floral, fresh…",
          },
          {
            item: "Estimated monthly volume",
            hint: "Bottles or ml per month…",
          },
          {
            item: "Preferred concentration",
            hint: "Parfum, EDP, EDT, attars…",
          },
          {
            item: "Private label interest",
            hint: "Yes / No / Open to discuss…",
          },
          {
            item: "Target customer profile",
            hint: "Luxury, everyday, gifting market…",
          },
        ].map(({ item, hint }) => (
          <li
            key={item}
            className="flex justify-between items-center pb-3 text-[1.5rem] gap-4"
            style={{ borderBottom: `1px solid ${whiteAlpha10}` }}
          >
            <span className="font-bold text-white">{item}</span>
            <span
              className="text-right shrink-0 text-[1.3rem] opacity-80"
              style={{ color: gold }}
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
            Our trade team responds to all fragrance wholesale inquiries within{" "}
            <span className="text-white font-bold">2–4 business days</span> with
            a full scent catalogue, concentration options, MOQ details and
            wholesale pricing sheet.
          </p>
        </div>
      </div>
    </div>
  );
}
