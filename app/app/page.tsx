"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ImageUploader from "@/components/image-uploader"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function AppPage() {
  const [lightImage, setLightImage] = useState<string | null>(null)
  const [darkImage, setDarkImage] = useState<string | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleReset = () => {
    setShowComparison(false)
  }

  // Effet de transition pour le slider
  useEffect(() => {
    if (showComparison) {
      // Animation du slider de 0 à 50%
      const timer = setTimeout(() => {
        setSliderPosition(50)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setSliderPosition(0)
    }
  }, [showComparison])

  // Gestion du slider global
  const handleMouseDown = (e: React.MouseEvent) => {
    if (showComparison) {
      setIsDragging(true)
      updateSliderPosition(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e.clientX)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (showComparison) {
      setIsDragging(true)
      if (e.touches[0]) {
        updateSliderPosition(e.touches[0].clientX)
      }
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const updateSliderPosition = (clientX: number) => {
    const windowWidth = window.innerWidth
    let newPosition = (clientX / windowWidth) * 100
    newPosition = Math.max(0, Math.min(100, newPosition))
    setSliderPosition(newPosition)
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
    <div
      className="min-h-screen w-full bg-zinc-50 text-zinc-900 overflow-hidden"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Background image - always visible */}
      {backgroundImage && (
        <div
          className="fixed inset-0 w-full h-full z-0 transition-opacity duration-500"
          style={{ opacity: showComparison ? 1 : 0.3 }}
        >
          <img src={backgroundImage || "/placeholder.svg"} alt="Arrière-plan" className="w-full h-full object-cover" />

          {/* Dark overlay for the left side (dark mode) - using the same sliderPosition */}
          {showComparison && (
            <div
              className="absolute inset-0 bg-black transition-opacity duration-300"
              style={{
                opacity: 0.5,
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
            />
          )}
        </div>
      )}

      {/* Slider bar global - only in comparison mode */}
      {showComparison && (
        <div
          className="fixed top-0 bottom-0 w-[3px] bg-white shadow-lg z-50 slider-handle"
          style={{
            left: `calc(${sliderPosition}% - 1.5px)`,
          }}
        >
          {/* Thicker middle part */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120px] w-[5px] bg-white rounded-full" />
        </div>
      )}

      {/* Back button - only in comparison mode */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-6 z-50"
          >
            <Button
              onClick={handleReset}
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 bg-white/80 backdrop-blur-md border-zinc-200 hover:bg-white shadow-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showComparison ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 container mx-auto py-16 px-4"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-zinc-800 to-zinc-500 bg-clip-text text-transparent">
                  Mode Clair/Sombre Comparaison
                </h1>
                <p className="text-zinc-600 text-xl max-w-2xl mx-auto">
                  Créez des comparaisons interactives entre vos designs en mode clair et sombre
                </p>
              </div>

              <div className="grid gap-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-zinc-100">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                        <span className="text-zinc-800">1</span>
                      </div>
                      Image Mode Clair
                    </h2>
                    <ImageUploader
                      onImageSelected={(imageUrl) => setLightImage(imageUrl)}
                      imageUrl={lightImage}
                      label="Télécharger l'image en mode clair"
                    />
                  </div>
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-zinc-100">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                        <span className="text-zinc-800">2</span>
                      </div>
                      Image Mode Sombre
                    </h2>
                    <ImageUploader
                      onImageSelected={(imageUrl) => setDarkImage(imageUrl)}
                      imageUrl={darkImage}
                      label="Télécharger l'image en mode sombre"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-xl border border-zinc-100">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                      <span className="text-zinc-800">3</span>
                    </div>
                    Image d'arrière-plan
                  </h2>
                  <ImageUploader
                    onImageSelected={(imageUrl) => setBackgroundImage(imageUrl)}
                    imageUrl={backgroundImage}
                    label="Télécharger l'image d'arrière-plan"
                  />
                </div>

                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => setShowComparison(true)}
                    disabled={!lightImage || !darkImage || !backgroundImage}
                    size="lg"
                    className="bg-zinc-900 hover:bg-zinc-800 text-white px-10 py-7 text-lg rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Upload className="h-5 w-5" />
                    Générer la comparaison
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="comparison"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full h-screen flex items-center justify-center pointer-events-none"
          >
            {/* Conteneur global pour les deux images */}
            <div className="relative w-[85%] max-w-4xl aspect-auto" style={{ maxHeight: "80vh" }}>
              {/* Conteneur pour l'image sombre (gauche du slider) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                {darkImage && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${darkImage})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                )}
              </div>

              {/* Conteneur pour l'image claire (droite du slider) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
              >
                {lightImage && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${lightImage})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                )}
              </div>

              {/* Placeholder pour maintenir le ratio */}
              {darkImage && (
                <img
                  src={darkImage || "/placeholder.svg"}
                  alt="Aspect ratio placeholder"
                  className="w-full h-auto invisible"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
