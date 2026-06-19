"use client"

import { useEffect, useState } from "react"

export function PageReveal() {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    // Start animation sequence
    const timer1 = setTimeout(() => setAnimationPhase(1), 500) // Initial delay
    const timer2 = setTimeout(() => setAnimationPhase(2), 1500) // Horizontal expansion
    const timer3 = setTimeout(() => setAnimationPhase(3), 2500) // Full reveal

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  if (animationPhase >= 3) {
    return null // Remove overlay completely after animation
  }

  const getClipPath = () => {
    switch (animationPhase) {
      case 0:
        // Initial state: thin line at center
        return "polygon(19% 50%, 20% 50%, 20% 50%, 19% 50%)"
      case 1:
        // Horizontal expansion: line expands to 62% width
        return "polygon(19% 50%, 81% 50%, 81% 50%, 19% 50%)"
      case 2:
        // Full reveal: expand to cover entire screen
        return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      default:
        return "polygon(19% 50%, 20% 50%, 20% 50%, 19% 50%)"
    }
  }

  const getTransitionDuration = () => {
    switch (animationPhase) {
      case 1:
        return "1000ms" // Horizontal expansion
      case 2:
        return "800ms" // Full reveal
      default:
        return "0ms"
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        background: "#F6FAFF",
        clipPath: getClipPath(),
        transition: `clip-path ${getTransitionDuration()} cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {/* Black background behind the reveal */}
      <div className="absolute inset-0 -z-10" style={{ background: "#0E1012" }} />
    </div>
  )
}
