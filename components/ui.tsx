/**
 * components/ui.tsx
 *
 * Shared primitives used across section components.
 * All tokens (colors, fonts) come from globals.css — no hardcoded values here.
 */

import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   Wavy gold separator
   Usage: <Separator />
───────────────────────────────────────── */
export function Separator() {
  return (
    <span className="flex justify-center mb-3">
      <Image
        src="/images/patterns/separator.svg"
        width={100}
        height={10}
        alt=""
        aria-hidden="true"
      />
    </span>
  );
}

/* ─────────────────────────────────────────
   Section eyebrow label
   Usage: <SectionLabel>Distribution</SectionLabel>
───────────────────────────────────────── */
export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-bold uppercase text-[1.2rem] mb-3 text-[var(--gold)] tracking-[0.4em] [font-family:var(--font-dm-sans)] ${className}`}
    >
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────
   Section heading (h2 by default)
   Usage: <SectionTitle>Authorized Largest Distributor</SectionTitle>
          <SectionTitle as="h1">...</SectionTitle>
───────────────────────────────────────── */
export function SectionTitle({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={`font-normal leading-[1.2] text-white [font-family:var(--font-forum)] text-[calc(2rem+2.5vw)] ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────
   Standard section header block (label + separator + title)
   Usage: <SectionHeader label="Distribution" title="Authorized Largest Distributor" center />
───────────────────────────────────────── */
export function SectionHeader({
  label,
  title,
  center = true,
  titleClassName = "",
}: {
  label: string;
  title: string;
  center?: boolean;
  titleClassName?: string;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <SectionLabel>{label}</SectionLabel>
      <Separator />
      <SectionTitle className={titleClassName}>{title}</SectionTitle>
    </div>
  );
}

/* ─────────────────────────────────────────
   Shimmer sweep overlay (clipped to parent)
   Place inside a `relative overflow-hidden` container.
   Usage: <Shimmer />
───────────────────────────────────────── */
export function Shimmer() {
  return (
    <span
      className="
        absolute top-0 left-0 w-1/2 h-full pointer-events-none z-[2]
        bg-gradient-to-r from-transparent to-white/40
        -skew-x-[4.6deg] -translate-x-[180%]
        group-hover:translate-x-[275%] group-hover:transition-transform
        group-hover:duration-1000 group-hover:ease-in-out
      "
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────
   Gold wipe-fill CTA button / link
   The circle fills up from below on hover; text swaps via slide.
   Usage: <GoldButton href="/products">View Our Products</GoldButton>
          <GoldButton href="/blog" className="mx-auto mt-[40px]">View Our Blog</GoldButton>
───────────────────────────────────────── */
export function GoldButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`
        group relative isolate block max-w-max overflow-hidden no-underline
        border-2 border-[var(--gold)] px-[45px] py-[12px]
        text-[var(--gold)] font-bold uppercase text-[1.2rem] tracking-[3px]
        [font-family:var(--font-dm-sans)] transition-colors duration-[250ms]
        ${className}
      `}
    >
      {/* Circle fill that wipes up from bottom on hover */}
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 w-[200%] h-[200%] rounded-full bg-[var(--gold)] -z-[1] transition-[bottom] duration-500 ease-in-out pointer-events-none group-hover:bottom-[-50%]"
        aria-hidden="true"
      />
      {/* Invisible spacer — prevents button resizing on hover */}
      <span className="invisible block">{children}</span>
      {/* text-1 — slides up on hover */}
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-[250ms] ease-in-out group-hover:-translate-y-full">
        {children}
      </span>
      {/* text-2 — slides in from below on hover */}
      <span
        className="absolute inset-x-0 top-full flex items-center justify-center h-full text-[hsla(40,12%,5%,1)] transition-all duration-[250ms] ease-in-out group-hover:top-0"
        aria-hidden="true"
      >
        {children}
      </span>
    </Link>
  );
}