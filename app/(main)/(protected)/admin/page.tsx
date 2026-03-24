"use client";

import { useState } from "react";
import { useQuery, useMutation, usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";

type Tab = "posts" | "users" | "careers";
type PostFilter = "all" | "pending" | "approved" | "rejected";
type UserRole = "super-admin" | "admin" | "blogger" | "none";
type JobType = "full-time" | "part-time" | "contract" | "internship";

// ── Helpers ────────────────────────────────────────────────────────────────

function getDisplayName(user: {
  firstName?: string;
  lastName?: string;
  email: string;
}) {
  if (user.firstName || user.lastName)
    return [user.firstName, user.lastName].filter(Boolean).join(" ");
  return user.email.split("@")[0];
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatSalary(min?: number, max?: number) {
  if (!min && !max) return null;
  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

// ── Constants ──────────────────────────────────────────────────────────────

const POST_CATEGORIES = [
  "Fragrance Trends",
  "Guides & Tips",
  "Behind the Scenes",
  "Events",
];

const ROLE_STYLES: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  "super-admin": {
    label: "Super Admin",
    color: "hsl(38,61%,73%)",
    bg: "hsla(38,61%,73%,0.12)",
    border: "hsla(38,61%,73%,0.3)",
  },
  admin: {
    label: "Admin",
    color: "hsl(200,70%,65%)",
    bg: "hsla(200,70%,65%,0.12)",
    border: "hsla(200,70%,65%,0.3)",
  },
  blogger: {
    label: "Blogger",
    color: "hsl(270,60%,70%)",
    bg: "hsla(270,60%,70%,0.12)",
    border: "hsla(270,60%,70%,0.3)",
  },
  none: {
    label: "Unset",
    color: "hsla(0,0%,55%,1)",
    bg: "hsla(0,0%,55%,0.1)",
    border: "hsla(0,0%,55%,0.25)",
  },
};

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "blogger", label: "Blogger" },
  { value: "none", label: "Unset" },
];

const STATUS_STYLES: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  pending: {
    label: "Pending",
    color: "hsl(38,61%,73%)",
    bg: "hsla(38,61%,73%,0.12)",
    border: "hsla(38,61%,73%,0.3)",
  },
  approved: {
    label: "Approved",
    color: "hsl(142,50%,62%)",
    bg: "hsla(142,50%,50%,0.12)",
    border: "hsla(142,50%,50%,0.3)",
  },
  rejected: {
    label: "Rejected",
    color: "hsl(0,65%,65%)",
    bg: "hsla(0,65%,50%,0.12)",
    border: "hsla(0,65%,50%,0.3)",
  },
};

const JOB_TYPE_STYLES: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  "full-time": {
    label: "Full-Time",
    color: "hsl(142,50%,62%)",
    bg: "hsla(142,50%,50%,0.12)",
    border: "hsla(142,50%,50%,0.3)",
  },
  "part-time": {
    label: "Part-Time",
    color: "hsl(200,70%,65%)",
    bg: "hsla(200,70%,65%,0.12)",
    border: "hsla(200,70%,65%,0.3)",
  },
  contract: {
    label: "Contract",
    color: "hsl(38,61%,73%)",
    bg: "hsla(38,61%,73%,0.12)",
    border: "hsla(38,61%,73%,0.3)",
  },
  internship: {
    label: "Internship",
    color: "hsl(270,60%,70%)",
    bg: "hsla(270,60%,70%,0.12)",
    border: "hsla(270,60%,70%,0.3)",
  },
};

// ── Shared UI atoms ────────────────────────────────────────────────────────

function Ornament() {
  return (
    <svg viewBox="0 0 100 12" width="80" height="10">
      <line
        x1="0"
        y1="6"
        x2="38"
        y2="6"
        stroke="hsl(38,61%,73%)"
        strokeWidth="1"
      />
      <rect
        x="44"
        y="2"
        width="8"
        height="8"
        transform="rotate(45 48 6)"
        fill="none"
        stroke="hsl(38,61%,73%)"
        strokeWidth="1"
      />
      <line
        x1="58"
        y1="6"
        x2="100"
        y2="6"
        stroke="hsl(38,61%,73%)"
        strokeWidth="1"
      />
    </svg>
  );
}

function RoleBadge({ role }: { role?: string }) {
  const s = ROLE_STYLES[role ?? "none"] ?? ROLE_STYLES.none;
  return (
    <span
      style={{
        color: s.color,
        backgroundColor: s.bg,
        border: `1px solid ${s.border}`,
        fontSize: "0.95rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        padding: "2px 10px",
        textTransform: "uppercase",
        display: "inline-block",
      }}
    >
      {s.label}
    </span>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const s = STATUS_STYLES[status ?? "pending"] ?? STATUS_STYLES.pending;
  return (
    <span
      style={{
        color: s.color,
        backgroundColor: s.bg,
        border: `1px solid ${s.border}`,
        fontSize: "0.95rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        padding: "2px 10px",
        textTransform: "uppercase",
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}

function JobTypeBadge({ type }: { type: string }) {
  const s = JOB_TYPE_STYLES[type] ?? JOB_TYPE_STYLES["full-time"];
  return (
    <span
      style={{
        color: s.color,
        backgroundColor: s.bg,
        border: `1px solid ${s.border}`,
        fontSize: "0.95rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        padding: "2px 10px",
        textTransform: "uppercase",
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}

function FullScreenMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      {children}
    </div>
  );
}

// ── Delete modal ───────────────────────────────────────────────────────────

function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: "hsla(210,4%,5%,0.88)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="w-full max-w-md p-8"
        style={{
          backgroundColor: "hsla(210,4%,11%,1)",
          border: "1px solid hsla(38,61%,73%,0.2)",
        }}
      >
        <div className="mb-4">
          <Ornament />
        </div>
        <p className="text-[hsla(0,0%,60%,1)] text-[1.3rem] mb-8 leading-relaxed">
          {message}
        </p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-white/20 text-white/60 text-[1.1rem] font-bold uppercase tracking-[2px] transition-colors hover:border-white/40 hover:text-white/80"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 text-[1.1rem] font-bold uppercase tracking-[2px]"
            style={{
              backgroundColor: "hsla(0,65%,50%,0.2)",
              border: "1px solid hsla(0,65%,50%,0.5)",
              color: "hsl(0,65%,65%)",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Role selector ──────────────────────────────────────────────────────────

function RoleSelector({
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

// ── Icon button ────────────────────────────────────────────────────────────

function IconBtn({
  onClick,
  disabled,
  title,
  color,
  bg,
  border,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  color: string;
  bg: string;
  border: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="flex items-center px-4 py-2 transition-all duration-200 disabled:opacity-40"
      style={{ color, backgroundColor: bg, border: `1px solid ${border}` }}
    >
      {children}
    </button>
  );
}

// ── Users Panel ────────────────────────────────────────────────────────────

function UsersPanel({
  isSuperAdmin,
  currentUserId,
}: {
  isSuperAdmin: boolean;
  currentUserId: Id<"users">;
}) {
  const {
    results: users,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.users.getUsersPaginated,
    {},
    { initialNumItems: 50 },
  );

  return (
    <div>
      <div className="mb-8">
        <p className="text-[hsla(0,0%,45%,1)] text-[1.1rem] uppercase tracking-[0.2em] font-bold mb-1">
          Registered Members
        </p>
        <p
          className="text-white text-[3rem] font-normal"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {users.length}
          {status === "CanLoadMore" && "+"}
        </p>
      </div>

      <div style={{ border: "1px solid hsla(38,61%,73%,0.1)" }}>
        <div
          className="hidden sm:grid gap-4 px-6 py-4"
          style={{
            gridTemplateColumns: "2rem 1fr 1fr 140px 110px",
            borderBottom: "1px solid hsla(38,61%,73%,0.15)",
            backgroundColor: "hsla(210,4%,7%,1)",
          }}
        >
          {["#", "Name", "Email", "Role", "Joined"].map((h) => (
            <span
              key={h}
              className="text-[hsla(0,0%,45%,1)] text-[1rem] uppercase tracking-[0.2em] font-bold"
            >
              {h}
            </span>
          ))}
        </div>

        {users.length === 0 && status === "Exhausted" ? (
          <div className="py-16 text-center text-[hsla(0,0%,40%,1)] text-[1.3rem]">
            No users found.
          </div>
        ) : (
          users.map((user, i) => {
            const roleNode =
              user._id === currentUserId ||
              user.role === "super-admin" ||
              (!isSuperAdmin && user.role === "admin") ? (
                <RoleBadge role={user.role} />
              ) : (
                <RoleSelector
                  userId={user._id}
                  currentRole={user.role}
                  isSuperAdmin={isSuperAdmin}
                />
              );

            return (
              <div
                key={user._id}
                style={{
                  borderBottom: "1px solid hsla(38,61%,73%,0.07)",
                  borderLeft: "2px solid transparent",
                  transition: "border-left-color 0.2s, background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                    "hsl(38,61%,73%)";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "hsla(38,61%,73%,0.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                    "transparent";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "transparent";
                }}
              >
                {/* Desktop: aligned grid */}
                <div
                  className="hidden sm:grid gap-4 px-6 py-5"
                  style={{ gridTemplateColumns: "2rem 1fr 1fr 140px 110px" }}
                >
                  <span className="text-[hsla(0,0%,30%,1)] text-[1.2rem] font-bold self-center">
                    {i + 1}
                  </span>
                  <span className="text-white text-[1.3rem] self-center truncate">
                    {getDisplayName(user)}
                  </span>
                  <span className="text-[hsla(0,0%,55%,1)] text-[1.2rem] self-center truncate">
                    {user.email}
                  </span>
                  <span className="self-center">{roleNode}</span>
                  <span className="text-[hsla(0,0%,45%,1)] text-[1.2rem] self-center whitespace-nowrap">
                    {formatDate(user._creationTime)}
                  </span>
                </div>

                {/* Mobile: stacked */}
                <div className="flex sm:hidden flex-col gap-2 px-4 py-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-white text-[1.3rem] font-medium">
                      {getDisplayName(user)}
                    </span>
                    {roleNode}
                  </div>
                  <span className="text-[hsla(0,0%,50%,1)] text-[1.15rem] break-all">
                    {user.email}
                  </span>
                  <span className="text-[hsla(0,0%,40%,1)] text-[1.05rem]">
                    {formatDate(user._creationTime)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {status === "CanLoadMore" && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => loadMore(50)}
            className="group relative inline-flex items-center gap-3 px-8 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
            <span className="relative z-10">Load Next 50</span>
          </button>
        </div>
      )}
      {status === "LoadingMore" && (
        <div className="flex justify-center mt-8">
          <span className="text-[hsl(38,61%,73%)] text-[1.2rem] uppercase tracking-[0.2em] animate-pulse">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
}

// ── Posts Panel ────────────────────────────────────────────────────────────

function PostsPanel({
  currentUserRole,
  currentUserClerkId,
}: {
  currentUserRole?: string;
  currentUserClerkId: string;
}) {
  const allPosts = useQuery(api.posts.getAllPostsAdmin);
  const approvePost = useMutation(api.posts.approvePost);
  const rejectPost = useMutation(api.posts.rejectPost);
  const deletePost = useMutation(api.posts.deletePost);
  const setFeatured = useMutation(api.posts.setFeaturedPost);
  const unfeature = useMutation(api.posts.unfeaturePost);
  const updatePost = useMutation(api.posts.updatePost);

  const [filter, setFilter] = useState<PostFilter>("all");
  const [confirm, setConfirm] = useState<{
    message: string;
    onConfirm: () => void;
  } | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [editing, setEditing] = useState<{
    postId: Id<"posts">;
    title: string;
    category: string;
    excerpt: string;
    body: string;
  } | null>(null);
  const [editSaving, setEditSaving] = useState(false);

  const filtered = (allPosts ?? []).filter((p) => {
    if (filter === "all") return true;
    if (filter === "pending") return !p.status || p.status === "pending";
    return p.status === filter;
  });

  const counts = {
    all: allPosts?.length ?? 0,
    pending:
      allPosts?.filter((p) => !p.status || p.status === "pending").length ?? 0,
    approved: allPosts?.filter((p) => p.status === "approved").length ?? 0,
    rejected: allPosts?.filter((p) => p.status === "rejected").length ?? 0,
  };

  async function handleAction(
    action: "approve" | "reject" | "feature" | "unfeature",
    postId: Id<"posts">,
  ) {
    setLoadingId(postId + action);
    try {
      if (action === "approve") await approvePost({ postId });
      if (action === "reject") await rejectPost({ postId });
      if (action === "feature") await setFeatured({ postId });
      if (action === "unfeature") await unfeature({ postId });
    } finally {
      setLoadingId(null);
    }
  }

  async function handleSaveEdit() {
    if (!editing) return;
    setEditSaving(true);
    try {
      await updatePost({
        postId: editing.postId,
        title: editing.title,
        category: editing.category,
        excerpt: editing.excerpt || undefined,
        body: editing.body,
      });
      setEditing(null);
    } finally {
      setEditSaving(false);
    }
  }

  const canEdit = (post: any) => {
    if (["admin", "super-admin"].includes(currentUserRole ?? "")) return true;
    if (currentUserRole === "blogger")
      return post.authorId === currentUserClerkId;
    return false;
  };

  const FILTERS: { key: PostFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
        <div>
          <p className="text-[hsla(0,0%,45%,1)] text-[1.1rem] uppercase tracking-[0.2em] font-bold mb-1">
            Total Posts
          </p>
          <p
            className="text-white text-[3rem] font-normal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {counts.all}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(({ key, label }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="px-5 py-2 text-[1.05rem] font-bold uppercase tracking-[0.15em] transition-all duration-200"
                style={{
                  color: active ? "hsl(40,12%,5%)" : "hsl(38,61%,73%)",
                  backgroundColor: active
                    ? "hsl(38,61%,73%)"
                    : "hsla(38,61%,73%,0.08)",
                  border: "1px solid hsla(38,61%,73%,0.35)",
                }}
              >
                {label}{" "}
                <span
                  className="ml-1 text-[0.9rem]"
                  style={{ opacity: active ? 0.7 : 0.5 }}
                >
                  {counts[key]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ border: "1px solid hsla(38,61%,73%,0.1)" }}>
        {allPosts === undefined ? (
          <div className="py-16 space-y-4 px-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded"
                style={{ backgroundColor: "hsla(38,61%,73%,0.05)" }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[hsla(0,0%,40%,1)] text-[1.4rem]">
              No {filter !== "all" ? filter : ""} posts found.
            </p>
          </div>
        ) : (
          filtered.map((post, i) => {
            const authorName = post.author
              ? getDisplayName(post.author as any)
              : "Unknown";
            const isLast = i === filtered.length - 1;
            const isFeatured = !!post.isFeatured;

            return (
              <div
                key={post._id}
                className="flex flex-col sm:flex-row sm:items-center gap-5 px-6 py-6"
                style={{
                  borderBottom: isLast
                    ? "none"
                    : "1px solid hsla(38,61%,73%,0.07)",
                  borderLeft: `2px solid ${isFeatured ? "hsl(38,61%,73%)" : "transparent"}`,
                  transition: "border-left-color 0.2s, background-color 0.2s",
                  backgroundColor: isFeatured
                    ? "hsla(38,61%,73%,0.03)"
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isFeatured)
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                      "hsl(38,61%,73%)";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "hsla(38,61%,73%,0.03)";
                }}
                onMouseLeave={(e) => {
                  if (!isFeatured)
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                      "transparent";
                  if (!isFeatured)
                    (e.currentTarget as HTMLDivElement).style.backgroundColor =
                      "transparent";
                }}
              >
                {/* Thumbnail */}
                <div
                  className="shrink-0 w-16 h-16 overflow-hidden hidden sm:block"
                  style={{ backgroundColor: "hsla(0,0%,7%,1)" }}
                >
                  {post.coverImageUrl ? (
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="hsla(38,61%,73%,0.3)"
                        strokeWidth="1.5"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="text-[hsl(38,61%,73%)] text-[1rem] font-bold uppercase tracking-[0.15em]">
                      {post.category}
                    </span>
                    <StatusBadge status={post.status} />
                    {isFeatured && (
                      <span
                        style={{
                          color: "hsl(38,61%,73%)",
                          backgroundColor: "hsla(38,61%,73%,0.15)",
                          border: "1px solid hsla(38,61%,73%,0.4)",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          padding: "2px 8px",
                          textTransform: "uppercase",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-white text-[1.5rem] font-normal leading-tight mb-1 truncate"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {post.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-[1.1rem] text-[hsla(0,0%,45%,1)]">
                    <span>By {authorName}</span>
                    <span>·</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {/* Feature / Unfeature — only available on approved posts */}
                  {post.status === "approved" &&
                    (isFeatured ? (
                      <IconBtn
                        onClick={() => handleAction("unfeature", post._id)}
                        disabled={loadingId === post._id + "unfeature"}
                        title="Remove featured"
                        color="hsl(38,61%,73%)"
                        bg="hsla(38,61%,73%,0.15)"
                        border="hsla(38,61%,73%,0.4)"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="currentColor"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </IconBtn>
                    ) : (
                      <IconBtn
                        onClick={() => handleAction("feature", post._id)}
                        disabled={loadingId === post._id + "feature"}
                        title="Set as featured"
                        color="hsla(0,0%,55%,1)"
                        bg="hsla(0,0%,55%,0.08)"
                        border="hsla(0,0%,55%,0.2)"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </IconBtn>
                    ))}

                  {/* Approve */}
                  {post.status !== "approved" && (
                    <IconBtn
                      onClick={() => handleAction("approve", post._id)}
                      disabled={loadingId === post._id + "approve"}
                      title="Approve"
                      color="hsl(142,50%,62%)"
                      bg="hsla(142,50%,50%,0.1)"
                      border="hsla(142,50%,50%,0.3)"
                    >
                      ✓
                    </IconBtn>
                  )}

                  {/* Reject */}
                  {post.status !== "rejected" && (
                    <IconBtn
                      onClick={() => handleAction("reject", post._id)}
                      disabled={loadingId === post._id + "reject"}
                      title="Reject"
                      color="hsl(0,65%,65%)"
                      bg="hsla(0,65%,50%,0.1)"
                      border="hsla(0,65%,50%,0.3)"
                    >
                      ✕
                    </IconBtn>
                  )}

                  {/* Edit */}
                  {canEdit(post) && (
                    <IconBtn
                      onClick={() =>
                        setEditing({
                          postId: post._id,
                          title: post.title,
                          category: post.category,
                          excerpt: post.excerpt ?? "",
                          body: post.body,
                        })
                      }
                      title="Edit"
                      color="hsl(200,70%,65%)"
                      bg="hsla(200,70%,65%,0.1)"
                      border="hsla(200,70%,65%,0.3)"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </IconBtn>
                  )}

                  {/* Preview */}
                  <Link
                    href={`/blogs/${post._id}`}
                    target="_blank"
                    title="Preview"
                    className="flex items-center px-4 py-2 transition-all duration-200"
                    style={{
                      color: "hsla(0,0%,55%,1)",
                      backgroundColor: "hsla(0,0%,55%,0.08)",
                      border: "1px solid hsla(0,0%,55%,0.2)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </Link>

                  {/* Delete */}
                  <IconBtn
                    onClick={() =>
                      setConfirm({
                        message: `Permanently delete "${post.title}"? This cannot be undone.`,
                        onConfirm: async () => {
                          setConfirm(null);
                          setLoadingId(post._id + "delete");
                          try {
                            await deletePost({ postId: post._id });
                          } finally {
                            setLoadingId(null);
                          }
                        },
                      })
                    }
                    disabled={loadingId === post._id + "delete"}
                    title="Delete"
                    color="hsl(0,65%,65%)"
                    bg="hsla(0,65%,50%,0.08)"
                    border="hsla(0,65%,50%,0.2)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </IconBtn>
                </div>
              </div>
            );
          })
        )}
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{
            backgroundColor: "hsla(210,4%,5%,0.88)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: "hsla(210,4%,11%,1)",
              border: "1px solid hsla(38,61%,73%,0.2)",
            }}
          >
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid hsla(38,61%,73%,0.15)" }}
            >
              <h3
                className="text-white text-[1.8rem] font-normal"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Edit Post
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="text-[hsla(0,0%,50%,1)] hover:text-white transition-colors duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-[hsla(0,0%,45%,1)] text-[1rem] uppercase tracking-[0.2em] font-bold mb-2">
                  Title
                </label>
                <input
                  value={editing.title}
                  onChange={(e) =>
                    setEditing((p) =>
                      p ? { ...p, title: e.target.value } : null,
                    )
                  }
                  className="w-full px-4 py-3 text-white text-[1.3rem] outline-none border transition-colors duration-200"
                  style={{
                    backgroundColor: "hsla(210,4%,7%,1)",
                    borderColor: "hsla(38,61%,73%,0.15)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "hsl(38,61%,73%)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "hsla(38,61%,73%,0.15)")
                  }
                />
              </div>
              <div>
                <label className="block text-[hsla(0,0%,45%,1)] text-[1rem] uppercase tracking-[0.2em] font-bold mb-2">
                  Category
                </label>
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing((p) =>
                      p ? { ...p, category: e.target.value } : null,
                    )
                  }
                  className="w-full px-4 py-3 text-white text-[1.3rem] outline-none border transition-colors duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundColor: "hsla(210,4%,7%,1)",
                    borderColor: "hsla(38,61%,73%,0.15)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "hsl(38,61%,73%)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "hsla(38,61%,73%,0.15)")
                  }
                >
                  {POST_CATEGORIES.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      style={{ backgroundColor: "hsla(210,4%,11%,1)" }}
                    >
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[hsla(0,0%,45%,1)] text-[1rem] uppercase tracking-[0.2em] font-bold mb-2">
                  Excerpt{" "}
                  <span className="normal-case tracking-normal font-normal opacity-60 text-[0.9rem]">
                    optional
                  </span>
                </label>
                <input
                  value={editing.excerpt}
                  onChange={(e) =>
                    setEditing((p) =>
                      p ? { ...p, excerpt: e.target.value } : null,
                    )
                  }
                  className="w-full px-4 py-3 text-white text-[1.3rem] outline-none border transition-colors duration-200"
                  style={{
                    backgroundColor: "hsla(210,4%,7%,1)",
                    borderColor: "hsla(38,61%,73%,0.15)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "hsl(38,61%,73%)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "hsla(38,61%,73%,0.15)")
                  }
                />
              </div>
              <div>
                <label className="block text-[hsla(0,0%,45%,1)] text-[1rem] uppercase tracking-[0.2em] font-bold mb-2">
                  Body
                </label>
                <textarea
                  value={editing.body}
                  rows={12}
                  onChange={(e) =>
                    setEditing((p) =>
                      p ? { ...p, body: e.target.value } : null,
                    )
                  }
                  className="w-full px-4 py-3 text-white text-[1.3rem] outline-none border transition-colors duration-200 resize-y leading-relaxed"
                  style={{
                    backgroundColor: "hsla(210,4%,7%,1)",
                    borderColor: "hsla(38,61%,73%,0.15)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "hsl(38,61%,73%)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "hsla(38,61%,73%,0.15)")
                  }
                />
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setEditing(null)}
                  className="flex-1 py-3 border border-white/20 text-white/60 text-[1.1rem] font-bold uppercase tracking-[2px] transition-colors hover:border-white/40 hover:text-white/80"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={editSaving || !editing.title || !editing.body}
                  className="flex-1 py-3 text-[1.1rem] font-bold uppercase tracking-[2px] transition-all disabled:opacity-40"
                  style={{
                    backgroundColor: "hsla(38,61%,73%,0.15)",
                    border: "1px solid hsla(38,61%,73%,0.4)",
                    color: "hsl(38,61%,73%)",
                  }}
                >
                  {editSaving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirm && (
        <ConfirmModal
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

// ── Career form ────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  title: "",
  department: "",
  location: "",
  type: "full-time" as JobType,
  description: "",
  requirements: [""],
  salaryMin: "",
  salaryMax: "",
  isActive: true,
};

function CareerForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: typeof EMPTY_FORM;
  onSave: (data: typeof EMPTY_FORM) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);

  function set(key: string, val: any) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function setReq(i: number, val: string) {
    const next = [...form.requirements];
    next[i] = val;
    setForm((f) => ({ ...f, requirements: next }));
  }

  function addReq() {
    setForm((f) => ({ ...f, requirements: [...f.requirements, ""] }));
  }
  function removeReq(i: number) {
    setForm((f) => ({
      ...f,
      requirements: f.requirements.filter((_, idx) => idx !== i),
    }));
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "hsla(210,4%,7%,1)",
    border: "1px solid hsla(38,61%,73%,0.15)",
    color: "white",
    padding: "10px 14px",
    fontSize: "1.3rem",
    outline: "none",
    fontFamily: "var(--font-dm-sans)",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    color: "hsla(0,0%,45%,1)",
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: 6,
  };

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle}>Job Title</label>
          <input
            style={inputStyle}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Senior Developer"
          />
        </div>
        <div>
          <label style={labelStyle}>Department</label>
          <select
            style={{ ...inputStyle, appearance: "none" }}
            value={form.department}
            onChange={(e) => set("department", e.target.value)}
          >
            <option value="" disabled>
              Select department
            </option>
            {[
              "Marketing",
              "Sales",
              "Operations",
              "Technology",
              "Corporate",
            ].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Location</label>
          <input
            style={inputStyle}
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="e.g. Remote, New York"
          />
        </div>
        <div>
          <label style={labelStyle}>Employment Type</label>
          <select
            style={{ ...inputStyle, appearance: "none" }}
            value={form.type}
            onChange={(e) => set("type", e.target.value as JobType)}
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Salary Min (optional)</label>
          <input
            style={inputStyle}
            type="number"
            value={form.salaryMin}
            onChange={(e) => set("salaryMin", e.target.value)}
            placeholder="e.g. 80000"
          />
        </div>
        <div>
          <label style={labelStyle}>Salary Max (optional)</label>
          <input
            style={inputStyle}
            type="number"
            value={form.salaryMax}
            onChange={(e) => set("salaryMax", e.target.value)}
            placeholder="e.g. 120000"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Role overview, responsibilities..."
        />
      </div>

      <div>
        <label style={labelStyle}>Requirements</label>
        <div className="space-y-2">
          {form.requirements.map((req, i) => (
            <div key={i} className="flex gap-2">
              <input
                style={{ ...inputStyle, flex: 1 }}
                value={req}
                onChange={(e) => setReq(i, e.target.value)}
                placeholder={`Requirement ${i + 1}`}
              />
              {form.requirements.length > 1 && (
                <button
                  onClick={() => removeReq(i)}
                  className="px-3 shrink-0"
                  style={{
                    color: "hsl(0,65%,65%)",
                    backgroundColor: "hsla(0,65%,50%,0.1)",
                    border: "1px solid hsla(0,65%,50%,0.3)",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addReq}
            className="text-[1.1rem] font-bold uppercase tracking-[0.15em] px-4 py-2 transition-colors"
            style={{
              color: "hsl(38,61%,73%)",
              backgroundColor: "hsla(38,61%,73%,0.08)",
              border: "1px solid hsla(38,61%,73%,0.25)",
            }}
          >
            + Add Requirement
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => set("isActive", !form.isActive)}
          className="relative w-11 h-6 transition-colors duration-300 shrink-0"
          style={{
            backgroundColor: form.isActive
              ? "hsl(38,61%,73%)"
              : "hsla(0,0%,25%,1)",
            borderRadius: 9999,
          }}
        >
          <span
            className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
            style={{
              left: 4,
              transform: form.isActive ? "translateX(20px)" : "translateX(0)",
            }}
          />
        </button>
        <span className="text-white text-[1.2rem]">
          {form.isActive
            ? "Active (visible to applicants)"
            : "Inactive (hidden)"}
        </span>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 py-3 border border-white/20 text-white/60 text-[1.1rem] font-bold uppercase tracking-[2px] transition-colors hover:border-white/40 hover:text-white/80"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          disabled={saving || !form.title || !form.department || !form.location}
          className="flex-1 py-3 text-[1.1rem] font-bold uppercase tracking-[2px] transition-all disabled:opacity-40"
          style={{
            backgroundColor: "hsla(38,61%,73%,0.15)",
            border: "1px solid hsla(38,61%,73%,0.4)",
            color: "hsl(38,61%,73%)",
          }}
        >
          {saving ? "Saving..." : "Save Listing"}
        </button>
      </div>
    </div>
  );
}

// ── Careers Panel ──────────────────────────────────────────────────────────

function CareersPanel() {
  const careers = useQuery(api.careers.getAllCareers);
  const createCareer = useMutation(api.careers.createCareer);
  const updateCareer = useMutation(api.careers.updateCareer);
  const toggleActive = useMutation(api.careers.toggleCareerActive);
  const deleteCareer = useMutation(api.careers.deleteCareer);

  const [mode, setMode] = useState<"list" | "create" | { edit: Id<"careers"> }>(
    "list",
  );
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<{
    message: string;
    onConfirm: () => void;
  } | null>(null);

  async function handleCreate(form: typeof EMPTY_FORM) {
    setSaving(true);
    try {
      await createCareer({
        title: form.title,
        department: form.department as
          | "Marketing"
          | "Sales"
          | "Operations"
          | "Technology"
          | "Corporate",
        location: form.location,
        type: form.type,
        description: form.description,
        requirements: form.requirements.filter((r) => r.trim()),
        salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
        isActive: form.isActive,
      });
      setMode("list");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(
    careerId: Id<"careers">,
    form: typeof EMPTY_FORM,
  ) {
    setSaving(true);
    try {
      await updateCareer({
        careerId,
        title: form.title,
        department: form.department as
          | "Marketing"
          | "Sales"
          | "Operations"
          | "Technology"
          | "Corporate",
        location: form.location,
        type: form.type,
        description: form.description,
        requirements: form.requirements.filter((r) => r.trim()),
        salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
        isActive: form.isActive,
      });
      setMode("list");
    } finally {
      setSaving(false);
    }
  }

  // Create form
  if (mode === "create") {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-white text-[2rem] font-normal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            New Listing
          </h2>
          <Ornament />
        </div>
        <div
          style={{ border: "1px solid hsla(38,61%,73%,0.1)", padding: "2rem" }}
        >
          <CareerForm
            initial={EMPTY_FORM}
            onSave={handleCreate}
            onCancel={() => setMode("list")}
            saving={saving}
          />
        </div>
      </div>
    );
  }

  // Edit form
  if (typeof mode === "object" && "edit" in mode) {
    const career = (careers ?? []).find((c) => c._id === mode.edit);
    if (!career) return null;
    const initial = {
      title: career.title,
      department: career.department,
      location: career.location,
      type: career.type,
      description: career.description,
      requirements: career.requirements.length ? career.requirements : [""],
      salaryMin: career.salaryMin?.toString() ?? "",
      salaryMax: career.salaryMax?.toString() ?? "",
      isActive: career.isActive,
    };
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-white text-[2rem] font-normal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Edit Listing
          </h2>
          <Ornament />
        </div>
        <div
          style={{ border: "1px solid hsla(38,61%,73%,0.1)", padding: "2rem" }}
        >
          <CareerForm
            initial={initial}
            onSave={(form) => handleUpdate(mode.edit, form)}
            onCancel={() => setMode("list")}
            saving={saving}
          />
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
        <div>
          <p className="text-[hsla(0,0%,45%,1)] text-[1.1rem] uppercase tracking-[0.2em] font-bold mb-1">
            Job Listings
          </p>
          <p
            className="text-white text-[3rem] font-normal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {careers?.length ?? "—"}
          </p>
        </div>
        <button
          onClick={() => setMode("create")}
          className="group relative inline-flex items-center gap-3 px-8 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
          <span className="relative z-10">+ New Listing</span>
        </button>
      </div>

      <div style={{ border: "1px solid hsla(38,61%,73%,0.1)" }}>
        {careers == null ? (
          <div className="py-16 space-y-4 px-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded"
                style={{ backgroundColor: "hsla(38,61%,73%,0.05)" }}
              />
            ))}
          </div>
        ) : (careers ?? []).length === 0 ? (
          <div className="py-20 text-center">
            <Ornament />
            <p className="mt-6 text-[hsla(0,0%,40%,1)] text-[1.4rem]">
              No job listings yet. Add one above.
            </p>
          </div>
        ) : (
          (careers ?? []).map((career, i) => {
            const salary = formatSalary(career.salaryMin, career.salaryMax);
            const isLast = i === (careers ?? []).length - 1;
            return (
              <div
                key={career._id}
                className="flex flex-col sm:flex-row sm:items-center gap-5 px-6 py-6"
                style={{
                  borderBottom: isLast
                    ? "none"
                    : "1px solid hsla(38,61%,73%,0.07)",
                  borderLeft: "2px solid transparent",
                  transition: "border-left-color 0.2s, background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                    "hsl(38,61%,73%)";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "hsla(38,61%,73%,0.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                    "transparent";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "transparent";
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="text-[hsl(38,61%,73%)] text-[1rem] font-bold uppercase tracking-[0.15em]">
                      {career.department}
                    </span>
                    <JobTypeBadge type={career.type} />
                    {!career.isActive && (
                      <span
                        style={{
                          color: "hsla(0,0%,40%,1)",
                          backgroundColor: "hsla(0,0%,20%,1)",
                          border: "1px solid hsla(0,0%,30%,1)",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          padding: "2px 8px",
                          textTransform: "uppercase",
                        }}
                      >
                        Inactive
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-white text-[1.5rem] font-normal leading-tight mb-1 truncate"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {career.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-[1.1rem] text-[hsla(0,0%,45%,1)]">
                    <span>📍 {career.location}</span>
                    {salary && (
                      <>
                        <span>·</span>
                        <span>{salary}</span>
                      </>
                    )}
                    <span>·</span>
                    <span>{formatDate(career.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Toggle active */}
                  <button
                    onClick={() =>
                      toggleActive({
                        careerId: career._id,
                        isActive: !career.isActive,
                      })
                    }
                    title={career.isActive ? "Set Inactive" : "Set Active"}
                    className="flex items-center px-4 py-2 transition-all duration-200 text-[1.1rem] font-bold uppercase tracking-[0.1em]"
                    style={{
                      color: career.isActive
                        ? "hsl(0,65%,65%)"
                        : "hsl(142,50%,62%)",
                      backgroundColor: career.isActive
                        ? "hsla(0,65%,50%,0.1)"
                        : "hsla(142,50%,50%,0.1)",
                      border: `1px solid ${career.isActive ? "hsla(0,65%,50%,0.3)" : "hsla(142,50%,50%,0.3)"}`,
                    }}
                  >
                    {career.isActive ? "Set Inactive" : "Set Active"}
                  </button>

                  {/* Edit */}
                  <IconBtn
                    onClick={() => setMode({ edit: career._id })}
                    title="Edit"
                    color="hsl(200,70%,65%)"
                    bg="hsla(200,70%,65%,0.1)"
                    border="hsla(200,70%,65%,0.3)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </IconBtn>

                  {/* Delete */}
                  <IconBtn
                    onClick={() =>
                      setConfirm({
                        message: `Delete "${career.title}"? This cannot be undone.`,
                        onConfirm: async () => {
                          setConfirm(null);
                          await deleteCareer({ careerId: career._id });
                        },
                      })
                    }
                    title="Delete"
                    color="hsl(0,65%,65%)"
                    bg="hsla(0,65%,50%,0.08)"
                    border="hsla(0,65%,50%,0.2)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </IconBtn>
                </div>
              </div>
            );
          })
        )}
      </div>

      {confirm && (
        <ConfirmModal
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

const TABS: { key: Tab; label: string }[] = [
  { key: "posts", label: "Posts" },
  { key: "careers", label: "Careers" },
  { key: "users", label: "Users" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const currentUser = useQuery(api.users.current);

  if (currentUser === undefined) {
    return (
      <FullScreenMessage>
        <div className="space-y-3 w-48">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-3 animate-pulse rounded"
              style={{ backgroundColor: "hsla(38,61%,73%,0.15)" }}
            />
          ))}
        </div>
      </FullScreenMessage>
    );
  }

  if (
    !currentUser ||
    !["super-admin", "admin"].includes(currentUser.role ?? "")
  ) {
    return (
      <FullScreenMessage>
        <Ornament />
        <h1
          className="text-white text-[clamp(3rem,6vw,5rem)] font-normal"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Access Denied
        </h1>
        <p className="text-[hsla(0,0%,50%,1)] text-[1.3rem]">
          You do not have permission to view this page.
        </p>
        <Link
          href="/"
          className="group relative inline-flex items-center gap-3 px-8 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
          <span className="relative z-10">← Go Home</span>
        </Link>
      </FullScreenMessage>
    );
  }

  return (
    <div style={{ fontFamily: "var(--font-dm-sans)" }}>
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 pt-48 pb-16">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-[hsl(38,61%,73%)] text-[1.1rem] uppercase tracking-[0.3em] font-bold mb-2">
            Control Panel
          </p>
          <h1
            className="text-white font-normal leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 5vw, 5.5rem)",
            }}
          >
            Dashboard
          </h1>
          <div className="mt-4">
            <Ornament />
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-0 mb-10"
          style={{ borderBottom: "1px solid hsla(38,61%,73%,0.15)" }}
        >
          {TABS.map(({ key, label }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="relative px-8 py-4 text-[1.2rem] font-bold uppercase tracking-[0.2em] transition-colors duration-200"
                style={{
                  color: active ? "hsl(38,61%,73%)" : "hsla(0,0%,45%,1)",
                }}
              >
                {label}
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] transition-transform duration-300"
                  style={{
                    backgroundColor: "hsl(38,61%,73%)",
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Panel */}
        {activeTab === "posts" && (
          <PostsPanel
            currentUserRole={currentUser.role}
            currentUserClerkId={currentUser.clerkUserId}
          />
        )}
        {activeTab === "users" && (
          <UsersPanel
            isSuperAdmin={currentUser.role === "super-admin"}
            currentUserId={currentUser._id}
          />
        )}
        {activeTab === "careers" && <CareersPanel />}
      </main>
      <BackToTop />
    </div>
  );
}
