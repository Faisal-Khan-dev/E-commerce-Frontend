"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { X, Check } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, login } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(authModalMode || "login");

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Sync mode whenever authModalMode context changes
  useEffect(() => {
    setMode(authModalMode || "login");
    setError("");
    setSuccess("");
  }, [authModalMode, isAuthModalOpen]);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!loginEmail || !loginPassword) {
      setError("Email and password are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth", {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.data.success) {
        setSuccess("Login successful!");
        const { token, user } = response.data;
        setTimeout(() => {
          login(token, user, 7);
          closeAuthModal();
        }, 500);
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

  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.email ||
      !signupData.password
    ) {
      setError("All fields are required!");
      return;
    }

    if (!signupData.agreeToTerms) {
      setError("Please agree to the Terms of Service & Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/signup", {
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        password: signupData.password,
      });

      if (response.data.success) {
        setSuccess("Account created & logged in successfully!");
        const { token, user } = response.data;

        setTimeout(() => {
          if (token && user) {
            login(token, user, 7);
          }
          closeAuthModal();
        }, 600);
      }
    } catch (err: unknown) {
      let errorMessage = "An error occurred during signup";
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
    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Overlay Backdrop */}
      <div
        onClick={closeAuthModal}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      {/* Clean, Single-Column Professional Card Container */}
      <div className="relative w-full max-w-md bg-[#fcf9f6] rounded-2xl shadow-2xl overflow-hidden border border-amber-950/10 p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 my-auto max-h-[92vh] flex flex-col justify-between">
        {/* Close Button */}
        <button
          type="button"
          data-no-ripple="true"
          onClick={closeAuthModal}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-200/60 hover:bg-stone-300/80 text-stone-700 transition-colors flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          {/* Header */}
          <header className="mb-6 text-left pr-8">
            <h2 className="text-2xl font-serif font-bold text-zinc-900 tracking-wide mb-1">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              {mode === "login"
                ? "Please enter your details to access your account."
                : "Begin your journey to conscious vitality."}
            </p>
          </header>

          {/* Feedback Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100/90 border border-red-300 rounded-lg text-red-700 text-xs font-medium animate-in fade-in">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-emerald-100/90 border border-emerald-300 rounded-lg text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Form Views */}
          {mode === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div className="flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
                <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  disabled={loading}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-transparent text-xs text-zinc-800 placeholder-zinc-300 focus:outline-none disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
                <div className="flex justify-between items-center mb-0.5">
                  <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    onClick={closeAuthModal}
                    className="text-[11px] text-amber-800 hover:underline font-light"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  required
                  disabled={loading}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-xs text-zinc-800 placeholder-zinc-300 tracking-widest focus:outline-none disabled:opacity-50"
                />
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#413126] hover:bg-[#312117] text-white text-xs font-semibold uppercase tracking-widest rounded-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <span>{loading ? "Signing In..." : "Sign In"}</span>
                  {!loading && <span>→</span>}
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-zinc-200" />
                  <span className="flex-shrink mx-3 text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
                    Or
                  </span>
                  <div className="flex-grow border-t border-zinc-200" />
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleGoogleAuth}
                  className="w-full py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold uppercase tracking-widest rounded-md transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.28 1.845 15.548 1 12.24 1 5.48 1 0 6.48 0 13s5.48 12 12.24 12c7.06 0 11.758-4.935 11.758-11.89 0-.802-.083-1.413-.183-1.825H12.24z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-3 text-left">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col border-b border-zinc-300 py-1 focus-within:border-zinc-800 transition-colors">
                  <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    disabled={loading}
                    value={signupData.firstName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, firstName: e.target.value })
                    }
                    placeholder="Alexander"
                    className="w-full bg-transparent text-xs text-zinc-800 placeholder-zinc-300 focus:outline-none disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col border-b border-zinc-300 py-1 focus-within:border-zinc-800 transition-colors">
                  <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    disabled={loading}
                    value={signupData.lastName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, lastName: e.target.value })
                    }
                    placeholder="Vance"
                    className="w-full bg-transparent text-xs text-zinc-800 placeholder-zinc-300 focus:outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex flex-col border-b border-zinc-300 py-1 focus-within:border-zinc-800 transition-colors">
                <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  disabled={loading}
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  placeholder="alex@domain.com"
                  className="w-full bg-transparent text-xs text-zinc-800 placeholder-zinc-300 focus:outline-none disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col border-b border-zinc-300 py-1 focus-within:border-zinc-800 transition-colors">
                <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  disabled={loading}
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full bg-transparent text-xs text-zinc-800 placeholder-zinc-300 tracking-widest focus:outline-none disabled:opacity-50"
                />
              </div>

              <label className="flex items-start gap-2.5 text-[11px] font-light text-zinc-500 cursor-pointer pt-0.5 select-none">
                <input
                  type="checkbox"
                  required
                  disabled={loading}
                  checked={signupData.agreeToTerms}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      agreeToTerms: e.target.checked,
                    })
                  }
                  className="mt-0.5 w-3.5 h-3.5 rounded border-zinc-300 text-amber-800 accent-[#413126] cursor-pointer disabled:opacity-50"
                />
                <span>
                  I agree to the Terms of Service & Privacy Policy.
                </span>
              </label>

              <div className="space-y-2.5 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#413126] hover:bg-[#312117] text-white text-xs font-semibold uppercase tracking-widest rounded-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <span>
                    {loading ? "Creating Account..." : "Create Account"}
                  </span>
                  {!loading && <span>→</span>}
                </button>

                <div className="relative flex py-0.5 items-center">
                  <div className="flex-grow border-t border-zinc-200" />
                  <span className="flex-shrink mx-3 text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
                    Or
                  </span>
                  <div className="flex-grow border-t border-zinc-200" />
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleGoogleAuth}
                  className="w-full py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold uppercase tracking-widest rounded-md transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.28 1.845 15.548 1 12.24 1 5.48 1 0 6.48 0 13s5.48 12 12.24 12c7.06 0 11.758-4.935 11.758-11.89 0-.802-.083-1.413-.183-1.825H12.24z"
                    />
                  </svg>
                  <span>Sign up with Google</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Bottom clean text link to toggle between Login & Signup */}
        <footer className="mt-6 text-center text-xs text-zinc-600 font-light border-t border-zinc-200/80 pt-4">
          {mode === "login" ? (
            <span>
              New to Healthy Basket?{" "}
              <button
                type="button"
                data-no-ripple="true"
                onClick={() => {
                  setMode("signup");
                  setError("");
                  setSuccess("");
                }}
                className="font-semibold text-zinc-900 underline hover:text-amber-900 bg-transparent hover:bg-transparent cursor-pointer ml-1 inline"
              >
                Create an Account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                data-no-ripple="true"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setSuccess("");
                }}
                className="font-semibold text-zinc-900 underline hover:text-amber-900 bg-transparent hover:bg-transparent cursor-pointer ml-1 inline"
              >
                Log In
              </button>
            </span>
          )}
        </footer>
      </div>
    </div>
  );
}
