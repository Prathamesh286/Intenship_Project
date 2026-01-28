// src/components/ReviewForm.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function ReviewForm({ onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/reviews', {
        name: name.trim(),
        stars,
        text: text.trim(),
      });

      // Reset form
      setName('');
      setStars(5);
      setText('');
      onSuccess();
    } catch (error) {
      alert('Failed to submit review. Check console.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-10 w-full max-w-xl border border-orange-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-4xl text-gray-400 hover:text-red-500 transition"
        >
          ×
        </button>

        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Share Your Experience
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-6 py-4 bg-black/50 border-2 border-orange-600 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition"
          />

          {/* Star Rating */}
          <div className="text-center">
            <p className="text-gray-300 mb-3">Rate us:</p>
            <div className="flex justify-center gap-3 text-4xl">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setStars(num)}
                  className="transition transform hover:scale-125"
                >
                  {num <= stars ? (
                    <FaStar className="text-yellow-400" />
                  ) : (
                    <FaRegStar className="text-gray-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <textarea
            placeholder="Tell us about your experience at FitTrack..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={6}
            className="w-full px-6 py-4 bg-black/50 border-2 border-orange-600 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 resize-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold text-xl py-5 rounded-xl transition transform hover:scale-105 disabled:opacity-70 shadow-xl"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}