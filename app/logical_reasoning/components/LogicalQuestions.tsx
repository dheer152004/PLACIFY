"use client";

import { useState } from "react";
import Link from "next/link";
import { logicalQuestions } from "../constants";
import { ArrowRight } from "lucide-react";

export default function LogicalQuestions() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories
  const categories = Array.from(new Set(logicalQuestions.map(q => q.category)));

  const filteredQuestions = logicalQuestions.filter(q => {
    const matchesDifficulty = selectedDifficulty === "all" || 
      q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesCategory = selectedCategory === "all" || 
      q.category === selectedCategory;
    return matchesDifficulty && matchesCategory;
  });

  return (
    <div>
      <div className="mb-6">
        {/* Difficulty filters */}
        <div className="flex gap-4 mb-4">
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

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-gray-800 text-white"
              : "bg-black-100 hover:bg-gray-800"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-gray-800 text-white"
              : "bg-black-100 hover:bg-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuestions.map((question) => (
          <Link
            href={`/logical_reasoning/${question.id}`}
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
                  {question.category}
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