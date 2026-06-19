"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function BridgeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const piecesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Initiale Offsets: 30%, 50%, 70%, 90%, 110% abwechselnd links/rechts
    piecesRef.current.forEach((piece, index) => {
      if (piece) {
        const magnitude = 30 + index * 20
        const fromLeft = index % 2 === 0
        const xPercent = fromLeft ? -magnitude : magnitude
        gsap.set(piece, { x: `${xPercent}%`, filter: "blur(12px)" })
      }
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom", // Start sobald der Abschnitt in den Viewport eintritt
        end: "bottom bottom", // Ende, wenn das letzte Stück den unteren Rand erreicht
        scrub: true, // ausschließlich scrollgesteuert
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Wenn komplett zusammengesetzt, Animation dauerhaft fixieren und nicht rückwärts laufen lassen
          if (self.progress >= 1) {
            // Sicherstellen, dass alle Stücke exakt in der Endposition bleiben
            gsap.set(piecesRef.current.filter(Boolean) as HTMLDivElement[], { x: "0%" })
            // ScrollTrigger/TL deaktivieren, Zustand beibehalten
            self.kill(false)
            tl.kill()
          }
        },
      },
    })

    // Alle Stücke bewegen sich gemeinsam in die Mitte
    tl.to(
      piecesRef.current.filter(Boolean) as HTMLDivElement[],
      {
        x: "0%",
        filter: "blur(0px)",
        ease: "none",
        duration: 1,
      },
      0,
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-[850px] overflow-hidden bg-black">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          ref={(el) => {
            piecesRef.current[index] = el
          }}
          className="absolute w-full h-[170px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bridge-animation.png')",
            backgroundPosition: `center ${-index * 170}px`,
            top: `${index * 170}px`,
          }}
        />
      ))}
    </section>
  )
}
