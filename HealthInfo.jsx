import React, { useState, useEffect } from "react";
import "./HealthInfo.css";
const HealthInfo = () => {
  const [infos, setInfos] = useState([]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    fetch("/api/info")
      .then((res) => res.json())
      .then((data) => setInfos(data));
  }, []);

  const addInfo = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, note }),
    });
    const data = await res.json();
    setInfos([data, ...infos]);
    setName("");
    setNote("");
  };

  return (
    <div style={{ width: "500px", margin: "50px auto", fontFamily: "sans-serif" }}>
      <h2>Health Info</h2>
      <form onSubmit={addInfo}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {infos.map((i) => (
          <li
            key={i._id}
            style={{ border: "1px solid #ddd", margin: "6px 0", padding: "8px" }}
          >
            <b>{i.name}</b> <br />
            {i.note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthInfo;
