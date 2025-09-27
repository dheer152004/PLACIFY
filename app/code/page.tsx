import CodeQuestions from "./components/CodeQuestions";

export default function CodePage() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className="text-3xl font-bold mb-6">Coding Practice</h1>
      <CodeQuestions />
    </main>
  );
}