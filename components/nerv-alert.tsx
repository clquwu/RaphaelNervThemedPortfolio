"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NervAlertProps {
  onClose: () => void
}

export default function NervAlert({ onClose }: NervAlertProps) {
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
      <div className="max-w-md w-full bg-nerv-black border-2 border-nerv-red animate-pulse p-6 rounded-md shadow-lg shadow-nerv-red/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-nerv-red mr-2" />
            <h2 className="text-nerv-red text-xl font-matisse eva-compressed">NERV SECURITY ALERT</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-nerv-light hover:text-nerv-red">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="bg-nerv-red/10 border border-nerv-red/30 p-3 rounded">
            <div className="text-nerv-light text-sm font-helvetica">
              Unauthorized access attempt detected. Security protocols activated. All systems on alert.
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-nerv-dark p-2 rounded border border-nerv-light/20">
              <div className="text-xs text-nerv-light/70 font-helvetica">THREAT LEVEL</div>
              <div className="text-nerv-red font-futura">MODERATE</div>
            </div>
            <div className="bg-nerv-dark p-2 rounded border border-nerv-light/20">
              <div className="text-xs text-nerv-light/70 font-helvetica">LOCATION</div>
              <div className="text-nerv-orange font-futura">SECTOR 7</div>
            </div>
            <div className="bg-nerv-dark p-2 rounded border border-nerv-light/20">
              <div className="text-xs text-nerv-light/70 font-helvetica">LOCKDOWN</div>
              <div className="text-nerv-light font-futura">{countdown}m</div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1 bg-nerv-red hover:bg-nerv-red/80 text-white font-helvetica">
              ACTIVATE DEFENSE
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-nerv-light text-nerv-light hover:bg-nerv-light/10 font-helvetica"
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
