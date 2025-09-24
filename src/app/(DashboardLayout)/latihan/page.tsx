"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Spinner } from "flowbite-react";

import CardLatihan from "@/app/components/dashboard/CardLatihan";
import { exercisesData } from "@/app/data/exercises";

export default function LatihanPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Daftar Latihan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercisesData.map((exercise) => (
          <Link href={`/latihan/${exercise.id}`} key={exercise.id}>
            <CardLatihan
              id={parseInt(exercise.id)}
              title={exercise.title}
              progress={exercise.progress}
              totalParts={exercise.totalParts}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
