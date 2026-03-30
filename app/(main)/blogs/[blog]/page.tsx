"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useState, useRef, useTransition } from "react";
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
