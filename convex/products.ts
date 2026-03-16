import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getProducts = query({
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();

    return await Promise.all(
      products.map(async (product) => ({
        ...product,
        imageUrl: product.imageId
          ? await ctx.storage.getUrl(product.imageId)
          : null,
      })),
    );
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const createProduct = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("sku"), args.sku))
      .first();
    if (existing) throw new Error("A product with this SKU already exists");

    return await ctx.db.insert("products", { ...args });
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    itemName: v.optional(v.string()),
    brand: v.optional(v.string()),
    manufacturer: v.optional(v.string()),
    sku: v.optional(v.string()),
    upc: v.optional(v.string()),
    aliasName: v.optional(v.string()),
    status: v.optional(v.string()),
    salesDescription: v.optional(v.string()),
    stockOnHand: v.optional(v.number()),
    pcsPerCarton: v.optional(v.number()),
    topNotes: v.optional(v.string()),
    middleNotes: v.optional(v.string()),
    baseNotes: v.optional(v.string()),
    gender: v.optional(v.string()),
    packageWeight: v.optional(v.number()),
    packageLength: v.optional(v.number()),
    packageWidth: v.optional(v.number()),
    packageHeight: v.optional(v.number()),
    dimensionUnit: v.optional(v.string()),
    weightUnit: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const product = await ctx.db.get(args.id);
    if (!product) throw new Error("Product not found");

    const { id, ...fields } = args;

    const updates = Object.fromEntries(
      Object.entries(fields).filter(([_, v]) => v !== undefined),
    );

    await ctx.db.patch(id, updates);
    return id;
  },
});
