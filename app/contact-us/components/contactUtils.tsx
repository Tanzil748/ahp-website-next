// ─── Shared theme tokens ──────────────────────────────────────────────────────
export const gold = "hsl(38, 61%, 73%)";
export const eerieBlack1 = "hsla(210, 4%, 9%, 1)";
export const eerieBlack2 = "hsla(210, 4%, 11%, 1)";
export const smokyBlack1 = "hsla(40, 12%, 5%, 1)";
export const smokyBlack2 = "hsla(30, 8%, 5%, 1)";
export const quickSilver = "hsla(0, 0%, 65%, 1)";
export const whiteAlpha10 = "hsla(0, 0%, 100%, 0.1)";

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
      style={{
        display: "block",
        margin: align === "center" ? "5px auto 0" : "5px 0 0",
      }}
    >
      <line x1="0" y1="6" x2="38" y2="6" stroke={gold} strokeWidth="1" />
      <rect
        x="44"
        y="2"
        width="8"
        height="8"
        transform="rotate(45 48 6)"
        fill="none"
        stroke={gold}
        strokeWidth="1"
      />
      <line x1="58" y1="6" x2="100" y2="6" stroke={gold} strokeWidth="1" />
    </svg>
  );
}

// ─── Diamond separator ────────────────────────────────────────────────────────
export function DiamondSep() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        border: `1px solid ${gold}`,
        transform: "rotate(45deg)",
        flexShrink: 0,
      }}
    />
  );
}

// ─── SVG icons ────────────────────────────────────────────────────────────────
export const LocationIcon = ({ stroke = gold }: { stroke?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke={stroke}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const PhoneIcon = ({ stroke = gold }: { stroke?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke={stroke}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 11.5 19.8 19.8 0 011 2.93 2 2 0 012.96 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

export const EmailIcon = ({ stroke = gold }: { stroke?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke={stroke}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="32"
    height="32"
    fill="none"
    stroke={gold}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
