import React, { useState } from 'react'
import { toast } from 'react-toastify';


function BMICalculater() {

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    const heightInMeters = height / 100;
    const bmiVlue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiVlue);

    if (bmiVlue < 18.5) {
      toast.warning("Underweight"  + bmiVlue);
    } else if (bmiVlue >= 18.5 && bmiVlue < 24.9) {
      toast.success("Healthy" + bmiVlue);
    } else if (bmiVlue >= 25 && bmiVlue < 29.9) {
      toast.warning("Overweight" + bmiVlue);
    } else {
      toast.error("Obese");
    }
  };
  return (
    <section className="bmi">
      <h1>BMI Calculator</h1>
      <div className="container">
        <div className="wrapper">
          <form onSubmit={calculateBMI}>
            <div>
              <label>Height (cm)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
            </div>

            <div>
              <label>Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </div>

            <div>
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <button type="submit">Calculate</button>
          </form>

        </div>

        <div className='wrapper'>
          <img src="./bmi.jpg" alt="bmiImage" />
        </div>

      </div>
      
    </section>
  )
}

export default BMICalculater
