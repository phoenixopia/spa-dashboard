import Image from "next/image";

export default function ForgotPasswordPage() {
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
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#289C9A]"
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
