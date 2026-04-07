"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { RoleBadge } from "../ui/Badges";
import RoleSelector from "../shared/RoleSelector";
import { getDisplayName, formatDate } from "../lib/helpers";

export default function UsersPanel({
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
        {/* Table header */}
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
                {/* Desktop */}
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

                {/* Mobile */}
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
