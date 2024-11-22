import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type RecoType = {
  command: string[];
  recognition: SpeechRecognition;
  reset: () => void;
};
export const InitRecognition = (() => {
  let instance: SpeechRecognition | null = null;
  let isListening = false; // Track if recognition is active

  return {
    getInstance: () => {
      if (instance) {
        return instance;
      }

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const SpeechGrammarList =
        window.SpeechGrammarList || window.webkitSpeechGrammarList;

      if (!SpeechRecognition || !SpeechGrammarList) {
        throw new Error(
          "SpeechRecognition or SpeechGrammarList is not supported in this browser.",
        );
      }

      const recognition = new SpeechRecognition();
      const speechRecognitionList = new SpeechGrammarList();

      // Define a JSGF grammar
      const grammar = `
      #JSGF V1.0;
      grammar commands;
      public <command> = start | stop | "start navigation" | "find route";
      `;

      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
      recognition.continuous = true;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      // Store the instance for future use
      instance = recognition;

      // Listen for end event to reset listening state
      recognition.onend = () => {
        isListening = false;
      };

      return recognition;
    },
    start: () => {
      const recognition = InitRecognition.getInstance();

      if (!isListening) {
        recognition.start();
        isListening = true; // Set listening state
      } else {
        console.warn("SpeechRecognition is already running.");
      }
    },
    stop: () => {
      const recognition = InitRecognition.getInstance();

      if (isListening) {
        recognition.stop();
        isListening = false; // Reset listening state
      } else {
        console.warn("SpeechRecognition is not running.");
      }
    },
  };
})();
