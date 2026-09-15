"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Award, Leaf, Globe } from "lucide-react";
import axiosInstance from "@/lib/axios";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRedirect = searchParams.get("redirect");
  const loginUrl = currentRedirect
    ? `/login?redirect=${encodeURIComponent(currentRedirect)}`
    : "/login";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required!");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess("Account created successfully! Redirecting to login...");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          agreeToTerms: false,
        });

        setTimeout(() => {
          router.push(loginUrl);
        }, 1500);
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
    const redirectParam = currentRedirect
      ? `?redirect=${encodeURIComponent(currentRedirect)}`
      : "";
    window.location.href = `${backendUrl}/auth/google${redirectParam}`;
  };

  return (
    <main className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Column Banner */}
      <div className="relative hidden md:flex flex-col justify-end p-12 lg:p-16 text-white bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/signup-img.png"
            alt="Authentic botanical minerals and raw alchemical elements"
            fill
            priority
            sizes="50vw"
            className="object-cover opacity-50 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-sm">
          <h2 className="text-2xl font-serif tracking-wide mb-3">
            Heritage of Purity
          </h2>
          <p className="text-xs text-zinc-300 font-light leading-relaxed">
            Join our circle of wellness and experience the uncompromised rituals
            of ancient alchemy.
          </p>
        </div>
      </div>

      {/* Right Column Form */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 bg-[#fcf9f6] py-12">
        <div className="max-w-md w-full mx-auto flex flex-col h-full justify-between">
          <div className="w-full">
            <header className="mb-6">
              <h1 className="text-3xl font-serif text-zinc-900 tracking-wide mb-2">
                Create Account
              </h1>
              <p className="text-sm text-zinc-500 font-light">
                Begin your journey to conscious vitality.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              {[
                {
                  label: "First Name",
                  type: "text",
                  key: "firstName",
                  placeholder: "Alexander",
                },
                {
                  label: "Last Name",
                  type: "text",
                  key: "lastName",
                  placeholder: "Vance",
                },
                {
                  label: "Email Address",
                  type: "email",
                  key: "email",
                  placeholder: "alex@domain.com",
                },
                {
                  label: "Password",
                  type: "password",
                  key: "password",
                  placeholder: "••••••••",
                },
              ].map((field) => (
                <div
                  key={field.key}
                  className="flex flex-col border-b border-zinc-300 py-1 focus-within:border-zinc-800 transition-colors duration-200"
                >
                  <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    disabled={loading}
                    placeholder={field.placeholder}
                    value={String(formData[field.key as keyof typeof formData])}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              ))}

              <label className="flex items-start gap-3 text-[11px] font-light text-zinc-500 cursor-pointer pt-1 select-none">
                <input
                  type="checkbox"
                  required
                  disabled={loading}
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeToTerms: e.target.checked })
                  }
                  className="mt-0.5 w-3.5 h-3.5 rounded border-zinc-300 bg-white text-amber-800 accent-[#413126] focus:ring-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="underline hover:text-zinc-900">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="underline hover:text-zinc-900"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#413126] text-white text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#534033] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Account"}{" "}
                  {!loading && <span>→</span>}
                </button>

                <div className="relative flex py-1 items-center">
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
                  Sign up with Google
                </button>
              </div>
            </form>

            <footer className="mt-6 text-center text-xs text-zinc-600 font-light">
              Already have an account?{" "}
              <Link
                href={loginUrl}
                className="font-semibold text-zinc-900 hover:underline"
              >
                Log In
              </Link>
            </footer>
          </div>

          {/* Badges footer */}
          <div className="mt-8 pt-4 border-t border-zinc-200/60 grid grid-cols-3 gap-2">
            {[
              { icon: <Award className="w-3.5 h-3.5" />, text: "Lab Tested" },
              { icon: <Leaf className="w-3.5 h-3.5" />, text: "100% Organic" },
              {
                icon: <Globe className="w-3.5 h-3.5" />,
                text: "Ethically Sourced",
              },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-zinc-400 text-[9px] font-bold uppercase tracking-wider justify-center md:justify-start"
              >
                {badge.icon}
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
