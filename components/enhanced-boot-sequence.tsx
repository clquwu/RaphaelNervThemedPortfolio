"use client"

import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"

interface BootSequenceProps {
  onComplete: () => void
}

export default function EnhancedBootSequence({ onComplete }: BootSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0) 

  const bootSteps = [
    "NERV CENTRAL DOGMA TERMINAL v3.33",
    "Initializing MAGI System...",
    "MELCHIOR: ONLINE",
    "BALTHASAR: ONLINE", 
    "CASPER: ONLINE",
    "MAGI Consensus Protocol: ACTIVE",
    "",
    "Initializing Terminal Interface...",
    "Loading Security Protocols...",
    "Authenticating User Credentials...",
    "",
    "PILOT ID: Raphael Boullay--Le Fur",
    "CLEARANCE LEVEL: 3",
    "ACCESS GRANTED",
    "",
    "Welcome to NERV Operations Terminal",
    "",
    ">>> BOOT SEQUENCE COMPLETE <<<"
  ]
  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const currentLine = bootSteps[currentStep];

      if (currentLine === "") {
        setTimeout(() => {
          setCurrentText(prev => prev + "\n");
          setCurrentStep(prev => prev + 1);
          setCharIndex(0); // reset charIndex
        }, 30);
      } else if (charIndex < currentLine.length) {
        setTimeout(() => {
          setCurrentText(prev => prev + currentLine[charIndex]);
          setCharIndex(prev => prev + 1);
        }, 7);
      } else {
        setTimeout(() => {
          setCurrentText(prev => prev + "\n");
          setCurrentStep(prev => prev + 1);
          setCharIndex(0); // reset charIndex
        }, 30);
      }
    } else {
      setTimeout(() => {
        setIsTyping(false);
        setTimeout(onComplete, 200);
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, charIndex, onComplete]);

  return (
    <div className="h-screen w-screen bg-nerv-black flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl p-8">
        <div className="bg-nerv-dark border border-nerv-red/30 rounded-md p-6 shadow-lg shadow-nerv-red/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-nerv-red mr-2 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-nerv-orange mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-nerv-light/50"></div>
            </div>
            <div className="text-xs text-nerv-light/50 font-helvetica">NERV-OS v3.33</div>
          </div>

          <div className="flex items-center mb-4 px-2 py-1 bg-nerv-red/10 border border-nerv-red/30 rounded">
            <AlertTriangle className="w-4 h-4 text-nerv-red mr-2" />
            <div className="text-xs text-nerv-red font-helvetica">CLASSIFIED INFORMATION - AUTHORIZED ACCESS ONLY</div>
          </div>

          <div className="font-mono text-nerv-light text-sm whitespace-pre-line leading-relaxed min-h-[400px]">
            {currentText}
            {isTyping && <span className="text-nerv-red animate-pulse">_</span>}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="w-64 h-2 bg-nerv-dark rounded-full overflow-hidden border border-nerv-red/30">
            <div 
              className="h-full bg-gradient-to-r from-nerv-red to-nerv-orange transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / bootSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-sm text-nerv-light/70 font-helvetica">
            INITIALIZING SYSTEMS... {Math.round((currentStep / bootSteps.length) * 100)}%
          </div>
        </div>
      </div>
    </div>
  )
}