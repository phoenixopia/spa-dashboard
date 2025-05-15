"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const BURL = process.env.NEXT_PUBLIC_APP_URL;

export default function ResetPasswordPage() {
  const { code } = useParams();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!code) {
      setError("Reset code is missing. Please use the reset link sent to your email.");
      return;
    }

    if (!email) {
      setError("Please provide your email.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setError("New password must be at least 8 characters, include one capital letter and one special character.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BURL}/auth/reset/${code}`, {
        email,
        password: newPassword,
      });

      const msg = response.data?.message || "Password reset successfully. You may now log in.";
      setSuccess(msg);
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#289C9A]"
                placeholder="you@example.com"
              />
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-white">New Password</label>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-md bg-white border border-gray-300 px-3 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-[#289C9A]"
                placeholder="••••••••"
              />
              <div
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-9 right-3 cursor-pointer text-gray-600"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-white">Confirm New Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-md bg-white border border-gray-300 px-3 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-[#289C9A]"
                placeholder="••••••••"
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-9 right-3 cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 rounded-md bg-[#289C9A] px-4 py-2 text-white hover:bg-[#207372] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    </Suspense>
  );
}
