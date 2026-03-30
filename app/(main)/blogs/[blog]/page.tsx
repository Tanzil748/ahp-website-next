"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useState, useRef, useTransition, useEffect } from "react";
import Image from "next/image";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(
  firstName?: string | null,
  lastName?: string | null,
  email?: string,
): string {
  if (firstName && lastName)
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  if (firstName) return firstName[0].toUpperCase();
  if (email) return email[0].toUpperCase();
  return "?";
}

// ─── Avatar ────────────────────────────────────────────────────────────────────

function Avatar({
  imageUrl,
  firstName,
  lastName,
  email,
}: {
  imageUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
}) {
  return imageUrl ? (
    <Image
      src={imageUrl}
      alt="avatar"
      width={40}
      height={40}
      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
    />
  ) : (
    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)] font-bold text-sm">
      {getInitials(firstName, lastName, email)}
    </div>
  );
}

// ─── Single Comment ────────────────────────────────────────────────────────────

function CommentCard({
  comment,
  currentClerkId,
  currentUserRole,
  onDelete,
}: {
  comment: {
    _id: Id<"comments">;
    authorId: string;
    body: string;
    createdAt: number;
    author: {
      firstName: string | null;
      lastName: string | null;
      imageUrl: string | null;
      email: string;
    } | null;
  };
  currentClerkId?: string;
  currentUserRole?: string | null;
  onDelete: (id: Id<"comments">) => void;
}) {
  const isOwner = currentClerkId === comment.authorId;
  const isAdmin =
    currentUserRole === "admin" || currentUserRole === "super-admin";
  const canDelete = isOwner || isAdmin;

  const displayName = comment.author
    ? [comment.author.firstName, comment.author.lastName]
        .filter(Boolean)
        .join(" ") || comment.author.email
    : "Anonymous";

  return (
    <div className="group flex gap-4 py-6 border-b border-white/10 last:border-0">
      <Avatar
        imageUrl={comment.author?.imageUrl}
        firstName={comment.author?.firstName}
        lastName={comment.author?.lastName}
        email={comment.author?.email}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <div className="flex items-baseline gap-3">
            <span className="text-white font-bold uppercase tracking-[1px] text-[1.2rem]">
              {displayName}
            </span>
            <span className="text-[hsla(0,0%,45%,1)] text-[1.1rem]">
              {timeAgo(comment.createdAt)}
            </span>
          </div>
          {canDelete && (
            <button
              onClick={() => onDelete(comment._id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-[1.1rem] text-[hsla(0,0%,45%,1)] hover:text-red-400"
            >
              Delete
            </button>
          )}
        </div>
        <p className="mt-2 text-[hsla(0,0%,70%,1)] text-[1.5rem] leading-[1.8] whitespace-pre-wrap break-words">
          {comment.body}
        </p>
      </div>
    </div>
  );
}

// ─── Comment Form ──────────────────────────────────────────────────────────────

function CommentForm({ postId }: { postId: Id<"posts"> }) {
  const { user, isSignedIn } = useUser();
  const addComment = useMutation(api.comments.addComment);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX = 1000;
  const remaining = MAX - body.length;

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setError(null);
    startTransition(async () => {
      try {
        await addComment({ postId, body });
        setBody("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      } catch (err: any) {
        setError(err?.message ?? "Failed to post comment. Please try again.");
      }
    });
  }

  if (!isSignedIn) {
    return (
      <div className="border border-white/10 px-6 py-8 text-center">
        <p className="text-[hsla(0,0%,55%,1)] text-[1.4rem] mb-5">
          Sign in to join the conversation
        </p>
        <SignInButton mode="modal">
          <button className="group relative inline-flex items-center gap-3 px-8 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]">
            <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
            <span className="relative z-10">Sign in to comment</span>
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Avatar
        imageUrl={user.imageUrl}
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.emailAddresses[0]?.emailAddress}
      />
      <div className="flex-1">
        <div className="relative border border-white/10 focus-within:border-[hsl(38,61%,73%)] transition-colors">
          <textarea
            ref={textareaRef}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              autoResize();
            }}
            placeholder="Write a comment…"
            rows={3}
            maxLength={MAX}
            disabled={isPending}
            className="w-full resize-none bg-transparent px-4 pt-4 pb-12 text-[1.5rem] text-[hsla(0,0%,70%,1)] placeholder:text-[hsla(0,0%,35%,1)] outline-none disabled:opacity-50"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          />
          {/* Inner footer */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 border-t border-white/10">
            <span
              className={`text-[1.1rem] tabular-nums ${
                remaining < 50
                  ? remaining < 10
                    ? "text-red-400"
                    : "text-amber-400"
                  : "text-[hsla(0,0%,35%,1)]"
              }`}
            >
              {remaining}
            </span>
            <button
              type="submit"
              disabled={isPending || !body.trim()}
              className="group relative inline-flex items-center px-5 py-1.5 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)] disabled:opacity-30 disabled:pointer-events-none"
            >
              <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
              <span className="relative z-10">
                {isPending ? "Posting…" : "Post"}
              </span>
            </button>
          </div>
        </div>
        {error && <p className="mt-2 text-[1.2rem] text-red-400">{error}</p>}
      </div>
    </form>
  );
}

// ─── Share Bar ─────────────────────────────────────────────────────────────────

function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[1.6rem] h-[1.6rem]"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[1.6rem] h-[1.6rem]"
        >
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.885v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[1.6rem] h-[1.6rem]"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[1.6rem] h-[1.6rem]"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-[hsla(0,0%,45%,1)] text-[1.2rem] font-bold uppercase tracking-[2px] mr-1">
        Share
      </span>

      {platforms.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className="group relative flex items-center justify-center w-10 h-10 border border-white/20 text-[hsla(0,0%,55%,1)] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)] hover:border-[hsl(38,61%,73%)]"
        >
          <span className="absolute inset-0 -translate-y-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-y-0 -z-10" />
          <span className="relative z-10">{icon}</span>
        </a>
      ))}

      {/* Copy link */}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="group relative flex items-center gap-2 px-4 h-10 border border-white/20 text-[hsla(0,0%,55%,1)] text-[1.2rem] font-bold uppercase tracking-[1px] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)] hover:border-[hsl(38,61%,73%)]"
      >
        <span className="absolute inset-0 -translate-y-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-y-0 -z-10" />
        <span className="relative z-10 flex items-center gap-2">
          {copied ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-[1.4rem] h-[1.4rem]"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[1.4rem] h-[1.4rem]"
              >
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
              Copy link
            </>
          )}
        </span>
      </button>
    </div>
  );
}

// ─── Comment Section ───────────────────────────────────────────────────────────

function CommentSection({ postId }: { postId: Id<"posts"> }) {
  const { user } = useUser();
  const comments = useQuery(api.comments.getCommentsByPost, { postId });
  const myRole = useQuery(api.posts.getMyRole);
  const deleteComment = useMutation(api.comments.deleteComment);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleDelete(commentId: Id<"comments">) {
    setDeleteError(null);
    try {
      await deleteComment({ commentId });
    } catch (err: any) {
      setDeleteError(err?.message ?? "Could not delete comment.");
    }
  }

  return (
    <section>
      {/* Section heading */}
      <div className="flex items-baseline gap-4 mb-8">
        <h2
          className="font-normal text-white text-[clamp(2.4rem,3vw,3.2rem)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Comments
        </h2>
        {comments !== undefined && (
          <span className="text-[hsla(0,0%,45%,1)] text-[1.3rem]">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </span>
        )}
      </div>

      {/* Ornamental separator — matches the post body */}
      <div className="mb-8">
        <svg viewBox="0 0 100 12" width="100" height="12">
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
      </div>

      {/* Form */}
      <div className="mb-10">
        <CommentForm postId={postId} />
      </div>

      {deleteError && (
        <p className="mb-4 text-[1.2rem] text-red-400">{deleteError}</p>
      )}

      {/* List */}
      {comments === undefined ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-4 py-6 border-b border-white/10 animate-pulse"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-3 w-28 rounded bg-white/10" />
                <div className="h-3 w-full rounded bg-white/10" />
                <div className="h-3 w-2/3 rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-[hsla(0,0%,45%,1)] text-[1.4rem] py-8 text-center">
          No comments yet — be the first to share your thoughts.
        </p>
      ) : (
        <div>
          {comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              currentClerkId={user?.id}
              currentUserRole={myRole}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const { blog } = useParams();

  const post = useQuery(api.posts.getPostById, {
    postId: blog as Id<"posts">,
  });

  // Loading
  if (post === undefined) {
    return (
      <div
        className="min-h-screen py-32 px-5"
        style={{ backgroundColor: "hsla(210,4%,9%,1)" }}
      >
        <div className="max-w-[820px] mx-auto animate-pulse space-y-6 mt-20">
          <div className="h-4 w-1/4 bg-white/10 rounded" />
          <div className="h-10 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-1/2 bg-white/10 rounded" />
          <div className="w-full aspect-[16/7] bg-white/5" />
          <div className="space-y-3 pt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-white/10 rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Not found
  if (post === null) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-5"
        style={{ backgroundColor: "hsla(210,4%,9%,1)" }}
      >
        <h1
          className="font-normal text-white text-[clamp(3rem,6vw,6rem)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Post Not Found
        </h1>
        <Link
          href="/blogs"
          className="group relative inline-flex items-center gap-3 px-8 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
          <span className="relative z-10">← Back to Blog</span>
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const authorName =
    post.author?.firstName || post.author?.lastName
      ? [post.author.firstName, post.author.lastName].filter(Boolean).join(" ")
      : post.author?.email
        ? post.author.email.split("@")[0]
        : null;

  const hasImage = !!post.coverImageUrl;

  return (
    <main
      className="min-h-screen pb-24"
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      {/* ── Hero banner ── */}
      {hasImage && (
        <div className="relative w-full aspect-[16/7] max-h-[520px] overflow-hidden bg-[hsla(0,0%,7%,1)]">
          <img
            src={post.coverImageUrl!}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsla(210,4%,9%,1)] via-[hsla(210,4%,9%,0.4)] to-transparent" />
        </div>
      )}

      <div
        className={`max-w-[820px] mx-auto px-5 sm:px-8 relative z-10 ${
          hasImage ? "-mt-24" : "pt-50"
        }`}
      >
        {/* ── Category + Date · Author ── */}
        <div className="fade-up delay-1 flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex flex-wrap items-center gap-3 text-[1.3rem]">
            <span className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.15em]">
              {post.category}
            </span>
            <span className="inline-block w-2 h-2 border border-[hsl(38,61%,73%)] rotate-45 shrink-0" />
            <time className="text-[hsla(0,0%,65%,1)]">{formattedDate}</time>
          </div>
          {authorName && (
            <div className="flex items-center gap-2 text-[1.3rem]">
              <span className="w-5 h-px bg-[hsl(38,61%,73%)]/40" />
              <span className="text-[hsla(0,0%,55%,1)] font-bold uppercase tracking-[2px]">
                By
              </span>
              <span className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px]">
                {authorName}
              </span>
            </div>
          )}
        </div>

        {/* ── Title ── */}
        <h1
          className="fade-up delay-2 font-normal text-white leading-[1.15] mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 5vw, 5.5rem)",
          }}
        >
          {post.title}
        </h1>

        {/* ── Ornamental separator ── */}
        <div className="fade-up delay-2 mb-10">
          <svg viewBox="0 0 100 12" width="100" height="12">
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
        </div>

        {/* ── Body ── */}
        <div className="fade-up delay-3 text-[hsla(0,0%,70%,1)] text-[1.65rem] leading-[1.9] whitespace-pre-wrap">
          {post.body}
        </div>

        {/* ── Share ── */}
        <div className="mt-12">
          <ShareBar title={post.title} />
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-white/10 my-16" />

        {/* ── Comments ── */}
        <CommentSection postId={blog as Id<"posts">} />

        {/* ── Divider ── */}
        <div className="w-full h-px bg-white/10 my-16" />

        {/* ── Back link ── */}
        <Link
          href="/blogs"
          className="group relative inline-flex items-center gap-3 px-8 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
          <span className="relative z-10">← Back to Blog</span>
        </Link>
      </div>

      <BackToTop />
    </main>
  );
}
