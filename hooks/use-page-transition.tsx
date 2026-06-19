// hooks/usePageTransition.ts (Ihre verbesserte Version)
"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionTitle, setTransitionTitle] = useState("")
  const [nextPath, setNextPath] = useState("") // Wichtig: Pfad speichern
  const router = useRouter()

  const navigateWithTransition = useCallback(
    (href: string, title: string) => {
      if (isTransitioning) return

      setNextPath(href) // Den Ziel-Pfad für später speichern
      setTransitionTitle(title)
      setIsTransitioning(true)
    },
    [isTransitioning],
  )

  const handleTransitionCovered = useCallback(() => {
    // Navigation auslösen, wenn der Bildschirm bedeckt ist
    if (nextPath) {
      router.push(nextPath)
    }
  }, [nextPath, router])

  const handleTransitionComplete = useCallback(() => {
    // Animation ist komplett fertig, alles zurücksetzen
    setIsTransitioning(false)
    setTransitionTitle("")
    setNextPath("")
  }, [])

  return {
    isTransitioning,
    transitionTitle,
    navigateWithTransition,
    handleTransitionCovered,
    handleTransitionComplete,
  }
}
