"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); 
  }, []);

  useEffect(() => {
    if (hasMounted && !isLoggedIn) {
      router.replace("/login");
    }
  }, [hasMounted, isLoggedIn, router]);

  if (!hasMounted) return null;

  if (!isLoggedIn) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
