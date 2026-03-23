"use client";

import { useState } from "react";
import { OrnamentalSep } from "./bloggerUtils";

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
        className="flex-shrink-0 w-[52px] h-[52px] max-sm:w-[44px] max-sm:h-[44px] grid place-items-center transition-colors duration-300 border border-[var(--gold)]"
        style={{
          transform: "rotate(45deg)",
          backgroundColor: hovered ? "var(--gold)" : "transparent",
        }}
      >
        <span
          className="-rotate-45 text-[1.8rem] leading-none"
          style={{ color: hovered ? "var(--bg-dark)" : "var(--gold)" }}
        >
          {icon}
        </span>
      </div>

      <div>
        <p className="uppercase font-bold mb-1 text-[1.4rem] tracking-[0.15em] text-[var(--gold)]">
          {label}
        </p>
        <p className="text-[1.5rem] leading-[1.6] text-[var(--text-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BloggerInfo() {
  return (
    <div className="fade-up delay-2">
      {/* Subtitle */}
      <div className="mb-3">
        <span className="uppercase font-bold text-[1.4rem] tracking-[0.4em] text-[var(--gold)]">
          Creator Collaborations
        </span>
        <OrnamentalSep align="left" />
      </div>

      <h2
        className="mb-5 font-normal leading-[1.3] text-white [font-family:var(--font-display)]"
        style={{ fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)" }}
      >
        Share the Art
        <br />
        of Fine Fragrance
      </h2>

      <p className="mb-[50px] text-[1.65rem] leading-[1.6] text-[var(--text-muted)]">
        We partner with bloggers, influencers and content creators who have a
        genuine passion for perfumery, luxury lifestyle and the art of scent.
        Our collaborations are built on authenticity — not just reach.
      </p>

      {/* Feature cards */}
      <FeatureCard
        icon="✦"
        label="Product Gifting"
        description="Selected collaborators receive curated fragrance sets from our latest collections to review, feature and share with their audience."
      />
      <FeatureCard
        icon="◈"
        label="Affiliate Programme"
        description="Earn a commission on every sale driven through your unique link. Our affiliate programme rewards creators fairly for the value they deliver."
      />
      <FeatureCard
        icon="◎"
        label="Exclusive Content Access"
        description="Get early access to new launches, behind-the-scenes content, brand stories and direct contact with our product team for interviews."
      />

      {/* Gold divider */}
      <div className="my-[50px] w-full h-px opacity-40 bg-gradient-to-r from-[var(--gold)] to-transparent" />

      {/* What we look for */}
      <h3 className="mb-4 font-normal text-[2.2rem] [font-family:var(--font-display)]">
        What We Look For
      </h3>

      <ul className="flex flex-col gap-3">
        {[
          {
            item: "Genuine passion for fragrance",
            hint: "Or luxury, beauty & lifestyle…",
          },
          {
            item: "Consistent content output",
            hint: "Blog, video, social — any platform…",
          },
          { item: "Engaged audience", hint: "Quality over quantity…" },
          { item: "Authentic voice", hint: "We value honest reviews…" },
          { item: "Professional communication", hint: "Reliable & organised…" },
          {
            item: "Long-term mindset",
            hint: "We invest in lasting partnerships…",
          },
        ].map(({ item, hint }) => (
          <li
            key={item}
            className="flex justify-between items-center pb-3 text-[1.5rem] border-b border-[var(--white-10)]"
          >
            <span className="font-bold text-white">{item}</span>
            <span className="text-right shrink-0 text-[1.3rem] opacity-80 text-[var(--gold)]">
              {hint}
            </span>
          </li>
        ))}
      </ul>

      {/* Gold divider */}
      <div className="my-[50px] w-full h-px opacity-40 bg-gradient-to-r from-[var(--gold)] to-transparent" />

      {/* Response time */}
      <div
        className="flex items-center gap-4 px-6 py-5 border border-[var(--white-10)]"
        style={{ background: "hsla(210,4%,11%,1)" }}
      >
        <span className="text-[2.4rem] shrink-0 text-[var(--gold)]">◷</span>
        <div>
          <p className="font-bold uppercase tracking-[0.15em] text-[1.3rem] mb-1 text-[var(--gold)]">
            Response Time
          </p>
          <p className="text-[1.45rem] leading-[1.5] text-[var(--text-muted)]">
            Our partnerships team reviews every application and responds within{" "}
            <span className="text-white font-bold">2–4 business days</span> with
            next steps, collaboration options and any additional questions.
          </p>
        </div>
      </div>
    </div>
  );
}
