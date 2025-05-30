"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  // نقرا حالة الدخول من localStorage في البداية
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("isLoggedIn");
      return saved === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
    toast.success("Logged in successfully!");
  };

  const logout = () => {
    setIsLoggedIn(false);
    toast("Logged out");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
