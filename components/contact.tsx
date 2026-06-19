"use client"

import { useState, useEffect } from "react"

export function Contact() {
  const [currentTime, setCurrentTime] = useState("")
  const [isEmailHovered, setIsEmailHovered] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const berlinTime = new Intl.DateTimeFormat("de-DE", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)
      setCurrentTime(berlinTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="contact" className="h-screen flex flex-col pt-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto text-center flex-1 flex flex-col pt-8">
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-normal whitespace-nowrap">
              <span style={{ fontFamily: "var(--font-poppins)" }} className="text-white">
                LET'S CREATE SOMETHING{" "}
              </span>
              <span style={{ fontFamily: "var(--font-mak)" }} className="text-[#80C0FF]">
                SPECIAL
              </span>
            </h2>

             <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sterne-gdtRe8b8PWDQeDnXMbZcciYLTgSNzS.svg"
              alt="Stars sticker"
              className="absolute top-[28%] right-[10%] pointer-events-none w-40 sm:w-[264px] h-auto transition-opacity duration-700 ease-out"
              style={{
                transform: "translate(50%, -50%)",
                opacity: isEmailHovered ? 1 : 0,
                visibility: isEmailHovered ? 'visible' : 'hidden',
                transition: 'opacity 0.7s ease-out, visibility 0.7s ease-out'
              }}
            />
          </div>

          <div className="flex-grow flex items-center justify-center">
            <a
              href="mailto:abtweb@gamil.com"
              className="text-white hover:text-[#80C0FF] transition-colors duration-300"
              style={{ fontSize: "50px" }}
              onMouseEnter={() => setIsEmailHovered(true)}
              onMouseLeave={() => setIsEmailHovered(false)}
            >
              abtweb@gamil.com
            </a>
          </div>
        </div>

        <div className="text-right text-xs mb-4" style={{ color: "#C1CBD7" }}>
          © 2024 All rights reserved
        </div>
      </div>

      <div
        className="absolute bottom-4 left-6 flex items-center text-sm sm:text-lg font-light"
        style={{ color: "#C1CBD7" }}
      >
        <span>Berlin</span>
        <span className="mx-2">-</span>
        <span style={{ minWidth: "80px", textAlign: "left" }}>{currentTime}</span>
      </div>
    </section>
  )
}
