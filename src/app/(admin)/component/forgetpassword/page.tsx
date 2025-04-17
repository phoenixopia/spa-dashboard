"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const BURL = process.env.NEXT_PUBLIC_APP_URL;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!email) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true); // Start loading
      const response = await axios.post(
        `${BURL}/auth/forgot`,
        { email },
        // { withCredentials: true }
      );
    
      if (response.status === 200) {
        setMessage(response.data?.message || "A password reset link has been sent to your email.");
        setMessageType("success");
      }
    } catch (err: any) {
      console.log(err);
      const backendMessage = err?.response?.data?.message;

      if (err.response && err.response.status === 404) {
        setMessage(backendMessage || "Email not found. Please check and try again.");
      } else {
        setMessage(backendMessage || "Something went wrong. Please try again later.");
      }

      setMessageType("error");
    } finally {
      setLoading(false); // Stop loading
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

          {/* Message Display */}
          {message && (
            <div
              className={`mb-4 rounded-md px-4 py-2 text-sm ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#289C9A] disabled:opacity-70"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 rounded-md bg-[#289C9A] px-4 py-2 text-white hover:bg-[#207372] transition disabled:opacity-70"
            >
              {loading && (
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
              )}
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center text-sm">
            <a href="/" className="text-[#289C9A] hover:underline">
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
