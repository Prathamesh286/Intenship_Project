import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const PersonalInfoForm = () => {
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    dateOfBirth: '',
    country: 'India',
    height: '',
    weight: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      // Pre-fill with existing user data if available
      const nameParts = user.name?.split(' ') || ['', ''];
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    setError('');

    try {
      await axios.put(
        'http://localhost:5000/api/auth/profile',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setIsSaving(false);
      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setIsSaving(false);
      setError(err.response?.data?.message || 'Failed to update profile');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-white font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-600 bg-black text-white py-3 px-1 focus:outline-none focus:border-red-600 text-lg placeholder-gray-500"
            placeholder="Enter first name"
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-600 bg-black text-white py-3 px-1 focus:outline-none focus:border-red-600 text-lg placeholder-gray-500"
            placeholder="Enter last name"
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border-2 border-gray-600 rounded-lg py-3 px-4 bg-black text-white focus:outline-none focus:border-red-600 text-lg"
          >
            <option value="Male" className="bg-black text-white">Male</option>
            <option value="Female" className="bg-black text-white">Female</option>
            <option value="Other" className="bg-black text-white">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-600 bg-black text-white py-3 px-1 focus:outline-none focus:border-red-600 text-lg"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border-2 border-gray-600 rounded-lg py-3 px-4 bg-black text-white focus:outline-none focus:border-red-600 text-lg"
          >
            <option value="Sri Lanka" className="bg-black text-white">Sri Lanka</option>
            <option value="India" className="bg-black text-white">India</option>
            <option value="United States" className="bg-black text-white">United States</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-2 border-red-600 rounded-lg p-4 text-center bg-black">
            <label className="block text-white font-medium mb-2">Height (CM)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="0"
              className="w-full text-center text-2xl font-semibold outline-none bg-transparent text-white placeholder-gray-500"
              min="100"
              max="250"
            />
          </div>
          <div className="border-2 border-red-600 rounded-lg p-4 text-center bg-black">
            <label className="block text-white font-medium mb-2">Weight (KG)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="0"
              className="w-full text-center text-2xl font-semibold outline-none bg-transparent text-white placeholder-gray-500"
              min="30"
              max="300"
              step="0.1"
            />
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold text-xl py-4 px-16 rounded-lg transition"
          >
            {isSaving ? 'Saving...' : 'SAVE'}
          </button>
        </div>

        {saveMessage && (
          <div className="text-center mt-6 text-green-400 font-semibold text-xl">
            {saveMessage}
          </div>
        )}

        {error && (
          <div className="text-center mt-6 text-red-400 font-semibold text-xl">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalInfoForm;