import VisualSearchAssistant from "../components/VisualSearchAssistant";

export default function Home() {
  return (
    <main className="mx-auto p-4 min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 w-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-white animate-pulse">
        Visual Search Assistant
      </h1>
      <VisualSearchAssistant />
    </main>
  );
}
