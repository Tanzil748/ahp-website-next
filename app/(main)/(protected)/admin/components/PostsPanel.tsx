"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { StatusBadge } from "../ui/Badges";
import IconBtn from "../shared/IconBtn";
import ConfirmModal from "../shared/ConfirmModal";
import { getDisplayName, formatDate } from "../lib/helpers";
import { POST_CATEGORIES } from "../lib/constants";
import type { PostFilter } from "../lib/types";

const FILTERS: { key: PostFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

export default function PostsPanel({
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

  return (
    <div>
      {/* Header + filters */}
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

      {/* Posts list */}
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

      {/* Edit modal */}
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
              {/* Title */}
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

              {/* Category */}
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

              {/* Excerpt */}
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

              {/* Body */}
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
