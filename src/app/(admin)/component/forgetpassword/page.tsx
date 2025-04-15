"use client"; // Add this line at the top to mark the file as a client component
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const BURL = process.env.NEXT_PUBLIC_APP_URL;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      const response = await axios.post(`${BURL}/auth/forgot`, { email });
      if (response.status === 200) {
        setSuccessMessage("A password reset link has been sent to your email.");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError("Email not found. Please check and try again.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/Images/spa.jpeg')`,
        }}
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Logo - Top Left */}
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

      {/* Centered Forgot Password Card */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl bg-[#1E3B5C] p-6 sm:p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">
            Forgot Password
          </h2>
          <p className="mb-4 text-center text-sm text-gray-200">
            Enter your email to receive a password reset link.
          </p>

          {/* Error and Success Messages */}
          {error && (
            <div className="mb-4 rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 rounded-md bg-green-100 px-4 py-2 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#289C9A]"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-[#289C9A] px-4 py-2 text-white hover:bg-[#207372] transition"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center text-sm">
            <a href="/login" className="text-[#289C9A] hover:underline">
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
