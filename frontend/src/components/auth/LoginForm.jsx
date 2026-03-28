import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/validators';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const errors = {};
    if (!validateEmail(email)) errors.email = 'Enter a valid email address';
    if (!password) errors.password = 'Password is required';
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 animate-fade-in">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Email</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: null })); }}
            placeholder="you@example.com"
            className={`input-field pl-12 ${fieldErrors.email ? 'border-red-500/50 focus:border-red-500' : ''}`}
            disabled={loading}
          />
        </div>
        {fieldErrors.email && <p className="text-xs text-red-400 mt-1">{fieldErrors.email}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: null })); }}
            placeholder="Enter your password"
            className={`input-field pl-12 pr-12 ${fieldErrors.password ? 'border-red-500/50 focus:border-red-500' : ''}`}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {fieldErrors.password && <p className="text-xs text-red-400 mt-1">{fieldErrors.password}</p>}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded bg-navy-800 border-white/10 text-electric 
                                            focus:ring-electric/20 focus:ring-offset-0" />
          <span className="text-sm text-gray-400">Remember me</span>
        </label>
        <button type="button" className="text-sm text-electric hover:text-electric-300 transition-colors">
          Forgot password?
        </button>
      </div>

      <button
        id="login-submit"
        type="submit"
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Demo mode: Enter any email and password to log in
        </p>
      </div>
    </form>
  );
}
