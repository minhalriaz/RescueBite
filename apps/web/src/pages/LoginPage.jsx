import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { setSession } from "../lib/auth";

const demoAccounts = [
  { label: "Donor demo", email: "donor@rescuebite.test" },
  { label: "Human NGO", email: "human.ngo@rescuebite.test" },
  { label: "Animal NGO", email: "animal.ngo@rescuebite.test" },
  { label: "Both NGO", email: "both.ngo@rescuebite.test" },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (loginEmail, loginPassword) => {
    setLoading(true);
    setError("");

    try {
      const payload = await api.login({ email: loginEmail, password: loginPassword });
      setSession(payload.token, payload.user);

      if (payload.user.role === "ngo") navigate("/ngo/dashboard");
      else if (payload.user.role === "donor") navigate("/donor/dashboard");
      else navigate("/");
    } catch (requestError) {
      setError(requestError.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email.trim(), password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80" alt="Food rescue background" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-[#0F9F76]/75 backdrop-blur-sm -z-10" />

      <div className="w-full max-w-md rounded-[2rem] bg-white p-7 md:p-9 shadow-2xl">
        <div className="text-center">
          <img src="/rescuebite-icon.svg" alt="RescueBite" className="mx-auto h-12 w-12" />
          <h1 className="mt-3 text-3xl font-extrabold text-[#0D4436]">Welcome Back</h1>
          <p className="mt-1 text-sm text-stone-400">Sign in to RescueBite</p>
        </div>

        {error ? <div className="mt-5 rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-700">{error}</div> : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-stone-400">Email Address</label>
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-[#E6ECE8] bg-[#F4F7F5]/80 p-3 outline-none focus:border-[#0F9F76]" />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-stone-400">Password</label>
            <div className="relative mt-2">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-[#E6ECE8] bg-[#F4F7F5]/80 p-3 pr-11 outline-none focus:border-[#0F9F76]" />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F9F76] p-3.5 font-black uppercase tracking-wider text-white hover:bg-[#0C8562] disabled:opacity-60">
            {loading ? <LoaderCircle className="animate-spin" size={18} /> : null}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 border-t border-stone-100 pt-5">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-stone-400">Checkpoint 2 demo accounts</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {demoAccounts.map((account) => (
              <button key={account.email} type="button" disabled={loading} onClick={() => login(account.email, "password")} className="rounded-lg border border-emerald-100 bg-emerald-50 px-2 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50">
                {account.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-stone-400">Run the Laravel database seeder before using demo login.</p>
        </div>

        <p className="mt-5 text-center text-sm text-stone-500">
          New to RescueBite? <Link to="/register" className="font-bold text-[#0F9F76] hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}
