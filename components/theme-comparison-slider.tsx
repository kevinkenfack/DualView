"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ThemeComparisonSliderProps {
  darkImage: string
  lightImage: string
  sliderPosition: number
  onSliderChange: (position: number) => void
}

export default function ThemeComparisonSlider({
  darkImage,
  lightImage,
  sliderPosition,
  onSliderChange,
}: ThemeComparisonSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)

    // Si on clique directement sur le document (pas sur le slider),
    // on met à jour la position du slider
    if (e.target !== sliderRef.current) {
      updateSliderPosition(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)

    // Si on touche directement sur le document (pas sur le slider),
    // on met à jour la position du slider
    if (e.target !== sliderRef.current && e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const updateSliderPosition = (clientX: number) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width
      const relativeX = clientX - containerRect.left

      // Calculate position as percentage
      let newPosition = (relativeX / containerWidth) * 100

      // Clamp between 0 and 100
      newPosition = Math.max(0, Math.min(100, newPosition))

      onSliderChange(newPosition)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e.clientX)
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX)
    }
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleTouchEnd)

      // Ajouter la classe au body pour changer le curseur partout
      document.body.classList.add("dragging-slider")
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)

      // Retirer la classe du body
      document.body.classList.remove("dragging-slider")
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      document.body.classList.remove("dragging-slider")
    }
  }, [isDragging])

  return (
    <motion.div
      ref={containerRef}
      className="relative w-[85%] max-w-4xl aspect-auto overflow-hidden rounded-2xl shadow-2xl mx-auto z-10"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ height: "auto", maxHeight: "80vh" }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Dark image (left side) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${darkImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Light image (right side) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${lightImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
        }}
      />

      {/* Slider bar - simple line with thicker middle */}
      <div
        ref={sliderRef}
        className="absolute top-0 bottom-0 w-[3px] bg-white shadow-lg slider-handle"
        style={{
          left: `calc(${sliderPosition}% - 1.5px)`,
        }}
      >
        {/* Thicker middle part */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120px] w-[5px] bg-white rounded-full" />
      </div>

      {/* Placeholder to maintain aspect ratio */}
      <img src={darkImage || "/placeholder.svg"} alt="Aspect ratio placeholder" className="w-full h-auto invisible" />
    </motion.div>
  )
}
