import VisualSearchAssistant from "../components/VisualSearchAssistant";

export default function Home() {
  return (
      <div className="space-y-6 p-10">
          <h1 className="text-4xl font-bold mb-6 text-center text-white animate-pulse">
              Visual Search Assistant
          </h1>
          <VisualSearchAssistant/>
      </div>
  );
}
