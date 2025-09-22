"use client";

import { Button, Label, TextInput, Alert } from "flowbite-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Pastikan Link diimpor

const AuthRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Gagal melakukan registrasi.");
    } else {
      setSuccess(data.message);
    }
    setLoading(false);
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
      {success && (
        <Alert color="success" className="mb-4">
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nama" />
          </div>
          <TextInput
            id="name"
            type="text"
            sizing="md"
            className="form-control form-rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-6">
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

        {/* Tombol Register */}
        <Button
          type="submit"
          color={"primary"}
          className="w-full bg-primary text-white rounded-xl hover:bg-primary-emphasis"
          disabled={loading}
        >
          {loading ? "Mendaftar..." : "Register"}
        </Button>
      </form>
    </>
  );
};

export default AuthRegister;