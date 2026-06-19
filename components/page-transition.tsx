"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface PageTransitionProps {
  title: string
  onComplete?: () => void
  /** Wird aufgerufen, sobald der Overlay-Bereich den Bildschirm vollständig bedeckt. */
  onCovered?: () => void
}

export function PageTransition({ title, onComplete, onCovered }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const wordsContainerRef = useRef<HTMLDivElement>(null)
  const wordsRowRef = useRef<HTMLDivElement>(null)
  const firstWordRef = useRef<HTMLSpanElement>(null)
  const lastWordRef = useRef<HTMLSpanElement>(null)
  const onCoveredRef = useRef<PageTransitionProps["onCovered"]>(null)
  const onCompleteRef = useRef<PageTransitionProps["onComplete"]>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Halte die neuesten Callback-Refs aktuell, ohne die Animation neu zu starten
  useEffect(() => {
    onCoveredRef.current = onCovered
    onCompleteRef.current = onComplete
  }, [onCovered, onComplete])

  // Baue die 9-Wörter-Sequenz dynamisch, sodass das letzte Wort dem Titel entspricht
  const baseWords = ["About", "Work", "Contact"]
  const normalizedTitle = (title || "").toLowerCase()
  const desiredLastWord =
    normalizedTitle === "about"
      ? "About"
      : normalizedTitle === "work"
      ? "Work"
      : normalizedTitle === "contact"
      ? "Contact"
      : title

  const displayWords: string[] = [...baseWords, ...baseWords, ...baseWords]
  if (["About", "Work", "Contact"].includes(desiredLastWord)) {
    // rotiere, bis das letzte Wort das gewünschte ist
    while (displayWords[displayWords.length - 1] !== desiredLastWord) {
      const first = displayWords.shift() as string
      displayWords.push(first)
    }
  } else {
    // falls ein anderer Titel hereinkommt, setze ihn als letztes Wort
    displayWords[displayWords.length - 1] = desiredLastWord
  }

  useEffect(() => {
    const initAnimation = () => {
      const overlay = overlayRef.current
      const wordsContainer = wordsContainerRef.current
      const firstWord = firstWordRef.current
      const lastWord = lastWordRef.current

      if (!overlay || !wordsContainer || !firstWord || !lastWord) return

      // Initial states
      gsap.set(overlay, {
        y: "100%", // Start from bottom (hidden)
        zIndex: 1000,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      })

      gsap.set(wordsContainer, {
        opacity: 0,
        zIndex: 1002,
      })

      // Animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          if (onCompleteRef.current) onCompleteRef.current()
        },
      })
      timelineRef.current = tl

      // Geometrie messen (bei x = 0)
      const overlayRect = overlay.getBoundingClientRect()
      const vw = overlayRect.width
      const firstRect = firstWord.getBoundingClientRect()
      const lastRect = lastWord.getBoundingClientRect()
      // Startposition: erstes Wort komplett links außerhalb, rechte Kante bei x = 0
      const startX = -firstRect.right + overlayRect.left
      // Endposition: Mittelpunkt des letzten Wortes in der Bildschirmmitte
      const lastCenterAtZero = lastRect.left - overlayRect.left + lastRect.width / 2
      const endX = vw / 2 - lastCenterAtZero

      tl.to(overlay, {
        y: 0,
        duration: 0.7,
        ease: "power2.inOut",
      })
        .call(() => {
          // HIER PASSIERT DIE MAGIE: Seitenwechsel auslösen
          if (onCoveredRef.current) onCoveredRef.current()
        })
        // Wörter: sichtbar machen und Bewegung ab Timeline-Beginn starten (gleichzeitig mit Overlay)
        .set(wordsContainer, { x: startX, opacity: 1 }, 0)
        .to(
          wordsContainer,
          {
            x: endX,
            duration: 2.1,
            ease: "power2.out",
          },
          0,
        )
        
        .to(overlay, {
          y: "-100%",
          borderBottomLeftRadius: 300,
          borderBottomRightRadius: 300,
          duration: 1.1,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(overlay, { display: "none" })
          },
        })
    }

    initAnimation()
    return () => {
      // Aufräumen, falls Komponente doch unmounted wird
      if (timelineRef.current) {
        try {
          timelineRef.current.kill()
        } catch {}
        timelineRef.current = null
      }
    }
  }, [title])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#1E40AF", // Passen Sie die Farbe hier an
        zIndex: 1000,
        transform: "translateY(100%)", // Start hidden at the bottom
      }}
    >
      <div
        ref={wordsContainerRef}
        className="absolute inset-0 flex items-center justify-start whitespace-nowrap"
        style={{ zIndex: 1002 }}
      >
        <div ref={wordsRowRef} className="flex items-center text-white font-bold text-[130px] sm:text-[100px] md:text-[130px] lg:text-[130px] leading-none tracking-wider">
          {displayWords.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              ref={idx === 0 ? firstWordRef : idx === displayWords.length - 1 ? lastWordRef : undefined}
              className={idx === 0 ? "inline-block" : "inline-block ml-[530px]"}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
