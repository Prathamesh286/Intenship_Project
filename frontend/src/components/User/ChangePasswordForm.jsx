// src/components/ChangePasswordForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ChangePasswordForm = () => {
  const { token } = useAuth(); // Get JWT token from auth context

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = 'Old password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrors({});

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await axios.post(
        'http://localhost:5000/api/auth/change-password',
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage('Password changed successfully!');
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to change password. Please try again.';
      setErrors({ server: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Server Error */}
        {errors.server && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.server}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        {/* Old Password */}
        <div>
          <label className="block text-white font-semibold mb-2">Old Password</label>
          <div className="relative">
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-black text-white rounded-lg py-4 px-5 pr-12 focus:outline-none focus:border-red-600 text-lg placeholder-gray-500"
              placeholder="Enter old password"
              required
            />
          </div>
          {errors.oldPassword && (
            <p className="text-red-400 text-sm mt-1">{errors.oldPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-white font-semibold mb-2">New Password</label>
          <div className="relative">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-black text-white rounded-lg py-4 px-5 pr-12 focus:outline-none focus:border-red-600 text-lg placeholder-gray-500"
              placeholder="Enter new password"
              required
            />
          </div>
          {errors.newPassword && (
            <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-white font-semibold mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-black text-white rounded-lg py-4 px-5 pr-12 focus:outline-none focus:border-red-600 text-lg placeholder-gray-500"
              placeholder="Confirm new password"
              required
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center mt-12">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold text-xl py-4 px-20 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            {isLoading ? 'Updating...' : 'UPDATE'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;