"use client"

import { useEffect, useRef } from "react"

interface SyncRateMonitorProps {
  rate: number
}

export default function SyncRateMonitor({ rate }: SyncRateMonitorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 150
    canvas.height = 80

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw border
    ctx.strokeStyle =
      rate > 90 ? "rgba(16, 185, 129, 0.5)" : rate > 75 ? "rgba(245, 158, 11, 0.5)" : "rgba(239, 68, 68, 0.5)"
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    // Draw title
    ctx.fillStyle = "#e5e7eb"
    ctx.font = "10px monospace"
    ctx.fillText("SYNCHRONIZATION RATE", 10, 15)

    // Draw rate
    ctx.fillStyle = rate > 90 ? "#10b981" : rate > 75 ? "#f59e0b" : "#ef4444"
    ctx.font = "bold 24px monospace"
    ctx.fillText(`${rate}%`, 10, 45)

    // Draw graph
    const graphWidth = 130
    const graphHeight = 20
    const graphX = 10
    const graphY = 55

    // Graph background
    ctx.fillStyle = "rgba(26, 26, 46, 0.7)"
    ctx.fillRect(graphX, graphY, graphWidth, graphHeight)

    // Graph fill
    const fillWidth = (rate / 100) * graphWidth
    const gradient = ctx.createLinearGradient(graphX, 0, graphX + fillWidth, 0)
    gradient.addColorStop(0, "#6b46c1")
    gradient.addColorStop(1, rate > 90 ? "#10b981" : rate > 75 ? "#f59e0b" : "#ef4444")

    ctx.fillStyle = gradient
    ctx.fillRect(graphX, graphY, fillWidth, graphHeight)

    // Graph ticks
    ctx.strokeStyle = "rgba(229, 231, 235, 0.3)"
    ctx.beginPath()
    for (let i = 1; i < 10; i++) {
      const x = graphX + (graphWidth / 10) * i
      ctx.moveTo(x, graphY)
      ctx.lineTo(x, graphY + graphHeight)
    }
    ctx.stroke()
  }, [rate])

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full" />
    </div>
  )
}
