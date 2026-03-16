import { mutation } from "./_generated/server";
import { v } from "convex/values";

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
