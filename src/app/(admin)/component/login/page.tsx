"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const BURL = process.env.NEXT_PUBLIC_APP_URL;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters, include one capital letter and one special character.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BURL}/auth/signin`, { email, password });

      if (response.status === 200) {
        const token = response.data.data.token;

        Cookies.set("token", token, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });

        if (rememberMe) {
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("email");
        }

        router.push("/dashboard");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError("Login unsuccessful. Please check your credentials.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
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

      {/* Login Card */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl bg-[#1E3B5C] p-6 sm:p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">Login</h2>

          {error && (
            <div className="mb-4 rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <div className="relative">
              <label className="block text-sm font-medium text-white">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#289C9A] pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 cursor-pointer text-gray-600"
                >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-white gap-2 sm:gap-0">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-[#289C9A] border-gray-300 rounded"
                />
                <span>Remember me</span>
              </label>
              <a href="/forgetpassword" className="text-[#289C9A] hover:underline self-end">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 rounded-md bg-[#289C9A] px-4 py-2 text-white hover:bg-[#207372] transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
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
                  <span>Logging in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
