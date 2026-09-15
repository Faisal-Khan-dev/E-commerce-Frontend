// app/(auth)/forgot-password/page.tsx
"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please input a verified email endpoint context.");
      return;
    }

    setLoading(true);

    try {
      // Connects to your recovery route (e.g., /auth/forgot-password or /auth/recovery)
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });

      if (response.data.success || response.status === 200) {
        setSuccess(
          "A recovery link has been safely transmitted to your inbox.",
        );
        setEmail("");
      }
    } catch (err: unknown) {
      let errorMessage = "Could not initialize password link restoration.";
      if (err instanceof Error) errorMessage = err.message;
      if (typeof err === "object" && err !== null && "response" in err) {
        const apiError = err as { response?: { data?: { message?: string } } };
        errorMessage = apiError.response?.data?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 sm:p-12 bg-white rounded-xl border border-zinc-200/40 shadow-xl text-left">
      <header className="mb-8">
        <h1 className="text-2xl font-serif text-zinc-900 tracking-wide mb-2">
          Recover Password
        </h1>
        <p className="text-xs text-zinc-500 font-light leading-relaxed">
          Enter your registered address path below. We'll forward a dynamic
          transmission link to re-verify your credential context.
        </p>
      </header>

      <form onSubmit={handleResetRequest} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-700 text-xs font-medium">
            {success}
          </div>
        )}

        <div className="flex flex-col border-b border-zinc-300 py-2 focus-within:border-zinc-800 transition-colors duration-200">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            disabled={loading || !!success}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !!success}
          className="w-full py-4 bg-[#413126] text-white text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#534033] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Processing Transmission..." : "Send Reset Link"}
        </button>
      </form>

      <footer className="mt-8 pt-4 border-t border-zinc-100 text-center">
        <Link
          href="/login"
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          ← Return to login interface
        </Link>
      </footer>
    </div>
  );
}
