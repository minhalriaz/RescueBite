import { useState } from 'react';
import { Link } from 'react-router-dom';

const ROLES = [
  { id: 'donor', label: 'Donor', icon: '🎁' },
  { id: 'ngo', label: 'NGO', icon: '🤝' },
  { id: 'volunteer', label: 'Volunteer', icon: '🚴' }
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,15}$/.test(form.phone)) newErrors.phone = 'Invalid phone number';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!form.role) newErrors.role = 'Please select a role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Registration successful! (placeholder)');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#E6ECE8] shadow-[0_15px_45px_-12px_rgba(15,159,118,0.02)]">
          <div className="text-center mb-8">
            <span className="text-4xl">🚀</span>
            <h1 className="text-3xl font-extrabold text-[#0D4436] tracking-tight mt-3">Create Account</h1>
            <p className="text-stone-400 font-medium text-sm mt-2">Join the rescue movement today</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange('name')}
                className={`w-full mt-2 p-3.5 rounded-[1.15rem] border bg-[#F4F7F5]/80 text-sm font-medium focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 ${errors.name ? 'border-rose-400' : 'border-[#E6ECE8]'}`}
              />
              {errors.name && <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  className={`w-full mt-2 p-3.5 rounded-[1.15rem] border bg-[#F4F7F5]/80 text-sm font-medium focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 ${errors.email ? 'border-rose-400' : 'border-[#E6ECE8]'}`}
                />
                {errors.email && <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className={`w-full mt-2 p-3.5 rounded-[1.15rem] border bg-[#F4F7F5]/80 text-sm font-medium focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 ${errors.phone ? 'border-rose-400' : 'border-[#E6ECE8]'}`}
                />
                {errors.phone && <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">I am a...</label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, role: role.id }))}
                    className={`p-4 rounded-[1.25rem] border-2 text-center transition-all duration-200 ${
                      form.role === role.id
                        ? 'border-[#0F9F76] bg-[#E6F5F0] shadow-md'
                        : 'border-[#E6ECE8] bg-white hover:border-[#CBECE2]'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{role.icon}</span>
                    <span className={`text-xs font-black uppercase tracking-wider ${form.role === role.id ? 'text-[#0F9F76]' : 'text-stone-500'}`}>
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>
              {errors.role && <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">{errors.role}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Password</label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={handleChange('password')}
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

              <div>
                <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  className={`w-full mt-2 p-3.5 rounded-[1.15rem] border bg-[#F4F7F5]/80 text-sm font-medium focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 ${errors.confirmPassword ? 'border-rose-400' : 'border-[#E6ECE8]'}`}
                />
                {errors.confirmPassword && <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F9F76] hover:bg-[#0C8562] text-white font-black uppercase tracking-wider p-4 rounded-[1.15rem] mt-4 transition-all duration-300 shadow-md active:scale-95"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-stone-500 font-medium mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0F9F76] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
