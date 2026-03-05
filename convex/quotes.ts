import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("savedQuotes").order("desc").collect();
  },
});

export const save = mutation({
  args: {
    book: v.string(),
    chapter: v.number(),
    verse: v.number(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("savedQuotes", args);
  },
});

export const remove = mutation({
  args: { id: v.id("savedQuotes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const listLiked = query({
  handler: async (ctx) => {
    return await ctx.db.query("likedQuotes").order("desc").collect();
  },
});

export const like = mutation({
  args: {
    book: v.string(),
    chapter: v.number(),
    verse: v.number(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("likedQuotes", args);
  },
});

export const unlike = mutation({
  args: { id: v.id("likedQuotes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
