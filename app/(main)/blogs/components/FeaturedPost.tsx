"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import NewBlogButton from "./NewBlogButton";

export default function FeaturedPost() {
  const post = useQuery(api.posts.getFeaturedPost);

  return (
    <section className="pb-20 px-5 sm:px-8">
      <div className="max-w-[1400px] mx-auto">
        <NewBlogButton />

        {/* Section title */}
        <div className="fade-up delay-2 text-center mb-3">
          <span className="text-[hsl(38,61%,73%)] uppercase font-bold tracking-[0.4em] font-[var(--font-forum)] text-[2.2rem]">
            Featured Post
          </span>
          <svg
            viewBox="0 0 100 12"
            width="100"
            height="12"
            className="block mx-auto mt-[5px]"
          >
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

        {/* No featured post */}
        {post === null && (
          <div className="mt-8 border border-white/10 p-16 text-center text-[hsla(0,0%,65%,1)] text-[1.6rem] [font-family:var(--font-display)]">
            No featured post selected.
          </div>
        )}

        {/* Loading */}
        {post === undefined && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] border border-white/10 overflow-hidden animate-pulse">
            <div className="bg-white/5 min-h-[280px] md:min-h-[360px]" />
            <div className="bg-[hsla(210,4%,11%,1)] p-[50px] space-y-4">
              <div className="h-4 w-1/3 bg-white/10 rounded" />
              <div className="h-8 w-full bg-white/10 rounded" />
              <div className="h-8 w-2/3 bg-white/10 rounded" />
              <div className="h-4 w-full bg-white/10 rounded" />
              <div className="h-4 w-5/6 bg-white/10 rounded" />
            </div>
          </div>
        )}

        {/* Featured card */}
        {post && (
          <div className="fade-up delay-2 mt-8 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(38,61%,73%)]">
            {/* Image */}
            <div className="relative bg-[hsla(0,0%,13%,1)] min-h-[280px] md:min-h-[360px] flex items-center justify-center overflow-hidden">
              <span className="absolute top-4 left-4 bg-[hsl(38,61%,73%)] text-[hsla(40,12%,5%,1)] text-xs font-bold uppercase tracking-[2px] px-3 py-1.5 z-10">
                Featured
              </span>
              {post.coverImageUrl ? (
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
              ) : (
                <span className="text-white/10 text-2xl font-bold uppercase tracking-[0.2em] font-[var(--font-forum)]">
                  Featured Post
                </span>
              )}
            </div>

            {/* Content */}
            <div className="bg-[hsla(210,4%,11%,1)] flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:px-[55px] md:py-[50px]">
              <div className="flex flex-wrap items-center gap-3 mb-5 text-[1.3rem]">
                <span className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.15em]">
                  {post.category}
                </span>
                <span className="inline-block w-2 h-2 border border-[hsl(38,61%,73%)] rotate-45 shrink-0" />
                <time className="text-[hsla(0,0%,65%,1)]">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>

              <h2 className="font-normal text-white mb-5 font-[var(--font-forum)] text-[clamp(2.4rem,3vw,3.4rem)] leading-[1.3]">
                {post.title}
              </h2>

              {post.excerpt && (
                <p className="text-[hsla(0,0%,65%,1)] mb-8 text-[1.6rem] leading-[1.85]">
                  {post.excerpt}
                </p>
              )}

              <div className="w-14 h-px bg-[hsl(38,61%,73%)] opacity-60 mb-7" />

              <Link
                href={`/blog/${post._id}`}
                className="self-start inline-flex items-center gap-2 text-[hsl(38,61%,73%)] font-bold uppercase tracking-[3px] no-underline transition-[gap] duration-300 hover:gap-4 text-[1.2rem]"
              >
                <span>Read More</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
