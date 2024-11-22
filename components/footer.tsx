"use client";
import React from "react";
import { Button } from "./ui/button";
type FooterProps = {
  recognition: SpeechRecognition;
};
export const Footer = React.forwardRef<HTMLAudioElement, FooterProps>(
  ({ recognition }, ref) => {
    return (
      <footer>
        <div className="m-3">
          <div className="flex gap-4">
            <Button
              className="rounded-2xl bg-[#C1A616] text-white"
              variant={"outline"}
              onClick={() => recognition.start()}
            >
              Help
            </Button>
            <Button
              className="rounded-2xl border-[#C1A616]"
              variant={"outline"}
              onClick={() => "current" in ref! && ref!.current?.play()}
            >
              Repeat
            </Button>
          </div>
        </div>
      </footer>
    );
  },
);
