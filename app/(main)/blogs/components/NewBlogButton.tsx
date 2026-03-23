"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

const ALLOWED_ROLES = ["super-admin", "admin", "blogger"];

const NewBlogButton = () => {
  const currentUser = useQuery(api.users.current);

  // Don't render until we know who the user is
  if (!currentUser) return null;

  // Only allowed roles can write blogs
  if (!ALLOWED_ROLES.includes(currentUser.role ?? "")) return null;

  return (
    <div className="fade-up delay-2 flex justify-end mb-3">
      <Link
        href="/write-blog"
        className="group relative inline-flex items-center gap-2 px-6 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] uppercase font-bold tracking-[0.25em] text-[1.1rem] [font-family:var(--font-display)] transition-all duration-300 hover:text-[hsla(40,12%,5%,1)] overflow-hidden"
      >
        <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
        <span className="relative z-10">+ Write a Blog</span>
      </Link>
    </div>
  );
};

export default NewBlogButton;
