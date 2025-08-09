'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  // Mock user data and state for form inputs
  const [username, setUsername] = useState('AdminUser');
  const [email, setEmail] = useState('admin@example.com');
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to an API
    console.log('Profile updated:', { username, email });
    // Use a custom modal in production
  };

  const handleDeleteAccount = () => {
    // In a real application, you would send a request to delete the user account
    console.log('Account deleted.');
    // Use a custom modal in production
    // Redirect user to the homepage or login page
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0f18] text-gray-100 font-sans p-4 sm:p-8">
      {/* Background with subtle gradients and patterns */}
      <div className="absolute inset-0 z-0 opacity-80" style={{
        backgroundImage: 'radial-gradient(at 50% 10%, #4f46e5, transparent 80%), radial-gradient(at 80% 90%, #a855f7, transparent 90%)',
        backgroundBlendMode: 'screen'
      }}></div>
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(to right, rgba(147, 197, 253, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(147, 197, 253, 0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }}></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto py-12 px-4">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl p-2 md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-4 sm:mb-0">
            User Settings
          </h1>
          <Link href="/">
            <button className="relative px-8 py-3 rounded-xl font-medium bg-[#1e2330] text-gray-300 border border-[#4a4f61] shadow-lg hover:bg-[#2a3040] transition-all duration-300 transform hover:scale-105">
              Back to Home
            </button>
          </Link>
        </header>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Profile Settings */}
          <section className="p-6 rounded-3xl bg-[#161c2a]/60 backdrop-blur-md border border-[#3b4150] shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">Profile Information</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#1e2330] text-white border border-[#4a4f61] focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#1e2330] text-white border border-[#4a4f61] focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto relative px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Save Changes
              </button>
            </form>
          </section>

          {/* Notifications & Display Settings */}
          <section className="p-6 rounded-3xl bg-[#161c2a]/60 backdrop-blur-md border border-[#3b4150] shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">App Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Enable Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNotificationsEnabled}
                    onChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Dark Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDarkTheme}
                    onChange={() => setIsDarkTheme(!isDarkTheme)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="p-6 rounded-3xl bg-[#161c2a]/60 backdrop-blur-md border border-red-700 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Danger Zone</h2>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-gray-300 max-w-sm">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="relative px-8 py-3 rounded-xl font-semibold bg-red-600 text-white shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-[#161c2a] p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md text-center">
            <h3 className="text-xl font-bold text-red-400 mb-4">Confirm Account Deletion</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete your account? This action is permanent and cannot be reversed.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="relative px-6 py-3 rounded-xl font-medium bg-[#1e2330] text-gray-300 border border-[#4a4f61] shadow-lg hover:bg-[#2a3040] transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteAccount();
                  setShowDeleteModal(false);
                }}
                className="relative px-6 py-3 rounded-xl font-semibold bg-red-600 text-white shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
