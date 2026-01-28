import React from "react";
import Navbar from "../components/Navbar"; // FIXED: Ensure path and case match src/components/Navbar.jsx
import Hero from "../components/Hero"; // FIXED: Ensure path and case match src/components/Hero.jsx
import WorkoutSessions from "../components/WorkoutSessions";
import Footer from "../components/Footer"; // FIXED: Ensure path and case match src/components/Footer.jsx
import Gallery from "../components/Gallery"; // FIXED: Ensure path and case match src/components/Gallery.jsx
import BMI from "../components/BMI"; // FIXED: Ensure path and case match src/components/BMI.jsx
import CustomerReview from "../components/CustomerReview";
function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Hero />
      <WorkoutSessions />
      <BMI />    
      <Gallery />
      <CustomerReview />  
      <Footer />
    </div>
  );
}

export default Home; // FIXED: Ensures default export for App.jsx import
