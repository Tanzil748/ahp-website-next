import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
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
  }),
});
