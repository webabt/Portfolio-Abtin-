"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface NavItem {
  href: string
  label: string
}

interface MobileMenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  onNavigate?: (href: string, title: string) => void
}

export function MobileMenuOverlay({ isOpen, onClose, navItems, onNavigate }: MobileMenuOverlayProps) {
  const [showContent, setShowContent] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Content erscheint nach der Hintergrund-Animation
      setTimeout(() => {
        setShowContent(true)
      }, 400)
    } else {
      // Content verschwindet sofort beim Schließen
      setShowContent(false)
    }
  }, [isOpen])

  // Verhindere Scrollen wenn Menü offen ist
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(href, label)
    }
  }

  return (
    <div className="lg:hidden">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Schwarzer animierter Hintergrund */}
            <motion.div
              className="fixed inset-0 z-40 bg-black"
              initial={{
                x: "100%",
                borderTopLeftRadius: "200px",
                borderBottomLeftRadius: "200px",
              }}
              animate={{
                x: "0%",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
              }}
              exit={{
                x: "100%",
                borderTopLeftRadius: "200px",
                borderBottomLeftRadius: "200px",
              }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
            />

            {/* Menu Content - nur anzeigen wenn showContent true ist */}
            {showContent && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <nav className="text-center">
                  {navItems.map((item, index) => (
                    <div key={item.href}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, item.label)}
                          className="block py-8 text-white text-4xl font-medium cursor-pointer"
                          style={{
                            opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.25 : 1,
                            filter: hoveredIndex !== null && hoveredIndex !== index ? "blur(3px)" : "none",
                            transition: "all 0.73s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                          }}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          {item.label}
                        </a>
                      </motion.div>

                      {/* Trennlinie zwischen den Menüpunkten */}
                      {index < navItems.length - 1 && (
                        <motion.div
                          className="h-px mx-auto my-4"
                          style={{
                            width: "100vw",
                            backgroundColor: "#595D61",
                          }}
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + 0.2,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        />
                      )}
                    </div>
                  ))}
                </nav>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
