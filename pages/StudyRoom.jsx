import React, { useState, useEffect, useRef } from "react";
import "./StudyRoom.css";

const modes = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

export default function StudyRoom() {
  const [mode, setMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(modes.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Change mode
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode]);
    setIsRunning(false);
  };

  // Format time
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Circle progress values
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress =
    circumference - (timeLeft / modes[mode]) * circumference;

  return (
    <div className="studyroom">
      {/* Tabs */}
      <div className="mode-tabs">
        <button
          className={mode === "pomodoro" ? "active" : ""}
          onClick={() => handleModeChange("pomodoro")}
        >
          pomodoro
        </button>
        <button
          className={mode === "short" ? "active" : ""}
          onClick={() => handleModeChange("short")}
        >
          short break
        </button>
        <button
          className={mode === "long" ? "active" : ""}
          onClick={() => handleModeChange("long")}
        >
          long break
        </button>
      </div>

      {/* Circular Timer (clickable) */}
      <div
        className={`circle-timer ${isRunning ? "running" : "paused"}`}
        onClick={() => setIsRunning((prev) => !prev)} // 👈 click to toggle
      >
        <svg width="300" height="300">
          <circle
            className="progress-bg"
            stroke="#8594afff"
            strokeWidth="12"
            fill="transparent"
            r={radius}
            cx="150"
            cy="150"
          />
          <circle
            className="progress-bar"
            stroke="#3762c5ff"
            strokeWidth="12"
            fill="transparent"
            r={radius}
            cx="150"
            cy="150"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />
        </svg>

        <div className="time-text">{formatTime(timeLeft)}</div>
        <p className="click-hint">
          {isRunning ? "Click to Pause ⏸" : "Click to Start ▶"}
        </p>
      </div>
    </div>
  );
}
