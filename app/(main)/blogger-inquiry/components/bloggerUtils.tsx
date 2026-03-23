// ─── Shared theme tokens (CSS variables — matches contactUtils) ───────────────
export const gold = "var(--gold)";
export const eerieBlack1 = "var(--bg-section)";
export const eerieBlack2 = "var(--bg-card)";
export const smokyBlack1 = "var(--bg-dark)";
export const quickSilver = "var(--text-muted)";
export const whiteAlpha10 = "var(--white-10)";

// ─── Ornamental separator ─────────────────────────────────────────────────────
export function OrnamentalSep({
  align = "left",
}: {
  align?: "left" | "center";
}) {
  return (
    <svg
      viewBox="0 0 100 12"
      width="100"
      height="12"
      className={`block ${align === "center" ? "mx-auto mt-[5px]" : "mt-[5px]"}`}
    >
      <line x1="0" y1="6" x2="38" y2="6" stroke="var(--gold)" strokeWidth="1" />
      <rect
        x="44"
        y="2"
        width="8"
        height="8"
        transform="rotate(45 48 6)"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1"
      />
      <line
        x1="58"
        y1="6"
        x2="100"
        y2="6"
        stroke="var(--gold)"
        strokeWidth="1"
      />
    </svg>
  );
}

// ─── Diamond separator ────────────────────────────────────────────────────────
export function DiamondSep() {
  return (
    <span className="inline-block flex-shrink-0 rotate-45 w-2 h-2 border border-[var(--gold)]" />
  );
}

// ─── Check icon ───────────────────────────────────────────────────────────────
export const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="32"
    height="32"
    fill="none"
    stroke="var(--gold)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
