import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import "./Register.css";

const UserIcon = () => (
  <svg viewBox="0 0 24 24" className="input-icon">
    <path
      d="M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="input-icon">
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="m3 7 9 6 9-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="input-icon">
    <path
      d="M7.2 3.5 9.5 3a2 2 0 0 1 2.2 1.2l1 2.4a2 2 0 0 1-.5 2.2l-1.4 1.2a14.5 14.5 0 0 0 3.2 3.2l1.2-1.4a2 2 0 0 1 2.2-.5l2.4 1a2 2 0 0 1 1.2 2.2l-.5 2.3a2 2 0 0 1-2 1.6C10.7 18.4 5.6 13.3 4.1 6.7a2 2 0 0 1 1.6-2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="input-icon">
    <rect
      x="5"
      y="10"
      width="14"
      height="11"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M8 10V7a4 4 0 0 1 8 0v3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const EyeIcon = ({ visible }) => (
  <svg viewBox="0 0 24 24" className="eye-icon">
    {visible ? (
      <>
        <path
          d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle
          cx="12"
          cy="12"
          r="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </>
    ) : (
      <>
        <path
          d="M3 3l18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3.2 3.7M6.3 6.8C3.9 8.5 2.5 12 2.5 12s3.5 6 9.5 6c1.2 0 2.3-.2 3.3-.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-icon">
    <rect
      x="4"
      y="5"
      width="16"
      height="16"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M8 3v4M16 3v4M4 9h16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-icon">
    <path
      d="M12 3 20 6v5c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6l8-3Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="m9 12 2 2 4-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-icon">
    <circle
      cx="9"
      cy="8"
      r="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M3.5 19a5.5 5.5 0 0 1 11 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <circle
      cx="17"
      cy="9"
      r="2.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M15.2 15.5a4.5 4.5 0 0 1 5.3 3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

function PhysioIllustration() {
  return (
    <div className="physio-illustration">
      <div className="illustration-window">
        <div className="window-line" />
        <div className="window-line short" />
      </div>

      <div className="body-poster">
        <div className="body-head" />
        <div className="body-neck" />
        <div className="body-shape" />
        <div className="body-leg left" />
        <div className="body-leg right" />
      </div>

      <div className="plant">
        <div className="plant-pot" />
        <div className="plant-stem" />
        <div className="leaf leaf-1" />
        <div className="leaf leaf-2" />
        <div className="leaf leaf-3" />
        <div className="leaf leaf-4" />
      </div>

      <div className="treatment-table">
        <div className="table-top" />
        <div className="table-leg left" />
        <div className="table-leg right" />
      </div>

      <div className="therapist">
        <div className="therapist-head" />
        <div className="therapist-hair" />
        <div className="therapist-body" />
        <div className="therapist-arm left" />
        <div className="therapist-arm right" />
        <div className="therapist-leg left" />
        <div className="therapist-leg right" />
      </div>

      <div className="patient">
        <div className="patient-head" />
        <div className="patient-hair" />
        <div className="patient-body" />
        <div className="patient-arm" />
        <div className="patient-leg upper" />
        <div className="patient-leg lower" />
      </div>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    terms: false,
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear previous validation error while typing.
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    // Client-side validation
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.terms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
    };

    registerMutation.mutate(userData, {
      onSuccess: (data) => {
        console.log("Registration successful:", data);

        navigate("/login", {
          state: {
            message:
              "Your account has been created successfully. Please login.",
          },
        });
      },

      onError: (apiError) => {
        console.error("Registration failed:", apiError);

        /*
         * Your ApiClient throws:
         *
         * ApiError {
         *   message,
         *   status,
         *   data,
         *   isNetworkError,
         *   isTimeout
         * }
         */

        if (apiError.isNetworkError) {
          setError(
            "Unable to connect to the server. Please check your connection.",
          );
          return;
        }

        if (apiError.isTimeout) {
          setError("The request timed out. Please try again.");
          return;
        }

        // Rails validation errors
        const responseData = apiError.data;

        if (responseData?.errors?.full_messages) {
          setError(responseData.errors.full_messages.join(", "));
          return;
        }

        if (responseData?.errors) {
          const errors = Object.values(responseData.errors).flat().join(", ");

          if (errors) {
            setError(errors);
            return;
          }
        }

        setError(
          responseData?.error ||
            responseData?.message ||
            apiError.message ||
            "Unable to create your account.",
        );
      },
    });
  };

  return (
    <div className="register-page">
      {/* =========================
          LEFT HERO
      ========================== */}
      <section className="register-hero">
        <div className="hero-content">
          {/* Logo */}
          <Link to="/" className="physio-logo">
            <div className="logo-mark">
              <div className="logo-person" />

              <div className="logo-spine">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="logo-text">
              <div>
                Physio<span>Hub</span>
              </div>

              <small>Move Better. Live Better.</small>
            </div>
          </Link>

          {/* Hero Content */}
          <div className="hero-copy">
            <h1>
              Create your account
              <br />
              and take the first step
              <br />
              <span>towards better health.</span>
            </h1>

            <p>
              Join PhysioHub and get access to expert
              <br />
              physiotherapists, personalized programs
              <br />
              and easy appointment booking.
            </p>
          </div>

          {/* Illustration */}
          <PhysioIllustration />

          {/* Features */}
          <div className="hero-features">
            <div className="hero-feature">
              <PeopleIcon />

              <span>
                Expert
                <br />
                Therapists
              </span>
            </div>

            <div className="hero-feature">
              <CalendarIcon />

              <span>
                Easy
                <br />
                Appointments
              </span>
            </div>

            <div className="hero-feature">
              <ShieldIcon />

              <span>
                Secure &
                <br />
                Private
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          REGISTRATION FORM
      ========================== */}
      <section className="register-form-section">
        <div className="register-card">
          <div className="form-header">
            <h2>Create your account</h2>

            <p>Fill in the details below to get started</p>
          </div>

          <div className="form-divider" />

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name">Full name</label>

              <div className="input-wrapper">
                <UserIcon />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  disabled={registerMutation.isPending}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <div className="input-wrapper">
                <MailIcon />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={registerMutation.isPending}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone number</label>

              <div className="input-wrapper">
                <PhoneIcon />

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  disabled={registerMutation.isPending}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="input-wrapper">
                <LockIcon />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={registerMutation.isPending}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  disabled={registerMutation.isPending}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>

              <small className="password-hint">
                Minimum 8 characters with letters and numbers
              </small>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="passwordConfirmation">Confirm password</label>

              <div className="input-wrapper">
                <LockIcon />

                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type={showConfirmation ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={registerMutation.isPending}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmation((previous) => !previous)}
                  disabled={registerMutation.isPending}
                  aria-label={
                    showConfirmation ? "Hide password" : "Show password"
                  }
                >
                  <EyeIcon visible={showConfirmation} />
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="register-error" role="alert">
                {error}
              </div>
            )}

            {/* Terms */}
            <label className="terms">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                disabled={registerMutation.isPending}
              />

              <span className="custom-checkbox" />

              <span>
                I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="create-account-btn"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <span className="spinner" />
                  Creating account...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="button-user-icon">
                    <path
                      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  Create account
                </>
              )}
            </button>

            {/* OR */}
            <div className="or-divider">
              <span />
              <strong>or</strong>
              <span />
            </div>

            {/* Google */}
            <button
              type="button"
              className="google-btn"
              onClick={() => {
                window.location.href =
                  "http://localhost:5000/api/v1/auth/google_oauth2";
              }}
              disabled={registerMutation.isPending}
            >
              <span className="google-icon">G</span>
              Sign up with Google
            </button>
          </form>

          {/* Login */}
          <div className="login-link">
            Already have an account?
            <Link to="/login">Login</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="register-footer">
        © 2025 PhysioHub. All rights reserved.
      </footer>
    </div>
  );
}
