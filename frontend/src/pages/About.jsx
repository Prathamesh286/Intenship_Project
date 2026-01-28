// src/pages/About.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaDumbbell, FaAppleAlt, FaClipboardList, FaHeart } from 'react-icons/fa';

function About() {
  const teamMembers = [
    { id: 1, image: "/img5.jpg", name: "Alex Rivera", role: "Head Trainer" },
    { id: 2, image: "/img6.jpg", name: "Samantha Lee", role: "Nutrition Specialist" },
    { id: 3, image: "/img7.jpg", name: "Marcus Chen", role: "Strength Coach" },
    { id: 4, image: "/img8.jpg", name: "Emma Watson", role: "Yoga Instructor" },
    { id: 5, image: "/img4.jpg", name: "Daniel Brooks", role: "Fitness Director" },
  ];

  return (
    <div className="bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen relative bg-[url('/a3.jpg')] bg-black/80 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 saturate-30">
        <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            ABOUT US
          </h1>
          <h3 className="text-xl lg:text-3xl mt-4 text-gray-200">
            Forging stronger bodies and sharper minds since 2010. We are more than a gym.
          </h3>
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-200">
            We are a community dedicated to empowering individuals to achieve their fitness goals.
          </h2>
        </div>
      </section>

      {/* Mission Section */}
      <div className="bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">Our Mission</h2>
          <p className="text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            At FitTrack, our mission is to empower individuals to achieve their fitness goals through personalized training, cutting-edge facilities, and a supportive community. We believe in fostering a culture of health and wellness, where every member feels motivated and inspired to reach their full potential.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="relative bg-[url('/ab2.avif')] bg-center bg-cover bg-no-repeat py-32 px-6 saturate-30">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="text-3xl font-bold text-red-500 uppercase mb-2">
          <p className="text-red-500">Why Choose Us?</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-16">Push Your Limits Forward</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
            <div className="bg-black/50 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-gray-800">
              <FaDumbbell className="text-red-500 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Modern Equipment</h3>
              <p className="text-gray-300">
                Our gym is equipped with the latest state-of-the-art fitness machines and technology, designed to deliver maximum performance and safety. Whether you’re strength training or doing cardio, our equipment supports every fitness level and goal.
              </p>
            </div>

            <div className="bg-black/50 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-gray-800">
              <FaAppleAlt className="text-red-500 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Healthy Nutrition Plan</h3>
              <p className="text-gray-300">
                We go beyond the gym floor. With Fitness First meal plans, you’ll get nutritious, ready-to-follow food guidance that fuels performance and supports lasting health — because what you eat matters.
              </p>
            </div>

            <div className="bg-black/50 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-gray-800">
              <FaClipboardList className="text-red-500 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Professional Training Plan</h3>
              <p className="text-gray-300">
                Our certified trainers create structured, results-driven programs that help you train smarter, not harder. From strength and conditioning to fat loss and endurance, we’ve got the perfect plan for you.
              </p>
            </div>

            <div className="bg-black/50 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-gray-800">
              <FaHeart className="text-red-500 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Unique to Your Needs</h3>
              <p className="text-gray-300">
                Your fitness journey is personal, and so is our approach. From training plans to meal programs, everything we offer is uniquely crafted to match your individual needs and help you reach your goals faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <div className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xl font-bold text-red-500 uppercase mb-2">Our Team</p>
          <h1 className="text-4xl font-bold mb-12">Train With Experts</h1>

          <style jsx>{`
            @keyframes infiniteScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .carousel-track {
              display: flex;
              width: max-content;
              animation: infiniteScroll 40s linear infinite;
            }
            .carousel-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="overflow-hidden">
            <div className="carousel-track">
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <div key={`${member.id}-${index}`} className="flex-shrink-0 w-80 mx-8">
                  <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-500/30 transition-shadow duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-96 object-cover"
                    />
                    <div className="p-8 text-center">
                      <h3 className="text-2xl font-bold">{member.name}</h3>
                      <p className="text-red-400 text-lg mt-2">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-12 bg-red-500 hover:bg-red-600 text-white font-bold px-12 py-4 rounded-full text-xl transition transform hover:scale-105">
            Book Appointment
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;