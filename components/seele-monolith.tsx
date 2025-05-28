"use client"

import { useEffect, useRef } from "react"

export default function SeeleMonolith() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Draw the SEELE monolith
    const drawMonolith = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Monolith shape
      const monolithWidth = canvas.width * 0.8
      const monolithHeight = canvas.height * 0.8
      const x = (canvas.width - monolithWidth) / 2
      const y = (canvas.height - monolithHeight) / 2

      // Glow effect
      const gradient = ctx.createLinearGradient(x, y, x + monolithWidth, y + monolithHeight)
      gradient.addColorStop(0, "rgba(107, 70, 193, 0.2)")
      gradient.addColorStop(1, "rgba(16, 185, 129, 0.2)")

      ctx.shadowColor = "rgba(107, 70, 193, 0.5)"
      ctx.shadowBlur = 15

      // Draw monolith
      ctx.fillStyle = gradient
      ctx.fillRect(x, y, monolithWidth, monolithHeight)

      // Border
      ctx.strokeStyle = "rgba(107, 70, 193, 0.7)"
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, monolithWidth, monolithHeight)

      // SEELE logo (simplified seven eyes)
      ctx.fillStyle = "rgba(245, 158, 11, 0.8)"
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = monolithWidth * 0.2

      // Draw the main circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw the seven eyes (simplified as small circles)
      for (let i = 0; i < 7; i++) {
        const angle = ((Math.PI * 2) / 7) * i
        const eyeX = centerX + Math.cos(angle) * (radius * 0.6)
        const eyeY = centerY + Math.sin(angle) * (radius * 0.6)
        const eyeSize = radius * 0.15

        ctx.beginPath()
        ctx.arc(eyeX, eyeY, eyeSize, 0, Math.PI * 2)
        ctx.fill()
      }

      // Text
      ctx.fillStyle = "rgba(229, 231, 235, 0.7)"
      ctx.font = "12px monospace"
      ctx.textAlign = "center"
      ctx.fillText("SEELE", centerX, y + monolithHeight - 20)

      // Sound Only text
      ctx.fillStyle = "rgba(229, 231, 235, 0.9)"
      ctx.font = "bold 14px monospace"
      ctx.fillText("SOUND ONLY", centerX, y + 30)
    }

    // Initial draw
    drawMonolith()

    // Redraw on resize
    const handleResize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      drawMonolith()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="bg-black/70 border border-eva-purple/30 p-6 rounded-md">
      <h2 className="text-eva-orange text-lg mb-4">COMMITTEE CONNECTION</h2>
      <canvas ref={canvasRef} className="w-full h-40" />
    </div>
  )
}
