"use client";

import { useState, useCallback, useEffect } from "react";
import { useMutation } from "convex/react";
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
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const saveQuote = useMutation(api.quotes.save);
  const likeQuote = useMutation(api.quotes.like);

  const fetchVerse = useCallback(async () => {
    setLoading(true);
    setSaved(false);
    setLiked(false);
    try {
      const res = await fetch("https://bible-api.com/data/web/random");
      const data: BibleApiResponse = await res.json();
      setVerse(data.random_verse);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVerse();
  }, [fetchVerse]);

  const handleSave = async () => {
    if (!verse) return;
    await saveQuote({
      book: verse.book,
      chapter: verse.chapter,
      verse: verse.verse,
      text: verse.text.trim(),
    });
    setSaved(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-xl px-8 py-12 text-center">
        {verse ? (
          <>
            <p className="text-2xl leading-relaxed text-zinc-800 dark:text-zinc-100">
              &ldquo;{verse.text.trim()}&rdquo;
            </p>
            <p className="mt-4 text-lg font-semibold text-zinc-600 dark:text-zinc-400">
              {verse.book} {verse.chapter}:{verse.verse}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button variant="outline" onClick={fetchVerse} disabled={loading}>
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                New Verse
              </Button>
              <Button onClick={handleSave} disabled={saved}>
                <BookmarkIcon className="mr-2 h-4 w-4" />
                {saved ? "Saved" : "Save"}
              </Button>
              <Button
                variant={liked ? "default" : "outline"}
                disabled={liked}
                onClick={async () => {
                  if (!verse) return;
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
                  className={`mr-2 h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
                />
                {liked ? "Liked" : "Like"}
              </Button>
            </div>
          </>
        ) : (
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
}
