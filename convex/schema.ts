import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  savedQuotes: defineTable({
    book: v.string(),
    chapter: v.number(),
    verse: v.number(),
    text: v.string(),
  }),
  likedQuotes: defineTable({
    book: v.string(),
    chapter: v.number(),
    verse: v.number(),
    text: v.string(),
  }),
});
