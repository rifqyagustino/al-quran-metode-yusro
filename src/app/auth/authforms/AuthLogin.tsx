"use client";

import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Redirect ke dashboard jika berhasil
      router.push("/");
    }
  };

  return (
    <>
      {error && (
        <Alert
          color="failure"
          onDismiss={() => setError(null)}
          className="mb-4"
        >
          {error}
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
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="userpwd" value="Password" />
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            className="form-control form-rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end my-5">
          <Link
            href={"/auth/forgot-password"}
            className="text-primary text-sm font-medium"
          >
            Lupa Password ?
          </Link>
        </div>
        <Button
          type="submit"
          color={"primary"}
          className="w-full bg-primary text-white rounded-xl"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
