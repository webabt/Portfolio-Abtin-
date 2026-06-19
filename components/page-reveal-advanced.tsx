"use client"

import { useEffect, useState } from "react"

export function PageRevealAdvanced() {
  const [mounted, setMounted] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Complete animation sequence timing
    const completeTimer = setTimeout(() => {
      setAnimationComplete(true)
    }, 3200)

    return () => clearTimeout(completeTimer)
  }, [])

  if (!mounted || animationComplete) return null

  return (
    <>
      {/* Black background overlay */}
      <div
        className="fixed inset-0 z-[9999]"
        style={{
          background: "#0E1012",
          animation: "fadeOut 300ms ease-out 3000ms forwards",
        }}
      />

      {/* White reveal shape */}
      <div
        className="fixed inset-0 z-[10000] pointer-events-none"
        style={{
          background: "#F6FAFF",
          clipPath: "polygon(19% 50%, 20% 50%, 20% 50%, 19% 50%)",
          animation: `
            expandHorizontal 1000ms cubic-bezier(0.4, 0, 0.2, 1) 500ms forwards,
            expandFull 800ms cubic-bezier(0.4, 0, 0.2, 1) 1800ms forwards
          `,
        }}
      />

      <style jsx>{`
        @keyframes expandHorizontal {
          to {
            clip-path: polygon(19% 50%, 81% 50%, 81% 50%, 19% 50%);
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
