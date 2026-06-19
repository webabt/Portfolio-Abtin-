"use client"

import { useEffect, useState } from "react"

export function PageRevealFixed() {
  const [mounted, setMounted] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Gesamtdauer auf 3.5 Sekunden reduzieren
    const completeTimer = setTimeout(() => {
      setAnimationComplete(true)
      // Trigger für nachfolgende Animationen
      window.dispatchEvent(new CustomEvent("revealComplete"))
    }, 3500)

    return () => clearTimeout(completeTimer)
  }, [])

  if (!mounted || animationComplete) return null

  return (
    <>
      {/* Schwarzer Hintergrund */}
      <div
        className="fixed inset-0 z-[9999]"
        style={{
          background: "#0E1012",
          animation: "fadeOut 300ms ease-out 3200ms forwards",
        }}
      />

      {/* Weiße Reveal-Form - startet links mit 1px Breite */}
      <div
        className="fixed inset-0 z-[10000] pointer-events-none"
        style={{
          background: "#F6FAFF",
          clipPath: "polygon(19% 49.95%, 19% 49.95%, 19% 50.05%, 19% 50.05%)",
          animation: `
            expandLeftToRight 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 500ms forwards,
            expandFull 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 2500ms forwards
          `,
        }}
      />

      <style jsx>{`
        @keyframes expandLeftToRight {
          0% {
            clip-path: polygon(19% 49.95%, 19% 49.95%, 19% 50.05%, 19% 50.05%);
          }
          100% {
            clip-path: polygon(19% 49.95%, 81% 49.95%, 81% 50.05%, 19% 50.05%);
          }
        }
        
        @keyframes expandFull {
          to {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }
        
        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>
    </>
  )
}
