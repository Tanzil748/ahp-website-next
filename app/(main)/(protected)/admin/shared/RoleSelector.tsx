"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { ROLE_STYLES, ROLE_OPTIONS } from "../lib/constants";
import type { UserRole } from "../lib/types";

export default function RoleSelector({
  userId,
  currentRole,
  isSuperAdmin,
}: {
  userId: Id<"users">;
  currentRole?: string;
  isSuperAdmin: boolean;
}) {
  const setUserRole = useMutation(api.users.setUserRole);
  const [saving, setSaving] = useState(false);
  const [localRole, setLocalRole] = useState<UserRole>(
    (currentRole as UserRole) ?? "none",
  );

  const availableOptions = isSuperAdmin
    ? ROLE_OPTIONS
    : ROLE_OPTIONS.filter((o) => o.value !== "admin");

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as UserRole;
    setLocalRole(next);
    setSaving(true);
    try {
      await setUserRole({ userId, role: next === "none" ? null : next });
    } catch {
      setLocalRole((currentRole as UserRole) ?? "none");
    } finally {
      setSaving(false);
    }
  }

  const s = ROLE_STYLES[localRole] ?? ROLE_STYLES.none;

  return (
    <div className="relative inline-flex items-center">
      <select
        value={localRole}
        onChange={handleChange}
        disabled={saving}
        style={{
          color: s.color,
          backgroundColor: s.bg,
          border: `1px solid ${s.border}`,
          fontSize: "0.95rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          padding: "2px 28px 2px 10px",
          textTransform: "uppercase",
          appearance: "none",
          cursor: saving ? "wait" : "pointer",
          outline: "none",
          opacity: saving ? 0.6 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {availableOptions.map((o) => (
          <option
            key={o.value}
            value={o.value}
            style={{
              backgroundColor: "hsla(210,4%,11%,1)",
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            {o.label}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 10 6"
        width="10"
        height="6"
        fill="none"
        stroke={s.color}
        strokeWidth="1.5"
        className="absolute right-2 pointer-events-none"
        style={{ opacity: 0.7 }}
      >
        <path d="M1 1l4 4 4-4" />
      </svg>
    </div>
  );
}
