"use client";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";

export const Header = () => {
  const [isMuted, setIsMuted] = React.useState(false);
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  return (
    <header>
      <div className="m-10 flex justify-end">
        <div className={`flex items-center rounded-full transition-colors`}>
          <Button
            className={`rounded-l-full p-2 transition-colors `}
            onClick={toggleMute}
            aria-label="Mute"
          >
            <VolumeX className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-zinc-300"></div>
          <Button
            className={`rounded-r-full p-2 transition-colors `}
            onClick={toggleMute}
            aria-label="Unmute"
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
