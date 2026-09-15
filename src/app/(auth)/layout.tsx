// app/(auth)/layout.tsx
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // Centers your split-grid login and signup cards perfectly inside the viewport
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fcf9f6]">
      {children}
    </div>
  );
}
