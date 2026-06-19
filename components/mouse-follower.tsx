"use client"

import { useEffect, useRef } from "react"

export function MouseFollower() {
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursorDot = cursorDotRef.current

    if (!cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animateCursor = () => {
      dotX += (mouseX - dotX) * 0.3
      dotY += (mouseY - dotY) * 0.3

      cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`

      requestAnimationFrame(animateCursor)
    }

    const initializeCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dotX = mouseX
      dotY = mouseY

      cursorDot.style.opacity = "1"
    }

    const handleMouseLeave = () => {
      cursorDot.style.opacity = "0"
    }

    const handleMouseEnter = () => {
      cursorDot.style.opacity = "1"
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    document.addEventListener("mousemove", initializeCursor, { once: true })

    animateCursor()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-50 opacity-0 transition-opacity duration-300 hidden md:block"
        style={{
          background: "rgba(255,255,255,0.8)",
          borderRadius: "50%",
        }}
      />
    </>
  )
}
