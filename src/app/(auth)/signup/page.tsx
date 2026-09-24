"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const { openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    openAuthModal("signup");
    router.replace("/");
  }, [openAuthModal, router]);

  return (
    <div className="min-h-screen bg-[#fcf9f6] flex items-center justify-center">
      <div className="text-stone-500 text-sm">Opening Create Account...</div>
    </div>
  );
}
