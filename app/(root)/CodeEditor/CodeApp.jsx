import dynamic from "next/dynamic";

// Dynamically import CodeEditor component
const CodeEditor = dynamic(() => import("./components/CodeEditor"), {
  ssr: false,
});

export default function CodeApp() {
  return <CodeEditor />;
}