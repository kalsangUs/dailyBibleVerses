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
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const user = useQuery(api.users.me);
  const saveQuote = useMutation(api.quotes.save);
  const likeQuote = useMutation(api.quotes.like);
  const router = useRouter();

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
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-xl px-8 py-12 text-center">
          {verse ? (
            <>
              <p className="text-2xl font-extralight tracking-tight leading-normal text-zinc-800 dark:text-zinc-100 font-serif" style={{ fontFamily: "serif" }}>
                &ldquo;{verse.text.trim()}&rdquo;
              </p>
              <p className="mt-2 text-lg tracking-tighter font-semibold text-zinc-600 dark:text-zinc-400">
                {verse.book} {verse.chapter}:{verse.verse}
              </p>
            </>
          ) : (
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Loading...
            </p>
          )}
        </div>
      </div>
      {verse && (
        <div className="flex items-center justify-center gap-3 pb-20">
          <Button variant="outline" onClick={fetchVerse} disabled={loading}>
            <RefreshCwIcon className=" h-4 w-4" />
            {/* New Verse */}
          </Button>
          <Button onClick={handleSave} disabled={saved}>
            <BookmarkIcon className="h-4 w-4" />
            {/* {saved ? "Saved" : "Save"} */}
          </Button>
          <Button
            variant={liked ? "default" : "outline"}
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
              className={` h-4 w-2 ${liked ? "fill-red-500 text-red-500" : ""}`}
            />
            {/* {liked ? "Liked" : "Like"} */}
          </Button>
        </div>
      )}
    </div>
  );
}
