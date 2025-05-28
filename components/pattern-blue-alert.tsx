"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PatternBlueAlertProps {
  onClose: () => void
}

export default function PatternBlueAlert({ onClose }: PatternBlueAlertProps) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="max-w-md w-full bg-black border-2 border-eva-red animate-pulse p-6 rounded-md shadow-lg shadow-eva-red/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-eva-red mr-2" />
            <h2 className="text-eva-red text-xl font-bold">PATTERN BLUE DETECTED</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-eva-light hover:text-eva-red">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="bg-eva-red/10 border border-eva-red/30 p-3 rounded">
            <div className="text-eva-light text-sm">
              An Angel is approaching. All personnel should proceed to their designated battle stations.
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-eva-dark-secondary p-2 rounded border border-eva-light/20">
              <div className="text-xs text-eva-light/70">THREAT LEVEL</div>
              <div className="text-eva-red">SEVERE</div>
            </div>
            <div className="bg-eva-dark-secondary p-2 rounded border border-eva-light/20">
              <div className="text-xs text-eva-light/70">DISTANCE</div>
              <div className="text-eva-orange">2.5 KM</div>
            </div>
            <div className="bg-eva-dark-secondary p-2 rounded border border-eva-light/20">
              <div className="text-xs text-eva-light/70">ETA</div>
              <div className="text-eva-green">{countdown}m</div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1 bg-eva-red hover:bg-eva-red/80 text-white">DEPLOY EVA UNITS</Button>
            <Button
              variant="outline"
              className="flex-1 border-eva-light text-eva-light hover:bg-eva-light/10"
              onClick={onClose}
            >
              ACKNOWLEDGE
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
