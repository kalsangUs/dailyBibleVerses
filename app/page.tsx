"use client";

import { useState, useCallback, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, HeartIcon, RefreshCwIcon } from "lucide-react";

interface BibleApiResponse {
  translation: {
    identifier: string;
    name: string;
    language: string;
    language_code: string;
    license: string;
  };
  random_verse: {
    book_id: string;
    book: string;
    chapter: number;
    verse: number;
    text: string;
  };
}

export default function HomePage() {
  const [verse, setVerse] = useState<BibleApiResponse["random_verse"] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const user = useQuery(api.users.me);
  const saveQuote = useMutation(api.quotes.save);
  const likeQuote = useMutation(api.quotes.like);
  const router = useRouter();

  const fetchVerse = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSaved(false);
    setLiked(false);
    try {
      const res = await fetch("https://bible-api.com/data/web/random");
      if (!res.ok) throw new Error("Failed to fetch verse");
      const data: BibleApiResponse = await res.json();
      const v = data?.random_verse;
      if (
        !v ||
        typeof v.book !== "string" ||
        typeof v.chapter !== "number" ||
        typeof v.verse !== "number" ||
        typeof v.text !== "string"
      ) {
        throw new Error("Invalid response from API");
      }
      setVerse(v);
    } catch {
      setError("Could not load verse. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVerse();
  }, [fetchVerse]);

  const handleSave = async () => {
    if (!verse) return;
    if (!user) {
      router.push("/signin");
      return;
    }
    await saveQuote({
      book: verse.book,
      chapter: verse.chapter,
      verse: verse.verse,
      text: verse.text.trim(),
    });
    setSaved(true);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-xl px-5 sm:px-8 text-center">
          {error ? (
            <div className="text-center">
              <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
              <Button variant="outline" className="mt-4" onClick={fetchVerse}>
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          ) : verse ? (
            <>
              <p className="text-xl sm:text-2xl md:text-3xl font-extralight tracking-tight leading-relaxed text-zinc-800 dark:text-zinc-100 font-serif">
                &ldquo;{verse.text.trim()}&rdquo;
              </p>
              <p className="mt-3 text-base sm:text-lg tracking-tighter font-semibold text-zinc-600 dark:text-zinc-400">
                {verse.book} {verse.chapter}:{verse.verse}
              </p>
            </>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mx-auto h-6 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mx-auto h-5 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 mt-2" />
            </div>
          )}
        </div>
      </div>
      {verse && (
        <div className="flex items-center justify-center gap-2 pb-12">
          <Button variant="outline" size="icon-lg" onClick={fetchVerse} disabled={loading}>
            <RefreshCwIcon className="h-5 w-5" />
          </Button>
          <Button size="icon-lg" onClick={handleSave} disabled={saved}>
            <BookmarkIcon className="h-5 w-5" />
          </Button>
          <Button
            variant={liked ? "default" : "outline"}
            size="icon-lg"
            disabled={liked}
            onClick={async () => {
              if (!verse) return;
              if (!user) {
                router.push("/signin");
                return;
              }
              await likeQuote({
                book: verse.book,
                chapter: verse.chapter,
                verse: verse.verse,
                text: verse.text.trim(),
              });
              setLiked(true);
            }}
          >
            <HeartIcon
              className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
