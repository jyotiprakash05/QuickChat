import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword, validateName } from '../../utils/validators';
import { Loader2, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function SignupForm() {
  const { signup, loading, error, clearError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const errors = {};
    const nameErr = validateName(name);
    if (nameErr) errors.name = nameErr;
    if (!validateEmail(email)) errors.email = 'Enter a valid email address';
    const passErr = validatePassword(password);
    if (passErr) errors.password = passErr;
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    await signup(name, email, password);
  };

  const setField = (setter, field) => (e) => {
    setter(e.target.value);
    setFieldErrors((p) => ({ ...p, [field]: null }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 animate-fade-in">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">Full Name</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={setField(setName, 'name')}
            placeholder="John Doe"
            className={`input-field pl-12 ${fieldErrors.name ? 'border-red-500/50' : ''}`}
            disabled={loading}
          />
        </div>
        {fieldErrors.name && <p className="text-xs text-red-400">{fieldErrors.name}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">Email</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={setField(setEmail, 'email')}
            placeholder="you@example.com"
            className={`input-field pl-12 ${fieldErrors.email ? 'border-red-500/50' : ''}`}
            disabled={loading}
          />
        </div>
        {fieldErrors.email && <p className="text-xs text-red-400">{fieldErrors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={setField(setPassword, 'password')}
            placeholder="Min. 8 characters"
            className={`input-field pl-12 pr-12 ${fieldErrors.password ? 'border-red-500/50' : ''}`}
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
        {fieldErrors.password && <p className="text-xs text-red-400">{fieldErrors.password}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            id="signup-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={setField(setConfirmPassword, 'confirmPassword')}
            placeholder="Repeat your password"
            className={`input-field pl-12 ${fieldErrors.confirmPassword ? 'border-red-500/50' : ''}`}
            disabled={loading}
          />
        </div>
        {fieldErrors.confirmPassword && <p className="text-xs text-red-400">{fieldErrors.confirmPassword}</p>}
      </div>

      <button
        id="signup-submit"
        type="submit"
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
}
