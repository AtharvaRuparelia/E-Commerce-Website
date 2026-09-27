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
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-stone-900 border border-amber-600/40 text-stone-100 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white bg-stone-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <h3 className="font-serif font-bold text-amber-200 text-xl">
            {isRegister ? 'Register Account' : 'Sign In to Bhavna Pooja Center'}
          </h3>
          <p className="text-xs text-stone-400">
            Select role & enter valid credentials below
          </p>
        </div>

        {/* Role Selector Tabs (Customer vs Admin) */}
        <div className="bg-stone-950 p-1.5 rounded-2xl border border-stone-800 grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => handleRoleSelect('customer')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeRole === 'customer'
                ? 'bg-amber-600 text-stone-950 shadow-md font-black'
                : 'text-stone-400 hover:text-stone-200'
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
                ? 'bg-amber-600 text-stone-950 shadow-md font-black'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Factory className="w-4 h-4" />
            <span>Admin Login</span>
          </button>
        </div>

        {error && (
          <div className="bg-rose-950/90 border border-rose-800 text-rose-200 p-3 rounded-xl text-xs text-center font-medium shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div className="space-y-1">
              <label className="font-semibold text-stone-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Atharva Ruparelia"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-200 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="font-semibold text-stone-300">
              {activeRole === 'admin' ? 'Admin Email Address' : 'Customer Email Address'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={activeRole === 'admin' ? 'admin@bhavnapooja.com' : 'customer@bhavnapooja.com'}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-black rounded-xl shadow-lg transition-all active:scale-95 text-xs"
          >
            {loading ? 'Validating Credentials...' : isRegister ? `Register as ${activeRole.toUpperCase()}` : `Sign In as ${activeRole.toUpperCase()}`}
          </button>
        </form>

        {/* Registered Credentials Helper Box */}
        <div className="bg-stone-950/90 p-3 rounded-2xl border border-stone-800 text-[11px] space-y-1">
          <div className="flex justify-between items-center text-stone-400">
            <span className="font-semibold text-amber-300">Active {activeRole.toUpperCase()} Credentials:</span>
            <span className="font-mono text-stone-500">Preset Ready</span>
          </div>
          <p className="font-mono text-stone-300">
            Email: <strong className="text-amber-200">{email}</strong>
          </p>
          <p className="font-mono text-stone-300">
            Pass: <strong className="text-amber-200">{password}</strong>
          </p>
        </div>

        <div className="text-center pt-1">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-xs text-amber-400 hover:underline font-medium"
          >
            {isRegister ? 'Already registered? Sign In' : 'Need a new account? Register here'}
          </button>
        </div>
      </div>
    </div>
  );
};
