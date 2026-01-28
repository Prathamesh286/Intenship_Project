// src/components/SeeAllReviewsButton.jsx
import React, { useState } from 'react';
import ReviewsModal from './ReviewsModal';

export default function SeeAllReviewsButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="text-center py-16">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold text-2xl py-4 px-12  shadow-2xl transition transform hover:scale-110 active:scale-95"
        >
          Show All Reviews
        </button>
      </div>

      <ReviewsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}