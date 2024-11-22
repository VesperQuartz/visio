'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import React from "react";

interface AudioPlaybackProps {
  path: string
}

export default function AudioPlayback({ path }: AudioPlaybackProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)
  const audioRef = React.useRef();
  
  return (
    <div className="flex items-center space-x-4">
      <Button
        onClick={() => audioRef.current.play()}
        variant="default"
        size="icon"
        className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-300"
      >
        <audio src={path} autoplay={path? true: false} ref={audioRef}></audio>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full transition-all duration-300 hover:bg-gray-200"
      >
        <RotateCcw className="w-6 h-6" />
      </Button>
    </div>
  )
}

