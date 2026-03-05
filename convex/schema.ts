import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server"

export default defineSchema({
  ...authTables,
  savedQuotes: defineTable({
    userId: v.id("users"),
    book: v.string(),
    chapter: v.number(),
    verse: v.number(),
    text: v.string(),
  }).index("by_user", ["userId"]),
  likedQuotes: defineTable({
    userId: v.id("users"),
    book: v.string(),
    chapter: v.number(),
    verse: v.number(),
    text: v.string(),
  }).index("by_user", ["userId"]),
});
