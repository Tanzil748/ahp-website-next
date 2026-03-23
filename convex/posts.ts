import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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

// Public — only approved (or legacy) posts
export const getPosts = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    const visible = posts.filter((p) => !p.status || p.status === "approved");
    return await Promise.all(
      visible.map(async (post) => ({
        ...post,
        coverImageUrl: post.coverImageId
          ? await ctx.storage.getUrl(post.coverImageId)
          : null,
      })),
    );
  },
});

export const getPostById = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) return null;

    const author = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", post.authorId))
      .unique();

    return {
      ...post,
      coverImageUrl: post.coverImageId
        ? await ctx.storage.getUrl(post.coverImageId)
        : null,
      author: author
        ? {
            firstName: author.firstName,
            lastName: author.lastName,
            email: author.email,
          }
        : null,
    };
  },
});

// Admin — all posts with author info
export const getAllPostsAdmin = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const posts = await ctx.db.query("posts").order("desc").collect();

    return await Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db
          .query("users")
          .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", post.authorId))
          .unique();

        return {
          ...post,
          coverImageUrl: post.coverImageId
            ? await ctx.storage.getUrl(post.coverImageId)
            : null,
          author: author
            ? {
                firstName: author.firstName,
                lastName: author.lastName,
                email: author.email,
              }
            : null,
        };
      }),
    );
  },
});

export const getFeaturedPost = query({
  handler: async (ctx) => {
    const post = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .first();

    if (!post) return null;

    return {
      ...post,
      coverImageUrl: post.coverImageId
        ? await ctx.storage.getUrl(post.coverImageId)
        : null,
    };
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await ctx.storage.generateUploadUrl();
  },
});

export const createPost = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    excerpt: v.optional(v.string()),
    body: v.string(),
    coverImageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Only super-admin, admin, and blogger can create posts
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (
      !user ||
      !["super-admin", "admin", "blogger"].includes(user.role ?? "")
    ) {
      throw new Error(
        "Unauthorized: you do not have permission to write posts",
      );
    }

    return await ctx.db.insert("posts", {
      ...args,
      authorId: identity.subject,
      createdAt: Date.now(),
      status: "pending",
    });
  },
});

// ── Admin mutations ────────────────────────────────────────────────────────

export const approvePost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    await ctx.db.patch(args.postId, { status: "approved" });
  },
});

export const rejectPost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    await ctx.db.patch(args.postId, { status: "rejected" });
  },
});

export const deletePost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    const post = await ctx.db.get(args.postId);
    if (post?.coverImageId) {
      await ctx.storage.delete(post.coverImageId);
    }
    await ctx.db.delete(args.postId);
  },
});

// Only one post can be featured at a time — this unfeatures the current one first
export const setFeaturedPost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Post not found");
    if (post.status !== "approved")
      throw new Error("Only approved posts can be featured");

    // Unfeature existing featured post
    const current = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .first();

    if (current) {
      await ctx.db.patch(current._id, { isFeatured: undefined });
    }

    await ctx.db.patch(args.postId, { isFeatured: true });
  },
});

// Remove featured status from a post (unfeature without setting a new one)
export const unfeaturePost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    await ctx.db.patch(args.postId, { isFeatured: undefined });
  },
});
