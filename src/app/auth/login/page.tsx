// src/app/auth/login/page.tsx
"use client";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import React, { useEffect } from "react"; // <-- Import useEffect
import Link from "next/link";
import AuthLogin from "../authforms/AuthLogin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // <-- Gunakan useRouter untuk redirect di client
import { Spinner } from "flowbite-react";

const BoxedLogin = () => {
  // Panggil semua hooks di level atas, tanpa kondisi
  const { status } = useSession();
  const router = useRouter();

  // Gunakan useEffect untuk menangani side-effect (redirect)
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Tampilkan Spinner jika loading atau sudah authenticated (menunggu redirect)
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  // Hanya render form jika statusnya 'unauthenticated'
  const gradientStyle = {
    background:
      "linear-gradient(45deg, rgb(238, 119, 82,0.2), rgb(231, 60, 126,0.2), rgb(35, 166, 213,0.2), rgb(35, 213, 171,0.2))",
    backgroundSize: "400% 400%",
    animation: "gradient 15s ease infinite",
    height: "100vh",
  };

  return (
    <div style={gradientStyle} className="relative overflow-hidden h-screen">
      <div className="flex h-full justify-center items-center px-4">
        <div className="rounded-xl shadow-md bg-white dark:bg-darkgray p-6 w-full md:w-96 border-none">
          <div className="flex flex-col gap-2 p-0 w-full">
            <div className="mx-auto">
              <Logo />
            </div>
            <h1 className="text-2xl text-center text-dark my-3">Login</h1>
            <p className="text-sm text-center text-dark my-3">
              Silakan masuk untuk belajar mengaji.
            </p>
            <AuthLogin />
            <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
              <p>Belum Punya Akun?</p>
              <Link
                href="/auth/register"
                className="text-primary text-sm font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default BoxedLogin;
