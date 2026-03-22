"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";

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

  // Build display name: prefer firstName + lastName, fall back to email prefix
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
      {/* ── Hero banner — only rendered when a cover image exists ── */}
      {hasImage && (
        <div className="relative w-full aspect-[16/7] max-h-[520px] overflow-hidden bg-[hsla(0,0%,7%,1)]">
          <img
            src={post.coverImageUrl!}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          {/* Gradient fade into page background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsla(210,4%,9%,1)] via-[hsla(210,4%,9%,0.4)] to-transparent" />
        </div>
      )}

      <div
        className={`max-w-[820px] mx-auto px-5 sm:px-8 relative z-10 ${
          hasImage ? "-mt-24" : "pt-50"
        }`}
      >
        {/* ── Category + Date (left) · Author (right) ── */}
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

        {/* ── Bottom divider ── */}
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
