// src/app/auth/register/page.tsx
"use client";
import React, { useEffect } from "react"; // <-- Import useEffect
import Link from "next/link";
import AuthRegister from "../authforms/AuthRegister";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // <-- Gunakan useRouter
import { Spinner } from "flowbite-react";

const BoxedRegister = () => {
  // Panggil semua hooks di level atas
  const { status } = useSession();
  const router = useRouter();

  // Gunakan useEffect untuk menangani side-effect
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Tampilkan Spinner jika loading atau sudah authenticated
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  // Render form jika 'unauthenticated'
  const gradientStyle = {
    background:
      "linear-gradient(45deg, rgb(238, 119, 82,0.2), rgb(231, 60, 126,0.2), rgb(35, 166, 213,0.2), rgb(35, 213, 171,0.2))",
    backgroundSize: "400% 400%",
    animation: "gradient 15s ease infinite",
    height: "100vh",
    overflow: "hidden",
  };

  return (
    <div style={gradientStyle} className="relative overflow-hidden h-screen">
      <div className="flex h-full justify-center items-center px-4">
        <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative break-words md:w-96 w-full border-none">
          <div className="flex h-full flex-col justify-center gap-2 p-0 w-full">
            <div className="mx-auto">
              <Logo />
            </div>
            <h1 className="text-2xl text-center text-dark my-3">Register</h1>
            <p className="text-sm text-center text-dark my-3">
              Isi data di bawah untuk memulai belajar mengaji.
            </p>
            <AuthRegister />
            <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
              <p>Sudah Punya Akun? </p>
              <Link
                href="/auth/login"
                className="text-primary text-sm font-medium"
              >
                Login
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

export default BoxedRegister;
