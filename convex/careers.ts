import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ── Department values (source of truth) ───────────────────────────────────

const departmentValidator = v.union(
  v.literal("Marketing"),
  v.literal("Sales"),
  v.literal("Operations"),
  v.literal("Technology"),
  v.literal("Corporate"),
);

// ── Auth helper ────────────────────────────────────────────────────────────

async function assertAdmin(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");

  const user = await ctx.db
    .query("users")
    .withIndex("byClerkUserId", (q: any) =>
      q.eq("clerkUserId", identity.subject),
    )
    .unique();

  if (!user || !["super-admin", "admin"].includes(user.role ?? "")) {
    throw new Error("Unauthorized: admin access required");
  }

  return user;
}

// ── Queries ────────────────────────────────────────────────────────────────

// Public: only returns active listings
export const getActiveCareers = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .collect();
  },
});

// Admin: returns all listings regardless of status
export const getAllCareers = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db.query("careers").order("desc").collect();
  },
});

// ── Mutations ──────────────────────────────────────────────────────────────

export const createCareer = mutation({
  args: {
    title: v.string(),
    department: departmentValidator,
    location: v.string(),
    type: v.union(
      v.literal("full-time"),
      v.literal("part-time"),
      v.literal("contract"),
      v.literal("internship"),
    ),
    description: v.string(),
    requirements: v.array(v.string()),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    return await ctx.db.insert("careers", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateCareer = mutation({
  args: {
    careerId: v.id("careers"),
    title: v.string(),
    department: departmentValidator,
    location: v.string(),
    type: v.union(
      v.literal("full-time"),
      v.literal("part-time"),
      v.literal("contract"),
      v.literal("internship"),
    ),
    description: v.string(),
    requirements: v.array(v.string()),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    isActive: v.boolean(),
  },
  handler: async (ctx, { careerId, ...fields }) => {
    await assertAdmin(ctx);
    await ctx.db.patch(careerId, fields);
  },
});

export const toggleCareerActive = mutation({
  args: { careerId: v.id("careers"), isActive: v.boolean() },
  handler: async (ctx, { careerId, isActive }) => {
    await assertAdmin(ctx);
    await ctx.db.patch(careerId, { isActive });
  },
});

export const deleteCareer = mutation({
  args: { careerId: v.id("careers") },
  handler: async (ctx, { careerId }) => {
    await assertAdmin(ctx);
    await ctx.db.delete(careerId);
  },
});
