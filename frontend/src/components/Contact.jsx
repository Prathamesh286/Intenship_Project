// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });

  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSubmissionMessage(`Thank you, ${formData.name}! Your message has been sent.`);
  //   setFormData({ name: '', email: '', mobile: '', message: '' });
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setSubmissionMessage(data.message);
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } else {
      setSubmissionMessage(data.message || 'Failed to send message');
    }
  } catch (err) {
    setSubmissionMessage('Server error. Please try again later.');
  }
};

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/a3.jpg')] bg-black/30 bg-blend-multiply pt-20">
        <div className="text-center z-10">
          <div className="title mb-6 font-bold">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
              CONTACT US
            </h1>
          </div>

        </div>
        
      </section>

      {/* Main Contact Section */}
      <div className="py-16 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Contact Information */}
            <div className="space-y-12">
              {/* Locations */}
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Our Locations</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Colombo 7, Maitland Crescent<br />
                    Colombo 2, Moors Sports Club<br />
                    Colombo 2, World Trade Center<br />
                    Ja-ela
                  </p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Phone Numbers</h3>
                  <div className="text-gray-300 space-y-2">
                    <p><span className="font-medium">Colombo 7:</span> 011-269-5331 | 077-834-5678</p>
                    <p><span className="font-medium">Moors Sport Club:</span> 011-212-1755 | 075-711-9033</p>
                    <p><span className="font-medium">World Trade Center:</span> 011-233-8842 | 077-840-5889</p>
                    <p><span className="font-medium">Ja-ela:</span> 011-222-9747 | 077-834-5678</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Email</h3>
                  <p className="text-gray-300 text-xl">fitnessfirstcolombo@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-center text-red-500 mb-10">Leave a Comment</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-lg"
                  required
                />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-lg"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows="6"
                  className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-lg resize-none"
                  required
                />
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-red-500 w-full bg-red-600 text-lg font-semibold text-white p-3 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    SUBMIT
                  </button>
                </div>
                {submissionMessage && (
                  <p className="text-center text-green-400 mt-6 text-lg">{submissionMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;