"use client"

import { useEffect, useRef } from "react"

export default function ATField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Hexagon pattern properties
    const hexSize = 40
    const hexSpacing = 70
    const hexColor = "rgba(107, 70, 193, 0.1)" // Purple
    const hexBorderColor = "rgba(16, 185, 129, 0.15)" // Green

    // Draw hexagon function
    const drawHexagon = (x: number, y: number, size: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const xPos = x + size * Math.cos(angle)
        const yPos = y + size * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(xPos, yPos)
        } else {
          ctx.lineTo(xPos, yPos)
        }
      }
      ctx.closePath()
      ctx.fillStyle = hexColor
      ctx.fill()
      ctx.strokeStyle = hexBorderColor
      ctx.stroke()
    }

    // Animation variables
    let animationFrame: number
    let offset = 0

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate rows and columns needed to fill screen
      const cols = Math.ceil(canvas.width / hexSpacing) + 2
      const rows = Math.ceil(canvas.height / hexSpacing) + 2

      // Draw hexagon grid with offset for animation
      for (let i = -1; i < rows; i++) {
        for (let j = -1; j < cols; j++) {
          const xPos = j * hexSpacing + ((i % 2) * hexSpacing) / 2 + offset
          const yPos = i * hexSpacing * 0.866 // Height of hexagon is sin(60°) * size

          drawHexagon(xPos, yPos, hexSize)
        }
      }

      // Slowly move the pattern
      offset = (offset + 0.2) % hexSpacing

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-50" />
}
