import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import {
  ArrowLeft, Camera, User, Mail, Lock, Bell, Moon, Sun,
  LogOut, ChevronRight, Shield, Loader2
} from 'lucide-react';

export default function ProfileSettings({ onBack }) {
  const { user, updateProfile, logout, loading } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email] = useState(user?.email || '');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = async () => {
    await updateProfile({ displayName });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-navy-900/30 animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5 bg-navy-800/50 backdrop-blur-sm">
        <button
          id="btn-profile-back"
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-surface-light transition-colors text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-white">Profile & Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Avatar section */}
        <div className="flex flex-col items-center py-8 px-6">
          <div className="relative group">
            <Avatar name={user?.displayName} size="xl" showStatus status="online" />
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-electric text-white 
                               shadow-lg shadow-electric/30 hover:bg-electric-600 transition-all
                               opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-90">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-xl font-bold text-white mt-4">{user?.displayName}</h3>
          <p className="text-sm text-gray-400">{user?.email}</p>
          {saveSuccess && (
            <div className="mt-2 text-sm text-emerald-400 animate-fade-in flex items-center gap-1">
              ✓ Profile updated successfully
            </div>
          )}
        </div>

        <div className="px-4 space-y-3">
          {/* Profile Info Section */}
          <div className="glass-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Profile Information</h4>
              <button
                onClick={() => {
                  if (isEditing) handleSaveProfile();
                  else setIsEditing(true);
                }}
                className="text-sm text-electric hover:text-electric-300 font-medium transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/50">
                <User className="w-5 h-5 text-gray-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-0.5">Display Name</p>
                  {isEditing ? (
                    <input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="bg-transparent text-sm text-white w-full outline-none border-b border-electric/30 pb-0.5"
                    />
                  ) : (
                    <p className="text-sm text-white">{user?.displayName}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/50">
                <Mail className="w-5 h-5 text-gray-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <p className="text-sm text-white">{email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="glass-card p-4 space-y-3">
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Security</h4>

            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-navy-800/50 
                         hover:bg-navy-800 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-white">Change Password</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${showPasswordForm ? 'rotate-90' : ''}`} />
            </button>

            {showPasswordForm && (
              <div className="space-y-3 animate-slide-up pl-3">
                <input type="password" placeholder="Current password" className="input-field text-sm" />
                <input type="password" placeholder="New password" className="input-field text-sm" />
                <input type="password" placeholder="Confirm new password" className="input-field text-sm" />
                <button className="btn-primary text-sm py-2 px-4">Update Password</button>
              </div>
            )}

            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-800/50">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-white">Two-Factor Auth</span>
              </div>
              <span className="text-xs text-gray-500 bg-navy-800 px-2 py-1 rounded-md">Coming soon</span>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="glass-card p-4 space-y-3">
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Preferences</h4>

            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-800/50">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-white">Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-11 h-6 rounded-full transition-all relative ${
                  notifications ? 'bg-electric shadow-lg shadow-electric/30' : 'bg-navy-800 border border-white/10'
                }`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  notifications ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-800/50">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-gray-500" /> : <Sun className="w-5 h-5 text-gray-500" />}
                <span className="text-sm text-white">Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-11 h-6 rounded-full transition-all relative ${
                  darkMode ? 'bg-electric shadow-lg shadow-electric/30' : 'bg-navy-800 border border-white/10'
                }`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  darkMode ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          {/* Logout */}
          <button
            id="btn-logout"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 
                       border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all mb-6"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
