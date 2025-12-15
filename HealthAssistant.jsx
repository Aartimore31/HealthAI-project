import React, { useState, useRef, useEffect } from "react";
import "./HealthAssistant.css";

export default function HealthAssistant() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I’m your AI Health Assistant 🤖. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    setTimeout(() => {
      const botResponse = generateSmartResponse(input, messages);
      setMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
      setLoading(false);
    }, 800); // simulate typing
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Smart AI logic (health + casual chat)
  const generateSmartResponse = (msg, history) => {
    const text = msg.toLowerCase().trim();

    // Greetings
    const greetings = ["hi", "hello", "hey", "good morning", "good evening"];
    if (greetings.some(g => text.includes(g))) {
      return "Hello! How are you feeling today?";
    }

    // Casual questions
    if (text.includes("how are you")) {
      return "I’m just a bot, but I’m here to help you with your health! How are you feeling?";
    }
    if (text.includes("thank")) {
      return "You’re welcome! Always happy to help.";
    }
    if (text.includes("bye") || text.includes("see you")) {
      return "Take care! Remember to stay healthy 😊";
    }

    // Health-related keywords
    if (text.includes("headache")) return "Headaches can be caused by stress, dehydration, or vision strain. Drink water and rest.";
    if (text.includes("fever")) return "Monitor your temperature. Persistent high fever may require seeing a doctor.";
    if (text.includes("cough")) return "Coughing can be viral or bacterial. Keep hydrated and rest. If severe, consult a doctor.";
    if (text.includes("stomach")) return "Stomach pain can be from indigestion or stress. Light meals and rest help.";
    if (text.includes("tired")) return "Feeling tired? Ensure enough sleep and a balanced diet. Persistent fatigue may need a doctor.";

    // Context-aware advice
    if (history.some(m => m.text.toLowerCase().includes("headache"))) {
      return "Since you mentioned a headache earlier, remember to stay hydrated and avoid eye strain.";
    }

    // Default fallback
    return "I see. Can you tell me more about how you’re feeling or your symptoms?";
  };

  return (
    <div className="assistant-container">
      <div className="assistant-card">
        <h1 className="assistant-title">💬 AI Health Assistant</h1>

        <div className="chat-window">
          {messages.map((m, idx) => (
            <div key={idx} className={`chat-message ${m.sender}`}>
              {m.text.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          ))}

          {loading && (
            <div className="chat-message bot">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="input-area">
          <textarea
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={2}
          />
          <button onClick={handleSend} disabled={loading || !input.trim()}>
            {loading ? "..." : "Send"}
          </button>
        </div>

        <p className="disclaimer">
          ⚠️ AI assistant provides guidance and information only. Not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}
