"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Label, TextInput, Spinner, Modal } from "flowbite-react";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function ProfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // --- STATE PROFIL ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("/images/profile/default-avatar.png");

  // --- STATE FOTO ---
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // --- STATE MODAL PASSWORD ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- STATE LOADING ---
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Ref untuk input file
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect jika belum login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Ambil data profil
  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(true);
      fetch("/api/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setName(data.user.name || "");
            setEmail(data.user.email || "");
            setPhoto(data.user.image || "/images/profile/default-avatar.png");
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [status]);

  // --- HANDLER FOTO ---
  const handleImageClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // --- UPDATE PROFIL ---
  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    let imageUrl = photo;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("profilePhoto", selectedFile);

      try {
        const uploadResponse = await fetch("/api/profile/upload-photo", {
          method: "POST",
          body: formData,
        });
        const result = await uploadResponse.json();
        if (!uploadResponse.ok)
          throw new Error(result.error || "Gagal mengunggah foto.");
        imageUrl = result.filePath;
      } catch (error) {
        alert((error as Error).message);
        setIsUpdating(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, image: imageUrl }),
      });
      if (!response.ok) throw new Error("Gagal memperbarui profil.");

      alert("Profil berhasil diperbarui!");
      setPhoto(imageUrl);
      setSelectedFile(null);
      setPhotoPreview(null);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsUpdating(false);
    }
  };

  // --- PASSWORD ---
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Konfirmasi password baru tidak cocok.");
      return;
    }
    setIsChangingPassword(true);
    try {
      const response = await fetch("/api/profile/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Gagal mengubah password.");
      alert(result.message);
      handleCloseModal();
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  // --- LOADING STATE ---
  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  // Jangan render apapun saat belum login
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        <div className="flex flex-col items-center mb-6">
          <div
            className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-gray-200 cursor-pointer group"
            onClick={handleImageClick}
          >
            <Image
              src={photoPreview || photo}
              alt="Foto Profil"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Icon
                icon="solar:camera-outline"
                className="text-white text-3xl"
              />
            </div>
          </div>
          <p className="text-2xl font-bold">{name}</p>
          <p className="text-gray-500">{email}</p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="nama" value="Nama Lengkap" />
            <TextInput
              id="nama"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email" value="Alamat Email" />
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Button
            onClick={handleUpdateProfile}
            className="flex-1 bg-primary text-white hover:bg-primary-emphasis"
            isProcessing={isUpdating}
          >
            {isUpdating ? "Menyimpan..." : "Update Profil"}
          </Button>
          <Button
            onClick={handleOpenModal}
            className="flex-1 bg-gray-200 text-dark hover:bg-gray-300"
          >
            Ubah Kata Sandi
          </Button>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>Ubah Kata Sandi</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" value="Kata Sandi Saat Ini" />
              <TextInput
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="newPassword" value="Kata Sandi Baru" />
              <TextInput
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                value="Konfirmasi Kata Sandi Baru"
              />
              <TextInput
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button color="gray" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-primary"
                isProcessing={isChangingPassword}
              >
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
