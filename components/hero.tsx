"use client"

import { useState, useEffect } from "react"

export function Hero() {
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const handleRevealComplete = () => {
      // Titel erscheint 1200ms nach Reveal-Completion (700ms nach Header)
      setTimeout(() => {
        setTitleVisible(true)
      }, 1200)
    }

    window.addEventListener("revealComplete", handleRevealComplete)
    return () => window.removeEventListener("revealComplete", handleRevealComplete)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1200 ease-out ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ color: "#80C0FF" }}
          >
            Willkommen zu meiner Welt.
          </h1>
        </div>
      </div>
    </section>
  )
}
