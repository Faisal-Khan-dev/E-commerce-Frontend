"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    openAuthModal("login");
    router.replace("/");
  }, [openAuthModal, router]);

  return (
    <div className="min-h-screen bg-[#fcf9f6] flex items-center justify-center">
      <div className="text-stone-500 text-sm">Opening Sign In...</div>
    </div>
  );
}
