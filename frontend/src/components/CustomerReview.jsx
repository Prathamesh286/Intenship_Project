// src/components/CustomerReview.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import SeeAllReviewsButton from './SeeAllReviewsButton';
import { FaStar } from 'react-icons/fa';

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reviews');
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmitted = () => {
    fetchReviews(); // Refresh list after new review
    setIsModalOpen(false);
  };

  return (
    <section className="bg-black py-20 px-4" id="reviews">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Customer Reviews
        </h2>

        {/* Buttons in one line - Flex row, centered */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-16">
          {/* Write a Review Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-12  text-xl transition transform hover:scale-110 shadow-2xl"
          >
            Write a Review
          </button>

          {/* See All Reviews Button */}
          <SeeAllReviewsButton />
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <p className="text-center text-gray-400 text-xl py-20">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-300 text-2xl py-20">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-900 border border-red-800 rounded-2xl p-8 hover:border-orange-600 hover:shadow-2xl hover:shadow-orange-600/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{review.name}</h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.stars ? "text-yellow-400" : "text-gray-600"}
                        size={20}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
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

        {/* Review Form Modal */}
        {isModalOpen && (
          <ReviewForm
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleReviewSubmitted}
          />
        )}
      </div>
    </section>
  );
};

export default CustomerReview;