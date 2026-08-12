import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/queries";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const usernameOrEmail = formData.get("usernameOrEmail");
    const password = formData.get("password");

    loginMutation.mutate(
      { usernameOrEmail, password, rememberMe },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/60 via-slate-50 to-accent-50/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Left - Branding */}
          <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 p-12 text-white">
            {/* Decorative circles */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-xl" />
            <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/10 blur-xl" />

            <div className="relative z-10 flex flex-col justify-between w-full">
              {/* Logo */}
              <div>
                <Link to="/" className="inline-flex items-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-inner">
                    <img
                      src="/3dlogo.jpeg"
                      alt="PhysioHub"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  </div>

                  <div className="text-2xl font-extrabold tracking-tight text-white">
                    Physio
                    <span className="text-accent-300">Hub</span>
                  </div>
                </Link>
              </div>

              {/* Main content */}
              <div className="my-16">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6 border border-white/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-300 animate-pulse" />
                  Better Care. Better Recovery.
                </span>

                <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight mb-6">
                  Your recovery
                  <br />
                  starts here.
                </h1>

                <p className="text-white/85 text-lg leading-relaxed max-w-md font-normal">
                  Connect with trusted physiotherapists, manage your
                  appointments, and take control of your recovery journey with
                  PhysioHub.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {[
                  "Find qualified physiotherapists",
                  "Book and manage appointments",
                  "Track your recovery journey",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center font-bold text-accent-300 shadow-sm">
                      ✓
                    </div>
                    <span className="text-white/95 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Login Form */}
          <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
            {/* Back link */}
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-600 transition-colors group"
              >
                <svg
                  className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>
            </div>

            {/* Mobile Logo */}
            <Link
              to="/"
              className="lg:hidden flex items-center justify-center gap-3 mb-6 sm:mb-8"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
                <img
                  src="/3dlogo.jpeg"
                  alt="PhysioHub"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                />
              </div>

              <div className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Physio
                <span className="text-primary-600">Hub</span>
              </div>
            </Link>

            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <p className="text-xs font-bold text-primary-600 tracking-wider uppercase mb-1.5">
                WELCOME BACK
              </p>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Sign in to PhysioHub
              </h2>

              <p className="text-gray-500 mt-1.5 sm:mt-2 text-sm font-medium">
                Access your account and continue your healthcare journey.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Username / Email */}
              <div>
                <label
                  htmlFor="usernameOrEmail"
                  className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2"
                >
                  Username or Email address
                </label>

                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-hover:text-primary-500 group-focus-within:text-primary-600 transition-colors pointer-events-none">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>

                  <input
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    type="text"
                    autoComplete="username"
                    required
                    placeholder="Enter your username or email"
                    className="w-full pl-12 pr-4 py-3 sm:py-3.5 border border-gray-200 rounded-xl bg-gray-50/70 text-base sm:text-sm text-gray-900 font-medium placeholder-gray-400 hover:border-primary-400 hover:bg-white hover:shadow-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/15 focus:border-primary-500 transition-all duration-200"
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
                    className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-hover:text-primary-500 group-focus-within:text-primary-600 transition-colors pointer-events-none">
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
                    className="w-full pl-12 pr-14 py-3 sm:py-3.5 border border-gray-200 rounded-xl bg-gray-50/70 text-base sm:text-sm text-gray-900 font-medium placeholder-gray-400 hover:border-primary-400 hover:bg-white hover:shadow-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/15 focus:border-primary-500 transition-all duration-200"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-4 text-xs font-bold text-gray-500 hover:text-primary-600 transition-colors focus:outline-none"
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
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition cursor-pointer"
                  />

                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Error Alert Banner */}
              {loginMutation.isError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2 animate-fadeInUp">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{loginMutation.error?.message || "Failed to sign in. Please try again."}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full py-3.5 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-bold rounded-xl shadow-lg hover:shadow-primary-500/25 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loginMutation.isPending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-xs font-semibold uppercase tracking-wider text-gray-400">
                  New to PhysioHub?
                </span>
              </div>
            </div>

            {/* Signup */}
            <Link
              to="/signup"
              className="block w-full text-center py-3.5 border-2 border-primary-200 hover:border-primary-500 text-primary-700 hover:text-primary-800 hover:bg-primary-50/50 font-bold rounded-xl transition-all duration-200"
            >
              Create an account
            </Link>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-8 font-medium">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-gray-600 hover:text-primary-600 underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-gray-600 hover:text-primary-600 underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-center text-sm font-medium text-gray-400 mt-6">
          © {new Date().getFullYear()} PhysioHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
