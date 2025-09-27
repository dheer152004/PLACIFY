import React, { useState, useEffect, useRef } from "react";
import "./MoodCheckIn.css";

const moodStops = [
  { label: "😡 Angry", color: "#ff4d4d" },
  { label: "😞 Sad", color: "#ff944d" },
  { label: "😐 Neutral", color: "#ffd11a" },
  { label: "🙂 Happy", color: "#99e600" },
  { label: "😄 Excited", color: "#33cc33" },
];

export default function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("moodHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const barRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(history));
  }, [history]);

  const handleClick = (e) => {
    const bar = barRef.current;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;

    // Map percent to moodStops index
    const index = Math.min(Math.floor(percent * moodStops.length), moodStops.length - 1);
    const mood = moodStops[index];

    setSelectedMood(mood);
    const timestamp = new Date().toLocaleString();
    setHistory([{ mood: mood.label, color: mood.color, time: timestamp }, ...history]);
  };

  return (
    <div className="mood-wrapper">
      <h1 className="title">🌈 Mood Check-In</h1>
      <p className="subtitle">Click on the gradient bar to record how you feel.</p>

      {/* Gradient Mood Bar */}
      <div className="gradient-bar" ref={barRef} onClick={handleClick}>
        {selectedMood && <div className="mood-bubble" style={{ left: `${((moodStops.indexOf(selectedMood) + 0.5)/ moodStops.length) * 100}%` }}>⬆</div>}
      </div>

      {selectedMood && (
        <div className="selected-mood">
          You selected: <span style={{ color: selectedMood.color }}>{selectedMood.label}</span>
        </div>
      )}

      <div className="history">
        <h2>Mood History</h2>
        {history.length === 0 ? (
          <p>No moods recorded yet.</p>
        ) : (
          <ul>
            {history.map((entry, i) => (
              <li key={i}>
                <span style={{ color: entry.color }}>{entry.mood}</span> — <small>{entry.time}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
