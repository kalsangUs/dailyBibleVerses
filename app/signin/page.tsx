"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const { signIn } = useAuthActions();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-sm w-full px-6 space-y-4 text-center">
        <h1 className="text-2xl font-bold mb-8">Sign in to Bible Quotes</h1>
        <Button
          className="w-full"
          onClick={() => void signIn("google")}
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
