import {
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Paginated query for the admin panel (50 users per page)
export const getUsersPaginated = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db.query("users").paginate(args.paginationOpts);
  },
});

// current exposes the user information to the client
export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

// Super-admin only: update a user's role.
// Passing null clears the role back to undefined (truly unset) in the DB.
export const setUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(
      v.literal("super-admin"),
      v.literal("admin"),
      v.literal("blogger"),
      v.literal("none"),
      v.null(),
    ),
  },
  async handler(ctx, { userId, role }) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const caller = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!caller || !["admin", "super-admin"].includes(caller.role ?? "")) {
      throw new Error("Unauthorized: admin access required");
    }

    // Nobody can assign the super-admin role through the app
    if (role === "super-admin") {
      throw new Error(
        "Unauthorized: super-admin can only be assigned directly in the database",
      );
    }

    // Nobody can edit their own role through the app
    if (caller._id === userId) {
      throw new Error("Unauthorized: cannot modify your own role");
    }

    // Only super-admins can assign the admin role
    if (role === "admin" && caller.role !== "super-admin") {
      throw new Error("Unauthorized: only super-admins can assign admin roles");
    }

    // Admins cannot touch a user who is already a super-admin or admin
    if (caller.role !== "super-admin") {
      const target = await ctx.db.get(userId);
      if (target?.role === "super-admin" || target?.role === "admin") {
        throw new Error(
          "Unauthorized: cannot modify a super-admin's or admin's role",
        );
      }
    }

    // null → patch with undefined so Convex stores the field as absent
    await ctx.db.patch(userId, { role: role ?? undefined });
  },
});

// Returns the list of saved product IDs for the current user
export const getSavedPerfumeIds = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];
    return user.savedPerfumes ?? [];
  },
});

// Adds or removes a product from the user's saved list
export const toggleSavedPerfume = mutation({
  args: { productId: v.id("products") },
  async handler(ctx, { productId }) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const current = user.savedPerfumes ?? [];
    const alreadySaved = current.includes(productId);

    const updated = alreadySaved
      ? current.filter((id) => id !== productId)
      : [...current, productId];

    await ctx.db.patch(user._id, { savedPerfumes: updated });

    return { saved: !alreadySaved };
  },
});

// upsertFromClerk will be called when a user signs up or updates their account
export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  async handler(ctx, { data }) {
    const userAttributes = {
      email: data.email_addresses[0].email_address,
      clerkUserId: data.id,
      imageUrl: data.image_url ?? undefined,
      firstName: data.first_name ?? undefined,
      lastName: data.last_name ?? undefined,
    };

    const user = await userByClerkUserId(ctx, data.id);
    if (user === null) {
      await ctx.db.insert("users", userAttributes);
    } else {
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});

// deleteFromClerk will be called when a user deletes their account via Clerk
export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByClerkUserId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByClerkUserId(ctx, identity.subject);
}

async function userByClerkUserId(ctx: QueryCtx, clerkUserId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();
}
