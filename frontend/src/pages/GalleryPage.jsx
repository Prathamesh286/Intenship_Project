import React from 'react';
import Gallery from '../components/Gallery';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function GalleryPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <Gallery />
      </section>
      <Footer />
    </div>
  );
}

export default GalleryPage;