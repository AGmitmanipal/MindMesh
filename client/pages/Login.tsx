import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation() as any;
  const from = location?.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-foreground relative overflow-hidden">
      <div className="main-bg" />
      <Header />

      <div className="max-w-lg mx-auto px-6 py-16 relative z-10">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Log in</h1>
          <p className="text-sm text-slate-500 mt-2">Access your dashboard.</p>

          {error && (
            <div className="mt-6 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-sm">
              {error}
            </div>
          )}

          <form
            className="mt-8 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setBusy(true);
              try {
                await login(email.trim(), password);
                nav(from, { replace: true });
              } catch (err: any) {
                setError(err?.message || "Login failed");
              } finally {
                setBusy(false);
              }
            }}
          >
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium shadow-sm focus:outline-none focus:border-primary transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={busy}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium shadow-sm focus:outline-none focus:border-primary transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={busy}
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg hover:opacity-90 transition-all disabled:opacity-60"
            >
              {busy ? "Logging in…" : "Log in"}
            </button>

            <p className="text-sm text-slate-500">
              Don’t have an account?{" "}
              <Link className="font-bold text-primary hover:underline" to="/signup">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}


