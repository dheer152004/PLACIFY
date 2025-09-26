"use client";

import dynamic from "next/dynamic";

// Dynamically import the CodeEditor component
const CodeEditor = dynamic(() => import("./components/CodeEditor"), { 
  ssr: false 
});

export default function CodeEditorPage() {
  return (
    <div className="min-h-screen bg-[#0f0a19] text-gray-500 px-6 py-8">
      <CodeEditor />
    </div>
  );
}