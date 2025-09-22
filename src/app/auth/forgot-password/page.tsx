"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Gagal mengirim email reset password.");
    } else {
      setSuccess(data.message);
    }
    setLoading(false);
  };

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
            <h1 className="text-2xl text-center text-dark my-3">
              Lupa Password
            </h1>
            <p className="text-sm text-center text-dark my-3">
              Masukkan email Anda untuk menerima tautan reset password.
            </p>

            {error && (
              <Alert
                color="failure"
                onDismiss={() => setError(null)}
                className="mb-4"
              >
                {error}
              </Alert>
            )}
            {success && (
              <Alert color="success" className="mb-4">
                {success}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  sizing="md"
                  className="form-control form-rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                color={"primary"}
                className="w-full bg-primary text-white rounded-xl"
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : "Kirim Tautan Reset"}
              </Button>
            </form>

            <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
              <Link
                href="/auth/login"
                className="text-primary text-sm font-medium"
              >
                Kembali ke Login
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

export default ForgotPasswordPage;
