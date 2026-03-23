import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    savedPerfumes: v.optional(v.array(v.id("products"))),
    role: v.optional(
      v.union(
        v.literal("super-admin"),
        v.literal("admin"),
        v.literal("blogger"),
        v.literal("none"),
      ),
    ),
  }).index("byClerkUserId", ["clerkUserId"]),

  posts: defineTable({
    title: v.string(),
    category: v.string(),
    excerpt: v.optional(v.string()),
    body: v.string(),
    coverImageId: v.optional(v.id("_storage")),
    authorId: v.string(),
    createdAt: v.number(),
    isFeatured: v.optional(v.boolean()),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("approved"),
        v.literal("rejected"),
      ),
    ),
  }),

  careers: defineTable({
    title: v.string(),
    department: v.union(
      v.literal("Marketing"),
      v.literal("Sales"),
      v.literal("Operations"),
      v.literal("Technology"),
      v.literal("Corporate"),
    ),
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
    createdAt: v.number(),
  }),

  products: defineTable({
    itemName: v.string(),
    brand: v.string(),
    manufacturer: v.string(),
    sku: v.string(),
    upc: v.string(),
    aliasName: v.string(),
    status: v.string(),
    salesDescription: v.string(),
    stockOnHand: v.number(),
    pcsPerCarton: v.number(),
    topNotes: v.string(),
    middleNotes: v.string(),
    baseNotes: v.string(),
    gender: v.string(),
    packageWeight: v.number(),
    packageLength: v.number(),
    packageWidth: v.number(),
    packageHeight: v.number(),
    dimensionUnit: v.string(),
    weightUnit: v.string(),
    imageId: v.optional(v.id("_storage")),
  }),
});
