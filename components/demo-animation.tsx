"use client"

import { useState, useEffect } from "react"

export default function DemoAnimation() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [direction, setDirection] = useState(1)

  // Animate the slider automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderPosition((prev) => {
        // Change direction when reaching the edges
        if (prev >= 80) setDirection(-1)
        if (prev <= 20) setDirection(1)

        return prev + direction * 0.5
      })
    }, 30)

    return () => clearInterval(interval)
  }, [direction])

  // Sample images for demo
  const darkImage = "/placeholder.svg?height=600&width=1200"
  const lightImage = "/placeholder.svg?height=600&width=1200"

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-2xl mx-auto border border-zinc-200">
      {/* Dark background for demo */}
      <div className="absolute inset-0 bg-zinc-900"></div>

      {/* Dark image (left side) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${darkImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7) contrast(1.2)",
        }}
      />

      {/* Light image (right side) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${lightImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(1.1) contrast(1)",
          clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
        }}
      />

      {/* Demo content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 h-3/4 flex flex-col items-center justify-center">
          <div className="w-full h-16 bg-zinc-800/50 mb-4 rounded-lg backdrop-blur-sm"></div>
          <div className="w-full flex-1 bg-zinc-800/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
            <div className="text-white text-2xl font-bold">Aperçu de l'application</div>
          </div>
        </div>
      </div>

      {/* Slider bar */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white shadow-lg"
        style={{
          left: `calc(${sliderPosition}% - 1.5px)`,
        }}
      >
        {/* Thicker middle part */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120px] w-[5px] bg-white rounded-full" />
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        Mode Sombre
      </div>
      <div className="absolute bottom-4 right-4 bg-white/50 text-black px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        Mode Clair
      </div>
    </div>
  )
}
