"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { logicalQuestions } from "../constants";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const questionId = params?.id;
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = logicalQuestions.find((q) => q.id === questionId);

  useEffect(() => {
    if (!question) {
      router.push("/logical_reasoning");
    }
  }, [question, router]);

  if (!question) {
    return null;
  }

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      toast.error("Please select an answer first");
      return;
    }

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer. Try again!");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{question.title}</h1>
            <span
              className={cn(
                "px-2 py-1 rounded text-sm",
                question.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : question.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              {question.difficulty}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            Category: {question.category}
          </span>
        </div>

        <div className="bg-card p-6 rounded-lg border mb-6">
          <p className="text-lg mb-6 whitespace-pre-line">{question.description}</p>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                className={cn(
                  "w-full p-4 text-left rounded-lg border transition-colors",
                  !showExplanation && selectedAnswer === option
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50",
                  showExplanation && option === question.correctAnswer && "border-green-500 bg-green-100 text-green-800",
                  showExplanation && selectedAnswer === option && option !== question.correctAnswer && "border-red-500 bg-red-100 text-red-800"
                )}
                disabled={showExplanation}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showExplanation && option === question.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {showExplanation && selectedAnswer === option && option !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {!showExplanation && (
          <button
            onClick={handleAnswerSubmit}
            className={cn(
              "w-full py-3 rounded-lg font-medium transition-colors",
              selectedAnswer
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
            disabled={!selectedAnswer}
          >
            Submit Answer
          </button>
        )}

        {showExplanation && (
          <>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Explanation</h3>
              <p className="text-blue-800">{question.explanation}</p>
            </div>
            <button
              onClick={() => {
                const currentIndex = logicalQuestions.findIndex((q) => q.id === questionId);
                const nextQuestion = logicalQuestions[currentIndex + 1];
                if (nextQuestion) {
                  router.push(`/logical_reasoning/${nextQuestion.id}`);
                } else {
                  router.push("/logical_reasoning");
                }
              }}
              className="w-full py-3 rounded-lg font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              {logicalQuestions.findIndex((q) => q.id === questionId) < logicalQuestions.length - 1
                ? "Next Question"
                : "Back to Questions"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}