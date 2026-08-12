import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your login API request here
    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left - Branding */}
          <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-primary-600 via-accent-600 to-accent-700 p-12 text-white">
            {/* Decorative circles */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/10" />

            <div className="relative z-10 flex flex-col justify-between w-full">
              {/* Logo */}
              <div>
                <Link to="/" className="inline-flex items-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img
                      src="/3dlogo.jpeg"
                      alt="PhysioHub"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  </div>

                  <div className="text-2xl font-bold">
                    Physio
                    <span className="text-emerald-300">Hub</span>
                  </div>
                </Link>
              </div>

              {/* Main content */}
              <div className="my-16">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Better Care. Better Recovery.
                </span>

                <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                  Your recovery
                  <br />
                  starts here.
                </h1>

                <p className="text-white/80 text-lg leading-relaxed max-w-md">
                  Connect with trusted physiotherapists, manage your
                  appointments, and take control of your recovery journey with
                  PhysioHub.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-white/90">
                    Find qualified physiotherapists
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-white/90">
                    Book and manage appointments
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-white/90">
                    Track your recovery journey
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Login Form */}
          <div className="p-8 sm:p-12 lg:p-14">
            {/* Back link */}
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-accent-600 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>

            {/* Mobile Logo */}
            <Link to="/" className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <img
                  src="/3dlogo.jpeg"
                  alt="PhysioHub"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>

              <div className="text-2xl font-bold text-gray-900">
                Physio
                <span className="text-accent-600">Hub</span>
              </div>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-accent-600 mb-2">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                Sign in to PhysioHub
              </h2>

              <p className="text-gray-500 mt-2">
                Access your account and continue your healthcare journey.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email address
                </label>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-accent-600 hover:text-accent-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z"
                      />
                    </svg>
                  </span>

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-4 text-gray-400 hover:text-gray-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
                  />

                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-accent-600 hover:from-primary-600 hover:to-accent-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Sign in
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-400">
                  New to PhysioHub?
                </span>
              </div>
            </div>

            {/* Signup */}
            <Link
              to="/signup"
              className="block w-full text-center py-3.5 border-2 border-gray-200 hover:border-accent-500 hover:text-accent-600 text-gray-700 font-semibold rounded-xl transition"
            >
              Create an account
            </Link>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-8">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-gray-600 hover:text-accent-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-gray-600 hover:text-accent-600"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-center text-sm text-gray-400 mt-6">
          © {new Date().getFullYear()} PhysioHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
