import { useStepsStore } from "@/app/store";
import { InitRecognition } from "@/lib/utils";
import React from "react";

export const useSpeechRecognition = () => {
  const recognition = InitRecognition.getInstance();
  const { step } = useStepsStore();

  const [command, setCommand] = React.useState<Array<string>>([]);

  const reset = () => {
    setCommand([]);
  };

  React.useEffect(() => {
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript;
      setCommand((prev) => {
        return [...prev, command.trim()];
      });
    };

    recognition.onend = () => {
      console.log("Speech recognition ended. Restarting...");
      recognition.start();
    };
    const time = setTimeout(() => {
      recognition.start();
    }, 3000);
    return () => {
      recognition.onend = null;
      clearTimeout(time);
      setTimeout(() => {
        recognition.stop();
      }, 5000);
    };
  }, [step]);
  console.log("command", command);
  return [command, recognition, reset] as const;
};
