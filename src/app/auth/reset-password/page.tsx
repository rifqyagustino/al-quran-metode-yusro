"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";

const ResetPasswordContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password tidak cocok.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Gagal mereset password.");
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
              Reset Password
            </h1>
            <p className="text-sm text-center text-dark my-3">
              Masukkan password baru Anda.
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

            {!token ? (
              <Alert color="failure">Token tidak valid atau hilang.</Alert>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Password Baru" />
                  </div>
                  <TextInput
                    id="password"
                    type="password"
                    sizing="md"
                    className="form-control form-rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="confirmPassword"
                      value="Konfirmasi Password Baru"
                    />
                  </div>
                  <TextInput
                    id="confirmPassword"
                    type="password"
                    sizing="md"
                    className="form-control form-rounded-xl"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  color={"primary"}
                  className="w-full bg-primary text-white rounded-xl"
                  disabled={loading || !!success}
                >
                  {loading ? <Spinner size="sm" /> : "Reset Password"}
                </Button>
              </form>
            )}

            {success && (
              <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
                <Link
                  href="/auth/login"
                  className="text-primary text-sm font-medium"
                >
                  Kembali ke Login
                </Link>
              </div>
            )}
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

const ResetPasswordPage = () => (
  <Suspense
    fallback={
      <div className="flex h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    }
  >
    <ResetPasswordContent />
  </Suspense>
);

export default ResetPasswordPage;
