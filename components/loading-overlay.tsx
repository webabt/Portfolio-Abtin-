"use client"

import { useEffect, useState } from "react"

export function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide loading overlay after reveal animation completes
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[9998]"
      style={{
        background: "#0E1012",
        transition: "opacity 300ms ease-out",
        opacity: isVisible ? 1 : 0,
      }}
    />
  )
}
