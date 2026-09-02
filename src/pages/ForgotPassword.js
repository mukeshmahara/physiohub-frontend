import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, LockKeyhole, Mail } from "lucide-react";
import { requestPasswordReset, resetPassword } from "../services/authService";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token =
    searchParams.get("token") || searchParams.get("reset_password_token");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({ password: "", confirmation: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const submitRequest = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await requestPasswordReset(email);
      setStatus("sent");
    } catch (requestError) {
      setError(requestError.message || "Unable to send reset instructions.");
    }
  };

  const submitReset = async (event) => {
    event.preventDefault();
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmation) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    try {
      await resetPassword(token, form.password, form.confirmation);
      setStatus("reset");
    } catch (resetError) {
      setError(resetError.message || "Unable to reset your password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50/60 via-slate-50 to-accent-50/40 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl sm:p-10">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary-600"><ArrowLeft size={16} /> Back to sign in</Link>
        {status === "sent" ? (
          <div className="mt-10 text-center">
            <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
            <h1 className="mt-5 text-2xl font-bold text-gray-900">Check your email</h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">If an account exists for <strong>{email}</strong>, we sent instructions to reset your password.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-primary-600 hover:text-primary-700">Use a different email</button>
          </div>
        ) : status === "reset" ? (
          <div className="mt-10 text-center">
            <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
            <h1 className="mt-5 text-2xl font-bold text-gray-900">Password updated</h1>
            <p className="mt-2 text-sm text-gray-500">Your password has been reset. You can now sign in.</p>
            <button type="button" onClick={() => navigate("/login")} className="mt-6 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700">Continue to sign in</button>
          </div>
        ) : (
          <>
            <div className="mt-8"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600"><LockKeyhole size={23} /></div><h1 className="mt-5 text-2xl font-bold text-gray-900">{token ? "Create a new password" : "Forgot your password?"}</h1><p className="mt-2 text-sm leading-6 text-gray-500">{token ? "Choose a strong password for your PhysioHub account." : "Enter your email address and we'll send you a secure password reset link."}</p></div>
            {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            {token ? <form onSubmit={submitReset} className="mt-6 space-y-4"><Field label="New password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /><Field label="Confirm new password" type="password" value={form.confirmation} onChange={(event) => setForm({ ...form, confirmation: event.target.value })} /><button type="submit" className="w-full rounded-xl bg-primary-600 py-3.5 text-sm font-bold text-white hover:bg-primary-700">Reset password</button></form> : <form onSubmit={submitRequest} className="mt-6 space-y-4"><label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">Email address</span><div className="relative"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/15" /></div></label><button type="submit" className="w-full rounded-xl bg-primary-600 py-3.5 text-sm font-bold text-white hover:bg-primary-700">Send reset link</button></form>}
          </>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, type, value, onChange }) => <label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">{label}</span><input type={type} required minLength={8} value={value} onChange={onChange} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/15" /></label>;

export default ForgotPassword;
