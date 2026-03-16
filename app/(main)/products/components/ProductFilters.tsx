"use client";

import { useState } from "react";
import { DISPLAY_BRANDS } from "../utils";

type Props = {
  viewAll: boolean;
  selectedBrands: string[];
  selectedGenders: string[];
  showAvailable: boolean;
  showUnavailable: boolean;
  hasActiveFilters: boolean;
  genders: string[];
  onToggleBrand: (b: string) => void;
  onToggleGender: (g: string) => void;
  onToggleAvailable: () => void;
  onToggleUnavailable: () => void;
  onResetAll: () => void;
};

function SidebarSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-white/10 pb-6 mb-6 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between mb-3 group"
      >
        <span className="flex items-center gap-2 text-[hsl(38,61%,73%)] font-bold uppercase tracking-[3px] text-[1.1rem]">
          {icon}
          {title}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`text-white/30 group-hover:text-[hsl(38,61%,73%)] transition-all duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>
      {open && <div className="flex flex-col gap-0.5">{children}</div>}
    </div>
  );
}

function FilterOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 px-2 py-2 cursor-pointer rounded transition-colors duration-150 hover:bg-[hsl(38,61%,73%)]/10 group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 shrink-0 accent-[hsl(38,61%,73%)] cursor-pointer"
      />
      <span
        className={`text-[1.4rem] font-bold uppercase tracking-[1.5px] transition-colors duration-150 ${
          checked
            ? "text-[hsl(38,61%,73%)]"
            : "text-white/60 group-hover:text-[hsl(38,61%,73%)]"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default function ProductFilters({
  viewAll,
  selectedBrands,
  selectedGenders,
  showAvailable,
  showUnavailable,
  hasActiveFilters,
  genders,
  onToggleBrand,
  onToggleGender,
  onToggleAvailable,
  onToggleUnavailable,
  onResetAll,
}: Props) {
  return (
    <aside
      className="border border-white/10 p-6 h-fit"
      style={{ backgroundColor: "hsla(0,0%,6%,1)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-5 h-px bg-[hsl(38,61%,73%)]" />
          <h3
            className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[4px] text-[1.2rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Filter Perfumes
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetAll}
            className="text-white/30 hover:text-[hsl(38,61%,73%)] text-[1.1rem] font-bold uppercase tracking-[2px] transition-colors duration-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* View All */}
      <SidebarSection
        title="All Perfumes"
        icon={
          <svg width="16" height="16" fill="none" viewBox="0 0 512 512">
            <rect
              x="48"
              y="48"
              width="176"
              height="176"
              rx="20"
              stroke="currentColor"
              strokeWidth="32"
            />
            <rect
              x="288"
              y="48"
              width="176"
              height="176"
              rx="20"
              stroke="currentColor"
              strokeWidth="32"
            />
            <rect
              x="48"
              y="288"
              width="176"
              height="176"
              rx="20"
              stroke="currentColor"
              strokeWidth="32"
            />
            <rect
              x="288"
              y="288"
              width="176"
              height="176"
              rx="20"
              stroke="currentColor"
              strokeWidth="32"
            />
          </svg>
        }
      >
        <FilterOption
          label="View All"
          checked={viewAll}
          onChange={onResetAll}
        />
      </SidebarSection>

      {/* Gender */}
      <SidebarSection
        title="Gender"
        icon={
          <svg width="16" height="16" fill="none" viewBox="0 0 512 512">
            <path
              d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M147 280c-21.36 0-42.78 5.9-60.32 17.66C67.82 310.5 56 330.23 56 352v8h139"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        {genders.map((g) => (
          <FilterOption
            key={g}
            label={g}
            checked={selectedGenders.includes(g)}
            onChange={() => onToggleGender(g)}
          />
        ))}
      </SidebarSection>

      {/* Brand */}
      <SidebarSection
        title="Brand"
        icon={
          <svg width="16" height="16" fill="none" viewBox="0 0 512 512">
            <path
              d="M243.42 72.59L48 268l196 196 196-196-81.9-191.52A32 32 0 00328.74 56H272a32 32 0 00-28.58 16.59z"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="352"
              cy="160"
              r="32"
              stroke="currentColor"
              strokeWidth="32"
            />
          </svg>
        }
      >
        {DISPLAY_BRANDS.map((b) => (
          <FilterOption
            key={b}
            label={b}
            checked={selectedBrands.includes(b)}
            onChange={() => onToggleBrand(b)}
          />
        ))}
      </SidebarSection>

      {/* Availability */}
      <SidebarSection
        title="Availability"
        icon={
          <svg width="16" height="16" fill="none" viewBox="0 0 512 512">
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              stroke="currentColor"
              strokeWidth="32"
            />
            <path
              d="M352 176L217.6 336 160 272"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        <FilterOption
          label="Available"
          checked={showAvailable}
          onChange={onToggleAvailable}
        />
        <FilterOption
          label="Unavailable"
          checked={showUnavailable}
          onChange={onToggleUnavailable}
        />
      </SidebarSection>
    </aside>
  );
}
