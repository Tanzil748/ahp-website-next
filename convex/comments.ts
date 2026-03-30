import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Fetch all comments for a post, with author info resolved
export const getCommentsByPost = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, { postId }) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("byPostId", (q) => q.eq("postId", postId))
      .order("desc")
      .collect();

    return await Promise.all(
      comments.map(async (comment) => {
        const author = await ctx.db
          .query("users")
          .withIndex("byClerkUserId", (q) =>
            q.eq("clerkUserId", comment.authorId),
          )
          .unique();

        return {
          ...comment,
          author: author
            ? {
                firstName: author.firstName ?? null,
                lastName: author.lastName ?? null,
                imageUrl: author.imageUrl ?? null,
                email: author.email,
              }
            : null,
        };
      }),
    );
  },
});

// Any signed-in user can post a comment
export const addComment = mutation({
  args: {
    postId: v.id("posts"),
    body: v.string(),
  },
  handler: async (ctx, { postId, body }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in to comment");

    const trimmed = body.trim();
    if (!trimmed) throw new Error("Comment cannot be empty");
    if (trimmed.length > 1000)
      throw new Error("Comment is too long (max 1000 characters)");

    return await ctx.db.insert("comments", {
      postId,
      authorId: identity.subject,
      body: trimmed,
      createdAt: Date.now(),
    });
  },
});

// A user can delete their own comment; admins/super-admins can delete any comment
export const deleteComment = mutation({
  args: { commentId: v.id("comments") },
  handler: async (ctx, { commentId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const comment = await ctx.db.get(commentId);
    if (!comment) throw new Error("Comment not found");

    const caller = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    const isOwner = comment.authorId === identity.subject;
    const isAdmin =
      caller && ["super-admin", "admin"].includes(caller.role ?? "");

    if (!isOwner && !isAdmin) {
      throw new Error("Unauthorized: you can only delete your own comments");
    }

    await ctx.db.delete(commentId);
  },
});

// Returns the comment count for a post (lightweight — no author joins)
export const getCommentCount = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, { postId }) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("byPostId", (q) => q.eq("postId", postId))
      .collect();
    return comments.length;
  },
});
