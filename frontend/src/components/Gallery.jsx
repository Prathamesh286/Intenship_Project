import React from 'react';

function Gallery() {
  const images = [
    { src: 'gallery1.png', alt: 'Person doing bicep curls' },
    { src: 'gallery2.png', alt: 'Person doing deadlifts' },
    { src: 'gallery3.png', alt: 'Person on elliptical machine' },
    { src: 'gallery4.png', alt: 'Person doing squats' },
    { src: 'gallery5.png', alt: 'Person doing bench press' },
    { src: 'gallery6.png', alt: 'Person doing yoga' },
    { src: 'g3.jpg', alt: 'Fitness activity' }, // Placeholder alt text
    { src: 'g4.jpg', alt: 'Fitness activity' }, // Placeholder alt text
    { src: 'g5.jpg', alt: 'Fitness activity' }, // Placeholder alt text
    { src: 'g6.jpg', alt: 'Fitness activity' }, // Placeholder alt text
    { src: 'g7.jpg', alt: 'Fitness activity' }, // Placeholder alt text
    { src: 'g8.jpg', alt: 'Fitness activity' }, // Placeholder alt text
    {src: 'img1.webp', alt: 'Fitness activity' }, // Placeholder alt text
    {src: 'img2.jpg', alt: 'Fitness activity' }, // Placeholder alt text
    {src: 'img3.jpg', alt: 'Fitness activity' }, // Placeholder alt text
    {src: 'img4.jpg', alt: 'Fitness activity' }, // Placeholder alt text
    {src: 'img8.jpg', alt: 'Fitness activity' }, // Placeholder alt text
    {src: 'img6.jpg', alt: 'Fitness activity' }, // Placeholder alt text
  ];

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {images.map((image, index) => (
          <div key={index} className="bg-gray-800 shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl ">
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-64 transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;