"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollBackground() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafId = useRef<number | null>(null)
  const pendingProgressRef = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const totalScrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      )
      const docHeight = totalScrollHeight - window.innerHeight
      const rangeFactor = 0.3 // über die ersten 30% der Seite
      const progress = Math.min(docHeight > 0 ? scrollTop / (docHeight * rangeFactor) : 0, 1)

      // Throttle auf Animation Frames für sanftere Updates
      pendingProgressRef.current = progress
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(() => {
          if (pendingProgressRef.current != null) {
            setScrollProgress(pendingProgressRef.current)
          }
          rafId.current = null
        })
      }
    }

    // Initiale Messungen (direkt und nach einem Frame, falls Layout noch nicht final)
    handleScroll()
    requestAnimationFrame(handleScroll)

    window.addEventListener("scroll", handleScroll, { passive: true } as AddEventListenerOptions)
    window.addEventListener("resize", handleScroll, { passive: true } as AddEventListenerOptions)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Interpolation zwischen Weiß (#F6FAFF) und Schwarz (#0E1012)
  const interpolateColor = (progress: number) => {
    const white = { r: 246, g: 250, b: 255 } // #F6FAFF
    const black = { r: 14, g: 16, b: 18 } // #0E1012

    const r = Math.round(white.r + (black.r - white.r) * progress)
    const g = Math.round(white.g + (black.g - white.g) * progress)
    const b = Math.round(white.b + (black.b - white.b) * progress)

    return `rgb(${r}, ${g}, ${b})`
  }

  // Textfarbe basierend auf Hintergrund
  const getTextColor = (progress: number) => {
    return progress > 0.5 ? "#F6FAFF" : "#0E1012"
  }

  return {
    backgroundColor: interpolateColor(scrollProgress),
    textColor: getTextColor(scrollProgress),
    scrollProgress,
  }
}
