// server.js
import express from "express";
import multer from "multer";
import { OpenAI } from "openai";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/transcribe", upload.single("file"), async (req, res) => {
  try {
    const fileStream = fs.createReadStream(req.file.path);

    const response = await openai.audio.transcriptions.create({
      file: fileStream,
      model: "whisper-1",
    });

    // Whisper gives { text: "..." }
    return res.json({ text: response.text });
  } catch (error) {
    console.error("❌ Transcription failed:", error);
    res.status(500).json({ error: "Transcription failed" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
