"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  Suspense,
  ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Quick utility functions for vanilla cookie management
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const eraseCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999;path=/;`;
};

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, userData: User, rememberMeDays?: number) => void;
  signup: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Isolated OAuth params handler wrapped inside a Suspense boundary
function OAuthListener({
  onAuthSuccess,
}: {
  onAuthSuccess: (user: User, redirect: string) => void;
}) {
  const searchParams = useSearchParams();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;

    const oauthToken = searchParams.get("token");
    const oauthUserRaw = searchParams.get("user");
    const oauthRedirect = searchParams.get("redirect");
    const oauthError = searchParams.get("error");

    if (oauthError) {
      console.error(
        "Google Authentication error fallback:",
        decodeURIComponent(oauthError),
      );
      return;
    }

    if (oauthToken && oauthUserRaw) {
      try {
        handledRef.current = true;
        const decodedUserData: User = JSON.parse(
          decodeURIComponent(oauthUserRaw),
        );
        setCookie("authToken", oauthToken, 7);
        localStorage.setItem("authUser", JSON.stringify(decodedUserData));
        const target = oauthRedirect ? decodeURIComponent(oauthRedirect) : "/";
        onAuthSuccess(decodedUserData, target);
      } catch (err) {
        console.error("Critical error parsing inbound user context stream:", err);
      }
    }
  }, [searchParams, onAuthSuccess]);

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // 1. Initial Session Check on mount (runs strictly ONCE)
  useEffect(() => {
    const token = getCookie("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        eraseCookie("authToken");
        localStorage.removeItem("authUser");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const handleOAuthSuccess = (userData: User, targetDestination: string) => {
    setUser(userData);
    setLoading(false);
    router.push(targetDestination);
  };

  const login = (token: string, userData: User, rememberMeDays = 7) => {
    setCookie("authToken", token, rememberMeDays);
    localStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
    router.push("/");
  };

  const signup = () => {
    router.push("/");
  };

  const logout = () => {
    eraseCookie("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, signup, logout }}
    >
      <Suspense fallback={null}>
        <OAuthListener onAuthSuccess={handleOAuthSuccess} />
      </Suspense>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
