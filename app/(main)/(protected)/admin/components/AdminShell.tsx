"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import Ornament from "../ui/Ornament";
import FullScreenMessage from "../ui/FullScreenMessage";
import { TABS } from "../lib/constants";
import type { Tab } from "../lib/types";
import dynamic from "next/dynamic";

const PostsPanel = dynamic(() => import("./PostsPanel"));
const UsersPanel = dynamic(() => import("./UsersPanel"));
const CareersPanel = dynamic(() => import("./CareersPanel"));

export default function AdminShell() {
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const currentUser = useQuery(api.users.current);

  // Loading state
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

  // Access denied
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
      <main className="max-w-[1100] mx-auto px-5 sm:px-8 pt-48 pb-16">
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

        {/* Tab bar */}
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
                  className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-300"
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

        {/* Active panel */}
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
