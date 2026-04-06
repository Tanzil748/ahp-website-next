"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";

const POST_CATEGORIES = [
  "Fragrance Trends",
  "Guides & Tips",
  "Behind the Scenes",
  "Events",
];

const STATUS_STYLES: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  pending: {
    label: "Pending Review",
    color: "hsl(38,61%,73%)",
    bg: "hsla(38,61%,73%,0.12)",
    border: "hsla(38,61%,73%,0.3)",
  },
  approved: {
    label: "Published",
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

const BLOGGER_ROLES = ["blogger", "admin", "super-admin"];

function OrnamentalSep() {
  return (
    <svg viewBox="0 0 100 12" width="80" height="10">
      <line
        x1="0"
        y1="6"
        x2="38"
        y2="6"
        stroke="hsl(38,61%,73%)"
        strokeWidth="1"
        opacity="0.3"
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
        opacity="0.3"
      />
      <line
        x1="58"
        y1="6"
        x2="100"
        y2="6"
        stroke="hsl(38,61%,73%)"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

function GoldLinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 px-6 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
    >
      <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Link>
  );
}

const fullScreenBg: React.CSSProperties = {
  backgroundImage: "url('/images/potential-pink-bg.png')",
  backgroundSize: "600px 600px",
  backgroundRepeat: "repeat",
  backgroundAttachment: "fixed",
  backgroundBlendMode: "overlay",
  backgroundColor: "hsla(210,4%,9%,1)",
};

// ── Fallback: user has no blogger role ────────────────────────────────────────
function NotABloggerState() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 py-24 text-center"
      style={{ ...fullScreenBg, fontFamily: "var(--font-dm-sans)" }}
    >
      <div className="w-full max-w-[520] mx-auto flex flex-col items-center">
        {/* Diamond icon */}
        <div
          className="w-17.5 h-17.5 sm:w-20 sm:h-20 grid place-items-center mb-8"
          style={{
            border: "1px solid hsla(38,61%,73%,0.35)",
            transform: "rotate(45deg)",
          }}
        >
          <div style={{ transform: "rotate(-45deg)" }}>
            <svg
              viewBox="0 0 24 24"
              width="26"
              height="26"
              fill="none"
              stroke="hsl(38,61%,73%)"
              strokeWidth="1.5"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
        </div>

        <OrnamentalSep />

        {/* Label */}
        <span className="mt-7 mb-3 text-[hsl(38,61%,73%)] font-bold uppercase tracking-[4px] text-[1.1rem]">
          Blogger Access
        </span>

        <h1
          className="text-white font-normal mb-4 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          Become a Blogger
        </h1>

        <p className="text-white/40 text-[1.5rem] sm:text-[1.6rem] leading-[1.7] mb-8 max-w-[420]">
          You don't currently have permission to write posts. Submit an inquiry
          and our team will review your request.
        </p>

        {/* Decorative rule */}
        <div className="flex items-center gap-4 mb-8 w-full max-w-[300]">
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, hsla(38,61%,73%,0.25))",
            }}
          />
          <span className="text-[hsl(38,61%,73%)] text-[1rem] uppercase tracking-[3px] font-bold shrink-0">
            what you get
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, hsla(38,61%,73%,0.25))",
            }}
          />
        </div>

        {/* Perks */}
        <ul className="flex flex-col gap-4 mb-10 text-left w-full">
          {[
            {
              title: "Share Your Expertise",
              desc: "Publish fragrance guides, trends, and reviews",
            },
            {
              title: "Grow Your Audience",
              desc: "Reach our wholesale and enthusiast community",
            },
            {
              title: "Get Featured",
              desc: "Top posts are highlighted on our main blog",
            },
          ].map(({ title, desc }) => (
            <li
              key={title}
              className="flex items-start gap-4 px-5 py-4"
              style={{
                backgroundColor: "hsla(38,61%,73%,0.05)",
                border: "1px solid hsla(38,61%,73%,0.12)",
              }}
            >
              <span
                className="shrink-0 w-6 h-6 grid place-items-center mt-0.5"
                style={{ border: "1px solid hsla(38,61%,73%,0.5)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="11"
                  height="11"
                  fill="none"
                  stroke="hsl(38,61%,73%)"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div className="text-left">
                <p className="text-white font-bold text-[1.35rem] leading-snug">
                  {title}
                </p>
                <p className="text-white/40 text-[1.25rem]">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <GoldLinkButton href="/blogger-inquiry">
          Apply to Write →
        </GoldLinkButton>
      </div>
    </main>
  );
}

// ── Fallback: blogger with no posts yet ───────────────────────────────────────
function EmptyBloggerState() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 py-24 text-center"
      style={{ ...fullScreenBg, fontFamily: "var(--font-dm-sans)" }}
    >
      <div className="w-full max-w-[520] mx-auto flex flex-col items-center">
        {/* Diamond icon */}
        <div
          className="w-17.5 h-17.5 sm:w-20 sm:h-20 grid place-items-center mb-8"
          style={{
            border: "1px solid hsla(38,61%,73%,0.35)",
            transform: "rotate(45deg)",
          }}
        >
          <div style={{ transform: "rotate(-45deg)" }}>
            <svg
              viewBox="0 0 24 24"
              width="26"
              height="26"
              fill="none"
              stroke="hsl(38,61%,73%)"
              strokeWidth="1.5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
        </div>

        <OrnamentalSep />

        {/* Label */}
        <span className="mt-7 mb-3 text-[hsl(38,61%,73%)] font-bold uppercase tracking-[4px] text-[1.1rem]">
          My Writing
        </span>

        <h1
          className="text-white font-normal mb-4 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          Your Story Starts Here
        </h1>

        <p className="text-white/40 text-[1.5rem] sm:text-[1.6rem] leading-[1.7] mb-10 max-w-[420]">
          You haven't written any posts yet. Share your fragrance expertise with
          our community — your first post is just a click away.
        </p>

        {/* Decorative separator */}
        <div className="flex items-center gap-4 mb-10 w-full max-w-[300]">
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, hsla(38,61%,73%,0.25))",
            }}
          />
          <span
            className="shrink-0 w-2 h-2 rotate-45"
            style={{ backgroundColor: "hsl(38,61%,73%)", opacity: 0.5 }}
          />
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, hsla(38,61%,73%,0.25))",
            }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-12">
          {[
            { num: "01", label: "Pick a topic" },
            { num: "02", label: "Write your post" },
            { num: "03", label: "Submit for review" },
          ].map(({ num, label }) => (
            <div
              key={num}
              className="flex flex-col items-center py-5 px-4"
              style={{
                border: "1px solid hsla(38,61%,73%,0.12)",
                backgroundColor: "hsla(38,61%,73%,0.04)",
              }}
            >
              <span
                className="text-[2.2rem] font-bold leading-none mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "hsla(38,61%,73%,0.3)",
                }}
              >
                {num}
              </span>
              <span className="text-white/60 text-[1.3rem] font-bold uppercase tracking-[1px]">
                {label}
              </span>
            </div>
          ))}
        </div>

        <GoldLinkButton href="/write-blog">
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Write Your First Post
        </GoldLinkButton>
      </div>
    </main>
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
        fontSize: "0.9rem",
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

function IconBtn({
  onClick,
  title,
  color,
  bg,
  border,
  disabled,
  children,
}: {
  onClick: () => void;
  title: string;
  color: string;
  bg: string;
  border: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="flex items-center justify-center w-9 h-9 transition-all duration-200 disabled:opacity-40"
      style={{ color, backgroundColor: bg, border: `1px solid ${border}` }}
    >
      {children}
    </button>
  );
}

export default function MyPostsPage() {
  const posts = useQuery(api.posts.getMyPosts);
  const myRole = useQuery(api.posts.getMyRole);
  const updatePost = useMutation(api.posts.updatePost);

  const [editing, setEditing] = useState<{
    postId: Id<"posts">;
    title: string;
    category: string;
    excerpt: string;
    body: string;
  } | null>(null);
  const [editSaving, setEditSaving] = useState(false);

  const isLoading = posts === undefined || myRole === undefined;
  const isUnauthorized = posts === null;
  const isBlogger =
    myRole !== null && myRole !== undefined && BLOGGER_ROLES.includes(myRole);
  const isEmpty =
    !isLoading && !isUnauthorized && isBlogger && posts!.length === 0;

  // Full-screen fallbacks — returned before the page shell renders
  if (!isLoading && !isUnauthorized && !isBlogger) return <NotABloggerState />;
  if (isEmpty) return <EmptyBloggerState />;

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

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      {/* ── Hero band ── */}
      <div
        className="pt-48 pb-14 px-5 sm:px-8"
        style={{
          backgroundImage: "url('/images/potential-pink-bg.png')",
          backgroundSize: "600px 600px",
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay",
          backgroundColor: "hsla(210,4%,9%,1)",
        }}
      >
        <div className="max-w-[1100] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="gold-diamond" />
            <span className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[4px] text-[1.1rem]">
              My Writing
            </span>
            <span className="gold-diamond" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1
                className="text-[4rem] sm:text-[5.5rem] font-normal text-white leading-none tracking-tight mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                My Posts
              </h1>
              <p className="text-white/50 text-[1.4rem] max-w-xl">
                {!isLoading && !isUnauthorized && (posts?.length ?? 0) > 0
                  ? `${posts!.length} ${posts!.length === 1 ? "post" : "posts"} authored by you.`
                  : "All blog posts you have written."}
              </p>
            </div>

            {/* Write button — only for bloggers and up */}
            {!isLoading && isBlogger && (
              <Link
                href="/write-blog"
                className="group relative inline-flex items-center gap-3 px-6 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)] whitespace-nowrap shrink-0"
              >
                <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="relative z-10">Write New Post</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Content area ── */}
      <div
        className="px-5 sm:px-8 py-12 min-h-[50vh]"
        style={{ backgroundColor: "hsla(210,4%,6%,1)" }}
      >
        <div className="max-w-[1100] mx-auto">
          {/* Not signed in */}
          {isUnauthorized && (
            <div className="flex flex-col items-center justify-center py-32 gap-5">
              <p
                className="text-white/30 text-[2rem] font-normal"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Sign in to view your posts
              </p>
              <GoldLinkButton href="/sign-in">Sign In →</GoldLinkButton>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse"
                  style={{
                    backgroundColor: "hsla(0,0%,11%,1)",
                    border: "1px solid hsla(38,61%,73%,0.06)",
                  }}
                />
              ))}
            </div>
          )}

          {/* Posts list */}
          {!isLoading && !isUnauthorized && isBlogger && posts!.length > 0 && (
            <div style={{ border: "1px solid hsla(38,61%,73%,0.12)" }}>
              {posts!.map((post, i) => {
                const isLast = i === posts!.length - 1;
                return (
                  <div
                    key={post._id}
                    className="flex gap-4 px-5 py-5 transition-colors duration-200"
                    style={{
                      borderBottom: isLast
                        ? "none"
                        : "1px solid hsla(38,61%,73%,0.07)",
                      borderLeft: "2px solid transparent",
                      backgroundColor: "hsla(210,4%,10%,1)",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.borderLeftColor = "hsl(38,61%,73%)";
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.backgroundColor = "hsla(38,61%,73%,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.borderLeftColor = "transparent";
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.backgroundColor = "hsla(210,4%,10%,1)";
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden"
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
                            width="18"
                            height="18"
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
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[hsl(38,61%,73%)] text-[0.9rem] font-bold uppercase tracking-[0.15em]">
                          {post.category}
                        </span>
                        <StatusBadge status={post.status} />
                      </div>
                      <h3
                        className="text-white text-[1.35rem] sm:text-[1.5rem] font-normal leading-tight mb-1 truncate"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-white/30 text-[1.1rem] truncate">
                          {post.excerpt}
                        </p>
                      )}
                      <p className="text-[hsla(0,0%,40%,1)] text-[1rem] mt-1">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Edit */}
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
                        title="Edit post"
                        color="hsl(200,70%,65%)"
                        bg="hsla(200,70%,65%,0.1)"
                        border="hsla(200,70%,65%,0.3)"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="13"
                          height="13"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </IconBtn>

                      {/* Preview — approved only */}
                      {post.status === "approved" && (
                        <Link
                          href={`/blogs/${post._id}`}
                          target="_blank"
                          title="View live post"
                          className="flex items-center justify-center w-9 h-9 transition-all duration-200"
                          style={{
                            color: "hsla(0,0%,55%,1)",
                            backgroundColor: "hsla(0,0%,55%,0.08)",
                            border: "1px solid hsla(0,0%,55%,0.2)",
                          }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="13"
                            height="13"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Edit modal ── */}
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

      <BackToTop />
    </main>
  );
}
