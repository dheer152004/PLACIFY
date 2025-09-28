"use client";

import { useState } from "react";
import Link from "next/link";
import { codeQuestions } from "../constants";
import { ArrowRight } from "lucide-react";

export default function CodeQuestions() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const filteredQuestions = selectedDifficulty === "all"
    ? codeQuestions
    : codeQuestions.filter(q => q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());

  return (
    <div>
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setSelectedDifficulty("all")}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedDifficulty === "all"
              ? "bg-gray-800 text-white"
              : "bg-black-100 hover:bg-gray-800"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedDifficulty("easy")}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedDifficulty === "easy"
              ? "bg-green-500 text-white"
              : "bg-black-100 hover:bg-gray-800"
          }`}
        >
          Easy
        </button>
        <button
          onClick={() => setSelectedDifficulty("medium")}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedDifficulty === "medium"
              ? "bg-yellow-500 text-white"
              : "bg-black-100 hover:bg-gray-800"
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => setSelectedDifficulty("hard")}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedDifficulty === "hard"
              ? "bg-red-500 text-white"
              : "bg-black-100 hover:bg-gray-800"
          }`}
        >
          Hard
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuestions.map((question) => (
          <Link
            href={`/code/${question.id}`}
            key={question.id}
            className="block"
          >
            <div className="p-6 rounded-lg border border-border bg-card hover:border-primary transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{question.title}</h3>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    question.difficulty === "Easy"
                      ? "bg-green-100 text-green-700"
                      : question.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {question.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {question.testCases.length} Test Cases
                </span>
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}