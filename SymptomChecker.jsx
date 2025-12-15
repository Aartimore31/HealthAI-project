import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SymptomChecker.css";

export default function SymptomChecker() {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState(3); // 1-5
  const [duration, setDuration] = useState("24h");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [showTips, setShowTips] = useState(false);
  const progressRef = useRef(null);

  const quickChips = [
    "fever",
    "cough",
    "headache",
    "sore throat",
    "fatigue",
    "nausea",
    "runny nose",
  ];

  useEffect(() => {
    return () => clearInterval(progressRef.current);
  }, []);

  const addChip = (text) => {
    const already = symptoms.split(",").map(s => s.trim()).filter(Boolean);
    if (!already.includes(text)) {
      setSymptoms(prev => (prev ? prev + ", " + text : text));
    }
  };

  const reset = () => {
    setSymptoms("");
    setSeverity(3);
    setDuration("24h");
    setResults([]);
    setShowTips(false);
  };

  const handleCheck = () => {
    if (!symptoms.trim()) {
      // small shake effect via CSS class
      const el = document.querySelector(".input-area");
      if (el) {
        el.classList.remove("shake");
        void el.offsetWidth;
        el.classList.add("shake");
      }
      return;
    }

    setLoading(true);
    setResults([]);
    setProgress(6);
    setShowTips(false);

    // animate progress
    clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 96) {
          clearInterval(progressRef.current);
          return 96;
        }
        return p + Math.random() * 8;
      });
    }, 350);

    // Simulated "staged AI analysis" with delays
    setTimeout(() => setProgress(28), 600); // parsing
    setTimeout(() => setProgress(52), 1400); // matching
    setTimeout(() => setProgress(72), 2200); // ranking
    setTimeout(() => {
      // finalize
      clearInterval(progressRef.current);
      setProgress(100);

      // build simulated results (this would be replaced by real API)
      const parsed = symptoms
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // naive logic to create diverse results
      const seed = parsed.join(" ").toLowerCase();
      const hasFever = seed.includes("fever");
      const hasCough = seed.includes("cough") || seed.includes("throat");
      const hasAllergy = seed.includes("sneeze") || seed.includes("runny") || seed.includes("itch");

      const simResults = [
        {
          name: hasFever ? "Influenza (Flu)" : hasAllergy ? "Seasonal Allergies" : "Common Cold",
          confidence: Math.round(60 + Math.random() * 30),
          advice: hasFever
            ? "Rest, stay hydrated, consider paracetamol. Seek medical care if high fever persists."
            : hasAllergy
            ? "Antihistamines may help. Avoid triggers and consult a pharmacist if unsure."
            : "Most colds resolve in 3–7 days. Rest and fluids are recommended.",
          urgency: hasFever || severity >= 4 ? "medium" : "low",
        },
        {
          name: hasCough ? "Upper Respiratory Infection" : "Dehydration/Stress",
          confidence: Math.round(20 + Math.random() * 50),
          advice: "Monitor symptoms, use humidifier, and seek help if breathing worsens.",
          urgency: severity >= 4 ? "medium" : "low",
        },
      ];

      // Push a high-urgency advice if severity high or alarming keywords detected
      const dangerKeywords = ["shortness", "chest", "breath", "severe", "faint"];
      const flagged = dangerKeywords.some((k) => seed.includes(k));
      if (flagged || severity === 5) {
        simResults.unshift({
          name: "URGENT: Seek immediate care",
          confidence: 95,
          advice:
            "Your input indicates potentially serious symptoms (shortness of breath, chest pain, fainting). Seek emergency medical care now.",
          urgency: "high",
        });
      }

      setResults(simResults);
      setLoading(false);
      setShowTips(true);
    }, 3800);
  };

  return (
    <div className="symp-page">
      {/* animated background blobs */}
      <div className="bg-blob a" aria-hidden="true" />
      <div className="bg-blob b" aria-hidden="true" />
      <div className="container">
        <header className="topbar">
          <button className="back-btn" onClick={() => navigate(-1)} aria-label="Back">
            ← Back
          </button>
          <div className="brand">
            <div className="logo">🩺</div>
            <div>
              <h1>AI Symptom Checker</h1>
              <p className="muted">Fast, friendly, and informative — not a replacement for a doctor.</p>
            </div>
          </div>
          <div className="top-actions">
            <button className="ghost" onClick={() => { reset(); }}>
              Reset
            </button>
            <button className="primary" onClick={() => window.print()}>Print</button>
          </div>
        </header>

        <main className="card-grid">
          <section className="left-card">
            <div className="panel">
              <h2>Describe your symptoms</h2>
              <p className="muted small">Be as specific as you can — include duration and severity.</p>

              <textarea
                className="input-area"
                placeholder="e.g., fever, dry cough, mild headache for 2 days"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={5}
                aria-label="Describe your symptoms"
              />

              <div className="chips">
                {quickChips.map((c) => (
                  <button
                    key={c}
                    className="chip"
                    onClick={() => addChip(c)}
                    aria-label={`Add ${c}`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="controls">
                <label className="control-item">
                  <div className="label">Severity</div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={severity}
                    onChange={(e) => setSeverity(Number(e.target.value))}
                  />
                  <div className="severity-badges">
                    <span className={`dot s1 ${severity>=1? 'active':''}`}>1</span>
                    <span className={`dot s2 ${severity>=2? 'active':''}`}>2</span>
                    <span className={`dot s3 ${severity>=3? 'active':''}`}>3</span>
                    <span className={`dot s4 ${severity>=4? 'active':''}`}>4</span>
                    <span className={`dot s5 ${severity>=5? 'active':''}`}>5</span>
                  </div>
                </label>

                <label className="control-item">
                  <div className="label">Duration</div>
                  <select value={duration} onChange={(e) => setDuration(e.target.value)} aria-label="Duration">
                    <option value="24h">Last 24 hours</option>
                    <option value="3d">Last 3 days</option>
                    <option value="1w">Last week</option>
                    <option value="2w">2+ weeks</option>
                  </select>
                </label>
              </div>

              <div className="call-to-action">
                <button className="btn-cta" onClick={handleCheck} disabled={loading} aria-disabled={loading}>
                  {loading ? (
                    <span className="spinner" aria-hidden="true" />
                  ) : null}
                  {loading ? "Analyzing symptoms..." : "Analyze with AI"}
                </button>
                <button className="btn-outline" onClick={() => { setSymptoms(symptoms + (symptoms ? ", sore throat" : "sore throat")); }}>
                  Add Example
                </button>
              </div>

              <div className="progress-wrap" aria-hidden={!loading}>
                <div className="progress-label">
                  <span>{loading ? "AI analysis in progress" : "Idle"}</span>
                  <span className="muted small">{Math.round(progress)}%</span>
                </div>
                <div className="progress-bar">
                  <div className="fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <p className="muted tiny">Results are simulated. For medical emergencies call local emergency services immediately.</p>
            </div>
          </section>

          <aside className="right-card">
            <div className="panel results-panel">
              <div className="results-header">
                <h3>AI Findings</h3>
                <p className="muted small">Potential matches and guidance</p>
              </div>

              {!results.length && !loading && (
                <div className="empty">
                  <div className="pulse-icon">🔎</div>
                  <p className="muted">No analysis yet. Enter symptoms and click <strong>Analyze with AI</strong>.</p>
                </div>
              )}

              {loading && (
                <div className="analysis-stage">
                  <div className="loader-graph" />
                  <p className="muted">The AI is reviewing your symptoms and cross-checking medical patterns.</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="results-list">
                  {results.map((r, idx) => (
                    <article className={`result-card ${r.urgency}`} key={idx}>
                      <div className="result-top">
                        <h4>{r.name}</h4>
                        <div className="confidence">{r.confidence}%</div>
                      </div>

                      <div className="bar-outer" aria-hidden="true">
                        <div
                          className="bar-inner"
                          style={{ width: `${r.confidence}%` }}
                        />
                      </div>

                      <p className="result-advice">{r.advice}</p>

                      <div className="result-actions">
                        <button className="mini">Learn More</button>
                        <button
                          className="mini-outline"
                          onClick={() => {
                            alert("This would open telehealth / next steps in a real app.");
                          }}
                        >
                          Next Steps
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              <div className={`tips ${showTips ? "show" : ""}`}>
                <h4>Quick Tips</h4>
                <ul>
                  <li>Stay hydrated and rest when symptoms are mild.</li>
                  <li>Monitor breathing — seek immediate care if it becomes difficult.</li>
                  <li>Use OTC medicines only as directed; consult pharmacist for interactions.</li>
                </ul>
              </div>

              <footer className="panel-footer muted tiny">
                This tool is educational and not a substitute for professional medical advice.
              </footer>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
