// Server components — pure display, no interactivity needed
import { ROLE_STYLES, STATUS_STYLES, JOB_TYPE_STYLES } from "../lib/constants";

const badgeBase: React.CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  padding: "2px 10px",
  textTransform: "uppercase",
  display: "inline-block",
  whiteSpace: "nowrap",
};

export function RoleBadge({ role }: { role?: string }) {
  const s = ROLE_STYLES[role ?? "none"] ?? ROLE_STYLES.none;
  return (
    <span
      style={{
        ...badgeBase,
        color: s.color,
        backgroundColor: s.bg,
        border: `1px solid ${s.border}`,
      }}
    >
      {s.label}
    </span>
  );
}

export function StatusBadge({ status }: { status?: string }) {
  const s = STATUS_STYLES[status ?? "pending"] ?? STATUS_STYLES.pending;
  return (
    <span
      style={{
        ...badgeBase,
        color: s.color,
        backgroundColor: s.bg,
        border: `1px solid ${s.border}`,
      }}
    >
      {s.label}
    </span>
  );
}

export function JobTypeBadge({ type }: { type: string }) {
  const s = JOB_TYPE_STYLES[type] ?? JOB_TYPE_STYLES["full-time"];
  return (
    <span
      style={{
        ...badgeBase,
        color: s.color,
        backgroundColor: s.bg,
        border: `1px solid ${s.border}`,
      }}
    >
      {s.label}
    </span>
  );
}
