"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { codeQuestions } from "../constants";
import dynamic from "next/dynamic";

// Dynamically import the CodeEditor to avoid SSR issues with Monaco Editor
const CodeEditor = dynamic(() => import("../../CodeEditor/CodeMain"), {
  ssr: false
});

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const questionId = params?.id;

  const question = codeQuestions.find((q) => q.id === questionId);

  useEffect(() => {
    if (!question) {
      router.push("/code");
    }
  }, [question, router]);

  if (!question) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6 border-b">
        <div className="flex justify-between items-start max-w-screen-xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
            <span
              className={`px-2 py-1 rounded text-sm ${question.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : question.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {question.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-[400px] p-6 border-r overflow-y-auto">
          <div className="prose dark:prose-invert">
            <h3>Problem Description</h3>
            <p className="whitespace-pre-line">{question.description}</p>

            <h3>Test Cases</h3>
            <div className="w-full max-w-3xl mx-auto ">
              {question.testCases.map((testCase, index) => (
                <div key={index} className="mb-4 p-4 bg-muted rounded-lg overflow-auto">
                  <div>
                    <strong>Input:</strong> {testCase.input}
                  </div>
                  <div className="font-mono text-sm">
                    <strong>Output:</strong>{" [" + JSON.parse(testCase.output).join(", ") + "]"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <CodeEditor
            questionData={{
              id: question.id,
              title: question.title,
              starterCode: question.starterCode
            }}
          />
        </div>
      </div>
    </div>
  );
}