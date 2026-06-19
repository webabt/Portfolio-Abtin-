"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HamburgerButton } from "@/components/hamburger-button"
import { MobileMenuOverlay } from "@/components/mobile-menu-overlay"
import { PageTransition } from "@/components/page-transition"
import { usePageTransition } from "@/hooks/use-page-transition"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  const {
    isTransitioning,
    transitionTitle,
    navigateWithTransition,
    handleTransitionCovered,
    handleTransitionComplete,
  } = usePageTransition()

  const isHomePage = pathname === "/"
  const headerTextColor = isHomePage ? "text-[#80C0FF]" : "text-white"

  useEffect(() => {
    const handleRevealComplete = () => {
      // Header erscheint 500ms nach Reveal-Completion
      setTimeout(() => {
        setIsVisible(true)
      }, 500)
    }

    // Für andere Seiten sofort anzeigen
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      setIsVisible(true)
    } else {
      window.addEventListener("revealComplete", handleRevealComplete)
    }

    return () => window.removeEventListener("revealComplete", handleRevealComplete)
  }, [])

  const navItems = [
    { href: "/work", label: "WORK" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
  ]

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault()
    navigateWithTransition(href, label)
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        } ${isMenuOpen ? "z-[60]" : "z-50"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link
              href="/"
              className={`text-2xl font-semibold transition-colors duration-300 ${
                isMenuOpen ? "text-white" : headerTextColor
              }`}
            >
              ABTIN
            </Link>

            {/* Desktop Navigation - nur auf großen Bildschirmen */}
            <nav className="hidden lg:flex space-x-12">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.label)}
                  className={`hover:opacity-70 transition-opacity font-medium cursor-pointer ${headerTextColor}`}
                  style={{ fontSize: "13px" }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile/Tablet Menu Button - für alle Bildschirme unter lg */}
            <div className="lg:hidden">
              <HamburgerButton
                isOpen={isMenuOpen}
                onClick={handleMenuToggle}
                className={isMenuOpen ? "text-white" : headerTextColor}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Menu Overlay */}
      <MobileMenuOverlay
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        navItems={navItems}
        onNavigate={navigateWithTransition}
      />

      {isTransitioning && (
        <PageTransition
          title={transitionTitle}
          onCovered={() => {
            // Menü automatisch schließen, sobald der Screen von der Transition bedeckt ist
            setIsMenuOpen(false)
            handleTransitionCovered()
          }}
          onComplete={handleTransitionComplete}
        />
      )}
    </>
  )
}
