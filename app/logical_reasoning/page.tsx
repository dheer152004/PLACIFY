import LogicalQuestions from "./components/LogicalQuestions";

export default function LogicalReasoningPage() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className="text-3xl font-bold mb-6">Logical Reasoning</h1>
      <LogicalQuestions />
    </main>
  );
}