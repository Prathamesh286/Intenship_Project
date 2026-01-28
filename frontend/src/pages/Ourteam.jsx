// src/pages/Ourteam.jsx or src/components/Ourteam.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaDumbbell, FaAppleAlt, FaClipboardList, FaHeart, FaEnvelope, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Ourteam() {
  const navigate = useNavigate();

  const features = [
    { icon: FaDumbbell, title: "Modern Equipment", desc: "Our gym is equipped with state-of-the-art fitness machines and tools, designed to optimize your workouts.", color: "red" },
    { icon: FaAppleAlt, title: "Healthy Nutrition Plan", desc: "Expert-guided nutrition plans tailored to fuel your body and support your fitness journey with balanced meals.", color: "red" },
    { icon: FaClipboardList, title: "Professional Training Plan", desc: "Certified trainers create personalized workout plans to maximize your strength, endurance, and progress.", color: "red" },
    { icon: FaHeart, title: "Unique to Your Needs", desc: "Customized fitness solutions that adapt to your lifestyle, preferences, and goals for a personal experience.", color: "red" }
  ];

  const trainers = [
    { name: "Ayesh Ranasinghe", specialty: "National Diploma in Sports Strength & Conditioning (SLF)", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&h=800&fit=crop" },
    { name: "Thumesh Almeda", specialty: "Physical Fitness Trainer (NVQ Level 4)", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop" },
    { name: "Dulshan Miyuranga", specialty: "Physical Fitness Trainer (NVQ Level 4 - South Asian Academy)", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop" }
  ];

  return (
    <div className="bg-gray-100">
      <Navbar />

      {/* Video Background Section */}
      <section className="min-h-screen relative flex items-center justify-center px-4 pt-20 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </section>

      {/* Hero Section */}
      <section className="relative h-96 md:h-screen bg-cover bg-center flex items-center justify-center text-center px-6"
        style={{ backgroundImage: 'url("https://www.shutterstock.com/image-photo/indoor-photo-want-empty-gym-600nw-2606932589.jpg")' }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mt-20 text mb-6 text-white">MEET THE ELITE TEAM</h1>
          <p className="text-xl md:text-2xl text-gray-300">
            World-class experts dedicated to your transformation. We push limits, break barriers, and build strength together.
          </p>
        <div className="mb-20 bg-gray-800/50 rounded-3xl p-10 md:p-16 shadow-2xl">
          <h2 className="text-3xl font-bold text-left mb-12 text-white">Head Coach</h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <img src="https://www.shutterstock.com/image-photo/closeup-portrait-professional-bodybuilder-workout-600nw-368281814.jpg" alt="Alex Johnson" className="w-64 h-64 rounded-2xl object-cover border-4 border-red-600" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-4xl font-bold mb-2 text-white">Alex "The Rock" Johnson </h3>
              <p className="text-2xl text-red-500 mb-4">Head of Performance • Powerlifting</p>
              <p className="text-lg text-gray-300 mb-8">
                "Strength is a mindset." With over 15 years of competitive experience, Alex leads our elite programming division. Specialized in maximizing raw power and injury prevention.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-8 py-4 bg-red-600 rounded-full hover:bg-red-700 transition font-bold text-lg text-white">Book Session</button>
                {/* <button className="px-8 py-4 border-2 border-gray-600 rounded-full hover:bg-gray-700 transition font-bold text-lg">View Profile</button>
              </div> */}
              </div>
            </div>
          </div>




        </div>

        </div>
      </section>

      {/* Head Coach Section (kept as in previous examples)
      <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto px-6 py-20 ">
        <div className="mb-20 bg-gray-800/50 rounded-3xl p-10 md:p-16 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Head Coach</h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <img src="https://www.shutterstock.com/image-photo/closeup-portrait-professional-bodybuilder-workout-600nw-368281814.jpg" alt="Alex Johnson" className="w-64 h-64 rounded-2xl object-cover border-4 border-red-600" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-4xl font-bold mb-2 text-white">Alex "The Rock" Johnson 🔥</h3>
              <p className="text-2xl text-red-500 mb-4">Head of Performance • Powerlifting</p>
              <p className="text-lg text-gray-300 mb-8">
                "Strength is a mindset." With over 15 years of competitive experience, Alex leads our elite programming division. Specialized in maximizing raw power and injury prevention.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-8 py-4 bg-red-600 rounded-full hover:bg-red-700 transition font-bold text-lg">Book Session</button>
                <button className="px-8 py-4 border-2 border-gray-600 rounded-full hover:bg-gray-700 transition font-bold text-lg">View Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section> */}

      {/* Why Choose Us Section */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-500 uppercase mb-2">Why Choose Us?</h2>
          <h1 className="text-5xl font-bold mb-12">Push Your Limits Forward</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-gray-900 group-hover:bg-red-500 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl">
                  <item.icon className="text-3xl text-red-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-red-500 uppercase mb-4">Our Team</h2>
          <h1 className="text-5xl font-bold mb-16">Train With Experts</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {trainers.map((trainer, index) => (
              <div key={index} className="relative bg-transparent rounded-3xl overflow-hidden shadow-2xl border border-gray-800 hover:border-red-600 transition-all duration-500 group">
                <div className="relative h-96 overflow-hidden">
                  <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-8 left-1/2 -translate-x-1/2">
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-2xl">
                      Lifetime Fitness
                    </h2>
                  </div>
                </div>
                <div className="p-6 sm:p-8 text-center">
                  <h3 className="text-2xl font-bold mb-3">{trainer.name}</h3>
                  <p className="text-gray-400 font-medium mb-6">{trainer.specialty}</p>
                  <div className="flex justify-center gap-6">
                    <a href="#" className="text-gray-400 hover:text-white transition"><FaEnvelope className="w-6 h-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebookF className="w-6 h-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram className="w-6 h-6" /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/membership')} className="mt-16 bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl transform hover:scale-105 transition duration-300">
            Book Appointment
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Ourteam;