import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/authService';
import { UserRole, UserProfile } from '../types';
import { ShieldCheck, User, X, Lock, KeyRound, Info, Factory, CheckCircle2 } from 'lucide-react';

interface BiteJoyAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: UserProfile) => void;
}

export const BiteJoyAuthModal: React.FC<BiteJoyAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('customer@bhavnapooja.com');
  const [password, setPassword] = useState('Customer@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleRoleSelect = (selectedRole: UserRole) => {
    setActiveRole(selectedRole);
    setError('');
    if (!isRegister) {
      if (selectedRole === 'admin') {
        setEmail('admin@bhavnapooja.com');
        setPassword('Admin@123');
      } else {
        setEmail('customer@bhavnapooja.com');
        setPassword('Customer@123');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      let loggedProfile: UserProfile;
      if (isRegister) {
        loggedProfile = await registerUser(name, email, password, activeRole);
      } else {
        loggedProfile = await loginUser(email, password);
      }
      onSuccess(loggedProfile);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-amber-300 text-stone-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
          title="Close Login Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-1">
            <Lock className="w-3 h-3 text-amber-700" />
            <span>Secure Portal Access</span>
          </div>
          <h3 className="font-serif font-bold text-amber-900 text-2xl">
            {isRegister ? 'Create an Account' : 'Sign In to Bhavna Pooja Center'}
          </h3>
          <p className="text-xs text-stone-600">
            Select role & enter your credentials below
          </p>
        </div>

        {/* Role Selector Tabs (Customer vs Admin) */}
        <div className="bg-stone-100 p-1.5 rounded-2xl border border-stone-200 grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => handleRoleSelect('customer')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeRole === 'customer'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md font-black'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Customer Login</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeRole === 'admin'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md font-black'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
            }`}
          >
            <Factory className="w-4 h-4" />
            <span>Admin Login</span>
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-300 text-rose-700 p-3 rounded-xl text-xs text-center font-medium shadow-sm">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Atharva Ruparelia"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 block">
              {activeRole === 'admin' ? 'Admin Email Address' : 'Customer Email Address'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={activeRole === 'admin' ? 'admin@bhavnapooja.com' : 'customer@bhavnapooja.com'}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-1 focus:ring-amber-500 font-mono"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-1 focus:ring-amber-500 font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black rounded-xl shadow-lg transition-all active:scale-95 text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>
              {loading
                ? 'Validating Credentials...'
                : isRegister
                ? `Register as ${activeRole.toUpperCase()}`
                : `Sign In as ${activeRole.toUpperCase()}`}
            </span>
          </button>
        </form>

        {/* Registered Credentials Helper Box */}
        <div className="bg-amber-50/90 p-3.5 rounded-2xl border border-amber-200 text-[11px] space-y-1.5 shadow-sm">
          <div className="flex justify-between items-center text-stone-600">
            <span className="font-bold text-amber-900 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Active {activeRole.toUpperCase()} Credentials:</span>
            </span>
            <span className="font-mono text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              Preset Ready
            </span>
          </div>
          <p className="font-mono text-stone-700">
            Email: <strong className="text-amber-900">{email}</strong>
          </p>
          <p className="font-mono text-stone-700">
            Password: <strong className="text-amber-900">{password}</strong>
          </p>
        </div>

        {/* Switch Between Register & Sign In */}
        <div className="text-center pt-1 border-t border-stone-200">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-xs text-amber-700 hover:text-amber-900 hover:underline font-bold"
          >
            {isRegister
              ? 'Already registered? Sign In'
              : 'Need a new account? Register here'}
          </button>
        </div>
      </div>
    </div>
  );
};
