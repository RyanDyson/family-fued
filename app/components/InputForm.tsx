"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface InputFormProps {
  onGuess: (guess: string) => void
}

export default function InputForm({ onGuess }: InputFormProps) {
  const [guess, setGuess] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (guess.trim()) {
      onGuess(guess.trim())
      setGuess("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
        className="flex-grow"
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}

