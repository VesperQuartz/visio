'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface AudioPlaybackProps {
  text: string
}

export default function AudioPlayback({ text }: AudioPlaybackProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    const newUtterance = new SpeechSynthesisUtterance(text)
    setUtterance(newUtterance)

    return () => {
      speechSynthesis.cancel()
    }
  }, [text])

  const togglePlayback = () => {
    if (isPlaying) {
      speechSynthesis.pause()
    } else {
      if (speechSynthesis.paused) {
        speechSynthesis.resume()
      } else {
        speechSynthesis.cancel()
        if (utterance) {
          speechSynthesis.speak(utterance)
        }
      }
    }
    setIsPlaying(!isPlaying)
  }

  const restartPlayback = () => {
    speechSynthesis.cancel()
    if (utterance) {
      speechSynthesis.speak(utterance)
    }
    setIsPlaying(true)
  }

  return (
    <div className="flex items-center space-x-4">
      <Button
        onClick={togglePlayback}
        variant="default"
        size="icon"
        className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-300"
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </Button>
      <Button
        onClick={restartPlayback}
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full transition-all duration-300 hover:bg-gray-200"
      >
        <RotateCcw className="w-6 h-6" />
      </Button>
    </div>
  )
}

