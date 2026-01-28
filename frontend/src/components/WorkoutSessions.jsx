import React from 'react';
import { useNavigate } from 'react-router-dom';

function WorkoutSessions() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-[600px] flex flex-col items-center justify-center p-6">
      <div className="flex flex-col md:flex-row justify-around w-full max-w-6xl px-4">
        <div className="mb-10 md:mb-0 md:mr-4 text-center">
          <img src="h2.png" alt="personal training" className='mb-4 mx-auto'/>
          <h2 className="text-4xl font-bold mb-4">PERSONAL TRAINING</h2>
          <p className="mb-6">You'll look at graphs and charts in Task One, how to approach the task and the language needed for a successful answer.</p>
          <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/course')}
          >
            VIEW COURSES
          </button>
        </div>
        <div className="text-center">
          <img src="h3.png" alt="group training" className='mb-4 mx-auto'/>
          <h2 className="text-4xl font-bold mb-4">GROUP TRAINING</h2>
          <p className="mb-6">You'll look at graphs and charts in Task One, how to approach the task and the language needed for a successful answer.</p>
          <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/course')}
          >
            VIEW COURSES
          </button>
        </div>
      </div>
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6">
        <div className="flex flex-col md:flex-row justify-around w-full max-w-6xl px-4">
          <div className="mb-10 md:mb-0 text-center">
            <img src="team1.png" alt="Body Building" className="mb-4 mx-auto" />
            <h2 className="text-3xl font-bold mb-4">BODY BUILDING</h2>
            <p className="mb-6">You'll look at graphs and charts in Task One, how to approach the task.</p>
          </div>
          <div className="mb-10 md:mb-0 text-center">
            <img src="team2.png" alt="Muscle Gain" className="mb-4 mx-auto" />
            <h2 className="text-3xl font-bold mb-4">MUSCLE GAIN</h2>
            <p className="mb-6">You'll look at graphs and charts in Task One, how to approach the task.</p>
          </div>
          <div className="text-center">
            <img src="team3.png" alt="Weight Loss" className="mb-4 mx-auto" />
            <h2 className="text-3xl font-bold mb-4">WEIGHT LOSS</h2>
            <p className="mb-6">You'll look at graphs and charts in Task One, how to approach the task.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutSessions;