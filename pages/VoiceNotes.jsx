import React, { useState, useRef } from "react";
import "./VoiceNotes.css";

export default function VoiceNotes() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [warning, setWarning] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // 🚨 Red flag words
  const redFlags = [
    "suicide",
    "kill myself",
    "end my life",
    "hurt myself",
    "can't go on",
    "die",
    "worthless",
    "ending it",
    "cannot take it anymore",
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("❌ Microphone error:", error);
      alert("Please allow microphone access!");
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(blob));

        const formData = new FormData();
        formData.append("file", blob, "voiceNote.webm");

        try {
          const res = await fetch("http://localhost:5000/transcribe", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          console.log("✅ Transcription:", data);

          if (data.text) {
            setTranscript(data.text);

            const containsRedFlag = redFlags.some((flag) =>
              data.text.toLowerCase().includes(flag)
            );
            setWarning(containsRedFlag);
          } else {
            setTranscript("❌ No transcript received.");
          }
        } catch (err) {
          console.error("❌ Error fetching transcription:", err);
          setTranscript("Error transcribing audio.");
        }
      };
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    setWarning(false);
    setAudioURL(null);
  };

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transcript.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="voice-notes-wrapper">
      {/* Left Panel */}
      <div className="left-panel">
        <h1 className="title">🎙️ Voice Notes</h1>
        <p className="subtitle">
          Record your thoughts.<br />
          Get instant transcripts.<br />
          Stay safe with built-in wellbeing alerts.
        </p>
        {isRecording && <div className="mic-wave"></div>}
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="transcript-panel">
          <h2>Transcript</h2>
          <p>{transcript || "🎤 Press record and start speaking..."}</p>
        </div>

        {warning && (
          <div className="emergency-alert">
            <h3>🚨 Emergency Alert</h3>
            <p>
              Harmful language detected. Please reach out to a trusted friend,
              family member, or professional. If in immediate danger, call your
              local emergency number.
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="controls">
          {!isRecording ? (
            <button className="mic-btn record" onClick={startRecording}>
              🎤
            </button>
          ) : (
            <button className="mic-btn stop" onClick={stopRecording}>
              ⏹
            </button>
          )}
          <button className="mic-btn save" onClick={downloadTranscript}>
            💾
          </button>
          <button className="mic-btn clear" onClick={clearTranscript}>
            🗑️
          </button>
        </div>

        {audioURL && (
          <div className="audio-preview">
            <h3>Preview Recording</h3>
            <audio controls src={audioURL}></audio>
          </div>
        )}
      </div>
    </div>
  );
}
