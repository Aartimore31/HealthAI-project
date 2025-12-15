// src/Components/HealthRiskPrediction.jsx
import React, { useState } from "react";
import "./HealthRiskPrediction.css";

export default function HealthRiskPrediction() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    age: "", gender: "male", height: "", weight: "", bp: "", sugar: "", cholesterol: "",
    smoking: "no", exercise: "yes", symptoms: ""
  });

  const [risks, setRisks] = useState({
    heart: 0, diabetes: 0, stroke: 0, kidney: 0, liver: 0
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const calculateRisks = () => {
    let heart = 0, diabetes = 0, stroke = 0, kidney = 0, liver = 0;

    if (data.age > 50) { heart += 2; stroke += 2; kidney += 1; liver += 1; }
    if (data.height && data.weight) {
      const bmi = data.weight / ((data.height / 100) ** 2);
      if (bmi >= 25) { heart += 2; diabetes += 2; stroke += 2; liver += 1; }
      if (bmi < 18.5) { diabetes += 1; }
    }
    if (data.bp && data.bp > 130) { heart += 2; stroke += 2; kidney += 1; }
    if (data.sugar && data.sugar > 140) { diabetes += 3; kidney += 1; }
    if (data.cholesterol && data.cholesterol > 200) { heart += 2; liver += 1; }
    if (data.smoking === "yes") { heart += 2; stroke += 2; }
    if (data.exercise === "no") { heart += 1; diabetes += 1; stroke += 1; }

    const s = data.symptoms.toLowerCase();
    if (s.includes("chest") || s.includes("pain")) heart += 3;
    if (s.includes("fatigue")) diabetes += 1;
    if (s.includes("dizziness")) stroke += 2;
    if (s.includes("urine")) kidney += 2;
    if (s.includes("stomach") || s.includes("nausea")) liver += 2;

    const normalize = (score) => Math.min(100, score * 15);
    setRisks({
      heart: normalize(heart),
      diabetes: normalize(diabetes),
      stroke: normalize(stroke),
      kidney: normalize(kidney),
      liver: normalize(liver),
    });
  };

  const getAdvice = (type, value) => {
    if (value < 30) return "Low risk ✅ Keep healthy habits.";
    if (value < 60) return "Moderate risk ⚠️ Improve lifestyle.";
    return "High risk ❌ Consult a doctor immediately!";
  };

  return (
    <div className="hrp-container">
      <div className="hrp-card">
        <h1 className="hrp-title">🌐 AI Health Risk Predictor</h1>

        {/* Step Inputs */}
        {step === 1 && (
          <div className="hrp-step">
            <input name="age" type="number" placeholder="Age" value={data.age} onChange={handleChange} />
            <select name="gender" value={data.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input name="height" type="number" placeholder="Height (cm)" value={data.height} onChange={handleChange} />
            <input name="weight" type="number" placeholder="Weight (kg)" value={data.weight} onChange={handleChange} />
            <button onClick={() => setStep(2)}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="hrp-step">
            <input name="bp" type="number" placeholder="Systolic BP" value={data.bp} onChange={handleChange} />
            <input name="sugar" type="number" placeholder="Blood Sugar" value={data.sugar} onChange={handleChange} />
            <input name="cholesterol" type="number" placeholder="Cholesterol" value={data.cholesterol} onChange={handleChange} />
            <select name="smoking" value={data.smoking} onChange={handleChange}>
              <option value="no">Non-smoker</option>
              <option value="yes">Smoker</option>
            </select>
            <select name="exercise" value={data.exercise} onChange={handleChange}>
              <option value="yes">Exercises regularly</option>
              <option value="no">Does not exercise</option>
            </select>
            <textarea name="symptoms" placeholder="Symptoms (optional)" value={data.symptoms} onChange={handleChange}></textarea>
            <button onClick={() => { calculateRisks(); setStep(3); }}>Predict Risks</button>
          </div>
        )}

        {/* Risk Results */}
        {step === 3 && (
          <div className="hrp-dashboard">
            {Object.keys(risks).map((type) => {
              const value = risks[type];
              const color = value < 30 ? "#34d399" : value < 60 ? "#facc15" : "#ef4444";
              return (
                <div key={type} className="hrp-panel" style={{ borderColor: color }}>
                  <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                  <div className="hrp-bar">
                    <div className="fill" style={{ width: `${value}%`, background: color }}></div>
                  </div>
                  <p>{value}%</p>
                  <small>{getAdvice(type, value)}</small>
                </div>
              );
            })}
          </div>
        )}

        <p className="hrp-disclaimer">⚠️ AI estimation only. Not a substitute for professional medical advice.</p>
      </div>
    </div>
  );
}
