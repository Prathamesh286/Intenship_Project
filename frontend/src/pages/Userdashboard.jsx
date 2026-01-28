// src/pages/Userdashboard.jsx
import React, { useEffect, useState } from 'react';
import UserNavbar from '../components/User/UserNavbar';
import { useAuth } from '../hooks/useAuth';
import { FaUserCircle, FaWhatsapp } from 'react-icons/fa';
import Footer from '../components/Footer';
import PersonalInfoForm from '../components/User/PresonalInfo'
import ChangePasswordForm from '../components/User/ChangePasswordForm';

function UserDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (user !== undefined) setLoading(false);
  }, [user]);

  if (loading) return <div className="bg-black min-h-screen text-white flex items-center justify-center"><p>Loading...</p></div>;
  if (!user) return <div className="bg-black min-h-screen text-white flex items-center justify-center"><p>Please log in</p></div>;

  return (
    <div className="bg-black min-h-screen text-white">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Welcome back, {user.name}!
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8 border border-red-900">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <FaUserCircle className="text-9xl text-gray-600" />
                  <div className="absolute bottom-3 right-3 w-10 h-10 bg-green-500 rounded-full border-4 border-black"></div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                  <p className="text-green-400 mt-2">Active Member</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-900 to-orange-900 rounded-xl p-6 text-center">
              <h4 className="text-xl font-bold mb-6 text-white">Quick Actions</h4>
              <div className="space-y-4">
                <button
                  onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                  className="flex items-center justify-between bg-white text-black py-4 px-6 rounded-lg font-bold hover:bg-gray-200 w-full"
                >
                  <span>Personal Information</span>
                  <span className="text-red-500 text-2xl">&gt;</span>
                </button>

                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="flex items-center justify-between bg-white text-black py-4 px-6 rounded-lg font-bold hover:bg-gray-200 w-full"
                >
                  <span>Change Password</span>
                  <span className="text-red-500 text-2xl">&gt;</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-red-800">
              <h3 className="text-3xl font-bold mb-6">Your Progress</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-black p-6 rounded-xl"><p className="text-4xl font-bold text-red-500">24</p><p className="text-gray-400">This Month</p></div>
                <div className="bg-black p-6 rounded-xl"><p className="text-4xl font-bold text-orange-500">89%</p><p className="text-gray-400">Attendance</p></div>
                <div className="bg-black p-6 rounded-xl"><p className="text-4xl font-bold text-green-500">+12kg</p><p className="text-gray-400">Strength</p></div>
                <div className="bg-black p-6 rounded-xl"><p className="text-4xl font-bold text-blue-500">4.9</p><p className="text-gray-400">Rating</p></div>
              </div>
            </div>

            {showPersonalInfo && (
              <div className="bg-gray-900 rounded-2xl p-8 border border-red-800">
                <h3 className="text-3xl font-bold mb-6">Personal Information</h3>
                <PersonalInfoForm />
              </div>
            )}

            {showChangePassword && (
              <div className="bg-gray-900 rounded-2xl p-8 border border-red-800">
                <h3 className="text-3xl font-bold mb-6">Change Password</h3>
                <ChangePasswordForm />
              </div>
            )}
          </div>
        </div>
      </div>

      <a href="https://wa.me/94743357593" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 p-5 rounded-full shadow-2xl z-50">
        <FaWhatsapp className="text-5xl text-white" />
      </a>

      <Footer />
    </div>
  );
}

export default UserDashboard;