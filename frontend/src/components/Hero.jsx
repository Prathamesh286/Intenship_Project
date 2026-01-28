import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    // <section className="min-h-screen relative bg-[url('/h1_hero.png')] bg-black/75 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <section className="h-screen relative bg-[url('/h1_hero.png')] bg-black/75  bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8">

      <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
        <div className="title mb-6 font-bold">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
            Unleash Your Inner
          </h1>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
            Strength
          </h1>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl mt-4 text-gray-200">
            Getting in shape isn't hard when you're in a supportive
          </h2>
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-200">
            environment. Lifetime Fitness is more than just a gym - it's
          </h2>
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-200">
            a caring family that's there to help you achieve your goals
          </h2>
        </div>
        <div className="sub-title mb-8">
          <p className="text-lg sm:text-xl text-gray-100 mb-2">
            Your journey to fitness starts here
          </p>
          <p className="text-lg sm:text-xl text-blue-500">
            BSS Creation
          </p>
        </div>
        <div className="buttons flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-red-500 hover:bg-red-700 text-white text-lg font-bold py-3 px-6 rounded-md transition duration-300"
          onClick={() => navigate('/course')}
          >
            Start Your Journey
          </button>
          
        </div>
      </div>
    </section>
  );
}

export default Hero;