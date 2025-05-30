"use client";

import { useLoginFormik } from "@/app/hooks/useLoginFormik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, Grip, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { formik, generalError } = useLoginFormik();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full md:max-w-7xl">
        <div className="py-14 px-4 md:px-20">
          <div className="flex flex-col items-center">
            <Grip className="w-20 h-20" />
            <h1 className="font-bold text-3xl pt-2">Welcome admin</h1>
          </div>

          <div className="py-4">
            {generalError && (
              <p className="text-red-600 text-center font-semibold mt-2">
                {generalError}
              </p>
            )}
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="py-14 flex flex-col gap-6 items-center w-full max-w-4xl mx-auto"
          >
            {/* Email Input */}
            <div className="space-y-2 w-full md:max-w-md mx-auto">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="py-5 pl-10 w-full"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>

            {/* Password Input */}
            <div className="space-y-2 w-full md:max-w-md mx-auto">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                {showPassword ? (
                  <EyeClosed
                    className="absolute right-3 top-3 h-4 w-4 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-3 h-4 w-4 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="py-5 pl-10 w-full"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            <div className="flex justify-center w-full md:max-w-md">
              <Button type="submit" className="w-full py-5 cursor-pointer">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
