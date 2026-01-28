// src/pages/BecomeaMember.jsx
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Clock, User, Dumbbell, Users } from 'lucide-react';
import MembershipPlans from '../components/MembershipPlans';

function BecomeaMember() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully! (Check console for data)');
  };

  const plans = [
    {
      title: "Class drop-in",
      price: "$39.0",
      features: ["Free riding", "Unlimited equipments", "Personal trainer", "Weight losing classes", "Month to month", "No time restriction"],
    },
    {
      title: "12 Month unlimited",
      price: "$99.0",
      features: ["Free riding", "Unlimited equipments", "Personal trainer", "Weight losing classes", "Month to month", "No time restriction"],
    },
    {
      title: "6 Month unlimited",
      price: "$59.0",
      features: ["Free riding", "Unlimited equipments", "Personal trainer", "Weight losing classes", "Month to month", "No time restriction"],
    },
  ];

  const features = [
    { icon: Clock, title: "24/7 Access", desc: "Workout on your schedule, anytime, day or night." },
    { icon: User, title: "Personal Training", desc: "Get guidance from our certified expert trainers." },
    { icon: Dumbbell, title: "State-of-the-Art Equipment", desc: "Top-tier machines and free weights for every workout." },
    { icon: Users, title: "Supportive Community", desc: "Join a motivating and friendly fitness family." },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 z-10"></div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Unlock Your Potential.
            <br />
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Become a Member Today.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join a community dedicated to helping you achieve your fitness goals and 
            become your strongest self.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition duration-300">
            Choose Your Plan
          </button>
        </div>

      </section>

      <MembershipPlans />


      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">More Than a Membership.</h2>
          <p className="text-xl text-gray-400">Discover the benefits that set our gym apart from the rest.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, i) => (
            <div key={i} className="bg-gray-900/50 backdrop-blur border border-red-900/30 rounded-2xl p-8 text-center hover:border-red-600 transition group">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Perfect Plan</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="bg-black rounded-lg p-6 shadow-lg text-white border-2 border-orange-500 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-4xl font-bold text-orange-500 mb-6">{plan.price}<span className="text-base font-normal"> SINGLE CLASS</span></p>
              <ul className="text-gray-400 space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className="w-full bg-transparent border-2 border-red-500 text-lg font-semibold text-white py-2 rounded hover:bg-red-500 transition-colors duration-300">
                ENROLL NOW
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Join Steps */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Join the FitTrack Family in 3 Easy Steps</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-xl">1</div>
              <span className="text-xl">Your Details</span>
            </div>
            <div className="hidden md:block w-24 h-1 bg-gray-700"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xl text-gray-400">2</div>
              <span className="text-xl text-gray-400">Choose Plan</span>
            </div>
            <div className="hidden md:block w-24 h-1 bg-gray-700"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xl text-gray-400">3</div>
              <span className="text-xl text-gray-400">Payment</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-900/70 backdrop-blur border border-red-900/30 rounded-3xl p-10 max-w-2xl mx-auto">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full mb-4 px-6 py-4 bg-gray-800/70 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none text-white placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="w-full mb-4 px-6 py-4 bg-gray-800/70 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none text-white placeholder-gray-400"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full mb-4 px-6 py-4 bg-gray-800/70 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none text-white placeholder-gray-400"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
              min="18"
              className="w-full mb-4 px-6 py-4 bg-gray-800/70 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none text-white placeholder-gray-400"
            />
            
            {/* Gender Select with Red Theme */}
            <div className="relative mb-8">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-gray-800/70 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none text-white appearance-none cursor-pointer pr-12"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ef4444' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 1.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em'
                }}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  Select Gender
                </option>
                <option value="male" className="bg-red-600 text-white hover:bg-red-700">
                  Male
                </option>
                <option value="female" className="bg-red-600 text-white hover:bg-red-700">
                  Female
                </option>
                <option value="other" className="bg-red-600 text-white hover:bg-red-700">
                  Other
                </option>
                <option value="prefer-not" className="bg-red-600 text-white hover:bg-red-700">
                  Prefer not to say
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 py-5 rounded-xl font-bold text-xl shadow-xl transform hover:scale-105 transition"
            >
              Continue to Plan Selection
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default BecomeaMember;