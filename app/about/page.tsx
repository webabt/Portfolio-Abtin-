"use client"

import { useRef, useEffect, useMemo } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import { Footer } from "@/components/footer"
import { ScrollytellingSection } from "@/components/scrollytelling-section"
import { ParallaxImageSection } from "@/components/parallax-image-section"
import { ParallaxCardsSection } from "@/components/parallax-cards-section"
import { FullscreenSvgSection } from "@/components/fullscreen-svg-section"

const phrase =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters."

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const words = useMemo(() => phrase.split(" "), [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    let gsapContext: gsap.Context | null = null

    const rafId = requestAnimationFrame(() => {
      const letters = letterRefs.current.filter((el): el is HTMLSpanElement => el !== null)
      if (!letters.length || !bodyRef.current) return

      gsapContext = gsap.context(() => {
        gsap.fromTo(
          letters,
          { opacity: 0.1 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: bodyRef.current,
              scrub: true,
              start: "top bottom",
              end: "bottom center",
            },
          },
        )
      }, containerRef)

      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(rafId)
      gsapContext?.revert()
    }
  }, [])

  let letterIndex = 0

  return (
    <div className="min-h-screen bg-black">
      <ScrollytellingSection />
      
      <main ref={containerRef} className="main">
        <div ref={bodyRef} className="body">
          {words.map((word, wordIndex) => (
            <p key={`${word}-${wordIndex}`} className="word">
              {word.split("").map((letter, charIndex) => {
                const index = letterIndex++
                return (
                  <span
                    key={`${letter}-${charIndex}`}
                    ref={(el) => {
                      letterRefs.current[index] = el
                    }}
                    className="letter"
                  >
                    {letter}
                  </span>
                )
              })}
            </p>
          ))}
        </div>
      </main>

      <ParallaxImageSection />

      <ParallaxCardsSection />

      <FullscreenSvgSection />

      <Footer />

      <style jsx>{`
        .main {
          display: flex;
          height: 100vh;
          align-items: flex-end;
          justify-content: center;
          color: rgb(211, 211, 211);
          margin-bottom: 40vh;
        }

        .body {
          width: 90%;
          display: flex;
          flex-wrap: wrap;
        }

        .body p,
        .word {
          font-size: 3.5vw;
          margin: 0px;
          margin-right: 1.5vw;
          font-weight: 700;
        }

        .body span,
        .letter {
          opacity: 0.1;
        }
      `}</style>
    </div>
  )
}
