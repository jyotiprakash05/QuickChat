import AuthTabs from '../components/auth/AuthTabs';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { MessageSquare } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-navy-700 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-electric/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/3 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-bounce-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br 
                          from-electric to-blue-600 shadow-2xl shadow-electric/30 mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">QuickChat</h1>
          <p className="text-gray-400 text-sm">Connect instantly. Chat effortlessly.</p>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-6 sm:p-8">
          <AuthTabs>
            <LoginForm />
            <SignupForm />
          </AuthTabs>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          © 2024 QuickChat. Built with ❤️ and AWS.
        </p>
      </div>
    </div>
  );
}
