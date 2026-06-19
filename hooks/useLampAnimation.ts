"use client"

import { useEffect, useRef, useState } from "react"

export function useLampAnimation() {
  const [isLampOn, setIsLampOn] = useState(false)
  const [ellipseOpacity, setEllipseOpacity] = useState(0)
  const [lampOpacity, setLampOpacity] = useState(0)
  const rafId = useRef<number | null>(null)
  const pendingScrollRef = useRef<number | null>(null)

  useEffect(() => {
    const computeAndSet = (scrollTop: number) => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Berechne die tatsächliche Position der Lampe (44% der Dokumenthöhe)
      const lampPosition = documentHeight * 0.44
      const lampHeight = 799 // Lampe ist 799px hoch

      // Berechne, wann die Oberseite der Lampe den oberen Bildschirmrand erreicht
      const lampTopReachesViewportTop = lampPosition - lampHeight / 2
      const lampReaches100Percent = lampTopReachesViewportTop + windowHeight * 0.3 // 100% wird nach 30% des Viewports erreicht

      // Opacity-Verlauf beginnt erst, wenn Lampen-Oberseite den oberen Rand erreicht
      let calculatedLampOpacity = 0
      if (scrollTop >= lampTopReachesViewportTop && scrollTop <= lampReaches100Percent) {
        const progressToFull =
          (scrollTop - lampTopReachesViewportTop) / (lampReaches100Percent - lampTopReachesViewportTop)
        calculatedLampOpacity = Math.min(Math.max(progressToFull, 0), 1)
      } else if (scrollTop > lampReaches100Percent) {
        calculatedLampOpacity = 1
      }
      setLampOpacity(calculatedLampOpacity)

      // Berechne die Position der Ellipse direkt am Ende der Lampe (ohne Abstand)
      const lampBottom = lampPosition + 680 // Ende der Lampe mit 680px
      const ellipsePosition = lampBottom // Direkt am Lampen-Ende, ohne Abstand
      const ellipseHeight = windowHeight > 768 ? 660 : windowHeight > 480 ? 400 : 320
      const ellipseTop = ellipsePosition - ellipseHeight / 2
      const ellipseBottom = ellipsePosition + ellipseHeight / 2

      // Prüfe, ob die Ellipse größtenteils im Viewport ist (80% Sichtbarkeit)
      const viewportTop = scrollTop
      const viewportBottom = scrollTop + windowHeight

      const visibleTop = Math.max(ellipseTop, viewportTop)
      const visibleBottom = Math.min(ellipseBottom, viewportBottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const visibilityPercentage = visibleHeight / ellipseHeight

      // Lampe anschalten und Ellipse sichtbar machen, wenn 80% der Ellipse sichtbar ist
      // ABER: Lampe bleibt an, sobald sie einmal angeschaltet wurde (außer bei Scroll zum Seitenanfang)
      if (visibilityPercentage >= 0.8) {
        setIsLampOn(true)
        setEllipseOpacity(0.6)
      } else if (scrollTop < lampTopReachesViewportTop * 0.5) {
        // Lampe nur ausschalten, wenn weit zum Seitenanfang zurückgescrollt wird
        setIsLampOn(false)
        setEllipseOpacity(0)
      }
    }

    const onScroll = () => {
      pendingScrollRef.current = window.scrollY
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null
          if (pendingScrollRef.current != null) {
            computeAndSet(pendingScrollRef.current)
          }
        })
      }
    }

    // Initial call (verhindert Start-Delay)
    computeAndSet(window.scrollY)

    window.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions)
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return {
    isLampOn,
    ellipseOpacity,
    lampOpacity,
  }
}
