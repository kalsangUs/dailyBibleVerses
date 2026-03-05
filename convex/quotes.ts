import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query("savedQuotes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
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
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.insert("savedQuotes", { ...args, userId });
  },
});

export const remove = mutation({
  args: { id: v.id("savedQuotes") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const quote = await ctx.db.get(args.id);
    if (!quote || quote.userId !== userId) throw new Error("Not found");
    await ctx.db.delete(args.id);
  },
});

export const listLiked = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query("likedQuotes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
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
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.insert("likedQuotes", { ...args, userId });
  },
});

export const unlike = mutation({
  args: { id: v.id("likedQuotes") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const quote = await ctx.db.get(args.id);
    if (!quote || quote.userId !== userId) throw new Error("Not found");
    await ctx.db.delete(args.id);
  },
});
