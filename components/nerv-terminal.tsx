"use client"

import { useState, useEffect, useRef } from "react"
import { AlertTriangle } from "lucide-react"

export default function NervTerminal() {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const fullText = `
> NERV CENTRAL DOGMA TERMINAL
> ACCESS GRANTED: DEVELOPER INTERFACE
> SECURITY CLEARANCE: LEVEL 3

SYSTEM STATUS: OPERATIONAL
THREAT LEVEL: MINIMAL
CURRENT LOCATION: TOKYO-3

This portfolio showcases my work as a developer,
designed with the aesthetic of NERV from
Evangelion. Browse through my projects and
repositories to see my technical capabilities.

> READY FOR DEPLOYMENT
`.trim()
  const textRef = useRef(fullText)
  const indexRef = useRef(0)

  useEffect(() => {
    // Type text effect
    const typingInterval = setInterval(() => {
      if (indexRef.current < textRef.current.length) {
        setText(textRef.current.substring(0, indexRef.current + 1))
        indexRef.current += 1
      } else {
        clearInterval(typingInterval)
      }
    }, 30)

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <div className="bg-nerv-black border border-nerv-red/30 rounded-md p-6 shadow-lg shadow-nerv-red/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-nerv-red mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-nerv-orange mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-nerv-light/50"></div>
        </div>
        <div className="text-xs text-nerv-light/50 font-helvetica">NERV-OS v3.33</div>
      </div>

      <div className="flex items-center mb-4 px-2 py-1 bg-nerv-red/10 border border-nerv-red/30 rounded">
        <AlertTriangle className="w-4 h-4 text-nerv-red mr-2" />
        <div className="text-xs text-nerv-red font-helvetica">CLASSIFIED INFORMATION - AUTHORIZED ACCESS ONLY</div>
      </div>

      <div className="font-mono text-nerv-light text-sm whitespace-pre-line leading-relaxed">
        {text}
        {cursorVisible && <span className="text-nerv-red">_</span>}
      </div>
    </div>
  )
}
