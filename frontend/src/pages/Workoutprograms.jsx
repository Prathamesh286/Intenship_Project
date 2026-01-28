import React from 'react';

function Workouts() {
  const workouts = [
    { title: 'Full Body Strength', category: 'Strength', image: '' },
    { title: 'Cardio Blast', category: 'Cardio', image: '' },
    { title: 'Morning Yoga Flow', category: 'Yoga', image: '' },
    { title: 'Core Crusher', category: 'Strength', image: '' },
    { title: 'Leg Day Challenge', category: 'Strength', image: '' },
    { title: 'HIIT It Hard', category: 'Cardio', image: '' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-900 shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
            F
          </div>
          <h1 className="text-xl font-bold text-red-600">FitFlex</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-red-600">Workouts</a>
          <a href="#" className="hover:text-red-600">Programs</a>
          <a href="#" className="hover:text-red-600">Nutrition</a>
          <a href="#" className="hover:text-red-600">Community</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button aria-label="Notifications" className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button aria-label="Profile" className="w-8 h-8 rounded-full overflow-hidden">
            <img src="" alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-2">Workouts</h1>
        <p className="text-gray-400 mb-6">Explore a variety of workouts tailored to your fitness goals.</p>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search workouts"
            className="w-full p-3 bg-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none"
          />
          <svg className="absolute right-3 top-3 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Categories */}
        <nav className="flex space-x-4 mb-6">
          <a href="#" className="text-red-600 font-semibold border-b-2 border-red-600">All</a>
          <a href="#" className="text-gray-400 hover:text-white">Strength</a>
          <a href="#" className="text-gray-400 hover:text-white">Cardio</a>
          <a href="#" className="text-gray-400 hover:text-white">Yoga</a>
        </nav>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img src={workout.image} alt={workout.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-white">{workout.title}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button className="text-gray-400 hover:text-white">&lt;</button>
          <button className="w-6 h-6 bg-red-600 rounded-full text-white">1</button>
          <button className="w-6 h-6 bg-gray-700 rounded-full text-white">2</button>
          <button className="w-6 h-6 bg-gray-700 rounded-full text-white">3</button>
          <button className="w-6 h-6 bg-gray-700 rounded-full text-white">4</button>
          <button className="text-gray-400 hover:text-white">&gt;</button>
        </div>
      </main>
    </div>
  );
}

export default Workouts;