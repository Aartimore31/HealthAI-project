// src/Components/MedicineReminder.jsx
import React, { useState, useEffect } from "react";
import "./MedicineReminder.css";

export default function MedicineReminder() {
  const [reminder, setReminder] = useState({ name: "", time: "" });
  const [reminders, setReminders] = useState([]);

  const handleChange = (e) => {
    setReminder({ ...reminder, [e.target.name]: e.target.value });
  };

  const addReminder = () => {
    if (!reminder.name || !reminder.time) return;
    setReminders([...reminders, { ...reminder, id: Date.now() }]);
    setReminder({ name: "", time: "" });
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  // Optional: Sort reminders by time
  useEffect(() => {
    setReminders((prev) =>
      [...prev].sort((a, b) => a.time.localeCompare(b.time))
    );
  }, [reminders.length]);

  return (
    <div className="med-container">
      <div className="med-card">
        <h1 className="med-title">💊 Medicine Reminder</h1>

        <div className="med-inputs">
          <input
            type="text"
            name="name"
            placeholder="Medicine Name"
            value={reminder.name}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            value={reminder.time}
            onChange={handleChange}
          />
          <button onClick={addReminder}>Add Reminder</button>
        </div>

        <div className="med-list">
          {reminders.length === 0 && <p>No reminders added yet.</p>}
          {reminders.map((r) => (
            <div key={r.id} className="med-item">
              <span>{r.name}</span>
              <span>{r.time}</span>
              <button onClick={() => removeReminder(r.id)}>❌</button>
            </div>
          ))}
        </div>

        <p className="med-disclaimer">
          ⚠️ Reminders are stored locally. Refreshing the page will clear them.
        </p>
      </div>
    </div>
  );
}
