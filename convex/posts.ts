import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getPosts = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();

    return await Promise.all(
      posts.map(async (post) => ({
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

    // Look up the author from the users table using authorId (Clerk user ID)
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

    const postId = await ctx.db.insert("posts", {
      title: args.title,
      category: args.category,
      excerpt: args.excerpt,
      body: args.body,
      coverImageId: args.coverImageId,
      authorId: identity.subject,
      createdAt: Date.now(),
    });

    return postId;
  },
});

// featured post
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

export const setFeaturedPost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Unfeature any currently featured post
    const currentFeatured = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .first();

    if (currentFeatured) {
      await ctx.db.patch(currentFeatured._id, { isFeatured: false });
    }

    // Feature the new post
    await ctx.db.patch(args.postId, { isFeatured: true });
  },
});
