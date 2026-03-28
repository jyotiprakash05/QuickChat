import { useState } from 'react';

export default function AuthTabs({ children }) {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div>
      <div className="flex mb-6 bg-navy-800 rounded-xl p-1">
        <button
          id="tab-login"
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200
            ${activeTab === 'login'
              ? 'bg-electric text-white shadow-lg shadow-electric/25'
              : 'text-gray-400 hover:text-white'
            }`}
        >
          Sign In
        </button>
        <button
          id="tab-signup"
          onClick={() => setActiveTab('signup')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200
            ${activeTab === 'signup'
              ? 'bg-electric text-white shadow-lg shadow-electric/25'
              : 'text-gray-400 hover:text-white'
            }`}
        >
          Create Account
        </button>
      </div>
      <div className="animate-fade-in">
        {children[activeTab === 'login' ? 0 : 1]}
      </div>
    </div>
  );
}
