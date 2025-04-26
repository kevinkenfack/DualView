"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import { motion } from "framer-motion"

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void
  imageUrl: string | null
  label: string
}

export default function ImageUploader({ onImageSelected, imageUrl, label }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    onImageSelected("")
  }

  return (
    <div className="w-full">
      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />

      {!imageUrl ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging ? "border-zinc-600 bg-zinc-100" : "border-zinc-200 hover:border-zinc-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="flex flex-col items-center gap-3 py-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center"
            >
              <Upload className="h-8 w-8 text-zinc-400" />
            </motion.div>
            <p className="text-base text-zinc-700 font-medium">{label}</p>
            <p className="text-xs text-zinc-500">Glissez-déposez une image ou cliquez pour parcourir</p>
          </div>
        </div>
      ) : (
        <motion.div
          className="relative rounded-xl overflow-hidden group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Uploaded preview"
            className="w-full h-auto object-cover aspect-video"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleButtonClick}
              className="bg-white text-zinc-800 hover:bg-zinc-100"
            >
              Changer
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              <X className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
