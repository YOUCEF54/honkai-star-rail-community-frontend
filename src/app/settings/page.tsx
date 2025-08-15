'use client';
import React, { useState } from 'react';
import { User, BellRing, Database } from 'lucide-react';

const App = () => {
  // State for form inputs
  const [username, setUsername] = useState('HonkaiStarRailFan');
  const [email, setEmail] = useState('fan@honkaistarrail.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // State for migration button
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState('');

  // Function to handle the migration
  const handleMigration = async () => {
    setIsMigrating(true);
    setMigrationStatus('Migration in progress...');

    try {
      // Call the Next.js API route, which proxies the request to the Spring Boot backend
      const response = await fetch('/api/migrate-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMigrationStatus(data.message || 'Migration successful!');
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Migration failed.');
      }
    } catch (error) {
      console.error("Migration error:", error);
      setMigrationStatus(`Error: ${error.message}`);
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-8 md:p-12 font-sans flex items-start justify-center">
      <div className="bg-zinc-800 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-4xl">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-zinc-50">
          Settings
        </h1>

        {/* Settings sections grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Settings Section */}
          <div className="bg-zinc-700 p-6 rounded-xl shadow-inner">
            <div className="flex items-center space-x-4 mb-6">
              <User size={32} className="text-blue-400" />
              <h2 className="text-2xl font-semibold text-zinc-200">Account</h2>
            </div>
            
            {/* Username Field */}
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-zinc-400 mb-2">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-lg bg-zinc-600 border-2 border-zinc-500 focus:border-blue-500 focus:outline-none transition-colors duration-200 text-zinc-50"
              />
            </div>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-zinc-600 border-2 border-zinc-500 focus:border-blue-500 focus:outline-none transition-colors duration-200 text-zinc-50"
              />
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-zinc-700 p-6 rounded-xl shadow-inner">
            <div className="flex items-center space-x-4 mb-6">
              <BellRing size={32} className="text-green-400" />
              <h2 className="text-2xl font-semibold text-zinc-200">Notifications</h2>
            </div>
            
            {/* Notification Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-lg text-zinc-200">Enable Push Notifications</span>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${notificationsEnabled ? 'bg-green-500' : 'bg-zinc-600'}`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${notificationsEnabled ? 'translate-x-8' : 'translate-x-0'}`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Admin Actions Section */}
        <div className="mt-8">
            <div className="bg-zinc-700 p-6 rounded-xl shadow-inner">
                <div className="flex items-center space-x-4 mb-6">
                    <Database size={32} className="text-purple-400" />
                    <h2 className="text-2xl font-semibold text-zinc-200">Admin Actions</h2>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <button
                        onClick={handleMigration}
                        disabled={isMigrating}
                        className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-800 disabled:bg-purple-800 disabled:cursor-not-allowed"
                    >
                        {isMigrating ? 'Migrating...' : 'Trigger Data Migration'}
                    </button>
                    {migrationStatus && (
                        <p className={`mt-2 text-sm font-medium ${migrationStatus.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                            {migrationStatus}
                        </p>
                    )}
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => console.log('Changes saved!')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              setUsername('HonkaiStarRailFan');
              setEmail('fan@honkaistarrail.com');
              setNotificationsEnabled(true);
            }}
            className="px-6 py-3 bg-zinc-600 text-zinc-200 font-semibold rounded-lg shadow-md hover:bg-zinc-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
