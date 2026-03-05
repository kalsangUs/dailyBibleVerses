"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { HeartOffIcon } from "lucide-react";

export default function LikedPage() {
  const quotes = useQuery(api.quotes.listLiked);
  const unlikeQuote = useMutation(api.quotes.unlike);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold">Liked Quotes</h1>
      {quotes === undefined ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : quotes.length === 0 ? (
        <p className="text-muted-foreground">
          No liked quotes yet. Like some verses from the home page!
        </p>
      ) : (
        <div className="space-y-6">
          {quotes.map((quote) => (
            <div
              key={quote._id}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <p className="text-lg leading-relaxed">
                &ldquo;{quote.text}&rdquo;
              </p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-muted-foreground">
                  {quote.book} {quote.chapter}:{quote.verse}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => unlikeQuote({ id: quote._id })}
                >
                  <HeartOffIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
