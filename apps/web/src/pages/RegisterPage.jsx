import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { dashboardForRole, setSession } from '../lib/auth';
import { Gift, Handshake, Bike, Eye, EyeOff } from "lucide-react";

const ROLES = [
  { id: 'donor', label: 'Donor', icon: Gift },
  { id: 'ngo', label: 'NGO', icon: Handshake },
  { id: 'volunteer', label: 'Volunteer', icon: Bike }
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    preferredFoodType: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
    if (form.role === 'ngo' && !form.preferredFoodType) newErrors.preferredFoodType = 'Please select a preferred food recipient type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const payload = await api.register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
        role: form.role,
        beneficiary_preference: form.role === 'ngo' ? form.preferredFoodType : null,
      });

      setSession(payload.token, payload.user);
      navigate(dashboardForRole(payload.user.role));
    } catch (requestError) {
      setSubmitError(requestError.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative overflow-y-auto">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80"
          alt="Food rescue background"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 bg-[#0F9F76]/70 dark:bg-black/60 backdrop-blur-sm -z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/30 -z-10" />

      <div className="w-full max-w-lg h-fit my-auto">
        <div className="bg-white dark:bg-[color:var(--color-rescue-surface)] p-5 md:p-6 rounded-[1.5rem] border border-[#E6ECE8] dark:border-[color:var(--color-rescue-border)] shadow-[0_15px_45px_-12px_rgba(15,159,118,0.02)] flex flex-col w-full">
          <div className="text-center mb-3">
            <h1 className="text-2xl font-extrabold text-[#0D4436] dark:text-[color:var(--color-rescue-text)] tracking-tight">Create Account</h1>
            <p className="text-stone-400 dark:text-[color:var(--color-rescue-text-muted)] font-medium text-xs mt-0.5">Join the rescue movement today</p>
          </div>

          {submitError && (
            <div className="mb-3 rounded-xl bg-rose-50 dark:bg-rose-900/25 px-3 py-2 text-xs font-bold text-rose-700 dark:text-rose-300">
              {submitError}
            </div>
          )}

          <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] font-black text-stone-400 dark:text-[color:var(--color-rescue-text-muted)] uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange('name')}
                className={`w-full mt-1 p-2.5 rounded-[1rem] border bg-[#F4F7F5]/80 dark:bg-[color:var(--color-rescue-bg)] text-sm font-medium text-stone-800 dark:text-[color:var(--color-rescue-text)] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 ${errors.name ? 'border-rose-400' : 'border-[#E6ECE8] dark:border-[color:var(--color-rescue-border)]'}`}
              />
              {errors.name && <p className="text-rose-500 text-[11px] font-bold mt-0.5 ml-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-black text-stone-400 dark:text-[color:var(--color-rescue-text-muted)] uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  className={`w-full mt-1 p-2.5 rounded-[1rem] border bg-[#F4F7F5]/80 dark:bg-[color:var(--color-rescue-bg)] text-sm font-medium text-stone-800 dark:text-[color:var(--color-rescue-text)] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 ${errors.email ? 'border-rose-400' : 'border-[#E6ECE8] dark:border-[color:var(--color-rescue-border)]'}`}
                />
                {errors.email && <p className="text-rose-500 text-[11px] font-bold mt-0.5 ml-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-black text-stone-400 dark:text-[color:var(--color-rescue-text-muted)] uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className={`w-full mt-1 p-2.5 rounded-[1rem] border bg-[#F4F7F5]/80 dark:bg-[color:var(--color-rescue-bg)] text-sm font-medium text-stone-800 dark:text-[color:var(--color-rescue-text)] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 ${errors.phone ? 'border-rose-400' : 'border-[#E6ECE8] dark:border-[color:var(--color-rescue-border)]'}`}
                />
                {errors.phone && <p className="text-rose-500 text-[11px] font-bold mt-0.5 ml-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-stone-400 dark:text-[color:var(--color-rescue-text-muted)] uppercase tracking-wider">I am a...</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {ROLES.map((role) => {
                  const RoleIcon = role.icon;
                  const selected = form.role === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, role: role.id, preferredFoodType: '' }));
                        setErrors((prev) => { const next = { ...prev }; delete next.preferredFoodType; return next; });
                      }}
                      className={`p-2.5 rounded-[1rem] border-2 text-center transition-all duration-200 ${
                        selected
                          ? 'border-[#0F9F76] bg-[#E6F5F0] dark:bg-[#0F9F76]/20 shadow-md text-[#0F9F76]'
                          : 'border-[#E6ECE8] dark:border-[color:var(--color-rescue-border)] bg-white dark:bg-[color:var(--color-rescue-surface)] hover:border-[#CBECE2] dark:hover:border-[#0F9F76]'
                      }`}
                    >
                      <div className="flex justify-center mb-0.5">
                        <RoleIcon size={18} className="text-[#0F9F76]" />
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-wider ${selected ? 'text-[#0F9F76]' : 'text-stone-500 dark:text-[color:var(--color-rescue-text-muted)]'}`}>
                        {role.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.role && <p className="text-rose-500 text-[11px] font-bold mt-0.5 ml-1">{errors.role}</p>}
            </div>

            {form.role === 'ngo' && (
              <div>
                <label className="block text-[11px] font-black text-stone-400 dark:text-[color:var(--color-rescue-text-muted)] uppercase tracking-wider">Preferred Food Recipient Type</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {['human', 'animal', 'both'].map((type) => {
                    const selected = form.preferredFoodType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, preferredFoodType: type }))}
                        className={`p-2.5 rounded-[1rem] border-2 text-center transition-all duration-200 ${
                          selected
                            ? 'border-[#0F9F76] bg-[#E6F5F0] dark:bg-[#0F9F76]/20 shadow-md'
                            : 'border-[#E6ECE8] dark:border-[color:var(--color-rescue-border)] bg-white dark:bg-[color:var(--color-rescue-surface)] hover:border-[#CBECE2] dark:hover:border-[#0F9F76]'
                        }`}
                      >
                        <span className={`text-[10px] font-black uppercase tracking-wider ${selected ? 'text-[#0F9F76]' : 'text-stone-500 dark:text-[color:var(--color-rescue-text-muted)]'}`}>
                          {type === 'human' ? 'Human' : type === 'animal' ? 'Animal' : 'Both Human & Animal'}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.preferredFoodType && <p className="text-rose-500 text-[11px] font-bold mt-0.5 ml-1">{errors.preferredFoodType}</p>}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-black text-stone-400 dark:text-[color:var(--color-rescue-text-muted)] uppercase tracking-wider">Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={handleChange('password')}
                    className={`w-full p-2.5 pr-10 rounded-[1rem] border bg-[#F4F7F5]/80 dark:bg-[color:var(--color-rescue-bg)] text-sm font-medium text-stone-800 dark:text-[color:var(--color-rescue-text)] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 ${errors.password ? 'border-rose-400' : 'border-[#E6ECE8] dark:border-[color:var(--color-rescue-border)]'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base p-1 hover:scale-110 transition-transform text-stone-500 dark:text-[color:var(--color-rescue-text-muted)]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-rose-500 text-[11px] font-bold mt-0.5 ml-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-black text-stone-400 dark:text-[color:var(--color-rescue-text-muted)] uppercase tracking-wider">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  className={`w-full mt-1 p-2.5 rounded-[1rem] border bg-[#F4F7F5]/80 dark:bg-[color:var(--color-rescue-bg)] text-sm font-medium text-stone-800 dark:text-[color:var(--color-rescue-text)] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 ${errors.confirmPassword ? 'border-rose-400' : 'border-[#E6ECE8] dark:border-[color:var(--color-rescue-border)]'}`}
                />
                {errors.confirmPassword && <p className="text-rose-500 text-[11px] font-bold mt-0.5 ml-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0F9F76] hover:bg-[#0C8562] text-white font-black uppercase tracking-wider p-3 rounded-[1rem] mt-1 transition-all duration-300 shadow-md active:scale-95 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-3">
            <p className="text-center text-xs text-stone-500 dark:text-[color:var(--color-rescue-text-muted)] font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-[#0F9F76] font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
