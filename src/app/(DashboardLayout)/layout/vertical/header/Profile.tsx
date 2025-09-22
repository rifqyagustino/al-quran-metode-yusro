// src/app/(DashboardLayout)/layout/vertical/header/Profile.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Dropdown, Spinner } from "flowbite-react";
import { Icon } from "@iconify/react";
import { signOut, useSession } from "next-auth/react"; // 1. Import useSession

const Profile = () => {
  // 2. Panggil hook useSession untuk mendapatkan data sesi dan statusnya
  const { data: session, status } = useSession();

  // 3. Tampilkan placeholder (skeleton) saat data sesi sedang dimuat
  if (status === "loading") {
    return (
      <div className="h-10 w-10 rounded-full flex justify-center items-center bg-gray-200 animate-pulse">
        <Spinner size="sm" />
      </div>
    );
  }

  // 4. Tentukan gambar profil: gunakan gambar dari sesi, atau gambar default jika tidak ada
  const userImage = session?.user?.image || "/images/profile/user-1.jpg";

  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        className="rounded-sm w-44"
        dismissOnClick={false}
        renderTrigger={() => (
          <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            <Image
              // 5. Gunakan gambar profil dinamis dari variabel userImage
              src={userImage}
              alt="Profil Pengguna"
              height="35"
              width="35"
              className="rounded-full object-cover" // Tambahkan object-cover
            />
          </span>
        )}
      >
        <Dropdown.Item
          as={Link}
          href="/profil"
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
        >
          <Icon icon="solar:user-circle-outline" height={20} />
          Profil
        </Dropdown.Item>
        <div className="p-3 pt-0">
          <Button
            size={"sm"}
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-2 w-full border border-primary text-primary bg-transparent hover:bg-lightprimary outline-none focus:outline-none"
          >
            Logout
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;