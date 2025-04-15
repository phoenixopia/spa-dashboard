"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const BURL = process.env.NEXT_PUBLIC_APP_URL;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validatePassword(newPassword)) {
      setError(
        "New password must be at least 8 characters, include one capital letter and one special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      const cookieToken = Cookies.get("token"); // Optional, if needed for authentication

      const response = await axios.post(
        `${BURL}/auth/reset`,
        {
          oldPassword,
          newPassword,
          token: resetToken, // Sending token from URL
        },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`, // Optional
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Password successfully updated.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setError("Incorrect old password or invalid token.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/Images/spa.jpeg')` }}
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Logo */}
      <div className="absolute top-4 left-4 z-20">
        <div className="w-28 sm:w-36 md:w-40">
          <Image
            src="/Images/logo.png"
            alt="Logo"
            width={160}
            height={50}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Reset Password Card */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl bg-[#1E3B5C] p-6 sm:p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">
            Reset Password
          </h2>

          {error && (
            <div className="mb-4 rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-md bg-green-100 px-4 py-2 text-sm text-green-700">
              {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleReset}>
            <div>
              <label className="block text-sm font-medium text-white">
                Old Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#289C9A]"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#289C9A]"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#289C9A]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#289C9A] px-4 py-2 text-white hover:bg-[#207372] transition"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
