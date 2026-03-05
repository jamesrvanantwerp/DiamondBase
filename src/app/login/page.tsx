"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Diamond, Mail, Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    if (mode === "signin") {
      const err = await signIn(email, password);
      if (err) { setError(err); setLoading(false); }
      else router.push("/dashboard");
    } else {
      if (!name.trim()) { setError("Please enter your name."); setLoading(false); return; }
      const err = await signUp(email, password, name);
      if (err) { setError(err); setLoading(false); }
      else setSuccessMsg("Account created! Check your email to confirm, then sign in.");
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail("demo@diamondbase.com");
    setPassword("demo1234");
    setMode("signin");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Diamond className="h-8 w-8 text-blue-400" />
            <span className="text-white font-black text-2xl tracking-tight">
              Diamond<span className="text-blue-400">Base</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">Indoor baseball facility management</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-800 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMode("signin"); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${mode === "signin" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${mode === "signup" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-3 mb-4 flex items-center gap-2 text-red-300 text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-950/30 border border-green-500/30 rounded-xl p-3 mb-4 text-green-300 text-sm">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-gray-400 text-sm block mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jake Martinez"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-gray-400 text-sm block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              {mode === "signup" && <p className="text-gray-600 text-xs mt-1">Minimum 6 characters</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Demo login */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-500 text-xs text-center mb-2">Just here to explore?</p>
            <button
              onClick={fillDemo}
              className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 rounded-xl text-sm transition-colors"
            >
              Fill Demo Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
