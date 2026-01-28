// src/components/ReviewsModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaTimes } from 'react-icons/fa';

export default function ReviewsModal({ isOpen, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchReviews = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/reviews');
          setReviews(res.data);
          setLoading(false);
        } catch (err) {
          console.error('Failed to load reviews:', err);
          setLoading(false);
        }
      };
      fetchReviews();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-orange-600">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 flex justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            All Customer Reviews ({reviews.length})
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-4xl transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Reviews List */}
        <div className="p-8 overflow-y-auto max-h-[70vh]">
          {loading ? (
            <p className="text-center text-gray-400 text-xl">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-gray-400 text-2xl py-20">
              No reviews yet. Be the first to write one!
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-black border border-orange-700 rounded-2xl p-6 hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:shadow-orange-600/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{review.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.stars ? 'text-yellow-400' : 'text-gray-700'}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-300 italic text-lg leading-relaxed mb-4">
                    "{review.text}"
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Close Button Bottom */}
        <div className="p-6 border-t border-gray-800 text-center">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full text-lg transition transform hover:scale-105"
          >
            Close Reviews
          </button>
        </div>
      </div>
    </div>
  );
}