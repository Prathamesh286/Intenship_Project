import React from 'react';

function ProgressTracking() {
  const workouts = [
    { category: 'Today', type: 'Strength Training', name: 'Full Body Blast', duration: '45 min', exercises: 5, image: 'https://via.placeholder.com/150x100' },
    { category: 'Upcoming', type: 'Cardio', name: 'High-Intensity Interval Training', duration: '30 min', exercises: 3, image: 'https://via.placeholder.com/150x100' },
    { category: 'Upcoming', type: 'Yoga', name: 'Morning Flow', duration :'20 min', exercises: 4, image: 'https://via.placeholder.com/150x100' },
  ];

  const handleNewWorkout = () => {
    // Logic for adding a new workout can be implemented here
    alert('New Workout feature is not implemented in this example.');
  };

  return (
    <div className="min-h-screen flex bg-gray-200">
      

      {/* Main Content */}
      <main className="ml-64 p-6 flex-1">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Workouts</h1>
          <div className="flex justify-between items-center mb-6">
            <div className="space-x-4">
              <button className="text-gray-400 hover:text-white">All</button>
              <button className="text-gray-400 hover:text-white">Scheduled</button>
              <button className="text-gray-400 hover:text-white">Completed</button>
            </div>
            <button
              onClick={handleNewWorkout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              + New Workout
            </button>
          </div>

          {/* Workout Sections */}
          {['Today', 'Upcoming'].map((category) => (
            <div key={category} className="mb-6">
              <h2 className="text-xl font-semibold text-red-500 mb-4">{category}</h2>
              {workouts
                .filter((workout) => workout.category === category)
                .map((workout, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-700 p-4 rounded mb-2">
                    <div>
                      <p className="text-gray-400">{workout.type}</p>
                      <h3 className="text-lg font-bold">{workout.name}</h3>
                      <p className="text-sm text-gray-500">{workout.duration} - {workout.exercises} exercises</p>
                    </div>
                    <img src={workout.image} alt={workout.name} className="w-24 h-16 object-cover rounded" />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProgressTracking;