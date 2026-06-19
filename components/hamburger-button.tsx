"use client"

import type { CSSProperties } from "react"

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export function HamburgerButton({ isOpen, onClick, className = "" }: HamburgerButtonProps) {
  const lineStyle: CSSProperties = {
    width: "24px",
    height: "1px",
    backgroundColor: "currentColor",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transformOrigin: "center",
  }

  const topLineStyle: CSSProperties = {
    ...lineStyle,
    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
  }

  const bottomLineStyle: CSSProperties = {
    ...lineStyle,
    transform: isOpen ? "rotate(-45deg)" : "rotate(0deg)",
    marginTop: isOpen ? "-1px" : "6px",
  }

  return (
    <button
      onClick={onClick}
      className={`p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md relative z-10 ${className}`}
      style={{
        focusRingColor: isOpen ? "white" : "currentColor",
      }}
      aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
      aria-expanded={isOpen}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <div style={topLineStyle} />
        <div style={bottomLineStyle} />
      </div>
    </button>
  )
}
