"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const searchParams = useSearchParams();

  const currentRedirect = searchParams.get("redirect");
  const signupUrl = currentRedirect
    ? `/signup?redirect=${encodeURIComponent(currentRedirect)}`
    : "/signup";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth", { email, password });

      if (response.data.success) {
        setSuccess("Login successful! Redirecting...");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          const { token, user } = response.data;
          login(token, user, 7);
        }, 1000);
      }
    } catch (err: unknown) {
      let errorMessage = "An error occurred during login";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      if (typeof err === "object" && err !== null && "response" in err) {
        const apiError = err as { response?: { data?: { message?: string } } };
        errorMessage = apiError.response?.data?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const redirectParam = currentRedirect
      ? `?redirect=${encodeURIComponent(currentRedirect)}`
      : "";
    window.location.href = `${backendUrl}/auth/google${redirectParam}`;
  };

  return (
    <main className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Column Image Splash */}
      <div className="relative hidden md:block bg-[#a28671]">
        <Image
          src="/login-img.png"
          alt="Premium dates and organic ingredients curated in a dark wooden bowl"
          fill
          priority
          sizes="50vw"
          className="object-cover mix-blend-multiply opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
      </div>

      {/* Right Column Form Pane */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 bg-[#fcf9f6]">
        <div className="max-w-md w-full mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-serif text-zinc-900 tracking-wide mb-2">
              Welcome
            </h1>
            <p className="text-sm text-zinc-500 font-light">
              Please enter your details to access your account.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-100 border border-green-300 rounded text-green-700 text-sm">
                {success}
              </div>
            )}

            <div className="flex flex-col border-b border-zinc-300 py-2 focus-within:border-zinc-800 transition-colors duration-200">
              <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col border-b border-zinc-300 py-2 focus-within:border-zinc-800 transition-colors duration-200">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-amber-800/80 hover:text-amber-900 transition-colors font-light"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 tracking-widest focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-4 bg-[#413126] text-white text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#534033] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}{" "}
                {!loading && <span>→</span>}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-zinc-200"></div>
                <span className="flex-shrink mx-4 text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
                  Or
                </span>
                <div className="flex-grow border-t border-zinc-200"></div>
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={handleGoogleAuth}
                className="w-full py-3.5 bg-white border border-zinc-300 text-zinc-700 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-zinc-50 hover:border-zinc-400 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.28 1.845 15.548 1 12.24 1 5.48 1 0 6.48 0 13s5.48 12 12.24 12c7.06 0 11.758-4.935 11.758-11.89 0-.802-.083-1.413-.183-1.825H12.24z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </form>

          <footer className="mt-12 text-center text-xs text-zinc-600 font-light">
            New to Aureum Naturals?{" "}
            <Link
              href={signupUrl}
              className="font-semibold text-zinc-900 hover:underline"
            >
              Create an Account
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
