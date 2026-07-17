import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Login successful! (placeholder)');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#E6ECE8] shadow-[0_15px_45px_-12px_rgba(15,159,118,0.02)]">
          <div className="text-center mb-8">
            <span className="text-4xl">🔐</span>
            <h1 className="text-3xl font-extrabold text-[#0D4436] tracking-tight mt-3">Welcome Back</h1>
            <p className="text-stone-400 font-medium text-sm mt-2">Sign in to continue to RescueBite</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full mt-2 p-3.5 rounded-[1.15rem] border bg-[#F4F7F5]/80 text-sm font-medium focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 ${errors.email ? 'border-rose-400' : 'border-[#E6ECE8]'}`}
              />
              {errors.email && <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Password</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3.5 pr-12 rounded-[1.15rem] border bg-[#F4F7F5]/80 text-sm font-medium focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 ${errors.password ? 'border-rose-400' : 'border-[#E6ECE8]'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg p-1 hover:scale-110 transition-transform"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F9F76] hover:bg-[#0C8562] text-white font-black uppercase tracking-wider p-4 rounded-[1.15rem] mt-4 transition-all duration-300 shadow-md active:scale-95"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-stone-500 font-medium mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#0F9F76] font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
