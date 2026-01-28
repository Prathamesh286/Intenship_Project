import React from 'react';

function BMI() {
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [bmi, setBmi] = React.useState(null);
  const [category, setCategory] = React.useState('');

  const calculateBMI = () => {
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);

    if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) {
      setBmi('Invalid input. Please enter valid numbers.');
      setCategory('');
      return;
    }

    const heightInMeters = heightValue / 100;
    const bmiValue = weightValue / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    // Determine BMI category
    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 25) setCategory('Healthy');
    else if (bmiValue < 30) setCategory('Overweight');
    else setCategory('Obese');
  };

  return (
    <div className="bg-black">
      <section className="min-h-screen relative bg-[url('/img9.jpg')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="title mb-6 font-bold">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
              BMI CALCULATOR
            </h1>
            <nav className="text-lg text-white mb-6">
              <a href="#" className="hover:text-orange-500">Home</a> &gt; 
              <a href="#" className="hover:text-orange-500">Pages</a> &gt; 
              <span className="text-xl text-red-500">BMI Calculator</span>
            </nav>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-6">
        {/* Calculator Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-red-500 text-lg font-bold mb-4">CHECK YOUR BODY</h2>
          <h1 className="text-3xl font-bold mb-6 text-white">CALCULATE YOUR BMI</h1>
          <p className="text-white mb-6">
            Calculate your Body Mass Index (BMI) to assess your weight status and take control of your health.
          </p>
          <div className="space-y-6 p-6 bg-black rounded-lg shadow-lg">
            <input
              type="number"
              placeholder="Height / cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              // className="w-full py-3 px-4 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-900 text-white"
              className="w-full py-3 px-4 rounded-md focus:outline-none border-2 border-red-500 bg-black text-white"

            />
            <input
              type="number"
              placeholder="Weight / kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full py-3 px-4 border  rounded-md focus:outline-none border-2 border-red-500 bg-black text-white"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full py-3 px-4  rounded-md focus:outline-none border-2 border-red-500 bg-black text-white"
              required
            >
              {/* <option value="" disabled>Select Gender</option> */}
              <option value="male ">Male</option>
              <option value="female">Female</option>
            </select>
            <button
              type="button"
              onClick={calculateBMI}
              className="w-full bg-red-500 hover:bg-red-600 text-white text-lg font-bold py-3 rounded"
            >
              CALCULATE
            </button>
          </div>
        </div>

        {/* Result Section */}
        <div className="w-full md:w-1/2 bg-black p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Your Result</h2>
          <div className="border-2 border-red-500 bg-gray-900 p-6 rounded-lg text-center">
            {bmi && (
              <>
                <p className="text-lg text-white">Your BMI is</p>
                <p className="text-4xl font-bold text-red-500">{bmi}</p>
                <p className="text-lg font-bold">{category}</p>
              </>
            )}
            {!bmi && <p className="text-lg text-white">Please calculate your BMI.</p>}
          </div>
          {bmi && (
            <p className="mt-4 text-white text-sm">
              This falls within the {category.toLowerCase()} range. Maintaining a balanced diet and regular exercise routine can help you stay within this range.
            </p>
          )}

          <h3 className="text-xl font-bold mt-6 mb-2 text-white">BMI Categories</h3>
          <ul className="space-y-2 text-white">
            <li>Underweight <span className="float-right">Below 18.5</span></li>
            <li>Normal weight <span className="float-right">18.5 - 24.9</span></li>
            <li>Overweight <span className="float-right">25.0 - 29.9</span></li>
            <li>Obese <span className="float-right">30.0 and above</span></li>
          </ul>
        </div>
      </div>

      {/* Chart Section (Moved to bottom for consistency with reference image) */}
      <div className="max-w-5xl mx-auto mt-8">
        <h2 className="text-orange-500 text-lg font-bold mb-4">CHECK YOUR BODY</h2>
        <h1 className="text-3xl font-bold mb-6 text-white">BMI CALCULATOR CHART</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border-2 border-red-500">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-4 border-b border-orange-500">BMI</th>
                <th className="p-4 border-b border-orange-500">WEIGHT STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-900 text-white">
                <td className="p-4 border-b border-orange-500">Below 18.5</td>
                <td className="p-4 border-b border-orange-500">Underweight</td>
              </tr>
              <tr className="hover:bg-gray-900 text-white">
                <td className="p-4 border-b border-orange-500">18.5 - 24.9</td>
                <td className="p-4 border-b border-orange-500">Healthy</td>
              </tr>
              <tr className="hover:bg-gray-900 text-white">
                <td className="p-4 border-b border-orange-500">25.0 - 29.9</td>
                <td className="p-4 border-b border-orange-500">Overweight</td>
              </tr>
              <tr className="hover:bg-gray-900 text-white">
                <td className="p-4 border-b border-orange-500">30.0 and Above</td>
                <td className="p-4 border-b border-orange-500">Obese</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BMI;
